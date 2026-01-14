/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `apellido` to the `Maestro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `especialidadId` to the `Maestro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Maestro" ADD COLUMN     "apellido" TEXT NOT NULL,
ADD COLUMN     "especialidadId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."usuario";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especialidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Especialidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ciclo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Ciclo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaestroMateria" (
    "id" SERIAL NOT NULL,
    "maestroId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "MaestroMateria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seccion" (
    "id" SERIAL NOT NULL,
    "maestroMateriaId" INTEGER NOT NULL,
    "cicloId" INTEGER NOT NULL,

    CONSTRAINT "Seccion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Maestro" ADD CONSTRAINT "Maestro_especialidadId_fkey" FOREIGN KEY ("especialidadId") REFERENCES "Especialidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaestroMateria" ADD CONSTRAINT "MaestroMateria_maestroId_fkey" FOREIGN KEY ("maestroId") REFERENCES "Maestro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaestroMateria" ADD CONSTRAINT "MaestroMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seccion" ADD CONSTRAINT "Seccion_maestroMateriaId_fkey" FOREIGN KEY ("maestroMateriaId") REFERENCES "MaestroMateria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seccion" ADD CONSTRAINT "Seccion_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "Ciclo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
