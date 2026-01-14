import { Injectable } from '@nestjs/common';
import { PrismaEstudiantesService } from '../prisma/prisma-estudiantes.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstudiantesService {
  constructor(
    private prismaEst: PrismaEstudiantesService, 
    private prismaMain: PrismaService,
  ) {}

  async findAll() { 
    return this.prismaEst.estudiante.findMany(); 
  }
  
  async findOne(id: number) { 
    return this.prismaEst.estudiante.findUnique({ where: { id } }); 
  }

  async create(data: any) { 
    return this.prismaEst.estudiante.create({ data }); 
  }

  async update(id: number, data: any) { 
    return this.prismaEst.estudiante.update({ where: { id }, data }); 
  }

  async remove(id: number) { 
    return this.prismaEst.estudiante.delete({ where: { id } }); 
  }
 
  async findActivos() { 
    return this.prismaEst.estudiante.findMany({ where: { estado: 'ACTIVO' } }); 
  }

  //PARTE 2: Operaciones Lógicas (AND)
  async buscarAvanzado(carreraId: number, periodo: string) {
    // 1. Buscamos estudiantes que cumplan las condiciones en la BD Estudiantes
    const estudiantes = await this.prismaEst.estudiante.findMany({
      where: {
        estado: 'ACTIVO',
        carreraId: carreraId
      }
    });

    // 2. Traemos las matrículas del periodo desde la BD Principal
    const matriculas = await this.prismaMain.matricula.findMany({
      where: { periodoAcademico: periodo }
    });

    // 3. Cruzamos manualmente en memoria para cumplir la lógica AND
    return estudiantes.filter(est => 
      matriculas.some(mat => mat.estudianteId === est.id)
    ).map(est => ({
      ...est,
      matriculas: matriculas.filter(mat => mat.estudianteId === est.id)
    }));
  }

  // PARTE 3: Consulta Nativa SQL
  async getReporteMaterias() {
    try {
      // 1. Obtenemos Estudiantes mediante consulta nativa en su propia base
      const estudiantes: any[] = await this.prismaEst.$queryRaw`SELECT "id", "nombre", "carreraId" FROM "Estudiante"`;

      // 2. Obtenemos Carreras mediante consulta nativa en la base principal
      const carreras: any[] = await this.prismaMain.$queryRaw`SELECT "id", "nombre" FROM "Carrera"`;

      // 3. Obtenemos Matrículas mediante consulta nativa en la base principal
      const matriculas: any[] = await this.prismaMain.$queryRaw`SELECT "estudianteId" FROM "Matricula"`;

      // 4. Construcción del reporte manual para unir los datos de ambas bases
      const reporte = estudiantes.map(est => {
        const carrera = carreras.find(c => c.id === est.carreraId);
        const totalMaterias = matriculas.filter(m => m.estudianteId === est.id).length;
        
        return {
          estudiante: est.nombre,
          carrera: carrera ? carrera.nombre : 'Sin carrera asignada',
          total_materias: totalMaterias
        };
      });

      // 5. Aplicamos el ordenamiento descendente
      return reporte.sort((a, b) => b.total_materias - a.total_materias);

    } catch (error: any) {
      console.error("Error en reporte SQL:", error.message);
      return { 
        message: "Error en reporte SQL nativo", 
        detalle: error.message 
      };
    }
  }
}