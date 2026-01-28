import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaMainService } from '../prisma/prisma--main.service';
import { User, Prisma } from '@prisma/client';
// Agregamos este import que faltaba:
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaMainService) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({ 
        data: {
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role
        }
      });
    } catch (error) {
      console.error("Error en Prisma:", error);
      throw new InternalServerErrorException('Error al crear el usuario en la base de datos');
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }
}