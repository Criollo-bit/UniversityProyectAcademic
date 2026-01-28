import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Prisma } from '@prisma/client/estudiantes';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createDto: Prisma.StudentCreateInput) {
    return this.studentsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('active')
  findActivos() {
    return this.studentsService.findActivos();
  }

  // --- PARTE 2: FILTRO LÓGICO (AND) ---
  // He simplificado el acceso a los Query params para evitar el error 400.
  // Ahora aceptamos cualquier tipo de dato y lo convertimos internamente.
  @Get('complex-filter')
  async filtrarAvanzado(@Query() query: any) {
    const { careerId, period } = query;
    // Si careerId existe, lo convertimos a número, sino usamos 0.
    return this.studentsService.buscarAvanzado(Number(careerId) || 0, period);
  }

  @Get('search')
  buscarAvanzado(
    @Query('careerId') careerId: string,
    @Query('period') period: string    
  ) {
    return this.studentsService.buscarAvanzado(+careerId, period);
  }

  @Get('subjects-report')
  getReporte() {
    return this.studentsService.getReporteMaterias();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateDto: Prisma.StudentUpdateInput
  ) {
    return this.studentsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }
}