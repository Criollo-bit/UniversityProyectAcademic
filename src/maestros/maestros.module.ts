import { Module } from '@nestjs/common';
import { MaestrosService } from './maestros.service';
import { MaestrosController } from './maestros.controller';
import { PrismaAcademicoService } from '../prisma/prisma-academico.service'; 

@Module({
  controllers: [MaestrosController],
  providers: [
    MaestrosService, 
    PrismaAcademicoService 
  ],
})
export class MaestrosModule {}