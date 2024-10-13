import HttpException from '../models/http-exception.model'
import { Restaurant, RestaurantCreate } from '../models/restaurant.model'
import { RestaurantAdmin, RestaurantAdminCreate } from '../models/restaurant_admin.model'

export async function addRestaurant(restaurant: RestaurantCreate): Promise<Restaurant> {
  try {
    const newRestaurant = Restaurant.build(restaurant)
    return await newRestaurant.save()
  } catch (error) {
    console.error('Error saving restaurant', error)
    // @ts-ignore
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(400, 'Restaurant already exists')
      // @ts-ignore
    } else if (error.name === 'ValidationError') {
      throw new HttpException(400, 'Invalid restaurant details')
    } else {
      throw new HttpException(500, 'Error saving restaurant')
    }
  }
}

export async function addRestaurantAdmin(
  restaurantAdmin: RestaurantAdminCreate,
): Promise<RestaurantAdmin> {
  try {
    const newRestaurantAdmin = RestaurantAdmin.build(restaurantAdmin)
    return await newRestaurantAdmin.save()
  } catch (error) {
    console.error('Error saving restaurant admin', error)
    // @ts-ignore
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(400, 'Restaurant admin already exists')
      // @ts-ignore
    } else if (error.name === 'ValidationError') {
      throw new HttpException(400, 'Invalid restaurant admin details')
    } else {
      throw new HttpException(500, 'Error saving restaurant admin')
    }
  }
}
