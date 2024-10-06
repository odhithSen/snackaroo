import HttpException from '../models/http-exception.model'
import { RestaurantReview, RestaurantReviewCreate } from '../models/restaurant_review.model'
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

export async function getUserByEmail(email: string): Promise<User | null> {
  return await User.findOne({ where: { email } })
}

export async function addUser(user: UserCreate): Promise<User> {
  const newUser = User.build(user)
  return await newUser.save()
}

export async function addReview(
  review: RestaurantReviewCreate,
): Promise<RestaurantReview | HttpException> {
  try {
    const newReview = RestaurantReview.build(review)
    return await newReview.save()
  } catch (error) {
    console.error('Error saving review', error)
    // @ts-ignore
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(400, 'Review already exists')
      // @ts-ignore
    } else if (error.name === 'ValidationError') {
      throw new HttpException(400, 'Invalid review')
    } else {
      throw new HttpException(500, 'Error saving review')
    }
  }
}
