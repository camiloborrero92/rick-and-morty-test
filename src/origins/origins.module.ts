import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OriginsService } from './origins.service';
import { Origin } from './entities/origin.model';

@Module({
  imports: [SequelizeModule.forFeature([Origin])],
  controllers: [],
  providers: [OriginsService],
})
export class OriginsModule {}
