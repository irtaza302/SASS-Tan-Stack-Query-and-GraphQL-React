import { useQuery } from '@tanstack/react-query';
import { GitHubUser } from '../types/github';
import { API } from '../constants/api';
import { ERRORS } from '../constants/errors';
import { HEADERS } from '../constants/headers';
import { QUERY_KEYS } from '../constants/queryKeys';

async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  if (!token) {
    throw new Error(ERRORS.GITHUB.TOKEN_REQUIRED);
  }

  const response = await fetch(`${API.GITHUB.BASE_URL}${API.GITHUB.USERS_ENDPOINT}/${username}`, {
    headers: {
      [HEADERS.AUTHORIZATION]: HEADERS.VALUES.BEARER(token),
      [HEADERS.CONTENT_TYPE]: HEADERS.VALUES.JSON,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(ERRORS.GITHUB.INVALID_TOKEN);
    } else if (response.status === 403) {
      throw new Error(ERRORS.GITHUB.RATE_LIMIT);
    } else if (response.status === 404) {
      throw new Error(ERRORS.GITHUB.USER_NOT_FOUND);
    }
    throw new Error(ERRORS.GITHUB.API_ERROR(response.status));
  }
  
  return response.json();
}

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: QUERY_KEYS.GITHUB_USER(username),
    queryFn: () => fetchGitHubUser(username),
  });
}
