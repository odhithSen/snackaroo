'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const restaurant = await queryInterface.sequelize.query(
      'SELECT restaurant_id from restaurant LIMIT 1;',
    )
    console.log('restaurant', restaurant)

    const user = await queryInterface.sequelize.query(
      `SELECT user_id from user WHERE user.email='test2@dev.com';`,
    )

    const restaurant_admin_row = {
      restaurant_id: restaurant[0][0].restaurant_id,
      user_id: user[0][0].user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await queryInterface.bulkInsert('restaurant_admin', [restaurant_admin_row], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('restaurant_admin', null, {})
  },
}
