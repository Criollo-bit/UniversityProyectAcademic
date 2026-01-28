import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CareersModule } from './careers/careers.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { SubjectsModule } from './subjects/subjects.module';
import { CyclesModule } from './cycles/cycles.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { PrismaMainService } from './prisma/prisma--main.service';

@Module({
  imports: [
    PrismaModule, 
    CareersModule, 
    UsersModule, 
    StudentsModule, 
    TeachersModule, 
    SpecialtiesModule, 
    SubjectsModule, 
    CyclesModule, 
    AuthModule, 
    EnrollmentsModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaMainService
  ],
})
export class AppModule {} 