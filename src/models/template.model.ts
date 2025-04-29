import { Table, Model, Column, DataType, PrimaryKey, Default, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: 'Template',
  timestamps: true
})
export class Template extends Model<Template> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  templateName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  templateImage!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false
  })
  textAreas!: {
    x: number;
    y: number;
    width: number;
    height: number;
    fontSize?: number;
    align?: 'left' | 'center' | 'right';
  }[];

  // Si es null => plantilla de la app. Si tiene valor => la creó un usuario
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true
  })
  createdBy?: string | null;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isApproved!: boolean;
}
