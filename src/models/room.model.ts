import { Table, Model, Column, DataType, PrimaryKey, Default, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: 'Room',
  timestamps: true  
})

export class Room extends Model<Room> {
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
  roomName!: string

  @Column({
    type: DataType.STRING
  })
  roomCode?: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isPublic!: boolean

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  adminId!: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isSpecialRoom!:boolean
  
  @Column({
    type: DataType.INTEGER,
    defaultValue: 6
  })
  rounds!: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: 60 //segundos por ronda
  })
  roundDuration!: number

  @Column({
    type: DataType.STRING,
    defaultValue: 'waiting' // por defecto la sala se cera en 1:'waiting', 'prompt': IA, 'editing', 'voting', 'finished', etc.
  })
  phase!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  showUsernames!: boolean; // Mostrar u ocultar nombres en los prompts

  @Column({
    type: DataType.STRING,
    defaultValue: 'vote' // 'vote' o 'random' (modo de selección del prompt ganador)
  })
  selectionMode!: string;
}