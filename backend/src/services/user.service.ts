import { Optional } from 'sequelize'
import HttpException from '../models/http-exception.model'
import { Order, OrderCreate } from '../models/order.model'
import { OrderItem, OrderItemCreate } from '../models/order_item.model'
import { RestaurantReview, RestaurantReviewCreate } from '../models/restaurant_review.model'
import { NullishPropertiesOf } from 'sequelize/lib/utils'
import { PaginationQuery } from '../models/query-interface'
import { PaginationValues } from '../utils/pagination-query-validation'

export async function addReview(review: RestaurantReviewCreate): Promise<RestaurantReview> {
  try {
    const newReview = RestaurantReview.build(review)
    return await newReview.save()
  } catch (error) {
    console.error('Error saving review', error)
    // @ts-ignore
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(400, 'Review already exists')
    } else if (
      // @ts-ignore
      error.name === 'ValidationError' ||
      // @ts-ignore
      error.name === 'SequelizeForeignKeyConstraintError'
    ) {
      throw new HttpException(400, 'Invalid review')
    } else {
      throw new HttpException(500, 'Error saving review')
    }
  }
}

export async function addOrder(order: OrderCreate): Promise<Order> {
  try {
    const newOrder = Order.build(order)
    return await newOrder.save()
  } catch (error) {
    console.error('Error saving order', error)
    // @ts-ignore
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(400, 'Order already exists')
      // @ts-ignore
    } else if (error.name === 'ValidationError') {
      throw new HttpException(400, 'Invalid order')
    } else {
      throw new HttpException(500, 'Error saving order')
    }
  }
}

export async function addOrderItems(orderItems: OrderItemCreate[]): Promise<OrderItem[]> {
  try {
    const newOrderItems = await OrderItem.bulkCreate(
      orderItems as Optional<OrderItem, NullishPropertiesOf<OrderItem>>[],
    )
    return newOrderItems
  } catch (error) {
    console.error('Error saving order items', error)
    // @ts-ignore
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(400, 'Order items already exist')
      // @ts-ignore
    } else if (error.name === 'ValidationError') {
      throw new HttpException(400, 'Invalid order items')
    } else {
      throw new HttpException(500, 'Error saving order items')
    }
  }
}

export async function getOrderByOrderId(orderId: number): Promise<Order> {
  try {
    const order = await Order.findByPk(orderId)
    if (!order) {
      throw new HttpException(404, 'Order not found')
    }
    return order
  } catch (error) {
    if (error instanceof HttpException) {
      throw error
    }
    console.error('Error getting order details', error)
    throw new HttpException(500, 'Error getting order details')
  }
}

export async function getUserOrdersByStatus(
  userId: number,
  status: string,
  paginationValues: PaginationValues,
): Promise<Order[]> {
  try {
    const orders = await Order.findAll({
      where: { user_id: userId, order_status: status },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
    })
    return orders
  } catch (error) {
    console.error('Error getting user orders by status', error)
    throw new HttpException(500, 'Error getting user orders by status')
  }
}

export async function getOrderByUserId(
  userId: number,
  paginationValues: PaginationValues,
): Promise<Order[]> {
  try {
    const orders = await Order.findAll({
      where: { user_id: userId },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
    })
    return orders
  } catch (error) {
    console.error('Error getting user orders', error)
    throw new HttpException(500, 'Error getting user orders')
  }
}
