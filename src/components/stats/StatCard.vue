<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <article class="stat-card">
    <p class="stat-card__label">{{ label }}</p>
    <p class="stat-card__value">{{ value.toLocaleString('en-US') }}</p>
  </article>
</template>

<style scoped>
.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 0;
  box-sizing: border-box;
  padding: 1rem 1.25rem;
  border: 1px solid #d0d7de;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(31, 35, 40, 0.04);
}

.stat-card__label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #656d76;
}

.stat-card__value {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
  color: #24292f;
}
</style>
