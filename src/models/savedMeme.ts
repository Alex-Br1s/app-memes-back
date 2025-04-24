import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";
import { Meme } from "./meme.model";

@Table({
  tableName: 'SavedMeme',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'memeId'],
    },
  ],
})

export class SavedMeme extends Model<SavedMeme> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID
  })
  id!: string

  @ForeignKey(() => User)
  @Column({ 
    type: DataType.STRING, 
    allowNull: false 
  })
  userId!: string;

  @ForeignKey(() => Meme)
  @Column({ 
    type: DataType.STRING, 
    allowNull: false 
  })
  memeId!: string;
}