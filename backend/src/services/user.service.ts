import { UserRead } from '../models/user.model'

export async function getUsers(): Promise<UserRead[]> {
  return Promise.resolve([
    {
      userId: 1,
      email: 'someUser@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
  ])
}
