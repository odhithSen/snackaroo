import { Optional } from 'sequelize'
import { Table, Column, Model, DataType, BelongsToMany, HasMany } from 'sequelize-typescript'
import { RestaurantReview } from './restaurant_review.model'
import { Restaurant } from './restaurant.model'

export interface UserRead {
  user_id: number
  first_name?: string
  last_name?: string
  email: string
  contact_number?: string
  profile_picture_url?: string
  // restaurants?: Array<Restaurant & { RestaurantReview: RestaurantReview }>
}

@Table({ tableName: 'user', timestamps: true, initialAutoIncrement: '10000' })
export class User extends Model<UserRead, UserCreate> implements UserRead {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  user_id!: number

  @Column({
    type: DataType.STRING,
  })
  first_name!: string

  @Column({
    type: DataType.STRING,
  })
  last_name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string

  @Column({
    type: DataType.STRING,
  })
  contact_number!: string

  @Column({
    type: DataType.STRING,
  })
  profile_picture_url!: string

  // @BelongsToMany(() => Restaurant, () => RestaurantReview, 'restaurant_id', 'reviewer_id')
  // restaurants!: Array<Restaurant & { RestaurantReview: RestaurantReview }>
}

export interface UserCreate {
  user_id: number
  first_name: string
  last_name: string
  email: string
  contact_number: string
  profile_picture_url: string
}

export interface UserUpdate {
  first_name?: string
  last_name?: string
  email?: string
  contact_number?: string
  profile_picture_url: string
}
