export const HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  VALUES: {
    BEARER: (token: string) => `Bearer ${token}`,
    JSON: 'application/json',
  },
} as const;
