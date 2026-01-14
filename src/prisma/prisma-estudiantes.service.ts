import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/estudiantes'; 
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaEstudiantesService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({ connectionString: "postgresql://postgres:090306@localhost:5432/estudiantes_db?schema=public" });
    super({ adapter: new PrismaPg(pool) } as any);
  }
  async onModuleInit() { await this.$connect(); }
}