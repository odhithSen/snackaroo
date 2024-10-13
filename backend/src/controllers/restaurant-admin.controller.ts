import { NextFunction, Request, Response, Router } from 'express'
import HttpException from '../models/http-exception.model'
import Ajv, { JSONSchemaType } from 'ajv'
import addFormats from 'ajv-formats'
import {
  addDishCategory,
  addDishItem,
  getAverageOrderValue,
  getOrderByRestaurantId,
  getOrdersByDateRange,
  getRestaurantIdByAdmin,
  getRestaurantOrdersByStatus,
  getSalesReport,
  getSalesTotalReport,
  getTopSellingItems,
  updateOrderStatus,
} from '../services/restaurant-admin.service'
import { RestaurantDishItemCreate } from '../models/restaurant-dish-item.model'
import { RestaurantDishCategoryCreate } from '../models/restaurant_dish_category.model'
import { OrderStatus } from '../enums/order-status'
import { getOrderByOrderId } from '../services/user.service'
import { PaginationQuery } from '../models/query-interface'
import { validatePaginationQuery } from '../utils/pagination-query-validation'
import { ReportRange } from '../enums/report-range'
import { validateDateRange } from '../utils/date-range-validation'
import { SalesCriteria } from '../enums/sales-criteria'

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

interface OrderUpdateRequestBody {
  order_id: number
  order_status: string
}
router.patch('/order', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { order_id, order_status } = req.body

    const restaurant_admin = req.user.user_id

    const UpdateOrderSchema: JSONSchemaType<OrderUpdateRequestBody> = {
      type: 'object',
      properties: {
        order_id: { type: 'integer', minimum: 1 },
        order_status: {
          type: 'string',
          enum: Object.values(OrderStatus),
        },
      },
      required: ['order_id', 'order_status'],
      additionalProperties: false,
    }

    const validate = ajv.compile(UpdateOrderSchema)
    const valid = validate(req.body)
    if (!valid) {
      console.error(validate.errors)
      throw new HttpException(400, 'Invalid request body')
    }

    const restaurant = await getRestaurantIdByAdmin(restaurant_admin)

    const order = await getOrderByOrderId(order_id)

    if (restaurant.restaurant_id !== order.restaurant_id) {
      throw new HttpException(403, 'Forbidden to update this order')
    }

    const updatedOrder = await updateOrderStatus(order_id, order_status)

    res.status(200).json({ status: 'success', updatedOrder })
  } catch (error) {
    next(error)
  }
})

router.get(
  '/orders',
  async (
    req: Request<{}, {}, {}, PaginationQuery & { status?: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const restaurant_admin = req.user.user_id
    try {
      const paginationValues = validatePaginationQuery(req.query)
      const { status } = req.query

      if (status && !Object.values(OrderStatus).includes(status as OrderStatus)) {
        throw new HttpException(400, 'Invalid order status')
      }

      const restaurant = await getRestaurantIdByAdmin(restaurant_admin)

      let orders
      if (status) {
        orders = await getRestaurantOrdersByStatus(
          restaurant.restaurant_id,
          status,
          paginationValues,
        )
      } else {
        orders = await getOrderByRestaurantId(restaurant.restaurant_id, paginationValues)
      }

      res.status(200).json({ status: 'success', orders })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  '/reports/sales',
  async (
    req: Request<{}, {}, {}, { from?: string; to?: string; grouping?: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const restaurant_admin = req.user.user_id
    try {
      const { from, to, grouping } = req.query
      const { fromDate, toDate } = validateDateRange(from, to)

      if (!grouping || !Object.values(ReportRange).includes(grouping as ReportRange)) {
        throw new HttpException(400, 'Invalid grouping parameter')
      }

      const restaurant = await getRestaurantIdByAdmin(restaurant_admin)

      const salesReport = await getSalesReport(restaurant.restaurant_id, fromDate, toDate, grouping)

      res.status(200).json({ status: 'success', salesReport })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  '/reports/total-sales',
  async (
    req: Request<{}, {}, {}, { from?: string; to?: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const restaurant_admin = req.user.user_id
    try {
      const { from, to } = req.query
      const { fromDate, toDate } = validateDateRange(from, to)

      const restaurant = await getRestaurantIdByAdmin(restaurant_admin)

      const salesReport = await getSalesTotalReport(restaurant.restaurant_id, fromDate, toDate)

      res.status(200).json({ status: 'success', salesReport })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  '/reports/top-selling-items',
  async (req: Request<{}, {}, {}, { criteria?: string }>, res: Response, next: NextFunction) => {
    const restaurant_admin = req.user.user_id
    try {
      const { criteria } = req.query
      if (!criteria || !Object.values(SalesCriteria).includes(criteria as SalesCriteria)) {
        throw new HttpException(400, 'Invalid criteria parameter')
      }

      const restaurant = await getRestaurantIdByAdmin(restaurant_admin)

      const topSellingItems = await getTopSellingItems(restaurant.restaurant_id, criteria)

      res.status(200).json({ status: 'success', topSellingItems })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  '/reports/average-order-value',
  async (
    req: Request<{}, {}, {}, { from?: string; to?: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const restaurant_admin = req.user.user_id
    try {
      const { from, to } = req.query
      const { fromDate, toDate } = validateDateRange(from, to)

      const restaurant = await getRestaurantIdByAdmin(restaurant_admin)

      const averageOrderValue = await getAverageOrderValue(
        restaurant.restaurant_id,
        fromDate,
        toDate,
      )

      res.status(200).json({ status: 'success', averageOrderValue })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  '/reports/orders',
  async (
    req: Request<{}, {}, {}, { from?: string; to?: string; status?: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const restaurant_admin = req.user.user_id
    try {
      const { from, to, status } = req.query
      const { fromDate, toDate } = validateDateRange(from, to)

      if (!status || !Object.values(OrderStatus).includes(status as OrderStatus)) {
        throw new HttpException(400, 'Invalid order status')
      }

      const restaurant = await getRestaurantIdByAdmin(restaurant_admin)

      const orders = await getOrdersByDateRange(restaurant.restaurant_id, fromDate, toDate, status)

      res.status(200).json({ status: 'success', orders })
    } catch (error) {
      next(error)
    }
  },
)

export default router
