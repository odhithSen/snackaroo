import HttpException from '../models/http-exception.model'
import { User, UserCreate, UserRead } from '../models/user.model'

export async function getUserByEmail(email: string): Promise<User | null> {
  return await User.findOne({ where: { email } })
}

export async function addUser(user: UserCreate): Promise<User | HttpException> {
  try {
    const newUser = User.build(user)
    return await newUser.save()
  } catch (error) {
    console.error('Error saving user', error)
    // @ts-ignore
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(400, 'User already exists')
      // @ts-ignore
    } else if (error.name === 'ValidationError') {
      throw new HttpException(400, 'Invalid user')
    } else {
      throw new HttpException(500, 'Error saving user')
    }
  }
}
