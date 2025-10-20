import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpeciesService } from './species.service';
import { Species } from './entities/species.model';

@Module({
  imports: [SequelizeModule.forFeature([Species])],
  controllers: [],
  providers: [SpeciesService],
})
export class SpeciesModule {}
