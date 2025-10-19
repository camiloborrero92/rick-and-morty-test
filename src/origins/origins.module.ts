import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OriginsService } from './origins.service';
import { OriginsController } from './origins.controller';
import { Origin } from './entities/origin.model';

@Module({
  imports: [SequelizeModule.forFeature([Origin])],
  controllers: [OriginsController],
  providers: [OriginsService],
})
export class OriginsModule {}
