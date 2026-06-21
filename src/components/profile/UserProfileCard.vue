<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const displayName = computed(() => props.user.name || props.user.login)

const showUsername = computed(
  () => props.user.name && props.user.name !== props.user.login,
)
</script>

<template>
  <article class="user-profile__card">
    <img
      class="user-profile__avatar"
      :src="user.avatar_url"
      :alt="`${user.login}'s avatar`"
      width="96"
      height="96"
    />

    <div class="user-profile__info">
      <h2 class="user-profile__name">
        <a
          class="user-profile__link"
          :href="user.html_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ displayName }}
        </a>
      </h2>

      <p v-if="showUsername" class="user-profile__username">@{{ user.login }}</p>

      <p v-if="user.bio" class="user-profile__bio">{{ user.bio }}</p>
      <p v-else class="user-profile__bio user-profile__bio--empty">No bio</p>
    </div>
  </article>
</template>

<style scoped>
.user-profile__card {
  display: flex;
  gap: 1.25rem;
  width: 100%;
  padding: 1.5rem;
  border: 1px solid #d0d7de;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(31, 35, 40, 0.04);
}

.user-profile__avatar {
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid #d0d7de;
}

.user-profile__info {
  flex: 1;
  min-width: 0;
}

.user-profile__name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
}

.user-profile__link {
  color: #0969da;
  text-decoration: none;
}

.user-profile__link:hover {
  text-decoration: underline;
}

.user-profile__username {
  margin: 0.25rem 0 0;
  font-size: 1rem;
  color: #656d76;
}

.user-profile__bio {
  margin: 0.75rem 0 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #24292f;
}

.user-profile__bio--empty {
  color: #656d76;
  font-style: italic;
}

@media (max-width: 560px) {
  .user-profile__card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
