<script setup>
import { computed, ref } from 'vue'
import { getGitHubErrorMessage } from '@/constants/githubErrors'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [String, Object],
    default: null,
  },
})

const emit = defineEmits(['search'])

const username = ref('')

const errorMessage = computed(() => getGitHubErrorMessage(props.error))

const isSubmitDisabled = computed(() => props.loading || !username.value.trim())

function handleSubmit() {
  const trimmed = username.value.trim()
  if (!trimmed || props.loading) return
  emit('search', trimmed)
}
</script>

<template>
  <form class="username-search" @submit.prevent="handleSubmit">
    <label class="username-search__label" for="github-username">
      GitHub username
    </label>

    <div class="username-search__controls">
      <input
        id="github-username"
        v-model="username"
        class="username-search__input"
        type="text"
        name="username"
        autocomplete="off"
        spellcheck="false"
        placeholder="e.g. octocat"
        :disabled="loading"
        aria-describedby="username-search-error"
      />

      <button
        class="username-search__button"
        type="submit"
        :disabled="isSubmitDisabled"
        :aria-busy="loading"
      >
        <span v-if="loading" class="username-search__spinner" aria-hidden="true" />
        {{ loading ? 'Searching…' : 'Search' }}
      </button>
    </div>

    <p
      v-if="errorMessage"
      id="username-search-error"
      class="username-search__error"
      role="alert"
      aria-live="polite"
    >
      {{ errorMessage }}
    </p>
  </form>
</template>

<style scoped>
.username-search {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 48rem;
}

.username-search__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #24292f;
}

.username-search__controls {
  display: flex;
  gap: 0.5rem;
}

.username-search__input {
  flex: 1;
  min-width: 0;
  padding: 0.625rem 0.875rem;
  border: 1px solid #d0d7de;
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.25;
  color: #24292f;
  background-color: #ffffff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.username-search__input:focus {
  outline: none;
  border-color: #0969da;
  box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.25);
}

.username-search__input:disabled {
  background-color: #f6f8fa;
  color: #656d76;
  cursor: not-allowed;
}

.username-search__input::placeholder {
  color: #656d76;
}

.username-search__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid rgba(31, 35, 40, 0.15);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25;
  color: #ffffff;
  background-color: #2da44e;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s ease, opacity 0.15s ease;
}

.username-search__button:hover:not(:disabled) {
  background-color: #2c974b;
}

.username-search__button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.username-search__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: username-search-spin 0.7s linear infinite;
}

.username-search__error {
  margin: 0;
  padding: 0.625rem 0.875rem;
  border: 1px solid #ff8182;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #cf222e;
  background-color: #ffebe9;
}

@keyframes username-search-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .username-search__controls {
    flex-direction: column;
  }

  .username-search__button {
    width: 100%;
    min-height: 2.75rem;
  }

  .username-search__input {
    min-height: 2.75rem;
  }

  .username-search__error {
    font-size: 0.8125rem;
  }
}
</style>
