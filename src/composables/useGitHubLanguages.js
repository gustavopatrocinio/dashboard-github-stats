import { ref } from 'vue'

import { fetchUserLanguageStats } from '@/services/githubApi'

export function useGitHubLanguages() {
  const languages = ref([])
  const reposAnalyzed = ref(0)
  const totalPublicRepos = ref(0)
  const loadingLanguages = ref(false)

  function reset() {
    languages.value = []
    reposAnalyzed.value = 0
    totalPublicRepos.value = 0
  }

  async function load(username) {
    loadingLanguages.value = true

    try {
      const stats = await fetchUserLanguageStats(username)
      languages.value = stats.languages
      reposAnalyzed.value = stats.reposAnalyzed
      totalPublicRepos.value = stats.totalPublicRepos
    } finally {
      loadingLanguages.value = false
    }
  }

  return {
    languages,
    reposAnalyzed,
    totalPublicRepos,
    loadingLanguages,
    load,
    reset,
  }
}
