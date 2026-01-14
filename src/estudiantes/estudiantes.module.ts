import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { PrismaEstudiantesService } from '../prisma/prisma-estudiantes.service';

@Module({
  controllers: [EstudiantesController],
  providers: [EstudiantesService, PrismaEstudiantesService],
  exports: [EstudiantesService],
})
export class EstudiantesModule {} // Asegúrate de que esta línea esté al final