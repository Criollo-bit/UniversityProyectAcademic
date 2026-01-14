import { Module } from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
import { MatriculasController } from './matriculas.controller';
import { PrismaService } from '../prisma/prisma.service'; 
import { PrismaAcademicoService } from '../prisma/prisma-academico.service';
import { PrismaEstudiantesService } from '../prisma/prisma-estudiantes.service';

@Module({
  controllers: [MatriculasController],
  providers: [
    MatriculasService, 
    PrismaService, 
    PrismaAcademicoService,
    PrismaEstudiantesService
  ],
})
export class MatriculasModule {}