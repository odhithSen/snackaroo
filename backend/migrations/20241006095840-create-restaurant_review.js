'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'restaurant_review',
      {
        restaurant_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'restaurant', // foreign key to restaurant table
            key: 'restaurant_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        reviewer_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'user', // foreign key to user table
            key: 'user_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        rating: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        description: {
          type: Sequelize.STRING(512),
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
        initialAutoIncrement: 120000,
      },
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('restaurant_reviews')
  },
}
