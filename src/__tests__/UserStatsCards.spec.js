import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import UserStatsCards from '@/components/stats/UserStatsCards.vue'

const mockUser = {
  public_repos: 8,
  followers: 9000,
  following: 9,
}

describe('UserStatsCards', () => {
  it('renders repos, followers and following stat cards', () => {
    const wrapper = mount(UserStatsCards, {
      props: { user: mockUser },
    })

    expect(wrapper.text()).toContain('Repos')
    expect(wrapper.text()).toContain('Followers')
    expect(wrapper.text()).toContain('Following')
    expect(wrapper.text()).toContain('8')
    expect(wrapper.text()).toContain('9,000')
    expect(wrapper.text()).toContain('9')
  })
})
