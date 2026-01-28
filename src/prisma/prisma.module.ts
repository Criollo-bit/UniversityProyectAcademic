import { Global, Module } from '@nestjs/common';
import { PrismaMainService } from './prisma--main.service';
import { PrismaAcademicService } from './prisma-academic.service';
import { PrismaStudentsService } from './prisma-students.service';

@Global()
@Module({
  providers: [
    PrismaMainService, 
    PrismaAcademicService, 
    PrismaStudentsService
  ],
  exports: [
    PrismaMainService, 
    PrismaAcademicService, 
    PrismaStudentsService
  ],
})
export class PrismaModule {} 