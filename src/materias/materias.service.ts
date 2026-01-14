import { Injectable } from '@nestjs/common';
import { PrismaAcademicoService } from '../prisma/prisma-academico.service';  
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Injectable()
export class MateriasService { 
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
 
  async matricular(id: number, data: any) { 
    return {
      message: `Registro de intención de matrícula exitoso para materia ID: ${id}`,
      materiaId: id,
      estudianteId: data.estudianteId,
      fecha: new Date()
    };
  }
}