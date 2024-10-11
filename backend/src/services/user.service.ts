import HttpException from '../models/http-exception.model'
import { RestaurantReview, RestaurantReviewCreate } from '../models/restaurant_review.model'

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
