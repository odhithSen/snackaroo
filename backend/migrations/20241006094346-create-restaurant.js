'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'restaurant',
      {
        restaurant_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        thumbnail_image_url: {
          type: Sequelize.STRING(512),
        },
        tag_line: {
          type: Sequelize.STRING(255),
        },
        location: {
          type: Sequelize.STRING(255),
        },
        address: {
          type: Sequelize.STRING(255),
        },
        contact_number: {
          type: Sequelize.STRING(56),
        },
        hygiene_rating: {
          type: Sequelize.INTEGER,
        },
        notes: {
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
        initialAutoIncrement: 20000,
      },
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('restaurant')
  },
}
