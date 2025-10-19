import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Species } from '../../species/entities/species.model'; 
import { Origin } from '../../origins/entities/origin.model';   

// Definición de los ENUM (tipos de datos de cadena limitada)
const StatusEnum = ['Alive', 'Dead', 'Unknown'] as const;
const GenderEnum = ['Female', 'Male', 'Genderless', 'Unknown'] as const;

@Table({
  tableName: 'Characters', // Nombre de la tabla en la DB
  timestamps: true,
})
export class Character extends Model {
  
  // Nombre
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  // Estado (Status) - Usando los valores del ENUM
  @Column({
    type: DataType.ENUM(...StatusEnum),
    allowNull: false,
  })
  status: typeof StatusEnum[number]; 
  
  // Género (Gender) - Usando los valores del ENUM
  @Column({
    type: DataType.ENUM(...GenderEnum),
    allowNull: false,
  })
  gender: typeof GenderEnum[number]; 

  // URL de la imagen
  @Column({
    type: DataType.STRING(512),
    allowNull: true, 
  })
  image_url: string;

  // ----------------------------------------
  // RELACIÓN CON SPECIES (Clave Foránea y Asociación)
  // ----------------------------------------
  
  // 1. Clave Foránea a la tabla Species
  @ForeignKey(() => Species)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_species: number;
  
  // 2. Asociación: Un Character pertenece a una Species
  @BelongsTo(() => Species)
  species: Species;

  // ----------------------------------------
  // RELACIÓN CON ORIGIN (Clave Foránea y Asociación)
  // ----------------------------------------

  // 1. Clave Foránea a la tabla Origin
  @ForeignKey(() => Origin)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_origin: number;
  
  // 2. Asociación: Un Character pertenece a un Origin
  @BelongsTo(() => Origin)
  origin: Origin;
}