import { ref } from 'vue'

import { GITHUB_ERROR_CODES } from '@/constants/githubErrors'
import {
  fetchUser,
  fetchUserRepos,
  fetchLanguagesForRepos,
} from '@/services/githubApi'
import { aggregateLanguages } from '@/utils/aggregateLanguages'

export function useGitHubDashboard() {
  const loading = ref(false)
  const error = ref(null)
  const user = ref(null)
  const languages = ref([])

  async function search(username) {
    loading.value = true
    error.value = null
    user.value = null
    languages.value = []

    try {
      const [userData, repos] = await Promise.all([
        fetchUser(username),
        fetchUserRepos(username),
      ])

      user.value = userData

      const languageMaps = await fetchLanguagesForRepos(repos)
      languages.value = aggregateLanguages(languageMaps)
    } catch (err) {
      if (
        err.code === GITHUB_ERROR_CODES.USER_NOT_FOUND ||
        err.code === GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED
      ) {
        error.value = err.code
      } else {
        console.error(err)
        error.value = 'UNKNOWN'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    user,
    languages,
    search,
  }
}
