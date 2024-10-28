import { useQuery } from '@tanstack/react-query'
import { API } from '../constants/api';
import { ERRORS } from '../constants/errors';
import { QUERY_KEYS } from '../constants/queryKeys';

async function fetchUsers() {
  const response = await fetch(`${API.EXAMPLE.BASE_URL}${API.EXAMPLE.USERS_ENDPOINT}`)
  if (!response.ok) {
    throw new Error(ERRORS.NETWORK.RESPONSE_NOT_OK)
  }
  return response.json()
}

export function useUsers() {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchUsers,
  })
}
