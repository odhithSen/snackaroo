'use strict'

const { faker } = require('@faker-js/faker')
const { Op } = require('sequelize')

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all users and restaurants
    const users = await queryInterface.sequelize.query(`SELECT user_id FROM user`, {
      type: Sequelize.QueryTypes.SELECT,
    })

    const restaurants = await queryInterface.sequelize.query(
      `SELECT restaurant_id FROM restaurant`,
      { type: Sequelize.QueryTypes.SELECT },
    )

    const dishes = await queryInterface.sequelize.query(
      `SELECT dish_id, restaurant_id, base_price FROM restaurant_dish_item`,
      { type: Sequelize.QueryTypes.SELECT },
    )

    // Possible order statuses
    const orderStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']

    // Create an array to store all orders and order items
    const orders = []
    const orderItems = []

    // For each user, create an order for each restaurant
    users.forEach(user => {
      restaurants.forEach(restaurant => {
        // Get dishes for this restaurant
        const restaurantDishes = dishes.filter(
          dish => dish.restaurant_id === restaurant.restaurant_id,
        )

        // Pick 1-3 random dishes from the restaurant
        const selectedDishes = faker.helpers.arrayElements(
          restaurantDishes,
          faker.number.int({ min: 1, max: 3 }),
        )

        // Generate order data
        const orderTotal = selectedDishes.reduce((sum, dish) => {
          const quantity = faker.number.int({ min: 1, max: 5 })
          const lineTotal = parseFloat(dish.base_price) * quantity
          orderItems.push({
            order_id: null, // Placeholder, to be updated with order_id later
            dish_id: dish.dish_id,
            quantity,
            line_total: lineTotal,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          return sum + lineTotal
        }, 0)

        const orderData = {
          order_id: 0,
          user_id: user.user_id,
          restaurant_id: restaurant.restaurant_id,
          order_total: orderTotal.toFixed(2),
          order_time: faker.date.recent(300),
          order_status: faker.helpers.arrayElement(orderStatuses),
          delivery_location: faker.location.nearbyGPSCoordinate().join(','),
          delivery_address_line1: faker.location.streetAddress(),
          delivery_address_line2: faker.location.county(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        orders.push(orderData)
      })
    })

    await queryInterface.bulkInsert('order', orders)
    console.log('orders inserted')

    const insertedOrderIds = await queryInterface.sequelize.query(
      'SELECT order_id FROM `snackaroo-db`.order',
      {
        type: Sequelize.QueryTypes.SELECT,
      },
    )

    console.log('insertedOrderIds', insertedOrderIds[1])

    insertedOrderIds.forEach((order, index) => {
      const startIdx = (index * orderItems.length) / insertedOrderIds.length
      const endIdx = startIdx + orderItems.length / insertedOrderIds.length
      for (let i = startIdx; i < endIdx; i++) {
        orderItems[i].order_id = order.order_id
      }
    })

    console.log('orderItems', orderItems[0])

    await queryInterface.bulkInsert('order_item', orderItems)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_item', { order_id: { [Op.gte]: 500000 } }, {})
    await queryInterface.bulkDelete('order', { order_id: { [Op.gte]: 500000 } }, {})
  },
}
