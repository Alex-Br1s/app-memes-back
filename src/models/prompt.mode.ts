import { Table, Model, Column, DataType, PrimaryKey, Default, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";
import { Round } from "./round.model";

@Table({
  tableName: 'Prompt',
  timestamps: true  
})

export class Prompt extends Model<Prompt> {
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
  text!: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  userId!: string

  @ForeignKey(() => Round)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  roundId!: string

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false
  })
  votes!: number
}