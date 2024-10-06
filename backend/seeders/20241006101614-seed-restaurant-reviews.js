'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = []

    const users = await queryInterface.sequelize.query('SELECT user_id from user;')
    const restaurants = await queryInterface.sequelize.query(
      'SELECT restaurant_id from restaurant;',
    )

    const userIds = users[0].map(user => user.user_id)
    const restaurantIds = restaurants[0].map(restaurant => restaurant.restaurant_id)

    const usedPairs = new Set()

    function generateUniquePair() {
      let restaurantId, reviewerId, pair

      do {
        restaurantId = faker.helpers.arrayElement(restaurantIds)
        reviewerId = faker.helpers.arrayElement(userIds)
        pair = `${restaurantId}-${reviewerId}`
      } while (usedPairs.has(pair))

      usedPairs.add(pair)
      return { restaurantId, reviewerId }
    }

    for (let i = 0; i < 100; i++) {
      const { restaurantId, reviewerId } = generateUniquePair()

      reviews.push({
        restaurant_id: restaurantId,
        reviewer_id: reviewerId,
        rating: faker.number.int({ min: 1, max: 5 }),
        description: faker.lorem.sentences(2),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    await queryInterface.bulkInsert('restaurant_review', reviews, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurant_review', null, {})
  },
}
