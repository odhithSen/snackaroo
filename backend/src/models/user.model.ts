import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType } from 'sequelize-typescript'

export interface UserRead {
  user_id: number
  first_name?: string
  last_name?: string
  email: string
  contact_number?: string
}

@Table({ tableName: 'user', timestamps: true, initialAutoIncrement: '10000' })
export class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements UserRead
{
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
}

export interface UserCreate {
  user_id: number
  first_name: string
  last_name: string
  email: string
  contact_number: string
}

export interface UserUpdate {
  first_name?: string
  last_name?: string
  email?: string
  contact_number?: string
}
