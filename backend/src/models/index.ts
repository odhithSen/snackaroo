import { Sequelize } from 'sequelize-typescript'
import config from '../config'
import { User } from './user.model'
import { Restaurant } from './restaurant.model'
import { RestaurantReview } from './restaurant_review.model'
import { RestaurantDishCategory } from './restaurant_dish_category.model'
import { RestaurantTime } from './restaurant_time.model'
import { RestaurantDishItem } from './restaurant-dish-item.model'
import { Order } from './order.model'
import { OrderItem } from './order_item.model'
import { RestaurantAdmin } from './restaurant_admin.model'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  port: config.DB_PORT,
  models: [
    User,
    Restaurant,
    RestaurantReview,
    RestaurantDishCategory,
    RestaurantTime,
    RestaurantDishItem,
    Order,
    OrderItem,
    RestaurantAdmin,
  ],
})

export { sequelize }
