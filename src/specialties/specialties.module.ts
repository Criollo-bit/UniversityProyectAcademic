import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { PrismaAcademicService } from '../prisma/prisma-academic.service';

@Module({
  controllers: [SpecialtiesController],
  providers: [
    SpecialtiesService, 
    PrismaAcademicService 
  ],
})
export class SpecialtiesModule {}