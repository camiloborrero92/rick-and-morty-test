import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character } from '../characters/entities/character.model';
import { Species } from '../species/entities/species.model';
import { Origin } from '../origins/entities/origin.model';

@Module({
  imports: [SequelizeModule.forFeature([Character, Species, Origin])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
