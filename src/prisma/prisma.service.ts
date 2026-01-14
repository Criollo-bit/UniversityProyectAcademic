import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; 
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({ connectionString: "postgresql://postgres:090306@localhost:5432/universidad_db?schema=public" });
    super({ adapter: new PrismaPg(pool) } as any);
  }
  async onModuleInit() { await this.$connect(); }
}