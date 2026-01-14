-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maestro" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "Maestro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Carrera_nombre_key" ON "Carrera"("nombre");

-- AddForeignKey
ALTER TABLE "Maestro" ADD CONSTRAINT "Maestro_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
