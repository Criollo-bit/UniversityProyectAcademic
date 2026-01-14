/*
  Warnings:

  - You are about to drop the column `creadoEn` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `rol` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Especialidad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estudiante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Maestro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Materia` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Estudiante" DROP CONSTRAINT "Estudiante_carreraId_fkey";

-- DropForeignKey
ALTER TABLE "Maestro" DROP CONSTRAINT "Maestro_carreraId_fkey";

-- DropForeignKey
ALTER TABLE "Maestro" DROP CONSTRAINT "Maestro_especialidadId_fkey";

-- DropForeignKey
ALTER TABLE "Materia" DROP CONSTRAINT "Materia_carreraId_fkey";

-- DropIndex
DROP INDEX "Carrera_nombre_key";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "creadoEn",
DROP COLUMN "nombre",
DROP COLUMN "rol",
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Especialidad";

-- DropTable
DROP TABLE "Estudiante";

-- DropTable
DROP TABLE "Maestro";

-- DropTable
DROP TABLE "Materia";

-- CreateTable
CREATE TABLE "Matricula" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "periodoAcademico" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Matricula_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");
