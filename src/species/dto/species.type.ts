// src/species/dto/species.type.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SpeciesType {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;
  
  // createdAt y updatedAt son campos opcionales en el esquema GraphQL
  // @Field(() => Date)
  // updatedAt: Date;
}