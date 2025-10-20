import { Injectable } from '@nestjs/common';
import axios from 'axios';
import type { RickAndMortyResponse } from './interfaces/response-api.interface';
import { Character } from '../characters/entities/character.model';
import { Species } from '../species/entities/species.model';
import { Origin } from '../origins/entities/origin.model';
import { InjectModel } from '@nestjs/sequelize';
import { Cron } from '@nestjs/schedule';
import { CharacterFilterInput } from './dto/character-filter.input';
import { Op } from 'sequelize';

@Injectable()
export class CharactersService {

  constructor(
    @InjectModel(Character)
    private characterModel: typeof Character,
    @InjectModel(Species)
    private speciesModel: typeof Species,
    @InjectModel(Origin)
    private originModel: typeof Origin,
  ) { }

  // Execute every 12 hours
  @Cron('* */12 * * *', {
    name: 'characters-sync',
    timeZone: 'America/Bogota',
  })
  async handleCron() {
    console.log('--- CRON JOB: start ---');

    const result = await this.syncCharacters();

    console.log(`--- CRON JOB: end. synced: ${result.count} ---`);
  }

  async syncCharacters(): Promise<{ message: string; count: number }> {
    try {
      let url = 'https://rickandmortyapi.com/api/character';
      let totalSynced = 0;

      while (url) {
        const response = await axios.get<RickAndMortyResponse>(url);
        const { results, info } = response.data;

        for (const character of results) {
          // Upsert Species
          const [species] = await this.speciesModel.upsert(
            { name: character.species },
            { returning: true }
          );

          // Upsert Origin
          const [origin] = await this.originModel.upsert(
            {
              name: character.origin.name,
              url: character.origin.url
            },
            { returning: true }
          );

          // Verificar que tenemos los IDs necesarios
          if (!species?.id || !origin?.id) {
            console.error(`Missing IDs for character ${character.id}: species=${species?.id}, origin=${origin?.id}`);
            continue;
          }

          // Upsert Character
          await this.characterModel.upsert({
            id: character.id,
            name: character.name,
            status: character.status,
            gender: character.gender,
            image_url: character.image,
            id_species: species.id,
            id_origin: origin.id,
          });

          totalSynced++;
        }

        url = info.next || '';
      }

      return {
        message: 'Characters synchronized successfully',
        count: totalSynced,
      };
    } catch (error) {
      console.error('Sync error details:', error);
      throw new Error(`Error syncing characters: ${error.message}`);
    }
  }

async filterCharacters(filter: CharacterFilterInput = {}): Promise<Character[]> {
    const whereCondition: any = {};
    const include: any[] = [];
    
    // 1. Filtrado por Campos Directos (Status, Gender)
    if (filter.status) {
      whereCondition.status = filter.status;
    }
    if (filter.gender) {
      whereCondition.gender = filter.gender;
    }

    // 2. Filtrado por Nombre (Búsqueda parcial LIKE)
    if (filter.name) {
      whereCondition.name = {
        [Op.like]: `%${filter.name}%`, // Sequelize syntax for LIKE '%name%'
      };
    }

    // 3. Filtrado por Claves Foráneas (Species y Origin)
    if (filter.speciesId) {
      whereCondition.id_species = filter.speciesId;
      include.push(Species); // Incluir la tabla para que Sequelize sepa unirse
    }
    if (filter.originId) {
      whereCondition.id_origin = filter.originId;
      include.push(Origin); // Incluir la tabla para la unión
    }

    // Ejecutar la consulta con filtros y asociaciones
    return this.characterModel.findAll({
      where: whereCondition,
      include: [
          Species, // Aseguramos que la especie y el origen se devuelvan en el objeto
          Origin,
      ], 
    });
  }
}