import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TestGrap {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
