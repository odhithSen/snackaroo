import { addReview, addOrder } from '../../src/services/user.service'
import { RestaurantReview } from '../../src/models/restaurant_review.model'
import HttpException from '../../src/models/http-exception.model'
import { Order } from '../../src/models/order.model'

jest.mock('../../src/models/restaurant_review.model')
jest.mock('../../src/models/order.model') // Mock the Order model

describe('User service: addReview', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockReview = {
    restaurant_id: 1,
    reviewer_id: 1,
    rating: 5,
    description: 'Great food',
  }

  it('should successfully add a review', async () => {
    const saveMock = jest.fn().mockResolvedValue(mockReview)
    RestaurantReview.build = jest.fn().mockReturnValue({ save: saveMock })

    const result = await addReview(mockReview)

    expect(RestaurantReview.build).toHaveBeenCalledWith(mockReview)
    expect(saveMock).toHaveBeenCalled()
    expect(result).toEqual(mockReview)
  })

  it('should throw an HTTPException if the review already exists', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'SequelizeUniqueConstraintError' })
    RestaurantReview.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addReview(mockReview)).rejects.toThrow(
      new HttpException(400, 'Review already exists'),
    )

    expect(RestaurantReview.build).toHaveBeenCalledWith(mockReview)
    expect(saveMock).toHaveBeenCalled()
  })

  it('should throw an HTTPException for invalid review', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'ValidationError' })
    RestaurantReview.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addReview(mockReview)).rejects.toThrow(new HttpException(400, 'Invalid review'))

    expect(RestaurantReview.build).toHaveBeenCalledWith(mockReview)
    expect(saveMock).toHaveBeenCalled()
  })

  it('should throw a 500 error for any other exception', async () => {
    const saveMock = jest.fn().mockRejectedValue(new Error('Some random error'))
    RestaurantReview.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addReview(mockReview)).rejects.toThrow(
      new HttpException(500, 'Error saving review'),
    )

    expect(RestaurantReview.build).toHaveBeenCalledWith(mockReview)
    expect(saveMock).toHaveBeenCalled()
  })
})

describe('User service: addOrder', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockOrder = {
    order_id: 1,
    user_id: 1,
    restaurant_id: 1,
    order_total: 1.0,
    order_time: new Date(),
    order_status: 'PENDING',
    delivery_location: 'location',
    delivery_address_line1: '123 Fake St',
    delivery_address_line2: 'Apt 1',
  }

  it('should successfully add an order', async () => {
    const saveMock = jest.fn().mockResolvedValue(mockOrder)
    Order.build = jest.fn().mockReturnValue({ save: saveMock })

    const result = await addOrder(mockOrder)

    expect(Order.build).toHaveBeenCalledWith(mockOrder)
    expect(saveMock).toHaveBeenCalled()
    expect(result).toEqual(mockOrder)
  })

  it('should throw an error if the order already exists', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'SequelizeUniqueConstraintError' })
    Order.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addOrder(mockOrder)).rejects.toThrow(
      new HttpException(400, 'Order already exists'),
    )

    expect(Order.build).toHaveBeenCalledWith(mockOrder)
    expect(saveMock).toHaveBeenCalled()
  })

  it('should throw an error for invalid order', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'ValidationError' })
    Order.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addOrder(mockOrder)).rejects.toThrow(new HttpException(400, 'Invalid order'))

    expect(Order.build).toHaveBeenCalledWith(mockOrder)
    expect(saveMock).toHaveBeenCalled()
  })

  it('should throw a 500 error for any other exception', async () => {
    const saveMock = jest.fn().mockRejectedValue(new Error('Some random error'))
    Order.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addOrder(mockOrder)).rejects.toThrow(new HttpException(500, 'Error saving order'))

    expect(Order.build).toHaveBeenCalledWith(mockOrder)
    expect(saveMock).toHaveBeenCalled()
  })
})
