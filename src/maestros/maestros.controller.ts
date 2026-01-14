import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common'; // <-- Importar UseGuards
import { AuthGuard } from '@nestjs/passport'; // <-- Importar AuthGuard
import { MaestrosService } from './maestros.service';
import { CreateMaestroDto } from './dto/create-maestro.dto';
import { UpdateMaestroDto } from './dto/update-maestro.dto';


const JwtAuthGuard = AuthGuard('jwt');

@Controller('maestros')
export class MaestrosController {
  constructor(private readonly maestrosService: MaestrosService) {}

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
  @Get('filtro-avanzado')
  // Usamos @Query para recibir el dato desde la URL (ej: /maestros/filtro-avanzado?tipo=COMPLETO)
  buscarFiltroEspecial(@Query('tipo') tipo: string) { 
    // Ahora sí le pasamos el argumento 'tipo' que el servicio pide
    return this.maestrosService.buscarFiltroEspecial(tipo); 
  }
}