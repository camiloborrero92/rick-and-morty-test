import { Injectable } from '@nestjs/common';
import axios from 'axios';
import type { RickAndMortyResponse } from './interfaces/response-api.interface';
import { Character } from '../characters/entities/character.model';
import { Species } from '../species/entities/species.model';
import { Origin } from '../origins/entities/origin.model';
import { InjectModel } from '@nestjs/sequelize';
import { Cron } from '@nestjs/schedule';

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
  @Cron('0 0,12 * * *', {
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

      // Configure axios with better defaults
      const axiosConfig = {
        timeout: 15000, // 15 seconds
        headers: {
          'User-Agent': 'NestJS-App/1.0',
          'Accept': 'application/json',
          'Connection': 'keep-alive'
        },
        maxRedirects: 5,
        validateStatus: (status: number) => status < 500, // Don't throw on 4xx errors
      };

      while (url) {
        const response = await axios.get<RickAndMortyResponse>(url, axiosConfig);
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
}