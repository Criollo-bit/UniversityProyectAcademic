import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Controller('carreras') // ruta base en plural
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Post()
  create(@Body() data: CreateCarreraDto) {
    return this.carrerasService.create(data);
  }

  @Get()
  findAll() {
    return this.carrerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrerasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCarreraDto) {
    return this.carrerasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrerasService.remove(+id);
  }
}
