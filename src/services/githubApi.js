import axios from 'axios'

import { GITHUB_ERROR_CODES } from '@/constants/githubErrors'
import { aggregateLanguages } from '@/utils/aggregateLanguages'

const MAX_REPOS_FOR_LANGUAGES = 30
const MAX_REPO_PAGES = 10
const REPOS_PER_PAGE = 100

const client = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(import.meta.env.VITE_GITHUB_TOKEN && {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }),
  },
})

function createGitHubError(code, message) {
  const error = new Error(message)
  error.code = code
  return error
}

function handleApiError(error) {
  const status = error.response?.status
  const message = error.response?.data?.message ?? ''
  const rateLimitRemaining = error.response?.headers?.['x-ratelimit-remaining']

  if (status === 404) {
    throw createGitHubError(GITHUB_ERROR_CODES.USER_NOT_FOUND, message)
  }

  if (
    status === 403 &&
    (message.toLowerCase().includes('rate limit') || rateLimitRemaining === '0')
  ) {
    throw createGitHubError(GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED, message)
  }

  throw error
}

export async function fetchUser(username) {
  try {
    const { data } = await client.get(`/users/${encodeURIComponent(username)}`)
    return data
  } catch (error) {
    if (error.code) throw error
    handleApiError(error)
  }
}

export async function fetchPublicUserRepos(username) {
  const repos = []

  try {
    for (let page = 1; page <= MAX_REPO_PAGES; page += 1) {
      const { data } = await client.get(`/users/${encodeURIComponent(username)}/repos`, {
        params: {
          per_page: REPOS_PER_PAGE,
          page,
          sort: 'updated',
          type: 'owner',
        },
      })

      if (!data.length) break

      repos.push(...data.filter((repo) => !repo.private))

      if (data.length < REPOS_PER_PAGE) break
    }

    return repos
  } catch (error) {
    if (error.code) throw error
    handleApiError(error)
  }
}

export async function fetchRepoLanguages(owner, repo) {
  try {
    const { data } = await client.get(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
    )
    return data
  } catch (error) {
    if (error.code) throw error
    handleApiError(error)
  }
}

export async function fetchLanguagesForRepos(repos) {
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, MAX_REPOS_FOR_LANGUAGES)

  return Promise.all(
    topRepos.map((repo) =>
      fetchRepoLanguages(repo.owner.login, repo.name).catch(() => ({})),
    ),
  )
}

export async function fetchUserLanguageStats(username) {
  const repos = await fetchPublicUserRepos(username)
  const languageMaps = await fetchLanguagesForRepos(repos)

  return {
    languages: aggregateLanguages(languageMaps),
    reposAnalyzed: Math.min(repos.length, MAX_REPOS_FOR_LANGUAGES),
    totalPublicRepos: repos.length,
  }
}
