'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@dev.com',
        contact_number: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
        profile_picture_url: 'https://avatar.iran.liara.run/public/37',
      },
    ]

    for (let i = 0; i < 20; i++) {
      users.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        contact_number: faker.phone.number(),
        profile_picture_url: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    await queryInterface.bulkInsert('user', users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {})
  },
}
