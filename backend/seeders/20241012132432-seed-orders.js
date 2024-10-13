'use strict'

const { faker } = require('@faker-js/faker')
const { Op } = require('sequelize')

module.exports = {
  async up(queryInterface, Sequelize) {
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

    const orderStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']

    const orders = []
    const orderItems = []

    users.forEach(user => {
      restaurants.forEach(restaurant => {
        const restaurantDishes = dishes.filter(
          dish => dish.restaurant_id === restaurant.restaurant_id,
        )

        const selectedDishes = faker.helpers.arrayElements(
          restaurantDishes,
          faker.number.int({ min: 1, max: 3 }),
        )

        const temp_order_items = []
        const orderTotal = selectedDishes.reduce((sum, dish) => {
          const quantity = faker.number.int({ min: 1, max: 5 })
          const lineTotal = parseFloat(dish.base_price) * quantity
          temp_order_items.push({
            order_id: null, // Placeholder, to be updated with order_id later
            dish_id: dish.dish_id,
            quantity,
            line_total: lineTotal,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          return sum + lineTotal
        }, 0)
        orderItems.push(temp_order_items)

        const orderData = {
          order_id: 0,
          user_id: user.user_id,
          restaurant_id: restaurant.restaurant_id,
          order_total: orderTotal.toFixed(2),
          order_time: faker.date.between({
            from: '2023-01-01T00:00:00.000Z',
            to: '2024-10-10T00:00:00.000Z',
          }),
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

    const insertedOrderIds = await queryInterface.sequelize.query(
      'SELECT order_id FROM `snackaroo-db`.order',
      {
        type: Sequelize.QueryTypes.SELECT,
      },
    )

    for (let i = 0; i < insertedOrderIds.length; i++) {
      orderItems[i].forEach(orderItem => {
        orderItem.order_id = insertedOrderIds[i].order_id
      })
    }

    await queryInterface.bulkInsert('order_item', orderItems.flat())
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_item', { order_id: { [Op.gte]: 500000 } }, {})
    await queryInterface.bulkDelete('order', { order_id: { [Op.gte]: 500000 } }, {})
  },
}
