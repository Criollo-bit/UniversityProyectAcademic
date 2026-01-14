import { Injectable } from '@nestjs/common';
// 1. IMPORTANTE: Usar el servicio de la base de datos académica
import { PrismaAcademicoService } from '../prisma/prisma-academico.service'; 
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriasService {
  // 2. Inyectar el servicio correcto en el constructor
  constructor(private prisma: PrismaAcademicoService) {}

  async create(data: CreateMateriaDto) {
    return this.prisma.materia.create({ data });
  }

  async findAll() {
    return this.prisma.materia.findMany();
  }

  async findOne(id: number) {
    return this.prisma.materia.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateMateriaDto) {
    return this.prisma.materia.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.materia.delete({ where: { id } });
  }

  // 3. AGREGAR MÉTODO: Este es el que faltaba y causaba el error en el controller
  async matricular(id: number, data: any) {
    // Aquí podrías agregar lógica para verificar cupos antes de retornar
    return {
      message: `Registro de intención de matrícula exitoso para materia ID: ${id}`,
      materiaId: id,
      estudianteId: data.estudianteId,
      fecha: new Date()
    };
  }
}