import { Query, Resolver } from "@nestjs/graphql";
import { CharacterType } from "./dto/character.type";
import { InjectModel } from "@nestjs/sequelize";
import { Character } from "./entities/character.model";
import { Species } from "src/species/entities/species.model";
import { Origin } from "src/origins/entities/origin.model";

@Resolver(() => CharacterType)
export class CharactersResolver {
  constructor(
    @InjectModel(Character)
    private characterModel: typeof Character,
  ) {}

  @Query(() => [CharacterType], { name: 'allCharacters' })
  async findAll(): Promise<Character[]> {
    try {
      console.log('Fetching all characters...');
      
      // Ahora la consulta completa
      const characters = await this.characterModel.findAll({
        include: [
          { model: Species, required: false },
          { model: Origin, required: false },
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