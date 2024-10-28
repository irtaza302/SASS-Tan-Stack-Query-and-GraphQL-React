export const ERRORS = {
    GITHUB: {
      TOKEN_REQUIRED: 'GitHub token is required',
      INVALID_TOKEN: 'Invalid GitHub token',
      RATE_LIMIT: 'Rate limit exceeded or access denied',
      USER_NOT_FOUND: 'User not found',
      API_ERROR: (status: number) => `GitHub API error: ${status}`,
    },
    NETWORK: {
      RESPONSE_NOT_OK: 'Network response was not ok',
    },
  } as const;