import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript'
import { Restaurant } from './restaurant.model'
import { User } from './user.model'

export interface RestaurantAdminRead {
  restaurant_id: number
  user_id: number
}

@Table({ tableName: 'restaurant_admin', timestamps: true })
export class RestaurantAdmin extends Model<RestaurantAdminRead> implements RestaurantAdminRead {
  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  restaurant_id!: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  user_id!: number

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt!: Date

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt!: Date
}

export interface RestaurantAdminCreate {
  restaurant_id: number
  user_id: number
}
