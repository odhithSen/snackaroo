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
