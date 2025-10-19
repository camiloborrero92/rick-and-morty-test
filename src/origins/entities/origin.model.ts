import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Origins',
})
export class Origin extends Model {
  
  // Name of the origin (e.g., 'Earth (C-137)', 'Purge Planet')
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