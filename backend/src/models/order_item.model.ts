import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript'
import { Order } from './order.model'
import { RestaurantDishItem } from './restaurant-dish-item.model'

export interface OrderItemRead {
  order_id: number
  dish_id: number
  quantity: number
  line_total?: number
}

@Table({ tableName: 'order_item', timestamps: true, initialAutoIncrement: '10000' })
export class OrderItem extends Model<OrderItem> implements OrderItemRead {
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  order_id!: number

  @ForeignKey(() => RestaurantDishItem)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  dish_id!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  line_total!: number
}

export interface OrderItemCreate {
  order_id: number
  dish_id: number
  quantity: number
  line_total?: number
}

export interface OrderItemUpdate {
  quantity?: number
  line_total?: number
}
