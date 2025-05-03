import { Table, Model, Column, DataType, PrimaryKey, Default, ForeignKey } from "sequelize-typescript";
import { Room } from "./room.model";

@Table({
  tableName: 'Round',
  timestamps: true
})
export class Round extends Model<Round> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID
  })
  id!: string;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  roomId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  roundNumber!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  selectedTemplate!: string; // Imagen de plantilla usada en esta ronda

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  winningMemeId?: string; // Id del meme que ganó esta ronda (si ya se votó)

  @Column({
    type: DataType.STRING,
    defaultValue: 'assigning' // 'editing', 'voting', 'finished'
  })
  status!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  startedAt?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  endedAt?: Date;
}
