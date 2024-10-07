import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, ForeignKey, Unique } from 'sequelize-typescript'
import { Restaurant } from './restaurant.model'
import { RestaurantDishCategory } from './restaurant_dish_category.model'

export interface RestaurantDishItemRead {
  dish_id: number
  restaurant_id: number
  dish_category_id: number
  thumbnail_image_url: string
  dish_name: string
  dish_description: string
  calories: number
  base_price: number
  ingredients: string
}

@Table({
  tableName: 'restaurant_dish_item',
  timestamps: true,
  initialAutoIncrement: '400000',
})
export class RestaurantDishItem
  extends Model<InferAttributes<RestaurantDishItem>, InferCreationAttributes<RestaurantDishItem>>
  implements RestaurantDishItemRead
{
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  dish_id!: number

  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  restaurant_id!: number

  @ForeignKey(() => RestaurantDishCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  dish_category_id!: number

  @Column({
    type: DataType.STRING(512),
    allowNull: false,
  })
  thumbnail_image_url!: string

  @Unique('unique_dish_name_restaurant')
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  dish_name!: string

  @Column({
    type: DataType.STRING(512),
    allowNull: false,
  })
  dish_description!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  calories!: number

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  base_price!: number

  @Column({
    type: DataType.STRING(512),
    allowNull: false,
  })
  ingredients!: string
}

export interface RestaurantDishItemCreate {
  dish_id: number
  restaurant_id: number
  dish_category_id: number
  thumbnail_image_url: string
  dish_name: string
  dish_description: string
  calories: number
  base_price: number
  ingredients: string
}

export interface RestaurantDishItemUpdate {
  restaurant_id?: number
  dish_category_id?: number
  thumbnail_image_url?: string
  dish_name?: string
  dish_description?: string
  calories?: number
  base_price?: number
  ingredients?: string
}
