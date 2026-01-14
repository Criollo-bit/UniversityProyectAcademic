import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
 
@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  @Post()
  async matricular(@Body() data: any) {
    return this.matriculasService.matricular(data); 
  }

  @Get()
  findAll() {
    return this.matriculasService.findAll();
  }

  @Get('reporte/:estudianteId')
  buscarPorEstudianteYPeriodo(
    @Param('estudianteId') estudianteId: string,
    @Query('periodo') periodo: string
  ) {
    return this.matriculasService.buscarPorEstudianteYPeriodo(+estudianteId, periodo);
  }
}