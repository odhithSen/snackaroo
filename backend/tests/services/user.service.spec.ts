import {
  addReview,
  addOrder,
  addOrderItems,
  getOrderByOrderId,
  getUserOrdersByStatus,
  getOrderByUserId,
} from '../../src/services/user.service'
import { RestaurantReview } from '../../src/models/restaurant_review.model'
import HttpException from '../../src/models/http-exception.model'
import { Order } from '../../src/models/order.model'
import { OrderItem } from '../../src/models/order_item.model'
import { de } from '@faker-js/faker'

jest.mock('../../src/models/restaurant_review.model')
jest.mock('../../src/models/order.model')
jest.mock('../../src/models/order_item.model')

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

  it('should throw a HTTPException if the order already exists', async () => {
    const saveMock = jest.fn().mockRejectedValue({ name: 'SequelizeUniqueConstraintError' })
    Order.build = jest.fn().mockReturnValue({ save: saveMock })

    await expect(addOrder(mockOrder)).rejects.toThrow(
      new HttpException(400, 'Order already exists'),
    )

    expect(Order.build).toHaveBeenCalledWith(mockOrder)
    expect(saveMock).toHaveBeenCalled()
  })

  it('should throw a HTTPException for invalid order', async () => {
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

describe('User service: addOrderItems', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockOrderItems = [
    {
      order_id: 1,
      dish_id: 1,
      quantity: 1,
      line_total: 5,
    },
    {
      order_id: 1,
      dish_id: 2,
      quantity: 2,
      line_total: 6,
    },
  ]

  it('should successfully add all of the order items', async () => {
    const bulkCreateMock = jest.fn().mockResolvedValue(mockOrderItems)
    OrderItem.bulkCreate = bulkCreateMock

    const result = await addOrderItems(mockOrderItems)

    expect(OrderItem.bulkCreate).toHaveBeenCalledWith(mockOrderItems)
    expect(result).toEqual(mockOrderItems)
  })

  it('should throw an error if order items already exist', async () => {
    const bulkCreateMock = jest.fn().mockRejectedValue({ name: 'SequelizeUniqueConstraintError' })
    OrderItem.bulkCreate = bulkCreateMock

    await expect(addOrderItems(mockOrderItems)).rejects.toThrow(
      new HttpException(400, 'Order items already exist'),
    )

    expect(OrderItem.bulkCreate).toHaveBeenCalledWith(mockOrderItems)
  })

  it('should throw an error for invalid order items', async () => {
    const bulkCreateMock = jest.fn().mockRejectedValue({ name: 'ValidationError' })
    OrderItem.bulkCreate = bulkCreateMock

    await expect(addOrderItems(mockOrderItems)).rejects.toThrow(
      new HttpException(400, 'Invalid order items'),
    )

    expect(OrderItem.bulkCreate).toHaveBeenCalledWith(mockOrderItems)
  })

  it('should throw a 500 error for any other exception', async () => {
    const bulkCreateMock = jest.fn().mockRejectedValue(new Error('Some random error'))
    OrderItem.bulkCreate = bulkCreateMock

    await expect(addOrderItems(mockOrderItems)).rejects.toThrowError(
      new HttpException(500, 'Error saving order items'),
    )

    expect(OrderItem.bulkCreate).toHaveBeenCalledWith(mockOrderItems)
  })
})

describe('User service: getOrderByOrderId', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockOrder = {
    order_id: 1,
    user_id: 1,
    restaurant_id: 1,
    order_total: 25,
    order_time: new Date(),
    order_status: 'PENDING',
    delivery_location: 'home',
    delivery_address_line1: '123 Fake St',
    delivery_address_line2: 'Apt 1',
  }

  it('should return the order details when found', async () => {
    Order.findByPk = jest.fn().mockResolvedValue(mockOrder)

    const result = await getOrderByOrderId(1)

    expect(Order.findByPk).toHaveBeenCalledWith(1)
    expect(result).toEqual(mockOrder)
  })

  it('should throw a HTTPException (404) if the order is not found', async () => {
    Order.findByPk = jest.fn().mockResolvedValue(null)

    await expect(getOrderByOrderId(1)).rejects.toThrow(new HttpException(404, 'Order not found'))

    expect(Order.findByPk).toHaveBeenCalledWith(1)
  })

  it('should throw a 500 error if any other error occurs', async () => {
    Order.findByPk = jest.fn().mockRejectedValue(new Error('Database error'))

    await expect(getOrderByOrderId(1)).rejects.toThrow(
      new HttpException(500, 'Error getting order details'),
    )

    expect(Order.findByPk).toHaveBeenCalledWith(1)
  })
})

