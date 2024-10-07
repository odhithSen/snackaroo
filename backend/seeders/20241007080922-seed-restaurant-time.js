'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    // Getting all restaurants from the restaurant table
    const restaurants = await queryInterface.sequelize.query(
      'SELECT restaurant_id FROM restaurant',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      },
    )

    const daysOfWeek = [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ]

    // Define the opening and closing times for the restaurants
    const openingTimes = ['08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00']
    const closingTimes = ['20:00:00', '21:00:00', '21:30:00', '22:00:00', '23:00:00']

    const restaurantTimes = []

    restaurants.forEach(restaurant => {
      daysOfWeek.forEach(day => {
        restaurantTimes.push({
          restaurant_id: restaurant.restaurant_id,
          day: day,
          opening_time: faker.helpers.arrayElement(openingTimes),
          closing_time: faker.helpers.arrayElement(closingTimes),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
    })

    await queryInterface.bulkInsert('restaurant_time', restaurantTimes, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurant_time', null, {})
  },
}
