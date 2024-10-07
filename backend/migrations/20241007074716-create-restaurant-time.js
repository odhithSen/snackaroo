'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'restaurant_time',
      {
        restaurant_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'restaurant', // Refers to table 'restaurant'
            key: 'restaurant_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          primaryKey: true,
        },
        day: {
          allowNull: false,
          type: Sequelize.STRING,
          primaryKey: true,
        },
        opening_time: {
          allowNull: false,
          type: Sequelize.TIME,
        },
        closing_time: {
          allowNull: false,
          type: Sequelize.TIME,
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
        initialAutoIncrement: 200000,
      },
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('restaurant_time')
  },
}
