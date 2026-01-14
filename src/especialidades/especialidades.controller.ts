import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { CreateEspecialidadDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidade.dto';

@Controller('especialidades') // ruta base en plural
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Post()
  create(@Body() data: CreateEspecialidadDto) {
    return this.especialidadesService.create(data);
  }

  @Get()
  findAll() {
    return this.especialidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especialidadesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateEspecialidadDto) {
    return this.especialidadesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especialidadesService.remove(+id);
  }
}
