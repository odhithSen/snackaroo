'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'restaurant_dish_category',
      {
        dish_category_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        restaurant_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'restaurant', // Reference to the 'restaurant' table
            key: 'restaurant_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        dish_category_name: {
          type: Sequelize.STRING,
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
        initialAutoIncrement: 3000000,
      },
    )

    await queryInterface.addIndex(
      'restaurant_dish_category',
      ['dish_category_name', 'restaurant_id'],
      {
        unique: true,
        name: 'dish_category_name_restaurant_id_unique',
      },
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('restaurant_dish_category')
  },
}
