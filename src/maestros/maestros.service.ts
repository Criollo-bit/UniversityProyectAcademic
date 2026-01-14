import { Injectable } from '@nestjs/common';
import { PrismaAcademicoService } from '../prisma/prisma-academico.service';

@Injectable()
export class MaestrosService {
  constructor(private prisma: PrismaAcademicoService) {}

  async findAll() { return this.prisma.maestro.findMany(); }
  async findOne(id: number) { return this.prisma.maestro.findUnique({ where: { id } }); }
  async create(data: any) { return this.prisma.maestro.create({ data }); }
  async update(id: number, data: any) { return this.prisma.maestro.update({ where: { id }, data }); }
  async remove(id: number) { return this.prisma.maestro.delete({ where: { id } }); }

  // Método que pide tu Controller
  async buscarFiltroEspecial(tipo: string) {
  return this.prisma.maestro.findMany({
    where: {
      tipoContrato: tipo, // Filtra en la base de datos academico_db
    },
  });
}}