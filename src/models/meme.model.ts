import { Table, Model, Column, DataType, PrimaryKey, Default, ForeignKey } from "sequelize-typescript"
import { Round } from "./round.model"
import { User } from "./user.model"

@Table({
  tableName: 'Meme',
  timestamps: true
})
export class Meme extends Model<Meme> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID
  })
  id!: string

  @ForeignKey(() => Round)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  roundId!: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  userId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  memeImage!: string

  @Column({
    type: DataType.JSON,
    allowNull: false
  })
  texts!: string[]

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  votes!: number
}
