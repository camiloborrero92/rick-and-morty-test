import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { Species } from '../../species/entities/species.model'; 
import { Origin } from '../../origins/entities/origin.model';   

// Definición de los ENUM (tipos de datos de cadena limitada)
export const StatusEnum = ['Alive', 'Dead', 'Unknown'] as const;
export const GenderEnum = ['Female', 'Male', 'Genderless', 'Unknown'] as const;

@Table({
  tableName: 'Characters',
  timestamps: true,
})
export class Character extends Model {
  
  @Index
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  // Estado (Status) - Usando los valores del ENUM
  // @Field()
  @Column({
    type: DataType.ENUM(...StatusEnum),
    allowNull: false,
  })
  status: typeof StatusEnum[number]; 
  
  // Género (Gender) - Usando los valores del ENUM
  // @Field()
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