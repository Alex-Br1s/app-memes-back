import { Table, Column, Model, DataType, PrimaryKey, Default } from "sequelize-typescript";

@Table({
  tableName: 'User',
  timestamps: true
})

export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID
  })
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  userName!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;  

  @Column({
    type: DataType.INTEGER,
    defaultValue: 3
  })
  coins!: number

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isPremium!: boolean

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  avatar?: string
}