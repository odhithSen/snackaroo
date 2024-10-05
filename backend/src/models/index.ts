import { Sequelize } from 'sequelize-typescript'
import config from '../config'
import { User } from './user.model'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  port: config.DB_PORT,
  models: [User],
})

export { sequelize }
