export const GITHUB_ERROR_CODES = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
}

export const GITHUB_ERROR_MESSAGES = {
  [GITHUB_ERROR_CODES.USER_NOT_FOUND]: 'Usuário não encontrado. Verifique o username e tente novamente.',
  [GITHUB_ERROR_CODES.RATE_LIMIT_EXCEEDED]:
    'Limite de requisições excedido. Aguarde alguns minutos ou use um token de acesso.',
}
