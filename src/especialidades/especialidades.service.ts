import { Injectable } from '@nestjs/common';
// CAMBIO: Importar el servicio académico en lugar del PrismaService general
import { PrismaAcademicoService } from '../prisma/prisma-academico.service';

@Injectable()
export class EspecialidadesService {
  // CAMBIO: Inyectar PrismaAcademicoService
  constructor(private prisma: PrismaAcademicoService) {}

  create(data: any) {
    return this.prisma.especialidad.create({ data });
  }

  findAll() {
    return this.prisma.especialidad.findMany();
  }

  findOne(id: number) {
    return this.prisma.especialidad.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.especialidad.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.especialidad.delete({ where: { id } });
  }
}