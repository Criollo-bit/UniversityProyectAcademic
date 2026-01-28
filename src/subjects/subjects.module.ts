import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { PrismaAcademicService } from '../prisma/prisma-academic.service'; 

@Module({
  controllers: [SubjectsController],
  providers: [
    SubjectsService, 
    PrismaAcademicService 
  ],
  exports: [SubjectsService]
})
export class SubjectsModule {}