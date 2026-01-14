import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MaestrosService } from './maestros.service';
import { CreateMaestroDto } from './dto/create-maestro.dto';
import { UpdateMaestroDto } from './dto/update-maestro.dto';
 
const JwtAuthGuard = AuthGuard('jwt');

@Controller('maestros')
export class MaestrosController {
  constructor(private readonly maestrosService: MaestrosService) {}

  //ruta publica
  @Get('especialistas')
  buscarDocentesEspecialistas() { 
    return this.maestrosService.buscarDocentesEspecialistas(); 
  }

  @Get('filtro-avanzado')
  buscarFiltroEspecial(@Query('tipo') tipo: string) { 
    return this.maestrosService.buscarFiltroEspecial(tipo); 
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMaestroDto: CreateMaestroDto) {
    return this.maestrosService.create(createMaestroDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.maestrosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maestrosService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMaestroDto: UpdateMaestroDto) {
    return this.maestrosService.update(+id, updateMaestroDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maestrosService.remove(+id);
  }

  @Get('filtro/logico')
  filtrarDocentesLogica() {
   return this.maestrosService.filtrarDocentesLogica();
  }

} 