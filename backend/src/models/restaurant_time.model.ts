import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript'
import { Restaurant } from './restaurant.model'

export interface RestaurantTimeRead {
  restaurant_id: number
  day: string
  opening_time: string
  closing_time: string
}

@Table({ tableName: 'restaurant_time', timestamps: true, initialAutoIncrement: '120000' })
export class RestaurantTime
  extends Model<InferAttributes<RestaurantTime>, InferCreationAttributes<RestaurantTime>>
  implements RestaurantTimeRead
{
  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  restaurant_id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  day!: string

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  opening_time!: string

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  closing_time!: string
}

export interface RestaurantTimeCreate {
  restaurant_id: number
  day: string
  opening_time: string
  closing_time: string
}

export interface RestaurantTimeUpdate {
  opening_time?: string
  closing_time?: string
}
