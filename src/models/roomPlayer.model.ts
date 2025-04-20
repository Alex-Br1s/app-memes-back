import { Table, Model, Column, DataType, PrimaryKey, ForeignKey } from "sequelize-typescript";
import { Room } from "./room.model";
import { User } from "./user.model";


@Table({
  tableName: 'RoomPlayer',
  timestamps: true
})

export class RoomPlayer extends Model<RoomPlayer> {
  @PrimaryKey
  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID
  })
  roomId!: string
  
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  userId!: string

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false
  })
  score!: number

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isReady!: boolean
}