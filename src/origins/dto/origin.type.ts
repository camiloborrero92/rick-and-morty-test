// src/origins/dto/origin.type.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class OriginType {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  url: string;
  
  // createdAt y updatedAt son campos opcionales en el esquema GraphQL
  // @Field(() => Date)
  // createdAt: Date;
}