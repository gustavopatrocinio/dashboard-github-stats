export const GITHUB_ERROR_CODES = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
}

export const GITHUB_ERROR_MESSAGES = {
  [GITHUB_ERROR_CODES.USER_NOT_FOUND]: 'User not found. Check the username and try again.',
  [GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED]:
    'GitHub API rate limit reached. Please wait before searching again.',
}

function formatResetTime(resetAt) {
  return new Date(resetAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function getGitHubErrorMessage(error) {
  if (!error) return null

  const code = typeof error === 'string' ? error : error.code

  if (code === GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED) {
    const isAuthenticated = typeof error === 'object' && error.isAuthenticated
    const resetAt = typeof error === 'object' ? error.resetAt : null

    const limitMessage = isAuthenticated
      ? 'GitHub API rate limit reached (5,000 requests/hour with authentication).'
      : 'GitHub API rate limit reached (60 requests/hour without authentication). Add VITE_GITHUB_TOKEN to your .env file to increase the limit to 5,000/hour.'

    if (resetAt) {
      return `${limitMessage} Try again after ${formatResetTime(resetAt)}.`
    }

    return `${limitMessage} Please wait before searching again.`
  }

  return GITHUB_ERROR_MESSAGES[code] ?? 'An unexpected error occurred. Please try again.'
}

export function isRateLimitError(error) {
  return error?.code === GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED
}
