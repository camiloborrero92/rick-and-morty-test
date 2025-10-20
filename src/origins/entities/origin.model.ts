import { Table, Column, Model, DataType, Index } from 'sequelize-typescript';

@Table({
  tableName: 'Origins',
})
export class Origin extends Model {
  
  @Index
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  name: string;
  
  // URL from the API (optional, but useful for data integrity)
  @Column({
    type: DataType.STRING(512),
    allowNull: true,
  })
  url: string;
}