import { Controller, Post} from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create() {
    return this.charactersService.syncCharacters(15);
  }
}
