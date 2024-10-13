import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { sequelize } from '../models'
import { OrderStatus } from '../enums/order-status'
import HttpException from '../models/http-exception.model'
import { Order } from '../models/order.model'
import {
  RestaurantDishItem,
  RestaurantDishItemCreate,
  RestaurantDishItemRead,
} from '../models/restaurant-dish-item.model'
import { RestaurantAdmin, RestaurantAdminRead } from '../models/restaurant_admin.model'
import {
  RestaurantDishCategory,
  RestaurantDishCategoryCreate,
  RestaurantDishCategoryRead,
} from '../models/restaurant_dish_category.model'
import { PaginationValues } from '../utils/pagination-query-validation'
import { ReportRange } from '../enums/report-range'
import { SalesCriteria } from '../enums/sales-criteria'

export async function getRestaurantIdByAdmin(id: number): Promise<RestaurantAdminRead> {
  try {
    const restaurant = await RestaurantAdmin.findOne({
      where: { user_id: id },
    })
    if (restaurant === null) {
      console.log('Restaurant not found')
      throw new HttpException(404, 'Restaurant not found for this admin')
    }
    const tempRestaurant: RestaurantAdminRead = {
      restaurant_id: restaurant.restaurant_id,
      user_id: restaurant.user_id,
    }

    return tempRestaurant
  } catch (error) {
    if (error instanceof HttpException) {
      throw error
    }
    console.error('Error getting restaurant', error)
    throw new HttpException(500, 'Error getting restaurant')
  }
}

export async function addDishItem(
  newDishItem: RestaurantDishItemCreate,
): Promise<RestaurantDishItemRead> {
  try {
    const dishItem = await RestaurantDishItem.create(newDishItem)

    const tempDishItem: RestaurantDishItemRead = {
      dish_id: dishItem.dish_id,
      restaurant_id: dishItem.restaurant_id,
      dish_category_id: dishItem.dish_category_id,
      thumbnail_image_url: dishItem.thumbnail_image_url,
      dish_name: dishItem.dish_name,
      dish_description: dishItem.dish_description,
      calories: dishItem.calories,
      base_price: dishItem.base_price,
      ingredients: dishItem.ingredients,
    }

    return tempDishItem
  } catch (error) {
    console.error('Error saving dish item', error)
    // @ts-ignore
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(400, 'Dish already exists')
      // @ts-ignore
    } else if (error.name === 'ValidationError') {
      throw new HttpException(400, 'Invalid dish details')
    } else {
      throw new HttpException(500, 'Error saving dish item')
    }
  }
}

export async function addDishCategory(
  newDishCategory: RestaurantDishCategoryCreate,
): Promise<RestaurantDishCategoryRead> {
  try {
    const dishCategory = await RestaurantDishCategory.create(newDishCategory)

    const tempDishCategory: RestaurantDishCategoryRead = {
      dish_category_id: dishCategory.dish_category_id,
      restaurant_id: dishCategory.restaurant_id,
      dish_category_name: dishCategory.dish_category_name,
    }

    return tempDishCategory
  } catch (error) {
    console.error('Error saving dish category', error)
    // @ts-ignore
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(400, 'Dish category already exists')
      // @ts-ignore
    } else if (error.name === 'ValidationError') {
      throw new HttpException(400, 'Invalid dish category details')
    } else {
      throw new HttpException(500, 'Error saving dish category')
    }
  }
}

export async function updateOrderStatus(order_id: number, newStatus: OrderStatus) {
  try {
    const order = await Order.findByPk(order_id)
    if (!order) {
      throw new HttpException(404, 'Order not found')
    }
    order.order_status = newStatus
    const updatedOrder = await order.save()
    return updatedOrder
  } catch (error) {
    if (error instanceof HttpException) {
      throw error
    }
    console.error('Error updating order status', error)
    throw new HttpException(500, 'Error updating order status')
  }
}

export async function getRestaurantOrdersByStatus(
  restaurantId: number,
  status: string,
  paginationValues: PaginationValues,
): Promise<Order[]> {
  try {
    const orders = await Order.findAll({
      where: { restaurant_id: restaurantId, order_status: status },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
    })
    return orders
  } catch (error) {
    console.error('Error getting restaurant orders by status', error)
    throw new HttpException(500, 'Error getting restaurant orders by status')
  }
}

export async function getOrderByRestaurantId(
  restaurantId: number,
  paginationValues: PaginationValues,
): Promise<Order[]> {
  try {
    const orders = await Order.findAll({
      where: { restaurant_id: restaurantId },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
    })
    return orders
  } catch (error) {
    console.error('Error getting restaurant orders', error)
    throw new HttpException(500, 'Error getting restaurant orders')
  }
}

// Report functions
// Get sales report with no of completed orders and total sales, between from date to to date for a restaurant
export async function getSalesTotalReport(
  restaurantId: number,
  fromDate: Date,
  toDate: Date,
): Promise<{ total_sales: number; total_orders: number }> {
  try {
    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        order_status: OrderStatus.DELIVERED,
        order_time: {
          [Op.between]: [fromDate, toDate],
        },
      },
    })
    //@ts-ignore
    const total_sales = orders.reduce((acc, order) => acc + parseFloat(order.order_total), 0)
    return { total_sales, total_orders: orders.length }
  } catch (error) {
    console.error('Error getting sales report', error)
    throw new HttpException(500, 'Error getting sales report')
  }
}

