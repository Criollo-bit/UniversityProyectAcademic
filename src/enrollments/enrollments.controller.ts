import { Controller, Post, Body, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments') 
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  // --- REQUERIMIENTO PARTE 4: Proceso de Matriculación (Transacción) ---
  // Este método gestiona la verificación de alumno activo, cupos, registro 
  // y descuento de vacantes de forma atómica.
  @Post()
  async matricular(
    @Body() data: { studentId: number; subjectId: number; academicPeriod: string }
  ) {
    // Llama al servicio que implementa el Rollback en caso de error
    return this.enrollmentsService.matricular(data); 
  }

  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get('report/:studentId') 
  buscarPorEstudianteYPeriodo(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Query('period') period: string 
  ) {
    return this.enrollmentsService.buscarPorEstudianteYPeriodo(studentId, period);
  }
}