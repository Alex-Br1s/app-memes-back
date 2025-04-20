import { Table, Model, Column, DataType, PrimaryKey, Default} from "sequelize-typescript";


@Table({
  tableName: 'RoomPlayer',
  timestamps: true
})

export class RoomPlayer extends Model<RoomPlayer> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID
  })
  id!: string
}