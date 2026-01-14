import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.estudiantesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.estudiantesService.findAll();
  }

  @Get('activos')
  findActivos() {
    return this.estudiantesService.findActivos(); // Este método debe estar en el Service
  }

  @Get('buscar')
  buscarAvanzado(@Query() query: any) {
    return this.estudiantesService.buscarAvanzado(query); // Agregamos query como argumento
  }

  @Get('reporte-materias')
  getReporte() {
    return this.estudiantesService.getReporteMaterias();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudiantesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.estudiantesService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudiantesService.remove(+id);
  }
}