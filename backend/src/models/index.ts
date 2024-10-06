import { Sequelize } from 'sequelize-typescript'
import config from '../config'
import { User } from './user.model'
import { Restaurant } from './restaurant.model'
import { RestaurantReview } from './restaurant_review.model'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  port: config.DB_PORT,
  models: [User, Restaurant, RestaurantReview],
})

export { sequelize }
