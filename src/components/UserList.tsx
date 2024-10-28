import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import './UserList.scss'
import { User } from '../types/user';

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
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_USERS)

  if (loading) return (
    <div className="user-list-wrapper">
      <p>Loading...</p>
    </div>
  )
  
  if (error) return (
    <div className="user-list-wrapper">
      <p>Error: {error.message}</p>
    </div>
  )

  return (
    <div className="user-list-wrapper">
      <h2>Users</h2>
      <div className="user-grid">
        {data?.users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
