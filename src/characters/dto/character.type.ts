// src/characters/dto/character.type.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OriginType } from '../../origins/dto/origin.type'; 
import { SpeciesType } from '../../species/dto/species.type'; 

// Definiciones de ENUM (deben estar disponibles o importarse)
const StatusEnum = ['Alive', 'Dead', 'Unknown'] as const;
const GenderEnum = ['Female', 'Male', 'Genderless', 'Unknown'] as const;

@ObjectType()
export class CharacterType {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String)
  status: typeof StatusEnum[number]; 
  
  @Field(() => String)
  gender: typeof GenderEnum[number]; 

  @Field(() => String, { nullable: true })
  image_url: string;
  
  // 💡 RELACIÓN: Exponemos el objeto Species completo.
  // El Resolver se encarga de llenar este campo usando 'include'.
  @Field(() => SpeciesType, { nullable: true })
  species: SpeciesType; 

  // 💡 RELACIÓN: Exponemos el objeto Origin completo.
  @Field(() => OriginType, { nullable: true })
  origin: OriginType;

}