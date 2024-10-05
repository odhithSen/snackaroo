import { User } from '../models/user/user.interface'

export async function getUsers(): Promise<User[]> {
  return Promise.resolve([
    {
      user_id: 1,
      first_name: 'John',
      last_name: 'Doe',
    },
    {
      user_id: 2,
      first_name: 'Jane',
      last_name: 'Doe',
    },
  ])
}
