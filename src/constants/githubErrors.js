export const GITHUB_ERROR_CODES = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
}

export const GITHUB_ERROR_MESSAGES = {
  [GITHUB_ERROR_CODES.USER_NOT_FOUND]: 'User not found. Check the username and try again.',
  [GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED]:
    'Rate limit exceeded. Wait a few minutes or use an access token.',
}
