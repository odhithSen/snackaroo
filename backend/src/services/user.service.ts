import { User, UserCreate, UserRead } from '../models/user.model'

export async function getUsers(): Promise<UserRead[]> {
  return Promise.resolve([
    {
      user_id: 1,
      email: 'someUser@example.com',
      first_name: 'John',
      last_name: 'Doe',
    },
  ])
}

export async function addUser(user: UserCreate): Promise<User> {
  const newUser = User.build(user)
  return await newUser.save()
}
