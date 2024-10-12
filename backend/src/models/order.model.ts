import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, ForeignKey, Unique } from 'sequelize-typescript'
import { User } from './user.model'
import { Restaurant } from './restaurant.model'

export interface OrderRead {
  order_id: number
  user_id: number
  restaurant_id: number
  order_total: number
  order_time: Date
  order_status: string
  delivery_location: string
  delivery_address_line1: string
  delivery_address_line2?: string
}

@Table({ tableName: 'order', timestamps: true, initialAutoIncrement: '500000' })
export class Order
  extends Model<InferAttributes<Order>, InferCreationAttributes<Order>>
  implements OrderRead
{
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  order_id!: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id!: number

  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.INTEGER,
  })
  restaurant_id!: number

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  order_total!: number

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  order_time!: Date

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  order_status!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  delivery_location!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  delivery_address_line1!: string

  @Column({
    type: DataType.STRING,
  })
  delivery_address_line2?: string
}

export interface OrderCreate {
  user_id: number
  restaurant_id: number
  order_total: number
  order_time: Date
  order_status: string
  delivery_location: string
  delivery_address_line1: string
  delivery_address_line2?: string
}

export interface OrderUpdate {
  user_id?: number
  restaurant_id?: number
  order_total?: number
  order_time?: Date
  order_status?: string
  delivery_location?: string
  delivery_address_line1?: string
  delivery_address_line2?: string
}
