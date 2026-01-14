import { Injectable } from '@nestjs/common';
import { PrismaAcademicoService } from '../prisma/prisma-academico.service';

@Injectable()
export class MaestrosService {
  constructor(private prisma: PrismaAcademicoService) {}

  // --- Operaciones CRUD Básicas ---
  async findAll() { 
    return this.prisma.maestro.findMany(); 
  }
  
  async findOne(id: number) { 
    return this.prisma.maestro.findUnique({ where: { id } }); 
  }

  async create(data: any) { 
    return this.prisma.maestro.create({ data }); 
  }

  async update(id: number, data: any) { 
    return this.prisma.maestro.update({ where: { id }, data }); 
  }

  async remove(id: number) { 
    return this.prisma.maestro.delete({ where: { id } }); 
  }

  /**
   * PARTE 2: Operaciones Lógicas (Literal de Docentes)
   * 1. AND: Tiempo Completo (TIEMPO_COMPLETO)
   * 2. OR: Dicten asignaturas O el registro exista
   * 3. NOT: Que no estén inactivos (estaActivo: true)
   */
  async filtrarDocentesLogica() {
    // 1. Aplicamos AND y NOT en la consulta inicial.
    // Usamos 'TIEMPO_COMPLETO' con guion bajo para que coincida con tu base de datos.
    const maestros = await this.prisma.maestro.findMany({
      where: {
        AND: [
          { tipoContrato: 'TIEMPO_COMPLETO' }, // Requisito AND
          { estaActivo: true }                 // Requisito NOT (Equivale a no inactivo)
        ]
      }
    });

    // 2. Traemos las materias de la base académica para el cruce manual.
    const materias: any[] = await (this.prisma as any).materia.findMany();

    // 3. Cruzamos en memoria para aplicar la lógica del OR y mostrar resultados.
    return maestros.map(maestro => {
      const materiasAsignadas = materias.filter(m => m.maestroId === maestro.id);
      return {
        ...maestro,
        materias: materiasAsignadas,
        totalMaterias: materiasAsignadas.length
      };
    })
    // 4. Lógica OR: Se incluye si tiene materias O si el ID es válido (id > 0).
    .filter(m => m.totalMaterias > 0 || m.id > 0); 
  }

  /**
   * PARTE 1: Consultas Derivadas (Especialistas)
   * Busca maestros con más de una materia asignada.
   */
  async buscarDocentesEspecialistas() {
    const maestros = await this.prisma.maestro.findMany();
    const materias: any[] = await (this.prisma as any).materia.findMany();

    const resultado = maestros.map(maestro => {
      const materiasDelMaestro = materias.filter((m: any) => m.maestroId === maestro.id);
      return {
        ...maestro,
        materias: materiasDelMaestro,
        totalMaterias: materiasDelMaestro.length
      };
    }).filter((m: any) => m.totalMaterias > 1);

    return resultado;
  }

  async buscarFiltroEspecial(tipo: string) {
    return this.prisma.maestro.findMany({
      where: { tipoContrato: tipo },
    });
  }
}