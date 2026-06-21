import { describe, it, expect } from 'vitest'

import {
  GITHUB_ERROR_CODES,
  getGitHubErrorMessage,
} from '@/constants/githubErrors'

describe('getGitHubErrorMessage', () => {
  it('returns user not found message', () => {
    expect(getGitHubErrorMessage(GITHUB_ERROR_CODES.USER_NOT_FOUND)).toContain('User not found')
  })

  it('returns unauthenticated rate limit message with reset time', () => {
    const resetAt = new Date('2026-06-21T15:30:00').getTime()
    const message = getGitHubErrorMessage({
      code: GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED,
      isAuthenticated: false,
      resetAt,
    })

    expect(message).toContain('60 requests/hour without authentication')
    expect(message).toContain('VITE_GITHUB_TOKEN')
    expect(message).toContain('Try again after')
  })

  it('returns authenticated rate limit message', () => {
    const message = getGitHubErrorMessage({
      code: GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED,
      isAuthenticated: true,
    })

    expect(message).toContain('5,000 requests/hour with authentication')
    expect(message).not.toContain('VITE_GITHUB_TOKEN')
  })

  it('returns fallback for unknown errors', () => {
    expect(getGitHubErrorMessage({ code: 'UNKNOWN' })).toContain('unexpected error')
  })
})
