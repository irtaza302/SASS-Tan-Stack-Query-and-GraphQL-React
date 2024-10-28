export const QUERY_KEYS = {
  USERS: 'users',
  GITHUB_USER: (username: string) => ['github-user', username],
} as const;
