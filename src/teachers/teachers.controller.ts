import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
 
const JwtAuthGuard = AuthGuard('jwt');

@Controller('teachers') 
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('specialists')
  buscarDocentesEspecialistas() { 
    return this.teachersService.buscarDocentesEspecialistas(); 
  }

  @Get('advanced-filter')
  buscarFiltroEspecial(@Query('type') type: string) { 
    return this.teachersService.buscarFiltroEspecial(type); 
  }

  // --- NUEVO: REQUERIMIENTO PARTE 2.2 (AND, OR, NOT) ---
  // He añadido esta ruta para que coincida con tu Postman y no te dé error 400.
  @Get('logic-filter')
  filtrarDocentesLogicaPostman() {
    return this.teachersService.filtrarDocentesLogica();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTeacherDto: UpdateTeacherDto
  ) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.remove(id);
  }

  @Get('filter/logic')
  filtrarDocentesLogica() {
    return this.teachersService.filtrarDocentesLogica();
  }
}