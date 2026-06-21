import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import UserProfileCard from '@/components/profile/UserProfileCard.vue'

const mockUser = {
  login: 'octocat',
  name: 'The Octocat',
  bio: 'GitHub mascot',
  avatar_url: 'https://github.com/octocat.png',
  html_url: 'https://github.com/octocat',
  public_repos: 8,
  followers: 9000,
  following: 9,
}

describe('UserProfileCard', () => {
  it('renders avatar, name and bio', () => {
    const wrapper = mount(UserProfileCard, {
      props: { user: mockUser },
    })

    expect(wrapper.find('.user-profile__avatar').attributes('src')).toBe(mockUser.avatar_url)
    expect(wrapper.find('.user-profile__link').text()).toBe('The Octocat')
    expect(wrapper.find('.user-profile__username').text()).toBe('@octocat')
    expect(wrapper.find('.user-profile__bio').text()).toBe('GitHub mascot')
  })

  it('shows login as name when name is missing', () => {
    const wrapper = mount(UserProfileCard, {
      props: {
        user: { ...mockUser, name: null },
      },
    })

    expect(wrapper.find('.user-profile__link').text()).toBe('octocat')
    expect(wrapper.find('.user-profile__username').exists()).toBe(false)
  })

  it('shows empty bio placeholder', () => {
    const wrapper = mount(UserProfileCard, {
      props: {
        user: { ...mockUser, bio: null },
      },
    })

    expect(wrapper.find('.user-profile__bio--empty').text()).toBe('No bio')
  })
})
