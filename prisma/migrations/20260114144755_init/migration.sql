/*
  Warnings:

  - You are about to drop the `Carrera` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Especialidad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Maestro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Materia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Carrera";

-- DropTable
DROP TABLE "Especialidad";

-- DropTable
DROP TABLE "Maestro";

-- DropTable
DROP TABLE "Materia";

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'ACTIVO',
    "carreraId" INTEGER,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_email_key" ON "Estudiante"("email");
