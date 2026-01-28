import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { PrismaMainService } from '../prisma/prisma--main.service'; 
import { PrismaAcademicService } from '../prisma/prisma-academic.service';
import { PrismaStudentsService } from '../prisma/prisma-students.service';

@Module({
  controllers: [EnrollmentsController],
  providers: [
    EnrollmentsService, 
    PrismaMainService, 
    PrismaAcademicService,
    PrismaStudentsService
  ],
})
export class EnrollmentsModule {}