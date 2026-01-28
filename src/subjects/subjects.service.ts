import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaAcademicService } from '../prisma/prisma-academic.service';  
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from '@prisma/client/academico';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaAcademicService) {}

  async create(data: any): Promise<Subject> {
    return this.prisma.subject.create({ 
      data: {
        name: data.name,
        careerId: Number(data.careerId),
        capacity: Number(data.slots || data.capacity), // Usamos capacity que es el real
      }
    });
  }

  async findAll(): Promise<Subject[]> {
    return this.prisma.subject.findMany();
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.prisma.subject.findUnique({ where: { id } });
    if (!subject) throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    return subject;
  }

  async update(id: number, data: any): Promise<Subject> {
    return this.prisma.subject.update({ 
      where: { id }, 
      data: {
        name: data.name,
        careerId: data.careerId ? Number(data.careerId) : undefined,
        capacity: data.slots || data.capacity ? Number(data.slots || data.capacity) : undefined,
      }
    });
  }

  async remove(id: number): Promise<Subject> {
    return this.prisma.subject.delete({ where: { id } });
  }

  // Parte 1: Consultas Derivadas
  async findByCareer(careerId: number): Promise<Subject[]> {
    return this.prisma.subject.findMany({
      where: { careerId: Number(careerId) }
    });
  }

  // Parte 4: Lógica de Cupos (Usando 'capacity')
  async decrementSlots(id: number) {
    const subject = await this.findOne(id);

    if (subject.capacity <= 0) {
      throw new BadRequestException(`No hay cupos disponibles para la materia: ${subject.name}`);
    }

    return this.prisma.subject.update({
      where: { id },
      data: { capacity: { decrement: 1 } }
    });
  }

  async matricular(id: number, data: { studentId: number }) { 
    const subject = await this.findOne(id);
    return {
      message: `Validación de cupo exitosa para: ${subject.name}`,
      subjectId: id,
      studentId: data.studentId,
      availableSlots: subject.capacity - 1,
      date: new Date() 
    };
  }
}