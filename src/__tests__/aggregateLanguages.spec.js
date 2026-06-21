import { describe, it, expect } from 'vitest'

import { aggregateLanguages } from '@/utils/aggregateLanguages'

describe('aggregateLanguages', () => {
  it('aggregates bytes and calculates percentages', () => {
    const result = aggregateLanguages([
      { JavaScript: 3000, TypeScript: 1000 },
      { JavaScript: 1000, Python: 5000 },
    ])

    expect(result).toEqual([
      { name: 'Python', bytes: 5000, percentage: 50 },
      { name: 'JavaScript', bytes: 4000, percentage: 40 },
      { name: 'TypeScript', bytes: 1000, percentage: 10 },
    ])
  })

  it('returns empty array when no languages', () => {
    expect(aggregateLanguages([{}, {}])).toEqual([])
  })
})
