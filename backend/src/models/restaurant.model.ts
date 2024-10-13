import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType, BelongsToMany, HasMany } from 'sequelize-typescript'
import { User } from './user.model'
import { RestaurantReview } from './restaurant_review.model'

export interface RestaurantRead {
  restaurant_id: number
  name: string
  thumbnail_image_url?: string
  tag_line?: string
  location?: string
  address?: string
  contact_number?: string
  hygiene_rating?: number
  notes?: string
}

@Table({ tableName: 'restaurant', timestamps: true, initialAutoIncrement: '20000' })
export class Restaurant
  extends Model<InferAttributes<Restaurant>, InferCreationAttributes<Restaurant>>
  implements RestaurantRead
{
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  restaurant_id!: number

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  name!: string

  @Column({
    type: DataType.STRING(512),
  })
  thumbnail_image_url!: string

  @Column({
    type: DataType.STRING(255),
  })
  tag_line!: string

  @Column({
    type: DataType.STRING(255),
  })
  location!: string

  @Column({
    type: DataType.STRING(255),
  })
  address!: string

  @Column({
    type: DataType.STRING(56),
  })
  contact_number!: string

  @Column({
    type: DataType.INTEGER,
  })
  hygiene_rating!: number

  @Column({
    type: DataType.STRING(512),
  })
  notes!: string

  // @BelongsToMany(() => User, () => RestaurantReview, 'reviewer_id', 'restaurant_id')
  // reviewers!: Array<User & { RestaurantReview: RestaurantReview }>
}

export interface RestaurantCreate {
  restaurant_id: number
  name: string
  thumbnail_image_url: string
  tag_line: string
  location: string
  address: string
  contact_number: string
  hygiene_rating: number
  notes: string
}

export interface RestaurantUpdate {
  name?: string
  thumbnail_image_url?: string
  tag_line?: string
  location?: string
  address?: string
  contact_number?: string
  hygiene_rating?: number
  notes?: string
}
