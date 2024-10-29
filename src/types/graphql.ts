import { User } from './user';

export interface GetUsersQuery {
  users: User[];
}

export interface GetUsersQueryVariables {
  limit?: number;
  offset?: number;
}
