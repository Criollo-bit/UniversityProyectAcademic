import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://postgres:090306@localhost:5432/universidad_db?schema=public",
  },
});