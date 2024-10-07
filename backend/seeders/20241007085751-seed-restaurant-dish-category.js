'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Taking all restaurant IDs from the 'restaurant' table
    const restaurants = await queryInterface.sequelize.query(
      `SELECT restaurant_id FROM restaurant;`,
    )

    const restaurantIds = restaurants[0]

    // Dish category names
    const dishCategoryNames = [
      'Appetizers',
      'Main Course',
      'Desserts',
      'Beverages',
      'Salads',
      'Soups',
      'Snacks',
      'Grilled',
      'Pasta',
      'Burgers',
    ]

    const dishCategories = []

    restaurantIds.forEach(restaurant => {
      const shuffledCategories = faker.helpers.shuffle(dishCategoryNames)
      const assignedCategories = new Set()

      assignedCategories.add(shuffledCategories[0])
      const additionalCategories = faker.number.int({ min: 1, max: 3 })

      for (let i = 1; i <= additionalCategories; i++) {
        assignedCategories.add(shuffledCategories[i])
      }

      assignedCategories.forEach(category => {
        dishCategories.push({
          restaurant_id: restaurant.restaurant_id,
          dish_category_name: category,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
    })

    return queryInterface.bulkInsert('restaurant_dish_category', dishCategories, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('restaurant_dish_category', null, {})
  },
}
