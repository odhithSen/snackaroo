import { sequelize } from '../models'
import HttpException from '../models/http-exception.model'
import { RestaurantDishItem, RestaurantDishItemRead } from '../models/restaurant-dish-item.model'
import { Restaurant, RestaurantRead } from '../models/restaurant.model'
import {
  RestaurantDishCategory,
  RestaurantDishCategoryRead,
} from '../models/restaurant_dish_category.model'
import { PaginationValues } from '../utils/pagination-query-validation'

export async function getRestaurantById(id: number): Promise<RestaurantRead> {
  try {
    const restaurant = await Restaurant.findByPk(id)
    if (restaurant === null) {
      console.log('Restaurant not found')
      throw new HttpException(404, 'Restaurant not found')
    }
    const tempRestaurant: RestaurantRead = {
      restaurant_id: restaurant.restaurant_id,
      name: restaurant.name,
      thumbnail_image_url: restaurant.thumbnail_image_url,
      tag_line: restaurant.tag_line,
      location: restaurant.location,
      address: restaurant.address,
      contact_number: restaurant.contact_number,
      hygiene_rating: restaurant.hygiene_rating,
      notes: restaurant.notes,
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

export async function getRestaurants(
  paginationValues: PaginationValues,
): Promise<RestaurantRead[]> {
  try {
    const restaurants = await Restaurant.findAll({
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
    })

    const tempRestaurants: RestaurantRead[] = restaurants.map(restaurant => {
      return {
        restaurant_id: restaurant.restaurant_id,
        name: restaurant.name,
        thumbnail_image_url: restaurant.thumbnail_image_url,
        tag_line: restaurant.tag_line,
        location: restaurant.location,
        address: restaurant.address,
        contact_number: restaurant.contact_number,
        hygiene_rating: restaurant.hygiene_rating,
        notes: restaurant.notes,
      }
    })
    return tempRestaurants
  } catch (error) {
    console.error('Error getting restaurants', error)
    throw new HttpException(500, 'Error getting restaurants')
  }
}

export async function getDishesByRestaurantId(
  id: number,
  paginationValues: PaginationValues,
): Promise<RestaurantDishItemRead[]> {
  try {
    const restaurant = await Restaurant.findByPk(id)
    if (restaurant === null) {
      console.log('Restaurant not found')
      throw new HttpException(404, 'Restaurant not found')
    }
    const dishes = await RestaurantDishItem.findAll({
      where: { restaurant_id: id },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
    })
    if (dishes.length === 0) {
      console.log('Dishes not found')
      throw new HttpException(404, 'Dishes not found for the restaurant')
    }
    const tempDishes: RestaurantDishItemRead[] = dishes.map(dish => {
      return {
        dish_id: dish.dish_id,
        restaurant_id: dish.restaurant_id,
        dish_category_id: dish.dish_category_id,
        thumbnail_image_url: dish.thumbnail_image_url,
        dish_name: dish.dish_name,
        dish_description: dish.dish_description,
        calories: dish.calories,
        base_price: dish.base_price,
        ingredients: dish.ingredients,
      }
    })

    return tempDishes
  } catch (error) {
    if (error instanceof HttpException) {
      throw error
    }
    console.error('Error getting dishes', error)
    throw new HttpException(500, 'Error getting dishes')
  }
}

export async function getDishesByCategory(
  id: number,
  paginationValues: PaginationValues,
  category: string,
): Promise<RestaurantDishItemRead[]> {
  try {
    const restaurant = await Restaurant.findByPk(id)
    if (restaurant === null) {
      console.log('Restaurant not found')
      throw new HttpException(404, 'Restaurant not found')
    }
    const dishCategory = await RestaurantDishCategory.findOne({
      where: { restaurant_id: id, dish_category_name: category },
    })
    if (dishCategory === null) {
      console.log('Dish category not found')
      throw new HttpException(404, 'Dish category not found for the restaurant')
    }
    const dishes = await RestaurantDishItem.findAll({
      where: { restaurant_id: id, dish_category_id: dishCategory.dish_category_id },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
    })
    if (dishes.length === 0) {
      console.log('Dishes not found')
      throw new HttpException(404, 'Dishes not found for the category')
    }
    const tempDishes: RestaurantDishItemRead[] = dishes.map(dish => {
      return {
        dish_id: dish.dish_id,
        restaurant_id: dish.restaurant_id,
        dish_category_id: dish.dish_category_id,
        thumbnail_image_url: dish.thumbnail_image_url,
        dish_name: dish.dish_name,
        dish_description: dish.dish_description,
        calories: dish.calories,
        base_price: dish.base_price,
        ingredients: dish.ingredients,
      }
    })

    return tempDishes
  } catch (error) {
    if (error instanceof HttpException) {
      throw error
    }
    console.error('Error getting dishes by category', error)
    throw new HttpException(500, 'Error getting dishes by category')
  }
}

export async function getDishByDishId(dishId: number): Promise<RestaurantDishItemRead> {
  try {
    const dish = await RestaurantDishItem.findByPk(dishId)
    if (dish === null) {
      console.log('Dish not found')
      throw new HttpException(404, 'Dish not found')
    }
    const tempDish: RestaurantDishItemRead = {
      dish_id: dish.dish_id,
      restaurant_id: dish.restaurant_id,
      dish_category_id: dish.dish_category_id,
      thumbnail_image_url: dish.thumbnail_image_url,
      dish_name: dish.dish_name,
      dish_description: dish.dish_description,
      calories: dish.calories,
      base_price: dish.base_price,
      ingredients: dish.ingredients,
    }
    return tempDish
  } catch (error) {
    if (error instanceof HttpException) {
      throw error
    }
    console.error('Error getting dish', error)
    throw new HttpException(500, 'Error getting dish')
  }
}

export async function getDishCategoriesByRestaurantId(
  restaurantId: number,
): Promise<RestaurantDishCategoryRead[]> {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId)
    if (restaurant === null) {
      console.log('Restaurant not found')
      throw new HttpException(404, 'Restaurant not found')
    }
    const dishCategories = await RestaurantDishCategory.findAll({
      where: { restaurant_id: restaurantId },
    })
    if (dishCategories.length === 0) {
      console.log('Dish categories not found')
      throw new HttpException(404, 'Dish categories not found for the restaurant')
    }
    const tempDishCategories: RestaurantDishCategoryRead[] = dishCategories.map(dishCategory => {
      return {
        dish_category_id: dishCategory.dish_category_id,
        restaurant_id: dishCategory.restaurant_id,
        dish_category_name: dishCategory.dish_category_name,
      }
    })

    return tempDishCategories
  } catch (error) {
    if (error instanceof HttpException) {
      throw error
    }
    console.error('Error getting dish categories', error)
    throw new HttpException(500, 'Error getting dish categories')
  }
}

export interface UserReview {
  id: string
  rating: number
  description: string
  created_at: string
  user: {
    user_id: number
    first_name: string
    last_name: string
    profile_picture_url?: string
  }
}

export async function getReviewsByRestaurantId(
  restaurantId: number,
  paginationValues: PaginationValues,
): Promise<UserReview[]> {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId)
    if (restaurant === null) {
      console.log('Restaurant not found')
      throw new HttpException(404, 'Restaurant not found')
    }

    const [results, metadata] = await sequelize.query(
      `SELECT CONCAT(RW.restaurant_id, RW.reviewer_id) as id, RW.rating, RW.description, RW.createdAt, 
      U.user_id, U.first_name, U.last_name, U.profile_picture_url 
      FROM restaurant_review RW JOIN user U ON RW.reviewer_id = U.user_id
      WHERE RW.restaurant_id = ${restaurantId} 
      LIMIT ${paginationValues.limit}
      OFFSET ${(paginationValues.page - 1) * paginationValues.limit}`,
    )

    const reviews: UserReview[] = results.map((review: any) => {
      return {
        id: review.id,
        rating: review.rating,
        description: review.description,
        created_at: review.createdAt,
        user: {
          user_id: review.user_id,
          first_name: review.first_name,
          last_name: review.last_name,
          profile_picture_url: review.profile_picture_url,
        },
      }
    })

    if (reviews.length === 0) {
      console.log('Reviews not found')
      throw new HttpException(404, 'Reviews not found for the restaurant')
    }

    return reviews
  } catch (error) {
    if (error instanceof HttpException) {
      throw error
    }
    console.error('Error getting reviews', error)
    throw new HttpException(500, 'Error getting reviews')
  }
}

export interface ReviewsMetadata {
  review_count: number
  average_rating: number
}

export async function getReviewsMetadataByRestaurantId(
  restaurantId: number,
): Promise<ReviewsMetadata> {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId)
    if (restaurant === null) {
      console.log('Restaurant not found')
      throw new HttpException(404, 'Restaurant not found')
    }

    const [results, metadata]: [any[], any] = await sequelize.query(
      `SELECT COUNT(*) as review_count, AVG(rating) as average_rating
      FROM restaurant_review RW
      WHERE RW.restaurant_id = ${restaurantId} 
    `,
    )

    let reviewsMetadata: ReviewsMetadata
    if (results.length === 0) {
      reviewsMetadata = {
        review_count: 0,
        average_rating: 0,
      }
      return reviewsMetadata
    }
    reviewsMetadata = {
      review_count: results[0].review_count,
      average_rating: parseFloat(results[0].average_rating),
    }

    return reviewsMetadata
  } catch (error) {
    if (error instanceof HttpException) {
      throw error
    }
    console.error('Error getting reviews metadata', error)
    throw new HttpException(500, 'Error getting reviews metadata')
  }
}
