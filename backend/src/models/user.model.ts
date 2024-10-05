import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Table, Column, Model, DataType } from 'sequelize-typescript'

export interface UserRead {
  user_id: number
  email: string
  first_name: string
  last_name: string
}

@Table({ tableName: 'users', timestamps: true, initialAutoIncrement: '10000' })
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
    allowNull: false,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name!: string
}

export interface UserCreate {
  email: string
  first_name: string
  last_name: string
  user_id: number
}

export interface UserUpdate {
  email?: string
  first_name?: string
  last_name?: string
}
