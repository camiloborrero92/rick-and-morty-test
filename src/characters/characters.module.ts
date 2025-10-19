import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Character } from './entities/character.model';

@Module({
  imports: [SequelizeModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
