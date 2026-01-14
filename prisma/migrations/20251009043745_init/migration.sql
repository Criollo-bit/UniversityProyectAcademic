/*
  Warnings:

  - You are about to drop the column `apellido` on the `Estudiante` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Especialidad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Estudiante` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Estudiante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estudiante" DROP COLUMN "apellido",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Especialidad_nombre_key" ON "Especialidad"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_email_key" ON "Estudiante"("email");
