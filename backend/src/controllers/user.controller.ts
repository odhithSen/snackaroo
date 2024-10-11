import { NextFunction, Request, Response, Router } from 'express'
import { addReview } from '../services/user.service'
import { RestaurantReviewCreate } from '../models/restaurant_review.model'
import Ajv, { JSONSchemaType } from 'ajv'
import HttpException from '../models/http-exception.model'

const ajv = new Ajv()
const router = Router()

router.post('/add-review', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurant_id, rating, description } = req.body
    const reviewer_id = req.user.user_id

    const newReview: RestaurantReviewCreate = {
      restaurant_id,
      reviewer_id,
      rating,
      description,
    }

    const restaurantReviewCreateSchema: JSONSchemaType<RestaurantReviewCreate> = {
      type: 'object',
      properties: {
        restaurant_id: { type: 'integer' },
        reviewer_id: { type: 'integer' },
        rating: {
          type: 'integer',
          minimum: 1,
          maximum: 5,
        },
        description: {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['restaurant_id', 'reviewer_id', 'rating', 'description'],
      additionalProperties: false,
    }

    const validate = ajv.compile(restaurantReviewCreateSchema)
    const valid = validate(newReview)
    if (!valid) {
      console.error(validate.errors)
      throw new HttpException(400, 'Invalid request body')
    }

    const createdReview = await addReview(newReview)
    res.status(201).json({ status: 'success', data: createdReview })
  } catch (error) {
    next(error)
  }
})

export default router
