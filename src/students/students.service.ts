import { Injectable } from '@nestjs/common';
import { PrismaStudentsService } from '../prisma/prisma-students.service';
import { PrismaMainService } from '../prisma/prisma--main.service';
import { Student, Prisma } from '@prisma/client/estudiantes';
import { Enrollment, Career } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(
    private prismaEst: PrismaStudentsService, 
    private prismaMain: PrismaMainService,
  ) {}

  async findAll(): Promise<Student[]> { 
    return this.prismaEst.student.findMany();
  }
  
  async findOne(id: number): Promise<Student | null> { 
    return this.prismaEst.student.findUnique({ where: { id } }); 
  }

  async create(data: Prisma.StudentCreateInput): Promise<Student> { 
    return this.prismaEst.student.create({ data }); 
  }

  async update(id: number, data: Prisma.StudentUpdateInput): Promise<Student> { 
    return this.prismaEst.student.update({ where: { id }, data }); 
  }

  async remove(id: number): Promise<Student> { 
    return this.prismaEst.student.delete({ where: { id } }); 
  }
 
  async findActivos(): Promise<Student[]> { 
    return this.prismaEst.student.findMany({ where: { status: 'ACTIVO' } });
  }

  // --- REQUERIMIENTO PARTE 2: Operadores Lógicos (AND) ---
  // He modificado el cruce de datos para usar String(), asegurando que la 
  // comparación entre el ID de Isteps y el studentId de Main sea exitosa.
  async buscarAvanzado(careerId: number, period: string) {
    // 1. Filtramos estudiantes activos de la carrera específica usando AND
    const students: Student[] = await this.prismaEst.student.findMany({
      where: {
        AND: [
          { status: 'ACTIVO' },
          { careerId: careerId }
        ]
      }
    });

    // 2. Obtenemos las matrículas del periodo solicitado desde la base de datos Main
    const enrollments: Enrollment[] = await this.prismaMain.enrollment.findMany({
      where: { academicPeriod: period } 
    });

    // 3. Cruce de datos: Convertimos IDs a String para evitar fallos por tipos de datos
    return students.filter((est: Student) => 
      enrollments.some((mat: Enrollment) => String(mat.studentId) === String(est.id))
    ).map((est: Student) => ({
      ...est,
      // Incluimos las matrículas encontradas para la evidencia del informe
      matriculas_activas: enrollments.filter((mat: Enrollment) => String(mat.studentId) === String(est.id))
    }));
  }

  async getReporteMaterias() {
    try {
      const students = await this.prismaEst.$queryRaw<Student[]>`SELECT "id", "name", "careerId" FROM "Student"`;
      const careers = await this.prismaMain.$queryRaw<Career[]>`SELECT "id", "name" FROM "Career"`;
      const enrollments = await this.prismaMain.$queryRaw<Enrollment[]>`SELECT "studentId" FROM "Enrollment"`;

      const reporte = students.map((est: Student) => {
        const career = careers.find((c: Career) => c.id === est.careerId);
        const totalSubjects = enrollments.filter((m: Enrollment) => m.studentId === est.id).length;
        
        return {
          student: est.name,
          career: career ? career.name : 'Sin carrera asignada',
          total_subjects: totalSubjects
        };
      });

      return reporte.sort((a, b) => b.total_subjects - a.total_subjects);

    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Error desconocido';
      console.error("Error en reporte SQL:", msg);
      return { 
        message: "Error en reporte SQL nativo", 
        detalle: msg 
      };
    }
  }
}