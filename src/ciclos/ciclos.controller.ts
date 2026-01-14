import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CiclosService } from './ciclos.service';
import { CreateCicloDto } from './dto/create-ciclo.dto';
import { UpdateCicloDto } from './dto/update-ciclo.dto';

@Controller('ciclos')
export class CiclosController {
  constructor(private readonly ciclosService: CiclosService) {}

  @Post()
  create(@Body() data: CreateCicloDto) {
    return this.ciclosService.create(data);
  }

  @Get()
  findAll() {
    return this.ciclosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ciclosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCicloDto) {
    return this.ciclosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciclosService.remove(+id);
  }
}
