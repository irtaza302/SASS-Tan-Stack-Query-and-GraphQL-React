import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API } from '../constants/api';
import { HEADERS } from '../constants/headers';

const httpLink = createHttpLink({
  uri: API.GITHUB.GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  return {
    headers: {
      ...headers,
      [HEADERS.AUTHORIZATION]: token ? HEADERS.VALUES.BEARER(token) : '',
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
