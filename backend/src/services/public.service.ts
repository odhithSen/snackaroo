import HttpException from '../models/http-exception.model'
import { Restaurant, RestaurantRead } from '../models/restaurant.model'
import { RestaurantReview, RestaurantReviewCreate } from '../models/restaurant_review.model'
import { PaginationValues } from '../utils/pagination-query-validation'

export async function getRestaurantById(id: number): Promise<RestaurantRead | HttpException> {
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
): Promise<RestaurantRead[] | HttpException> {
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

// export async function getRestaurants(
//   limit: number,
//   offset: number,
// ): Promise<RestaurantRead[] | HttpException> {
//   try {
//     const restaurants = await Restaurant.findAll({
//       limit: limit,
//       offset: offset,
//     })
//     const tempRestaurants: RestaurantRead[] = restaurants.map(restaurant => {
//       return {
//         restaurant_id: restaurant.restaurant_id,
//         name: restaurant.name,
//         thumbnail_image_url: restaurant.thumbnail_image_url,
//         tag_line: restaurant.tag_line,
//         location: restaurant.location,
//         address: restaurant.address,
//         contact_number: restaurant.contact_number,
//         hygiene_rating: restaurant.hygiene_rating,
//         notes: restaurant.notes,
//       }
//     })
//     return tempRestaurants
//   } catch (error) {
//     console.error('Error getting restaurants', error)
//     throw new HttpException(500, 'Error getting restaurants')
//   }
// }

// export async function addReview(
//   review: RestaurantReviewCreate,
// ): Promise<RestaurantReview | HttpException> {
//   try {
//     const newReview = RestaurantReview.build(review)
//     return await newReview.save()
//   } catch (error) {
//     console.error('Error saving review', error)
//     // @ts-ignore
//     if (error.name === 'SequelizeUniqueConstraintError') {
//       throw new HttpException(400, 'Review already exists')
//       // @ts-ignore
//     } else if (error.name === 'ValidationError') {
//       throw new HttpException(400, 'Invalid review')
//     } else {
//       throw new HttpException(500, 'Error saving review')
//     }
//   }
// }
