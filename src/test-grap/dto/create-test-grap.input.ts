import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTestGrapInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
