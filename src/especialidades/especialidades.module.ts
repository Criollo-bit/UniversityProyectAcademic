import { Module } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { EspecialidadesController } from './especialidades.controller';
import { PrismaAcademicoService } from '../prisma/prisma-academico.service';

@Module({
  controllers: [EspecialidadesController],
  providers: [
    EspecialidadesService, 
    PrismaAcademicoService 
  ],
})
export class EspecialidadesModule {}