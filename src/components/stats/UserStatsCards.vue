<script setup>
import StatCard from '@/components/stats/StatCard.vue'

defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="user-stats">
    <StatCard label="Repos" :value="user.public_repos" />
    <StatCard label="Followers" :value="user.followers" />
    <StatCard label="Following" :value="user.following" />
  </div>
</template>

<style scoped>
.user-stats {
  display: flex;
  gap: 1rem;
  width: 100%;
  min-width: 0;
}

.user-stats :deep(.stat-card) {
  flex: 1 1 0;
  min-width: 0;
}

@media (max-width: 640px) {
  .user-stats {
    gap: 0.5rem;
  }

  .user-stats :deep(.stat-card) {
    padding: 0.75rem 0.5rem;
  }

  .user-stats :deep(.stat-card__label) {
    font-size: 0.625rem;
    letter-spacing: 0.03em;
  }

  .user-stats :deep(.stat-card__value) {
    font-size: 1.25rem;
  }
}

@media (max-width: 380px) {
  .user-stats {
    flex-direction: column;
  }

  .user-stats :deep(.stat-card) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
  }

  .user-stats :deep(.stat-card__label) {
    font-size: 0.75rem;
  }
}
</style>
