/*
  Warnings:

  - You are about to drop the `Ciclo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Matricula` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Ciclo";

-- DropTable
DROP TABLE "Matricula";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "Maestro" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL DEFAULT '',
    "tipoContrato" TEXT NOT NULL DEFAULT 'TIEMPO COMPLETO',
    "estaActivo" BOOLEAN NOT NULL DEFAULT true,
    "carreraId" INTEGER,

    CONSTRAINT "Maestro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cupos" INTEGER NOT NULL DEFAULT 30,
    "carreraId" INTEGER NOT NULL,
    "maestroId" INTEGER,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especialidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Especialidad_pkey" PRIMARY KEY ("id")
);
