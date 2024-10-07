'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'restaurant_dish_item',
      {
        dish_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        restaurant_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'restaurant',
            key: 'restaurant_id',
          },
        },
        dish_category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'restaurant_dish_category',
            key: 'dish_category_id',
          },
        },
        thumbnail_image_url: {
          type: Sequelize.STRING(512),
          allowNull: false,
        },
        dish_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        dish_description: {
          type: Sequelize.STRING(512),
          allowNull: false,
        },
        calories: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        base_price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        ingredients: {
          type: Sequelize.STRING(512),
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          unique_dish_name_restaurant: {
            fields: ['dish_name', 'restaurant_id'],
          },
        },
        initialAutoIncrement: 400000,
      },
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('restaurant_dish_item')
  },
}
