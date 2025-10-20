import { Injectable } from '@nestjs/common';
import { CreateTestGrapInput } from './dto/create-test-grap.input';
import { UpdateTestGrapInput } from './dto/update-test-grap.input';

@Injectable()
export class TestGrapService {
  create(createTestGrapInput: CreateTestGrapInput) {
    return 'This action adds a new testGrap';
  }

  findAll() {
    return `This action returns all testGrap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testGrap`;
  }

  update(id: number, updateTestGrapInput: UpdateTestGrapInput) {
    return `This action updates a #${id} testGrap`;
  }

  remove(id: number) {
    return `This action removes a #${id} testGrap`;
  }
}
