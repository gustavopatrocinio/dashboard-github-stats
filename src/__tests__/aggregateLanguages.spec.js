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

  it('groups remaining languages into Other when exceeding maxSlices', () => {
    const languageMaps = [
      {
        JavaScript: 5000,
        TypeScript: 4000,
        Python: 3000,
        Go: 2000,
        Rust: 1000,
        Ruby: 900,
        PHP: 800,
        Java: 700,
        CSS: 600,
        HTML: 500,
        Shell: 400,
      },
    ]

    const result = aggregateLanguages(languageMaps, { maxSlices: 10 })

    expect(result).toHaveLength(10)
    expect(result.at(-1)).toEqual({
      name: 'Other',
      bytes: 900,
      percentage: 5,
    })
  })
})