export async function getSalesReport(
  restaurantId: number,
  fromDate: Date,
  toDate: Date,
  grouping: string,
): Promise<any> {
  try {
    const [results, metadata] = await sequelize.query(
      getReportQuery(restaurantId, fromDate, toDate, grouping),
    )

    return results
  } catch (error) {
    console.error(`Error getting ${grouping} sales report`, error)
    throw new HttpException(500, `Error getting ${grouping} sales report`)
  }
}

function getReportQuery(restaurantId: number, fromDate: Date, toDate: Date, grouping: string) {
  switch (grouping) {
    case ReportRange.DAILY:
      return `SELECT 
            DATE(O.order_time) as date, 
            SUM(O.order_total) as total_sales, 
            COUNT(*) as total_orders
            FROM \`order\` O
            WHERE O.restaurant_id = ${restaurantId}
            AND O.order_status = 'DELIVERED'
            AND O.order_time BETWEEN '${fromDate.toISOString()}' AND '${toDate.toISOString()}'
            GROUP BY DATE(O.order_time)
            ORDER BY DATE(O.order_time);
          `
    case ReportRange.WEEKLY:
      return `SELECT 
            YEAR(O.order_time) as year, 
            WEEK(O.order_time) as week, 
            SUM(O.order_total) as total_sales, 
            COUNT(*) as total_orders
            FROM \`order\` O
            WHERE O.restaurant_id = ${restaurantId}
            AND O.order_status = 'DELIVERED'
            AND O.order_time BETWEEN '${fromDate.toISOString()}' AND '${toDate.toISOString()}'
            GROUP BY YEAR(O.order_time), WEEK(O.order_time)
            ORDER BY YEAR(O.order_time), WEEK(O.order_time)
      `
    case ReportRange.MONTHLY:
      return `SELECT 
            YEAR(O.order_time) as year, 
            MONTH(O.order_time) as month, 
            SUM(O.order_total) as total_sales, 
            COUNT(*) as total_orders
            FROM \`order\` O
            WHERE O.restaurant_id = ${restaurantId}
            AND O.order_status = 'DELIVERED'
            AND O.order_time BETWEEN '${fromDate.toISOString()}' AND '${toDate.toISOString()}'
            GROUP BY YEAR(O.order_time), MONTH(O.order_time)
            ORDER BY YEAR(O.order_time), MONTH(O.order_time)
            `
    default:
      return ''
  }
}

// Get top selling items for a restaurant according to the provided criteria
export async function getTopSellingItems(restaurantId: number, criteria: string): Promise<any> {
  try {
    const [results, metadata] = await sequelize.query(getSalesQuery(restaurantId, criteria))

    return results
  } catch (error) {
    console.error(`Error getting ${criteria} based sales report`, error)
    throw new HttpException(500, `Error getting ${criteria} based sales report`)
  }
}

function getSalesQuery(restaurantId: number, criteria: string) {
  switch (criteria) {
    case SalesCriteria.ORDERS:
      return `SELECT
            DI.dish_name,
            OI.dish_id,
            COUNT(OI.order_id) AS number_of_orders,
            SUM(OI.quantity) AS total_quantity_sold
            FROM order_item OI
            JOIN \`order\` O ON OI.order_id = O.order_id
            JOIN restaurant_dish_item DI ON OI.dish_id = DI.dish_id
            WHERE O.restaurant_id = ${restaurantId} AND O.order_status = 'DELIVERED'
            GROUP BY DI.dish_name, DI.dish_id
            ORDER BY number_of_orders DESC, total_quantity_sold DESC
            LIMIT 10;
        `
    case SalesCriteria.REVENUE:
      return `SELECT
            DI.dish_name,
            OI.dish_id,
            COUNT(OI.order_id) AS number_of_orders,
            SUM(OI.quantity) AS total_quantity_sold,
            SUM(OI.line_total) AS total_revenue
            FROM order_item OI
            JOIN \`order\` O ON OI.order_id = O.order_id
            JOIN restaurant_dish_item DI ON OI.dish_id = DI.dish_id
            WHERE O.restaurant_id = ${restaurantId} AND O.order_status = 'DELIVERED'
            GROUP BY DI.dish_name, DI.dish_id
            ORDER BY total_revenue DESC, total_quantity_sold DESC
            LIMIT 10;
        `
    default:
      return ''
  }
}

// Get average order value for an order between provided dates for a restaurant
export async function getAverageOrderValue(
  restaurantId: number,
  fromDate: Date,
  toDate: Date,
): Promise<any> {
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT
        AVG(O.order_total) AS average_order_value,
        COUNT(O.order_id) AS total_orders
        FROM \`order\` O
        WHERE O.order_status = 'DELIVERED' 
        AND O.restaurant_id  = ${restaurantId}
        AND O.order_time BETWEEN '${fromDate.toISOString()}' AND '${toDate.toISOString()}'; 
        `,
    )

    return results
  } catch (error) {
    console.error(`Error getting average order value report`, error)
    throw new HttpException(500, `Error getting average order value report`)
  }
}
