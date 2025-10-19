import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OriginsService } from './origins.service';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';

@Controller('origins')
export class OriginsController {
  constructor(private readonly originsService: OriginsService) {}

  @Post()
  create(@Body() createOriginDto: CreateOriginDto) {
    return this.originsService.create(createOriginDto);
  }

  @Get()
  findAll() {
    return this.originsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.originsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOriginDto: UpdateOriginDto) {
    return this.originsService.update(+id, updateOriginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.originsService.remove(+id);
  }
}
