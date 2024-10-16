import {
  getRestaurantById,
  // getRestaurants,
  // getDishesByRestaurantId,
  // getDishesByCategory,
} from '../../src/services/public.service'
import { Restaurant } from '../../src/models/restaurant.model'
// import { RestaurantDishItem } from '../../src/models/restaurant-dish-item.model'
// import { RestaurantDishCategory } from '../../src/models/restaurant_dish_category.model'
import HttpException from '../../src/models/http-exception.model'

jest.mock('../../src/models/restaurant.model')

// jest.mock('../../src/models/restaurant-dish-item.model')

// jest.mock('../../src/models/restaurant_dish_category.model')

describe('Public service: getRestaurantById', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockRestaurant = {
    restaurant_id: 1,
    name: 'Test Restaurant',
    thumbnail_image_url: 'test-url.jpg',
    tag_line: 'Test Tagline',
    location: 'Test Location',
    address: '123 Test Street',
    contact_number: '123-456-7890',
    hygiene_rating: 4.5,
    notes: 'Test Notes',
  }

  it('should successfully return a restaurant by id', async () => {
    const findByPkMock = jest.fn().mockResolvedValue(mockRestaurant)
    Restaurant.findByPk = findByPkMock

    const result = await getRestaurantById(1)

    expect(Restaurant.findByPk).toHaveBeenCalledWith(1)
    expect(result).toEqual(mockRestaurant)
  })

  // it('should throw a HttpException if the restaurant is not found', async () => {
  //   const findByPkMock = jest.fn().mockResolvedValue(null)
  //   Restaurant.findByPk = findByPkMock

  //   await expect(getRestaurantById(1)).rejects.toThrow(
  //     new HttpException(404, 'Restaurant not found'),
  //   )

  //   expect(Restaurant.findByPk).toHaveBeenCalledWith(1)
  // })

  // it('should throw a 500 error if there is an internal error', async () => {
  //   const findByPkMock = jest.fn().mockRejectedValue(new Error('Internal error'))
  //   Restaurant.findByPk = findByPkMock

  //   await expect(getRestaurantById(1)).rejects.toThrow(
  //     new HttpException(500, 'Error getting restaurant'),
  //   )

  //   expect(Restaurant.findByPk).toHaveBeenCalledWith(1)
  // })
})

// describe('Public service: getRestaurants', () => {
//   afterEach(() => {
//     jest.clearAllMocks()
//   })

//   const mockRestaurants = [
//     {
//       restaurant_id: 1,
//       name: 'Restaurant 1',
//       thumbnail_image_url: 'url1.jpg',
//       tag_line: 'Tagline 1',
//       location: 'Location 1',
//       address: 'Address 1',
//       contact_number: '1234567890',
//       hygiene_rating: 4.0,
//       notes: 'Notes 1',
//     },
//     {
//       restaurant_id: 2,
//       name: 'Restaurant 2',
//       thumbnail_image_url: 'url2.jpg',
//       tag_line: 'Tagline 2',
//       location: 'Location 2',
//       address: 'Address 2',
//       contact_number: '0987654321',
//       hygiene_rating: 4.5,
//       notes: 'Notes 2',
//     },
//   ]

//   const paginationValues = { limit: 10, page: 1 }

//   it('should successfully return a list of restaurants', async () => {
//     const findAllMock = jest.fn().mockResolvedValue(mockRestaurants)
//     Restaurant.findAll = findAllMock

//     const result = await getRestaurants(paginationValues)

//     expect(Restaurant.findAll).toHaveBeenCalledWith({
//       limit: paginationValues.limit,
//       offset: (paginationValues.page - 1) * paginationValues.limit,
//     })
//     expect(result).toEqual(mockRestaurants)
//   })

//   it('should throw a 500 error if there is an internal error', async () => {
//     const findAllMock = jest.fn().mockRejectedValue(new Error('Internal error'))
//     Restaurant.findAll = findAllMock

//     await expect(getRestaurants(paginationValues)).rejects.toThrow(
//       new HttpException(500, 'Error getting restaurants'),
//     )

