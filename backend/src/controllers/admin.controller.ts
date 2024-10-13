// Restaurant Management CRUD operations
import { NextFunction, Request, Response, Router } from 'express'
import HttpException from '../models/http-exception.model'
import Ajv, { JSONSchemaType } from 'ajv'
import addFormats from 'ajv-formats'
import { RestaurantCreate } from '../models/restaurant.model'
import { getUserByEmail } from '../services/user-info.service'
import { addRestaurant, addRestaurantAdmin } from '../services/admin.service'
import { RestaurantAdminCreate } from '../models/restaurant_admin.model'

const ajv = new Ajv()
addFormats(ajv)

const router = Router()

interface RestaurantCreateRequestBody {
  restaurant_admin: number
  name: string
  thumbnail_image_url: string
  tag_line: string
  location: string
  address: string
  contact_number: string
  hygiene_rating: number
  notes: string
}

router.post('/restaurant', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      restaurant_admin,
      name,
      thumbnail_image_url,
      tag_line,
      location,
      address,
      contact_number,
      hygiene_rating,
      notes,
    } = req.body

    const CreateRestaurantSchema: JSONSchemaType<RestaurantCreateRequestBody> = {
      type: 'object',
      properties: {
        restaurant_admin: { type: 'integer', minimum: 100 },
        name: { type: 'string', minLength: 3 },
        thumbnail_image_url: { type: 'string' },
        tag_line: { type: 'string' },
        location: { type: 'string' },
        address: { type: 'string' },
        contact_number: { type: 'string', minLength: 10, maxLength: 10 },
        hygiene_rating: { type: 'integer', minimum: 1, maximum: 5 },
        notes: { type: 'string' },
      },
      required: [
        'restaurant_admin',
        'name',
        'thumbnail_image_url',
        'tag_line',
        'location',
        'address',
        'contact_number',
        'hygiene_rating',
        'notes',
      ],
      additionalProperties: false,
    }

    const validate = ajv.compile(CreateRestaurantSchema)
    const valid = validate(req.body)

    if (!valid) {
      console.error(validate.errors)
      throw new HttpException(400, 'Invalid request body')
    }

    const newRestaurant: RestaurantCreate = {
      restaurant_id: 0,
      name,
      thumbnail_image_url,
      tag_line,
      location,
      address,
      contact_number,
      hygiene_rating,
      notes,
    }

    const restaurant = await addRestaurant(newRestaurant)

    const newRestaurantAdmin: RestaurantAdminCreate = {
      restaurant_id: restaurant.restaurant_id,
      user_id: restaurant_admin,
    }

    const restaurantAdmin = await addRestaurantAdmin(newRestaurantAdmin)

    res.status(201).json({ status: 'success', newRestaurant })
  } catch (error) {
    next(error)
  }
})

export default router