describe('User service: getUserOrdersByStatus', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockOrders = [
    {
      order_id: 1,
      user_id: 1,
      restaurant_id: 1,
      order_total: 25,
      order_time: new Date(),
      order_status: 'PENDING',
      delivery_location: 'home',
      delivery_address_line1: '123 Fake St',
      delivery_address_line2: 'Apt 1',
    },
    {
      order_id: 2,
      user_id: 1,
      restaurant_id: 1,
      order_total: 25,
      order_time: new Date(),
      order_status: 'PENDING',
      delivery_location: 'home',
      delivery_address_line1: '123 Fake St',
      delivery_address_line2: 'Apt 1',
    },
  ]

  const paginationValues = {
    page: 1,
    limit: 10,
  }

  it('should successfully return user orders by status', async () => {
    const findAllMock = jest.fn().mockResolvedValue(mockOrders)
    Order.findAll = findAllMock

    const result = await getUserOrdersByStatus(1, 'PENDING', paginationValues)

    expect(Order.findAll).toHaveBeenCalledWith({
      where: { user_id: 1, order_status: 'PENDING' },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
      order: [['order_date', 'DESC']],
    })

    expect(result).toEqual(mockOrders)
  })

  it('should return an empty array if no orders are found', async () => {
    const findAllMock = jest.fn().mockResolvedValue([])
    Order.findAll = findAllMock

    const result = await getUserOrdersByStatus(1, 'COMPLETED', paginationValues)

    expect(Order.findAll).toHaveBeenCalledWith({
      where: { user_id: 1, order_status: 'COMPLETED' },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
      order: [['order_date', 'DESC']],
    })

    expect(result).toEqual([])
  })

  it('should throw a 500 error when there is an internal error', async () => {
    const findAllMock = jest.fn().mockRejectedValue(new Error('Internal error'))
    Order.findAll = findAllMock

    await expect(getUserOrdersByStatus(1, 'PENDING', paginationValues)).rejects.toThrow(
      new HttpException(500, 'Error getting user orders by status'),
    )

    expect(Order.findAll).toHaveBeenCalledWith({
      where: { user_id: 1, order_status: 'PENDING' },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
      order: [['order_date', 'DESC']],
    })
  })
})

// new test
describe('User service: getOrderByUserId', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockOrders = [
    {
      order_id: 1,
      user_id: 1,
      restaurant_id: 1,
      order_total: 25,
      order_time: new Date(),
      order_status: 'PENDING',
      delivery_location: 'home',
      delivery_address_line1: '123 Fake St',
      delivery_address_line2: 'Apt 1',
    },
    {
      order_id: 2,
      user_id: 1,
      restaurant_id: 1,
      order_total: 25,
      order_time: new Date(),
      order_status: 'PENDING',
      delivery_location: 'home',
      delivery_address_line1: '123 Fake St',
      delivery_address_line2: 'Apt 1',
    },
  ]

  const paginationValues = {
    page: 1,
    limit: 10,
  }

  it('should successfully return user orders', async () => {
    const findAllMock = jest.fn().mockResolvedValue(mockOrders)
    Order.findAll = findAllMock

    const result = await getOrderByUserId(1, paginationValues)

    expect(Order.findAll).toHaveBeenCalledWith({
      where: { user_id: 1 },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
    })

    expect(result).toEqual(mockOrders)
  })

  it('should return an empty array if no orders are found', async () => {
    const findAllMock = jest.fn().mockResolvedValue([])
    Order.findAll = findAllMock

    const result = await getOrderByUserId(1, paginationValues)

    expect(Order.findAll).toHaveBeenCalledWith({
      where: { user_id: 1 },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
    })

    expect(result).toEqual([])
  })

  it('should throw a 500 error when there is an internal error', async () => {
    const findAllMock = jest.fn().mockRejectedValue(new Error('Internal error'))
    Order.findAll = findAllMock

    await expect(getOrderByUserId(1, paginationValues)).rejects.toThrow(
      new HttpException(500, 'Error getting user orders'),
    )

    expect(Order.findAll).toHaveBeenCalledWith({
      where: { user_id: 1 },
      limit: paginationValues.limit,
      offset: (paginationValues.page - 1) * paginationValues.limit,
    })
  })
})