//     expect(Restaurant.findAll).toHaveBeenCalledWith({
//       limit: paginationValues.limit,
//       offset: (paginationValues.page - 1) * paginationValues.limit,
//     })
//   })
// })

// describe('Public service: getDishesByRestaurantId', () => {
//   afterEach(() => {
//     jest.clearAllMocks()
//   })

//   const mockDishes = [
//     {
//       dish_id: 1,
//       restaurant_id: 1,
//       dish_category_id: 1,
//       thumbnail_image_url: 'url1.jpg',
//       dish_name: 'Dish 1',
//       dish_description: 'Description 1',
//       calories: 500,
//       base_price: 10,
//       ingredients: 'Ingredients 1',
//     },
//     {
//       dish_id: 2,
//       restaurant_id: 1,
//       dish_category_id: 2,
//       thumbnail_image_url: 'url2.jpg',
//       dish_name: 'Dish 2',
//       dish_description: 'Description 2',
//       calories: 600,
//       base_price: 15,
//       ingredients: 'Ingredients 2',
//     },
//   ]

//   const paginationValues = { limit: 10, page: 1 }

//   it('should successfully return a list of dishes for a restaurant', async () => {
//     const findAllMock = jest.fn().mockResolvedValue(mockDishes)
//     const findByPkMock = jest.fn().mockResolvedValue({ restaurant_id: 1 })
//     RestaurantDishItem.findAll = findAllMock
//     Restaurant.findByPk = findByPkMock

//     const result = await getDishesByRestaurantId(1, paginationValues)

//     expect(Restaurant.findByPk).toHaveBeenCalledWith(1)
//     expect(RestaurantDishItem.findAll).toHaveBeenCalledWith({
//       where: { restaurant_id: 1 },
//       limit: paginationValues.limit,
//       offset: (paginationValues.page - 1) * paginationValues.limit,
//     })
//     expect(result).toEqual(mockDishes)
//   })

//   it('should throw a 404 error if restaurant is not found', async () => {
//     const findByPkMock = jest.fn().mockResolvedValue(null)
//     Restaurant.findByPk = findByPkMock

//     await expect(getDishesByRestaurantId(1, paginationValues)).rejects.toThrowError(
//       new HttpException(404, 'Restaurant not found'),
//     )

//     expect(Restaurant.findByPk).toHaveBeenCalledWith(1)
//   })

//   it('should throw a 404 error if no dishes are found', async () => {
//     const findByPkMock = jest.fn().mockResolvedValue({ restaurant_id: 1 })
//     const findAllMock = jest.fn().mockResolvedValue([])
//     Restaurant.findByPk = findByPkMock
//     RestaurantDishItem.findAll = findAllMock

//     await expect(getDishesByRestaurantId(1, paginationValues)).rejects.toThrowError(
//       new HttpException(404, 'Dishes not found for the restaurant'),
//     )

//     expect(RestaurantDishItem.findAll).toHaveBeenCalledWith({
//       where: { restaurant_id: 1 },
//       limit: paginationValues.limit,
//       offset: (paginationValues.page - 1) * paginationValues.limit,
//     })
//   })

//   it('should throw a 500 error if there is an internal error', async () => {
//     const findAllMock = jest.fn().mockRejectedValue(new Error('Internal error'))
//     RestaurantDishItem.findAll = findAllMock

//     await expect(getDishesByRestaurantId(1, paginationValues)).rejects.toThrowError(
//       new HttpException(500, 'Error getting dishes'),
//     )

//     expect(RestaurantDishItem.findAll).toHaveBeenCalledWith({
//       where: { restaurant_id: 1 },
//       limit: paginationValues.limit,
//       offset: (paginationValues.page - 1) * paginationValues.limit,
//     })
//   })
// })

// describe('Public service: getDishesByCategory', () => {
//   afterEach(() => {
//     jest.clearAllMocks()
//   })

//   const mockDishes = [
//     {
//       dish_id: 1,
//       restaurant_id: 1,
//       dish_category_id: 1,
//       thumbnail_image_url: 'url1.jpg',
//       dish_name: 'Dish 1',
//       dish_description: 'Description 1',
//       calories: 500,
//       base_price: 10,
//       ingredients: 'Ingredients 1',
//     },
//   ]

