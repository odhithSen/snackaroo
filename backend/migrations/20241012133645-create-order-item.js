'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'order_item',
      {
        order_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'order',
            key: 'order_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        dish_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'restaurant_dish_item',
            key: 'dish_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        quantity: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        line_total: {
          type: Sequelize.DECIMAL(10, 2),
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
        initialAutoIncrement: 10000,
      },
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_item')
  },
}
