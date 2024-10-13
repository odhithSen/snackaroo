import { NextFunction, Request, Response, Router } from 'express'
import { addOrder, addOrderItems, addReview, getOrderByOrderId } from '../services/user.service'
import { RestaurantReviewCreate } from '../models/restaurant_review.model'
import Ajv, { JSONSchemaType } from 'ajv'
import addFormats from 'ajv-formats'
import HttpException from '../models/http-exception.model'
import { OrderItemCreate } from '../models/order_item.model'
import { OrderCreate } from '../models/order.model'
import { OrderStatus } from '../enums/order-status'
import { getDishByDishId } from '../services/public.service'

const ajv = new Ajv()
addFormats(ajv)

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

interface OrderRequestBody {
  restaurant_id: number
  delivery_location: string
  delivery_address_line1: string
  delivery_address_line2?: string
  order_items: { dish_id: number; quantity: number }[]
}
router.post('/order', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      restaurant_id,
      delivery_location,
      delivery_address_line1,
      delivery_address_line2,
      order_items,
    } = req.body
    const user_id = req.user.user_id

    const CreateOrderSchema: JSONSchemaType<OrderRequestBody> = {
      type: 'object',
      properties: {
        restaurant_id: { type: 'integer' },
        delivery_location: { type: 'string' },
        delivery_address_line1: { type: 'string', minLength: 5 },
        delivery_address_line2: { type: 'string', nullable: true },
        order_items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              dish_id: { type: 'integer' },
              quantity: { type: 'integer', minimum: 1 },
            },
            required: ['dish_id', 'quantity'],
            additionalProperties: false,
          },
        },
      },
      required: ['restaurant_id', 'delivery_location', 'delivery_address_line1'],
      additionalProperties: false,
    }

    const validate = ajv.compile(CreateOrderSchema)
    const valid = validate(req.body)

    if (!valid) {
      console.error(validate.errors)
      throw new HttpException(400, 'Invalid request body')
    }

    let orderTotal = 0
    const dishItems: OrderItemCreate[] = []

    for (const orderItem of order_items) {
      const dish = await getDishByDishId(orderItem.dish_id)

      const dishItem: OrderItemCreate = {
        order_id: 0,
        dish_id: dish.dish_id,
        quantity: orderItem.quantity,
        line_total: dish.base_price * orderItem.quantity,
      }
      dishItems.push(dishItem)
      orderTotal += dish.base_price * orderItem.quantity
    }

    const newOrder: OrderCreate = {
      order_id: 0,
      user_id,
      restaurant_id,
      order_total: orderTotal,
      order_time: new Date(),
      order_status: OrderStatus.PENDING,
      delivery_location,
      delivery_address_line1,
      delivery_address_line2,
    }

    const createdOrder = await addOrder(newOrder)

    for (const dishItem of dishItems) {
      dishItem.order_id = createdOrder.order_id
    }
    const createdOrderItems = await addOrderItems(dishItems)

    res.status(201).json({ status: 'success', data: createdOrder })
  } catch (error) {
    next(error)
  }
})

router.get('/orders/:orderId', async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.user_id
  try {
    const orderId = parseInt(req.params.orderId)
    if (isNaN(orderId)) {
      throw new HttpException(400, 'Invalid order id')
    }
    const order = await getOrderByOrderId(orderId)

    if (order.user_id !== userId) {
      throw new HttpException(403, 'You are not authorized to view this order')
    }

    res.json({ status: 'success', order })
  } catch (error) {
    next(error)
  }
})

export default router
