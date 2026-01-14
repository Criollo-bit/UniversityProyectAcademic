import { Module } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { PrismaAcademicoService } from '../prisma/prisma-academico.service'; 

@Module({
  controllers: [MateriasController],
  providers: [
    MateriasService, 
    PrismaAcademicoService 
  ],
})
export class MateriasModule {}