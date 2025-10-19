import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Species', // El nombre de la tabla en la base de datos
})
export class Species extends Model {
  
  // Name of the species (ej: 'Human', 'Alien')
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  name: string;
}