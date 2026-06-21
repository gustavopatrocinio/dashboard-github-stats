<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="profile-card">
    <img
      class="profile-card__avatar"
      :src="user.avatar_url"
      :alt="`Avatar de ${user.login}`"
      width="120"
      height="120"
    />

    <div class="profile-card__content">
      <h2 class="profile-card__name">
        <a
          class="profile-card__link"
          :href="user.html_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ user.name || user.login }}
        </a>
      </h2>

      <p v-if="user.login !== user.name" class="profile-card__username">@{{ user.login }}</p>

      <p v-if="user.bio" class="profile-card__bio">{{ user.bio }}</p>
      <p v-else class="profile-card__bio profile-card__bio--empty">Sem bio</p>

      <dl class="profile-card__stats">
        <div class="profile-card__stat">
          <dt>Repos</dt>
          <dd>{{ user.public_repos }}</dd>
        </div>
        <div class="profile-card__stat">
          <dt>Seguidores</dt>
          <dd>{{ user.followers }}</dd>
        </div>
        <div class="profile-card__stat">
          <dt>Seguindo</dt>
          <dd>{{ user.following }}</dd>
        </div>
      </dl>
    </div>
  </article>
</template>

<style scoped>
.profile-card {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  max-width: 48rem;
  padding: 1.5rem;
  border: 1px solid #d0d7de;
  border-radius: 0.5rem;
  background-color: #ffffff;
}

.profile-card__avatar {
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid #d0d7de;
}

.profile-card__content {
  flex: 1;
  min-width: 0;
}

.profile-card__name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
}

.profile-card__link {
  color: #0969da;
  text-decoration: none;
}

.profile-card__link:hover {
  text-decoration: underline;
}

.profile-card__username {
  margin: 0.25rem 0 0;
  font-size: 1rem;
  color: #656d76;
}

.profile-card__bio {
  margin: 0.75rem 0 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #24292f;
}

.profile-card__bio--empty {
  color: #656d76;
  font-style: italic;
}

.profile-card__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 1rem 0 0;
}

.profile-card__stat {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.profile-card__stat dt {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #656d76;
}

.profile-card__stat dd {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #24292f;
}

@media (max-width: 560px) {
  .profile-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-card__stats {
    justify-content: center;
  }
}
</style>
