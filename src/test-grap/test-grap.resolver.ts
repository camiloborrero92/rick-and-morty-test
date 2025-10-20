import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TestGrapService } from './test-grap.service';
import { TestGrap } from './entities/test-grap.entity';
import { CreateTestGrapInput } from './dto/create-test-grap.input';
import { UpdateTestGrapInput } from './dto/update-test-grap.input';

@Resolver(() => TestGrap)
export class TestGrapResolver {
  constructor(private readonly testGrapService: TestGrapService) {}

  @Mutation(() => TestGrap)
  createTestGrap(@Args('createTestGrapInput') createTestGrapInput: CreateTestGrapInput) {
    return this.testGrapService.create(createTestGrapInput);
  }

  @Query(() => [TestGrap], { name: 'testGrap' })
  findAll() {
    return this.testGrapService.findAll();
  }

  @Query(() => TestGrap, { name: 'testGrap' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.testGrapService.findOne(id);
  }

  @Mutation(() => TestGrap)
  updateTestGrap(@Args('updateTestGrapInput') updateTestGrapInput: UpdateTestGrapInput) {
    return this.testGrapService.update(updateTestGrapInput.id, updateTestGrapInput);
  }

  @Mutation(() => TestGrap)
  removeTestGrap(@Args('id', { type: () => Int }) id: number) {
    return this.testGrapService.remove(id);
  }
}
