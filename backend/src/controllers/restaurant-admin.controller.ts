import { NextFunction, Request, Response, Router } from 'express'
import HttpException from '../models/http-exception.model'
import Ajv, { JSONSchemaType } from 'ajv'
import addFormats from 'ajv-formats'
import {
  addDishCategory,
  addDishItem,
  getRestaurantIdByAdmin,
} from '../services/restaurant-admin.service'
import { RestaurantDishItemCreate } from '../models/restaurant-dish-item.model'
import { RestaurantDishCategoryCreate } from '../models/restaurant_dish_category.model'

const ajv = new Ajv()
addFormats(ajv)

const router = Router()

interface DishItemCreateRequestBody {
  dish_category_id: number
  thumbnail_image_url: string
  dish_name: string
  dish_description: string
  calories: number
  base_price: number
  ingredients: string
}
router.post('/dish-item', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      dish_category_id,
      thumbnail_image_url,
      dish_name,
      dish_description,
      calories,
      base_price,
      ingredients,
    } = req.body

    const restaurant_admin = req.user.user_id

    const CreateDishItemSchema: JSONSchemaType<DishItemCreateRequestBody> = {
      type: 'object',
      properties: {
        dish_category_id: { type: 'integer', minimum: 1 },
        thumbnail_image_url: { type: 'string' },
        dish_name: { type: 'string', minLength: 1 },
        dish_description: { type: 'string' },
        calories: { type: 'integer' },
        base_price: { type: 'number', minimum: 0 },
        ingredients: { type: 'string' },
      },
      required: [
        'dish_category_id',
        'thumbnail_image_url',
        'dish_name',
        'dish_description',
        'calories',
        'base_price',
        'ingredients',
      ],
      additionalProperties: false,
    }

    const validate = ajv.compile(CreateDishItemSchema)
    const valid = validate(req.body)
    if (!valid) {
      console.error(validate.errors)
      throw new HttpException(400, 'Invalid request body')
    }

    const restaurant = await getRestaurantIdByAdmin(restaurant_admin)

    const newDishItem: RestaurantDishItemCreate = {
      dish_id: 0,
      restaurant_id: restaurant.restaurant_id,
      dish_category_id,
      thumbnail_image_url,
      dish_name,
      dish_description,
      calories,
      base_price,
      ingredients,
    }
    const dishItem = await addDishItem(newDishItem)

    res.status(201).json({ status: 'success', dishItem })
  } catch (error) {
    next(error)
  }
})

interface DishCategoryCreateRequestBody {
  dish_category_name: string
}
router.post('/dish-category', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dish_category_name } = req.body

    const restaurant_admin = req.user.user_id

    const CreateDishCategorySchema: JSONSchemaType<DishCategoryCreateRequestBody> = {
      type: 'object',
      properties: {
        dish_category_name: { type: 'string', minLength: 1 },
      },
      required: ['dish_category_name'],
      additionalProperties: false,
    }

    const validate = ajv.compile(CreateDishCategorySchema)
    const valid = validate(req.body)
    if (!valid) {
      console.error(validate.errors)
      throw new HttpException(400, 'Invalid request body')
    }

    const restaurant = await getRestaurantIdByAdmin(restaurant_admin)

    const newDishCategory: RestaurantDishCategoryCreate = {
      dish_category_id: 0,
      restaurant_id: restaurant.restaurant_id,
      dish_category_name,
    }
    const dishCategory = await addDishCategory(newDishCategory)

    res.status(201).json({ status: 'success', dishCategory })
  } catch (error) {
    next(error)
  }
})

export default router
