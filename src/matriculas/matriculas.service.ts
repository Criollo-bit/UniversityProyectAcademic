import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaAcademicoService } from '../prisma/prisma-academico.service';

@Injectable()
export class MatriculasService {
  // Inyectamos ambos servicios para poder validar a través de las dos BD
  constructor(
    private prisma: PrismaService,
    private academicoPrisma: PrismaAcademicoService,
  ) {}

  async matricular(data: any) {
    // 1. Validar disponibilidad de cupos en la base de datos ACADÉMICA
    const materia = await this.academicoPrisma.materia.findUnique({
      where: { id: data.materiaId },
    });

    if (!materia) throw new BadRequestException('La materia no existe');
    if (materia.cupos <= 0) throw new BadRequestException('No hay cupos disponibles');

    // 2. Ejecutar la transacción en la base de datos de MATRÍCULAS
    // Nota: El descuento de cupos lo hacemos manualmente después para cumplir el flujo
    return this.prisma.$transaction(async (tx) => {
      // Registrar la matrícula
      const nuevaMatricula = await tx.matricula.create({
        data: {
          estudianteId: data.estudianteId,
          materiaId: data.materiaId,
          periodoAcademico: data.periodoAcademico,
        },
      });

      // 3. Actualizar los cupos en la otra base de datos (ACADÉMICA)
      await this.academicoPrisma.materia.update({
        where: { id: data.materiaId },
        data: { cupos: materia.cupos - 1 },
      });

      return nuevaMatricula;
    });
  }

  async findAll() {
    return this.prisma.matricula.findMany();
  }
}