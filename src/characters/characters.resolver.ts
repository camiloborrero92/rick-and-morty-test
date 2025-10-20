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

    return this.characterModel.findAll({
      include: [
        { model: Species },
        { model: Origin },
      ],
    });
  }
}