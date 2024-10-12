'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'order',
      {
        order_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'user',
            key: 'user_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        restaurant_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'restaurant',
            key: 'restaurant_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        order_total: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        order_time: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        order_status: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        delivery_location: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        delivery_address_line1: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        delivery_address_line2: {
          type: Sequelize.STRING,
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
        initialAutoIncrement: 500000,
      },
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order')
  },
}
