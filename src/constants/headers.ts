export const HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  VALUES: {
    JSON: 'application/json',
    BEARER: (token: string) => `Bearer ${token}`,
  },
} as const;
