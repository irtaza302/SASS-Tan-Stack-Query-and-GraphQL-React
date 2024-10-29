import { useQuery, ApolloError } from '@apollo/client'
import { gql } from '@apollo/client'
import { GetUsersQuery, GetUsersQueryVariables } from '../types/graphql';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

export function UserList() {
  const { loading, error, data } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS, {
    onError: (error: ApolloError) => {
      console.error('GraphQL Error:', {
        message: error.message,
        networkError: error.networkError,
        graphQLErrors: error.graphQLErrors,
      });
    }
  });

  if (loading) return (
    <div className="user-list-wrapper">
      <p>Loading...</p>
    </div>
  )
  
  if (error) return (
    <div className="user-list-wrapper">
      <div className="error-message">
        <p>Error: {error.message}</p>
        {error.graphQLErrors.map(({ message }, i) => (
          <p key={i}>GraphQL Error: {message}</p>
        ))}
        {error.networkError && (
          <p>Network Error: {error.networkError.message}</p>
        )}
      </div>
    </div>
  )

  if (!data?.users) {
    return (
      <div className="user-list-wrapper">
        <p>No users found</p>
      </div>
    )
  }

  return (
    <div className="user-list-wrapper">
      <h2>Users</h2>
      <div className="user-grid">
        {data.users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
