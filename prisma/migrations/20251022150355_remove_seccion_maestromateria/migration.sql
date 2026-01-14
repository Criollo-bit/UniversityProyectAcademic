/*
  Warnings:

  - You are about to drop the `MaestroMateria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seccion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MaestroMateria" DROP CONSTRAINT "MaestroMateria_maestroId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MaestroMateria" DROP CONSTRAINT "MaestroMateria_materiaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Seccion" DROP CONSTRAINT "Seccion_cicloId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Seccion" DROP CONSTRAINT "Seccion_maestroMateriaId_fkey";

-- DropTable
DROP TABLE "public"."MaestroMateria";

-- DropTable
DROP TABLE "public"."Seccion";
