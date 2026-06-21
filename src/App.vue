<script setup>
import LanguagePieChart from '@/components/charts/LanguagePieChart.vue'
import UserProfileCard from '@/components/profile/UserProfileCard.vue'
import UsernameSearch from '@/components/search/UsernameSearch.vue'
import { useGitHubDashboard } from '@/composables/useGitHubDashboard'

const { loading, error, user, languages, search } = useGitHubDashboard()
</script>

<template>
  <main class="app">
    <header class="app__header">
      <h1 class="app__title">GitHub Stats Dashboard</h1>
      <p class="app__subtitle">Busque um usuário e veja estatísticas dos repositórios públicos</p>
    </header>

    <UsernameSearch :loading="loading" :error="error" @search="search" />

    <section v-if="user" class="app__results">
      <UserProfileCard :user="user" />
      <LanguagePieChart :languages="languages" />
    </section>
  </main>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  min-height: 100vh;
  padding: 2rem 1rem 3rem;
  background-color: #f6f8fa;
}

.app__header {
  text-align: center;
}

.app__title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #24292f;
}

.app__subtitle {
  margin: 0.5rem 0 0;
  font-size: 0.9375rem;
  color: #656d76;
}

.app__results {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 48rem;
}
</style>
