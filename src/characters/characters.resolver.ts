import { Args, Query, Resolver } from "@nestjs/graphql";
import { CharacterType } from "./dto/character.type";
import { InjectModel } from "@nestjs/sequelize";
import { Character } from "./entities/character.model";
import { Species } from "src/species/entities/species.model";
import { Origin } from "src/origins/entities/origin.model";
import { Op } from "sequelize";

@Resolver(() => CharacterType)
export class CharactersResolver {
  constructor(
    @InjectModel(Character)
    private characterModel: typeof Character,
  ) { }

  @Query(() => [CharacterType], { name: 'findCharacters' })
  async findAll(
    @Args('name', { type: () => String, nullable: true }) name?: string,
    @Args('gender', { type: () => String, nullable: true }) gender?: string,
    @Args('origin', { type: () => String, nullable: true }) origin?: string,
    @Args('species', { type: () => String, nullable: true }) species?: string,
    @Args('status', { type: () => String, nullable: true }) status?: string,
  ): Promise<Character[]> {
    try {
      console.log('Fetching all characters...');

      const whereCondition: any = {};

      if (name) {
        whereCondition.name = {
          [Op.like]: `%${name}%`,
        };
      }
      if (gender) {
        whereCondition.gender = {
          [Op.like]: `%${gender}%`,
        };
      }
      if (origin) {
        whereCondition.origin = {
          [Op.like]: `%${origin}%`,
        };
      }
      if (species) {
        whereCondition.species = {
          [Op.like]: `%${species}%`,
        };
      }
      if (status) {
        whereCondition.status = {
          [Op.like]: `%${status}%`,
        };
      }
      // Ahora la consulta completa
      const characters = await this.characterModel.findAll({
        where: whereCondition,
        include: [
          { model: Species },
          { model: Origin },
        ],
        limit: 5,
        raw: true
      });

      return characters;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw new Error('Failed to fetch characters');
    }
  }
}