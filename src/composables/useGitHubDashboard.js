import { ref } from 'vue'

import { useGitHubLanguages } from '@/composables/useGitHubLanguages'
import { GITHUB_ERROR_CODES } from '@/constants/githubErrors'
import { fetchUser } from '@/services/githubApi'

export function useGitHubDashboard() {
  const loading = ref(false)
  const error = ref(null)
  const user = ref(null)

  const {
    languages,
    reposAnalyzed,
    totalPublicRepos,
    loadingLanguages,
    load: loadLanguages,
    reset: resetLanguages,
  } = useGitHubLanguages()

  async function search(username) {
    loading.value = true
    error.value = null
    user.value = null
    resetLanguages()

    try {
      const userData = await fetchUser(username)
      user.value = userData
      await loadLanguages(username)
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
    loadingLanguages,
    error,
    user,
    languages,
    reposAnalyzed,
    totalPublicRepos,
    search,
  }
}
