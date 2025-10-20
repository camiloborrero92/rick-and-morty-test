import { Module } from '@nestjs/common';
import { TestGrapService } from './test-grap.service';
import { TestGrapResolver } from './test-grap.resolver';

@Module({
  providers: [TestGrapResolver, TestGrapService],
})
export class TestGrapModule {}
