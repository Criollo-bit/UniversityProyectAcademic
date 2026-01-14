import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaAcademicoService } from '../prisma/prisma-academico.service';
import { PrismaEstudiantesService } from '../prisma/prisma-estudiantes.service';

@Injectable()
export class MatriculasService {
  constructor( 
    private prisma: PrismaService,
    private academicoPrisma: PrismaAcademicoService,
    private estudiantesPrisma: PrismaEstudiantesService,
  ) {}


  async matricular(data: any) {
    // 1. Verificar que el estudiante esta activo
    const estudiante = await this.estudiantesPrisma.estudiante.findUnique({
      where: { id: data.estudianteId },
    });

    if (!estudiante || estudiante.estado !== 'ACTIVO') {
      throw new BadRequestException('El estudiante no existe o no se encuentra ACTIVO');
    }

    // 2. Validar disponibilidad de cupos
    const materia = await this.academicoPrisma.materia.findUnique({
      where: { id: data.materiaId },
    });

    if (!materia) throw new BadRequestException('La materia no existe');
    if (materia.cupos <= 0) throw new BadRequestException('No hay cupos disponibles en esta asignatura');

    // 3. Ejecutar la operación transaccional
    let matriculaCreada = null;

    try {
      //Registrar la matricula en la BD Principal
      matriculaCreada = await this.prisma.matricula.create({
        data: {
          estudianteId: data.estudianteId,
          materiaId: data.materiaId,
          periodoAcademico: data.periodoAcademico,
        },
      });

      //Descontar el cupo en la BD Académica
      await this.academicoPrisma.materia.update({
        where: { id: data.materiaId },
        data: { cupos: materia.cupos - 1 },
      });

      return {
        message: 'Transacción completada: Matrícula registrada y cupo descontado',
        data: matriculaCreada
      };

    } catch (error) {
      //Si falla el descuento de cupos borramos la matrícula
      if (matriculaCreada) {
        await this.prisma.matricula.delete({ where: { id: matriculaCreada.id } });
      }
      throw new InternalServerErrorException('Error en la transacción. Los cambios han sido revertidos.');
    }
  }

  async findAll() {
    return this.prisma.matricula.findMany();
  }

  // mostrar matrículas de un estudiante en un periodo
  async buscarPorEstudianteYPeriodo(estudianteId: number, periodo: string) {
    return this.prisma.matricula.findMany({
      where: {
        estudianteId: estudianteId,
        periodoAcademico: periodo,
      },
    });
  }
}