//   const mockDishCategory = { dish_category_id: 1, dish_category_name: 'Category 1' }
//   const paginationValues = { limit: 10, page: 1 }

//   it('should successfully return dishes by category for a restaurant', async () => {
//     const findByPkMock = jest.fn().mockResolvedValue({ restaurant_id: 1 })
//     const findCategoryMock = jest.fn().mockResolvedValue(mockDishCategory)
//     const findAllMock = jest.fn().mockResolvedValue(mockDishes)
//     Restaurant.findByPk = findByPkMock
//     RestaurantDishCategory.findOne = findCategoryMock
//     RestaurantDishItem.findAll = findAllMock

//     const result = await getDishesByCategory(1, paginationValues, 'Category 1')

//     expect(Restaurant.findByPk).toHaveBeenCalledWith(1)
//     expect(RestaurantDishCategory.findOne).toHaveBeenCalledWith({
//       where: { restaurant_id: 1, dish_category_name: 'Category 1' },
//     })
//     expect(RestaurantDishItem.findAll).toHaveBeenCalledWith({
//       where: { restaurant_id: 1, dish_category_id: 1 },
//       limit: paginationValues.limit,
//       offset: (paginationValues.page - 1) * paginationValues.limit,
//     })
//     expect(result).toEqual(mockDishes)
//   })

//   it('should throw a 404 error if restaurant is not found', async () => {
//     const findByPkMock = jest.fn().mockResolvedValue(null)
//     Restaurant.findByPk = findByPkMock

//     await expect(getDishesByCategory(1, paginationValues, 'Category 1')).rejects.toThrowError(
//       new HttpException(404, 'Restaurant not found'),
//     )

//     expect(Restaurant.findByPk).toHaveBeenCalledWith(1)
//   })

//   it('should throw a 404 error if dish category is not found', async () => {
//     const findByPkMock = jest.fn().mockResolvedValue({ restaurant_id: 1 })
//     const findCategoryMock = jest.fn().mockResolvedValue(null)
//     Restaurant.findByPk = findByPkMock
//     RestaurantDishCategory.findOne = findCategoryMock

//     await expect(getDishesByCategory(1, paginationValues, 'Category 1')).rejects.toThrowError(
//       new HttpException(404, 'Dish category not found for the restaurant'),
//     )

//     expect(RestaurantDishCategory.findOne).toHaveBeenCalledWith({
//       where: { restaurant_id: 1, dish_category_name: 'Category 1' },
//     })
//   })

//   it('should throw a 404 error if no dishes are found for the category', async () => {
//     const findByPkMock = jest.fn().mockResolvedValue({ restaurant_id: 1 })
//     const findCategoryMock = jest.fn().mockResolvedValue(mockDishCategory)
//     const findAllMock = jest.fn().mockResolvedValue([])
//     Restaurant.findByPk = findByPkMock
//     RestaurantDishCategory.findOne = findCategoryMock
//     RestaurantDishItem.findAll = findAllMock

//     await expect(getDishesByCategory(1, paginationValues, 'Category 1')).rejects.toThrowError(
//       new HttpException(404, 'Dishes not found for the category'),
//     )

//     expect(RestaurantDishItem.findAll).toHaveBeenCalledWith({
//       where: { restaurant_id: 1, dish_category_id: 1 },
//       limit: paginationValues.limit,
//       offset: (paginationValues.page - 1) * paginationValues.limit,
//     })
//   })

//   it('should throw a 500 error if there is an internal error', async () => {
//     const findAllMock = jest.fn().mockRejectedValue(new Error('Internal error'))
//     RestaurantDishItem.findAll = findAllMock

//     await expect(getDishesByCategory(1, paginationValues, 'Category 1')).rejects.toThrowError(
//       new HttpException(500, 'Error getting dishes'),
//     )

//     expect(RestaurantDishItem.findAll).toHaveBeenCalledWith({
//       where: { restaurant_id: 1, dish_category_id: 1 },
//       limit: paginationValues.limit,
//       offset: (paginationValues.page - 1) * paginationValues.limit,
//     })
//   })
// })
