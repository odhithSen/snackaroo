'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    // Getting all restaurants
    const restaurants = await queryInterface.sequelize.query(
      'SELECT restaurant_id FROM restaurant;',
      { type: Sequelize.QueryTypes.SELECT },
    )

    // Getting all restaurant dish categories
    const dishCategories = await queryInterface.sequelize.query(
      'SELECT dish_category_id, restaurant_id FROM restaurant_dish_category;',
      { type: Sequelize.QueryTypes.SELECT },
    )

    const restaurantDishItems = []

    for (const category of dishCategories) {
      for (let i = 0; i < 2; i++) {
        restaurantDishItems.push({
          restaurant_id: category.restaurant_id,
          dish_category_id: category.dish_category_id,
          thumbnail_image_url: faker.image.urlLoremFlickr({
            category: 'food',
            width: 320,
            height: 320,
          }),
          dish_name: faker.commerce.productName(),
          dish_description: faker.lorem.sentence(),
          calories: faker.number.int({ min: 100, max: 1000 }),
          base_price: faker.commerce.price(5, 50, 2),
          ingredients: faker.lorem.words(5),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    }

    await queryInterface.bulkInsert('restaurant_dish_item', restaurantDishItems, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurant_dish_item', null, {})
  },
}
