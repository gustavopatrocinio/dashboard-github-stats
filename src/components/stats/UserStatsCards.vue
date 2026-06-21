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

@media (max-width: 560px) {
  .user-stats {
    flex-direction: column;
  }
}
</style>
