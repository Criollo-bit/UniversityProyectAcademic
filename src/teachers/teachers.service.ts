import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaAcademicService } from '../prisma/prisma-academic.service';
import { Teacher, Subject, Prisma } from '@prisma/client/academico';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaAcademicService) {}

  async findAll(): Promise<Teacher[]> { 
    return this.prisma.teacher.findMany();
  }

  async findOne(id: number): Promise<Teacher> { 
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    return teacher;
  }

  async create(data: CreateTeacherDto): Promise<Teacher> { 
    return this.prisma.teacher.create({ 
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        contractType: data.contractType || 'FULL TIME',
        isActive: data.isActive ?? true,
        careerId: data.careerId ? Number(data.careerId) : null,
      }
    }); 
  }

  async update(id: number, data: UpdateTeacherDto): Promise<Teacher> { 
    return this.prisma.teacher.update({ 
      where: { id }, 
      data: {
        ...data,
        careerId: data.careerId ? Number(data.careerId) : undefined,
      }
    }); 
  }

  async remove(id: number): Promise<Teacher> { 
    return this.prisma.teacher.delete({ where: { id } }); 
  }

  // --- Parte 1: Consultas Derivadas (Punto 1.3) ---
  async buscarDocentesEspecialistas() {
    const teachers = await this.prisma.teacher.findMany();
    const subjects = await this.prisma.subject.findMany();

    return teachers.map((teacher) => {
      const teacherSubjects = subjects.filter((s) => s.teacherId === teacher.id);
      return {
        ...teacher,
        subjects: teacherSubjects,
        totalSubjects: teacherSubjects.length
      };
    }).filter(m => m.totalSubjects > 1); // Solo los que tienen más de una
  }

  // --- REQUERIMIENTO PARTE 2.2: Operaciones Lógicos Avanzadas (AND, OR, NOT) ---
  // He modificado este método para aplicar las tres reglas solicitadas.
  async filtrarDocentesLogica() {
    return this.prisma.teacher.findMany({
      where: {
        AND: [
          { contractType: 'FULL TIME' }, // Condición 1: Tiempo completo (AND)
          {
            OR: [ // Condición 2: Filtro por nombre o apellido (OR)
              { name: { contains: 'Alan', mode: 'insensitive' } },
              { lastName: { contains: 'Turing', mode: 'insensitive' } }
            ]
          },
          {
            NOT: { isActive: false } // Condición 3: Que NO estén inactivos (NOT)
          }
        ]
      }
    });
  }

  async buscarFiltroEspecial(type: string): Promise<Teacher[]> {
    return this.prisma.teacher.findMany({
      where: { contractType: type },
    });
  }
}