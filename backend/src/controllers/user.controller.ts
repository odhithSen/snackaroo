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

// TODO: need to fix the "permission" middleware. Error occurs when creating a new user (new users do't have an id yet)
router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, contact_number } = req.body
    const email = req.userEmail

    const newUser: UserCreate = {
      user_id: 0,
      first_name,
      last_name,
      email,
      contact_number,
    }

    console.log('newUser: ', newUser)

    const userCreateSchema: JSONSchemaType<UserCreate> = {
      type: 'object',
      properties: {
        user_id: { type: 'integer' },
        first_name: {
          type: 'string',
          minLength: 2,
        },
        last_name: {
          type: 'string',
          minLength: 2,
        },
        email: {
          type: 'string',
        },
        contact_number: {
          type: 'string',
          minLength: 9,
        },
      },
      required: ['user_id', 'first_name', 'last_name', 'email', 'contact_number'],
      additionalProperties: false,
    }

    const validate = ajv.compile(userCreateSchema)
    const valid = validate(newUser)
    if (!valid) {
      console.error(validate.errors)
      throw new HttpException(400, 'Invalid request body')
    }

    const createdUser = await addUser(newUser)
    res.status(201).json({ status: 'success', data: createdUser })
  } catch (error) {
    next(error)
  }
})

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
