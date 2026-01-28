import { Injectable } from '@nestjs/common';
import { PrismaMainService } from '../prisma/prisma--main.service';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';
import { Cycle, Prisma } from '@prisma/client';

@Injectable()
export class CyclesService {
  constructor(private prisma: PrismaMainService) {}

  async create(data: Prisma.CycleCreateInput): Promise<Cycle> {
    return this.prisma.cycle.create({ data });
  }

  async findAll(): Promise<Cycle[]> {
    return this.prisma.cycle.findMany();
  }

  async findOne(id: number): Promise<Cycle | null> {
    return this.prisma.cycle.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.CycleUpdateInput): Promise<Cycle> {
    return this.prisma.cycle.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Cycle> {
    return this.prisma.cycle.delete({ where: { id } });
  }
}