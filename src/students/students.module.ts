import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaStudentsService } from '../prisma/prisma-students.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, PrismaStudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}