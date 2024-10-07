import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, ForeignKey, Index } from 'sequelize-typescript'
import { Restaurant } from './restaurant.model'

export interface RestaurantDishCategoryRead {
  dish_category_id: number
  restaurant_id: number
  dish_category_name: string
}

@Table({
  tableName: 'restaurant_dish_category',
  timestamps: true,
  initialAutoIncrement: '3000000',
})
export class RestaurantDishCategory
  extends Model<
    InferAttributes<RestaurantDishCategory>,
    InferCreationAttributes<RestaurantDishCategory>
  >
  implements RestaurantDishCategoryRead
{
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  dish_category_id!: number

  @Index('dish_category_name_restaurant_id_unique')
  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  restaurant_id!: number

  @Index('dish_category_name_restaurant_id_unique')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dish_category_name!: string
}

export interface RestaurantDishCategoryCreate {
  dish_category_id: number
  restaurant_id: number
  dish_category_name: string
}

export interface RestaurantDishCategoryUpdate {
  restaurant_id?: number
  dish_category_name?: string
}
