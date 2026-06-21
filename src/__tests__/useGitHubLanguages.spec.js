import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useGitHubLanguages } from '@/composables/useGitHubLanguages'

vi.mock('@/services/githubApi', () => ({
  fetchUserLanguageStats: vi.fn(),
}))

import { fetchUserLanguageStats } from '@/services/githubApi'

describe('useGitHubLanguages', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads language stats for a user', async () => {
    fetchUserLanguageStats.mockResolvedValue({
      languages: [{ name: 'JavaScript', bytes: 1000, percentage: 100 }],
      reposAnalyzed: 5,
      totalPublicRepos: 12,
    })

    const { languages, reposAnalyzed, totalPublicRepos, load } = useGitHubLanguages()

    await load('octocat')

    expect(fetchUserLanguageStats).toHaveBeenCalledWith('octocat')
    expect(languages.value).toEqual([{ name: 'JavaScript', bytes: 1000, percentage: 100 }])
    expect(reposAnalyzed.value).toBe(5)
    expect(totalPublicRepos.value).toBe(12)
  })

  it('resets language stats', () => {
    const { languages, reposAnalyzed, totalPublicRepos, reset } = useGitHubLanguages()

    languages.value = [{ name: 'Go', bytes: 100, percentage: 100 }]
    reposAnalyzed.value = 3
    totalPublicRepos.value = 3

    reset()

    expect(languages.value).toEqual([])
    expect(reposAnalyzed.value).toBe(0)
    expect(totalPublicRepos.value).toBe(0)
  })
})
