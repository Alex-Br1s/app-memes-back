import { Table, Model, Column, DataType, PrimaryKey, ForeignKey, Default } from "sequelize-typescript"
import { User } from "./user.model"
import { Round } from "./round.model"
import { Template } from "./template.model"

@Table({
  tableName: "AssignedTemplate",
  timestamps: true
})
export class AssignedTemplate extends Model<AssignedTemplate> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID
  })
  id!: string

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

  @ForeignKey(() => Template)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  templateId!: string
}
