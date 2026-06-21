import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import LanguagePieChart from '@/components/charts/LanguagePieChart.vue'

describe('LanguagePieChart', () => {
  it('shows loading state', () => {
    const wrapper = mount(LanguagePieChart, {
      props: { loading: true },
    })

    expect(wrapper.text()).toContain('Loading language data from public repositories')
  })

  it('shows subtitle when repos were analyzed', () => {
    const wrapper = mount(LanguagePieChart, {
      props: {
        languages: [{ name: 'JavaScript', bytes: 1000, percentage: 100 }],
        reposAnalyzed: 30,
        totalPublicRepos: 36,
      },
    })

    expect(wrapper.text()).toContain('Based on the top 30 of 36 public repositories')
  })

  it('shows empty state when no languages', () => {
    const wrapper = mount(LanguagePieChart, {
      props: { languages: [] },
    })

    expect(wrapper.text()).toContain('No languages found in public repositories')
  })
})
