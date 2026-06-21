import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import UsernameSearch from '@/components/search/UsernameSearch.vue'
import { GITHUB_ERROR_CODES } from '@/constants/githubErrors'

describe('UsernameSearch', () => {
  it('emits search with trimmed username on submit', async () => {
    const wrapper = mount(UsernameSearch)

    await wrapper.find('#github-username').setValue('  octocat  ')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('search')).toEqual([['octocat']])
  })

  it('disables submit when loading', () => {
    const wrapper = mount(UsernameSearch, {
      props: { loading: true },
    })

    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('#github-username').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('Searching…')
  })

  it('shows user not found error message', () => {
    const wrapper = mount(UsernameSearch, {
      props: { error: GITHUB_ERROR_CODES.USER_NOT_FOUND },
    })

    expect(wrapper.find('[role="alert"]').text()).toContain('User not found')
  })

  it('shows rate limit error message', () => {
    const wrapper = mount(UsernameSearch, {
      props: { error: GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED },
    })

    expect(wrapper.find('[role="alert"]').text()).toContain('Rate limit exceeded')
  })
})
