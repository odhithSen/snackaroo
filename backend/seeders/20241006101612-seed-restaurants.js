'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    const restaurants = []
    const restaurantNames = new Set()

    while (restaurants.length < 100) {
      let name = faker.company.name()

      if (restaurantNames.has(name)) {
        continue
      }

      restaurantNames.add(name)

      restaurants.push({
        name: name,
        thumbnail_image_url: faker.image.urlLoremFlickr({
          category: 'food,restaurant',
          width: 320,
          height: 320,
        }),
        tag_line: faker.company.catchPhrase(),
        location: faker.address.city(),
        address: faker.address.streetAddress(),
        contact_number: faker.phone.number(),
        hygiene_rating: faker.number.int({ min: 1, max: 5 }),
        notes: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    await queryInterface.bulkInsert('restaurant', restaurants, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurant', null, {})
  },
}
