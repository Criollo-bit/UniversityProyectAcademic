import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaAcademicService } from '../prisma/prisma-academic.service'; 

@Module({
  controllers: [TeachersController],
  providers: [
    TeachersService, 
    PrismaAcademicService 
  ],
})
export class TeachersModule {}