import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'

import UsernameSearch from '@/components/search/UsernameSearch.vue'
import { GITHUB_ERROR_CODES } from '@/constants/githubErrors'

const SearchHarness = defineComponent({
  components: { UsernameSearch },
  setup() {
    const loading = ref(false)
    const error = ref(null)

    async function handleSearch(username) {
      loading.value = true
      error.value = null

      await Promise.resolve()

      if (username === 'ghost-user') {
        error.value = { code: GITHUB_ERROR_CODES.USER_NOT_FOUND }
      } else if (username === 'rate-limited') {
        error.value = {
          code: GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED,
          isAuthenticated: false,
          resetAt: new Date('2026-06-21T15:30:00').getTime(),
        }
      }

      loading.value = false
    }

    return { loading, error, handleSearch }
  },
  template: `
    <UsernameSearch
      :loading="loading"
      :error="error"
      @search="handleSearch"
    />
  `,
})

async function submitSearch(wrapper, username) {
  await wrapper.find('#github-username').setValue(username)
  await wrapper.find('form').trigger('submit.prevent')
  await wrapper.vm.$nextTick()
}

describe('UsernameSearch', () => {
  describe('successful search', () => {
    it('emits search with trimmed username on submit', async () => {
      const wrapper = mount(UsernameSearch)

      await submitSearch(wrapper, '  octocat  ')

      expect(wrapper.emitted('search')).toEqual([['octocat']])
    })

    it('does not show an error alert when there is no error', () => {
      const wrapper = mount(UsernameSearch, {
        props: { error: null },
      })

      expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    })

    it('does not emit search when the input is empty', async () => {
      const wrapper = mount(UsernameSearch)

      await wrapper.find('form').trigger('submit.prevent')

      expect(wrapper.emitted('search')).toBeUndefined()
    })

    it('does not emit search while loading', async () => {
      const wrapper = mount(UsernameSearch, {
        props: { loading: true },
      })

      await submitSearch(wrapper, 'octocat')

      expect(wrapper.emitted('search')).toBeUndefined()
    })

    it('completes a successful search without showing errors', async () => {
      const wrapper = mount(SearchHarness)

      await submitSearch(wrapper, 'octocat')

      expect(wrapper.find('[role="alert"]').exists()).toBe(false)
      expect(wrapper.find('.username-search__button').text()).toContain('Search')
      expect(wrapper.find('#github-username').attributes('disabled')).toBeUndefined()
    })
  })

  describe('user not found', () => {
    it('shows a clear error message when user is not found', () => {
      const wrapper = mount(UsernameSearch, {
        props: { error: { code: GITHUB_ERROR_CODES.USER_NOT_FOUND } },
      })

      const alert = wrapper.find('[role="alert"]')

      expect(alert.exists()).toBe(true)
      expect(alert.text()).toBe('User not found. Check the username and try again.')
    })

    it('keeps the input enabled so the user can try another username', async () => {
      const wrapper = mount(UsernameSearch, {
        props: { error: { code: GITHUB_ERROR_CODES.USER_NOT_FOUND } },
      })

      await wrapper.find('#github-username').setValue('another-user')

      expect(wrapper.find('#github-username').attributes('disabled')).toBeUndefined()
      expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined()
    })

    it('shows user not found after searching for a missing user', async () => {
      const wrapper = mount(SearchHarness)

      await submitSearch(wrapper, 'ghost-user')

      const alert = wrapper.find('[role="alert"]')

      expect(alert.exists()).toBe(true)
      expect(alert.text()).toContain('User not found')
    })
  })

  describe('rate limit error', () => {
    it('shows a clear rate limit message for unauthenticated requests', () => {
      const wrapper = mount(UsernameSearch, {
        props: {
          error: {
            code: GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED,
            isAuthenticated: false,
            resetAt: new Date('2026-06-21T15:30:00').getTime(),
          },
        },
      })

      const alert = wrapper.find('[role="alert"]').text()

      expect(alert).toContain('60 requests/hour without authentication')
      expect(alert).toContain('VITE_GITHUB_TOKEN')
      expect(alert).toContain('Try again after')
    })

    it('shows a distinct message when authenticated rate limit is exceeded', () => {
      const wrapper = mount(UsernameSearch, {
        props: {
          error: {
            code: GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED,
            isAuthenticated: true,
          },
        },
      })

      const alert = wrapper.find('[role="alert"]').text()

      expect(alert).toContain('5,000 requests/hour with authentication')
      expect(alert).not.toContain('VITE_GITHUB_TOKEN')
    })

    it('shows rate limit error after a blocked search', async () => {
      const wrapper = mount(SearchHarness)

      await submitSearch(wrapper, 'rate-limited')

      const alert = wrapper.find('[role="alert"]').text()

      expect(alert).toContain('60 requests/hour without authentication')
      expect(alert).toContain('Try again after')
    })
  })
})
