import { NextFunction, Request, Response, Router } from 'express'
import { addReview, addUser, getUsers } from '../services/user.service'
import { UserCreate } from '../models/user.model'
import { RestaurantReviewCreate } from '../models/restaurant_review.model'
import Ajv, { JSONSchemaType } from 'ajv'
import HttpException from '../models/http-exception.model'

const ajv = new Ajv()
const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await getUsers())
  } catch (error) {
    next(error)
  }
})

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tempUser: UserCreate = {
      user_id: 0,
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'someoune@exampls.com',
      contact_number: '1234567890',
    }

    console.log('creating user...')
    const createdUser = await addUser(tempUser)
    console.log('created user:')
    console.log(createdUser)
    res.json({ status: 'success' })
  } catch (error) {
    next(error)
  }
})

router.post('/add-review', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('adding review...')

    const { restaurant_id, reviewer_id, rating, description } = req.body
    // TODO: write logic to extract user_id

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
    res.json({ status: 'success', data: createdReview })
  } catch (error) {
    next(error)
  }
})

export default router
