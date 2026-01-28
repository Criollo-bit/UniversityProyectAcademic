import { Injectable } from '@nestjs/common';
import { PrismaMainService } from '../prisma/prisma--main.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { Career, Prisma } from '@prisma/client';

@Injectable()
export class CareersService {
  constructor(private prisma: PrismaMainService) {}

  async create(data: CreateCareerDto): Promise<Career> {
    return this.prisma.career.create({
      data: {
        name: data.name
      }
    });
  }

  async findAll(): Promise<Career[]> {
    return this.prisma.career.findMany();
  }

  async findOne(id: number): Promise<Career | null> {
    return this.prisma.career.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCareerDto): Promise<Career> {
    return this.prisma.career.update({ 
      where: { id }, 
      data: data as Prisma.CareerUpdateInput 
    });
  }

  async remove(id: number): Promise<Career> {
    return this.prisma.career.delete({ where: { id } });
  }
}