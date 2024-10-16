import { addRestaurant, addRestaurantAdmin } from '../../src/services/admin.service'
import { Restaurant } from '../../src/models/restaurant.model'
import { RestaurantAdmin } from '../../src/models/restaurant_admin.model'
import HttpException from '../../src/models/http-exception.model'

jest.mock('../../src/models/restaurant.model') // Mock Restaurant model
jest.mock('../../src/models/restaurant_admin.model') // Mock RestaurantAdmin model

describe('Admin service: addRestaurant', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockRestaurant = {
    restaurant_id: 1,
    name: 'Restaurant Name',
    thumbnail_image_url: 'https://example',
    tag_line: 'Tag Line',
    location: 'Location',
    address: 'Address',
    contact_number: '123-456-7890',
    hygiene_rating: 5,
    notes: 'Notes',
  }

  it('should successfully add a restaurant', async () => {
    const saveMock = jest.fn().mockResolvedValue(mockRestaurant)
    Restaurant.build = jest.fn().mockReturnValue({ save: saveMock })

    const result = await addRestaurant(mockRestaurant)

    expect(Restaurant.build).toHaveBeenCalledWith(mockRestaurant)
    expect(saveMock).toHaveBeenCalled()
    expect(result).toEqual(mockRestaurant)
  })

  it('should throw an HttpException if restaurant already exists', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'SequelizeUniqueConstraintError' })
    Restaurant.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addRestaurant(mockRestaurant)).rejects.toThrow(
      new HttpException(400, 'Restaurant already exists'),
    )

    expect(Restaurant.build).toHaveBeenCalledWith(mockRestaurant)
  })

  it('should throw an HttpException for invalid restaurant details', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'ValidationError' })
    Restaurant.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addRestaurant(mockRestaurant)).rejects.toThrow(
      new HttpException(400, 'Invalid restaurant details'),
    )

    expect(Restaurant.build).toHaveBeenCalledWith(mockRestaurant)
  })

  it('should throw a 500 error for any other exception', async () => {
    const saveMock = jest.fn().mockRejectedValue(new Error('Some random error'))
    Restaurant.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addRestaurant(mockRestaurant)).rejects.toThrow(
      new HttpException(500, 'Error saving restaurant'),
    )

    expect(Restaurant.build).toHaveBeenCalledWith(mockRestaurant)
  })
})

describe('Admin service: addRestaurantAdmin', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockRestaurantAdmin = {
    restaurant_id: 1,
    user_id: 2,
  }

  it('should successfully add a restaurant admin', async () => {
    const saveMock = jest.fn().mockResolvedValue(mockRestaurantAdmin)
    RestaurantAdmin.build = jest.fn().mockReturnValue({ save: saveMock })

    const result = await addRestaurantAdmin(mockRestaurantAdmin)

    expect(RestaurantAdmin.build).toHaveBeenCalledWith(mockRestaurantAdmin)
    expect(saveMock).toHaveBeenCalled()
    expect(result).toEqual(mockRestaurantAdmin)
  })

  it('should throw an HttpException if restaurant admin already exists', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'SequelizeUniqueConstraintError' })
    RestaurantAdmin.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addRestaurantAdmin(mockRestaurantAdmin)).rejects.toThrow(
      new HttpException(400, 'Restaurant admin already exists'),
    )

    expect(RestaurantAdmin.build).toHaveBeenCalledWith(mockRestaurantAdmin)
  })

  it('should throw an HttpException for invalid restaurant admin details', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'ValidationError' })
    RestaurantAdmin.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addRestaurantAdmin(mockRestaurantAdmin)).rejects.toThrow(
      new HttpException(400, 'Invalid restaurant admin details'),
    )

    expect(RestaurantAdmin.build).toHaveBeenCalledWith(mockRestaurantAdmin)
  })

  it('should throw a 500 error for any other exception', async () => {
    const saveMock = jest.fn().mockRejectedValue(new Error('Some random error'))
    RestaurantAdmin.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addRestaurantAdmin(mockRestaurantAdmin)).rejects.toThrow(
      new HttpException(500, 'Error saving restaurant admin'),
    )

    expect(RestaurantAdmin.build).toHaveBeenCalledWith(mockRestaurantAdmin)
  })
})
