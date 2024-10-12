import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript'
import { Restaurant } from './restaurant.model'
import { User } from './user.model'

export interface RestaurantReviewRead {
  restaurant_id: number
  reviewer_id: number
  rating: number
  description?: string
  createdAt?: Date
}

@Table({ tableName: 'restaurant_review', timestamps: true, initialAutoIncrement: '120000' })
export class RestaurantReview extends Model<RestaurantReviewRead> implements RestaurantReviewRead {
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
  reviewer_id!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating!: number

  @Column({
    type: DataType.STRING(512),
  })
  description!: string

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

export interface RestaurantReviewCreate {
  restaurant_id: number
  reviewer_id: number
  rating: number
  description: string
}

export interface RestaurantReviewUpdate {
  rating?: number
  description?: string
}
