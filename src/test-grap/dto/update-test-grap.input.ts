import { CreateTestGrapInput } from './create-test-grap.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTestGrapInput extends PartialType(CreateTestGrapInput) {
  @Field(() => Int)
  id: number;
}
