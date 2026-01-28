import { Controller, Get, Post, Body, Param, Put, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('Subjects') 
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() data: CreateSubjectDto) {
    return this.subjectsService.create(data);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  // --- PARTE 1.2: Obtener materias por carrera ---
  @Get('career/:id')
  findByCareer(@Param('id', ParseIntPipe) id: number) {
    return this.subjectsService.findByCareer(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  // --- NUEVO: Soporte para actualizaciones parciales (Vincular Docente) ---
  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() data: any) {
    return this.subjectsService.update(+id, data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateSubjectDto) {
    return this.subjectsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  } 
  
  @Post(':id/matricular')
  async matricular(@Param('id') id: string, @Body() data: any) { 
    return this.subjectsService.matricular(+id, data);  
  }
}