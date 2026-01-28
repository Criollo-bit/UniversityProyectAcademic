import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaMainService } from '../prisma/prisma--main.service';
import { PrismaAcademicService } from '../prisma/prisma-academic.service';
import { PrismaStudentsService } from '../prisma/prisma-students.service';
import { Enrollment } from '@prisma/client';
import { Student } from '@prisma/client/estudiantes';
import { Subject } from '@prisma/client/academico';

@Injectable()
export class EnrollmentsService {
  constructor( 
    private prisma: PrismaMainService,
    private academicPrisma: PrismaAcademicService,
    private studentsPrisma: PrismaStudentsService,
  ) {}

  // --- REQUERIMIENTO PARTE 4: Transacción de Matriculación ---
  async matricular(data: { studentId: number; subjectId: number; academicPeriod: string }) {
    
    // 1. Verificar que el estudiante esté activo (Base Estudiantes)
    const student: Student | null = await this.studentsPrisma.student.findUnique({
      where: { id: data.studentId },
    });

    if (!student || student.status !== 'ACTIVO') {
      throw new BadRequestException('El estudiante no existe o no se encuentra ACTIVO');
    }

    // 2. Verificar disponibilidad de cupos (Base Académica)
    const subject: Subject | null = await this.academicPrisma.subject.findUnique({
      where: { id: data.subjectId },
    });

    if (!subject) throw new BadRequestException('La materia no existe');
    
    // Usamos 'capacity' según tu esquema actual para validar cupos
    if (subject.capacity <= 0) {
      throw new BadRequestException('No hay cupos disponibles en esta asignatura');
    }

    let enrollmentCreated: Enrollment | null = null;

    try {
      // 3. Registrar la matrícula en la BD Principal
      enrollmentCreated = await this.prisma.enrollment.create({
        data: {
          studentId: data.studentId,
          subjectId: data.subjectId,
          academicPeriod: data.academicPeriod,
        },
      });

      // 4. Descontar el cupo en la BD Académica
      // Se utiliza una operación atómica para restar el cupo disponible
      await this.academicPrisma.subject.update({
        where: { id: data.subjectId },
        data: { capacity: { decrement: 1 } },
      });

      return {
        message: 'Transacción completada: Matrícula registrada y cupo descontado',
        data: enrollmentCreated
      };

    } catch (error) {
      // LÓGICA DE ROLLBACK: Si el descuento de cupo falla, eliminamos la matrícula creada
      if (enrollmentCreated) {
        await this.prisma.enrollment.delete({ 
          where: { id: enrollmentCreated.id } 
        });
      }
      
      const detalleError = error instanceof Error ? error.message : 'Error desconocido';
      throw new InternalServerErrorException(`Error en la transacción: ${detalleError}. Los cambios han sido revertidos.`);
    }
  }

  async findAll(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany();
  }

  async buscarPorEstudianteYPeriodo(studentId: number, period: string): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: {
        studentId: studentId,
        academicPeriod: period,
      },
    });
  }
}