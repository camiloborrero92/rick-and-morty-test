import { Table, Column, Model, DataType, Index } from 'sequelize-typescript';

@Table({
  tableName: 'Species',
})
export class Species extends Model {
  
  @Index
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  name: string;
}