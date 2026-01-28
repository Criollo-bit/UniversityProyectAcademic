import { Injectable } from '@nestjs/common'; 
import { PrismaAcademicService } from '../prisma/prisma-academic.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Prisma } from '@prisma/client/academico';

@Injectable()
export class SpecialtiesService { 
  constructor(private prisma: PrismaAcademicService) {}

  async create(data: CreateSpecialtyDto) {
    return this.prisma.specialty.create({ 
      data: data as unknown as Prisma.SpecialtyCreateInput 
    });
  }

  async findAll() {
    return this.prisma.specialty.findMany();
  }

  async findOne(id: number) {
    return this.prisma.specialty.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateSpecialtyDto) {
    return this.prisma.specialty.update({ 
      where: { id }, 
      data: data as unknown as Prisma.SpecialtyUpdateInput 
    });
  }

  async remove(id: number) {
    return this.prisma.specialty.delete({ where: { id } });
  }
}