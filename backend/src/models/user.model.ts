import { Table, Column, Model, DataType } from 'sequelize-typescript'

export interface UserRead {
  //   userId: number
  email: string
  firstName: string
  lastName: string
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> implements UserRead {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  userId!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string
}

export interface UserCreate {
  email: string
  firstName: string
  lastName: string
  //   userId: string
}

export interface UserUpdate {
  email?: string
  firstName?: string
  lastName?: string
}
