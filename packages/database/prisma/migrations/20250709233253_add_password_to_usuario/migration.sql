/*
  Warnings:

  - You are about to drop the column `createdAt` on the `empresa_modulos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `empresa_modulos` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `empresas` table. All the data in the column will be lost.
  - The `plan` column on the `empresas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `modulo_dependencias` table. All the data in the column will be lost.
  - You are about to drop the column `accion` on the `modulo_permisos` table. All the data in the column will be lost.
  - You are about to drop the column `activo` on the `modulo_permisos` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `modulo_rutas` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `modulo_rutas` table. All the data in the column will be lost.
  - You are about to drop the column `metodo` on the `modulo_rutas` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `modulo_rutas` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `modulos` table. All the data in the column will be lost.
  - You are about to drop the column `dependencias` on the `modulos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `modulos` table. All the data in the column will be lost.
  - You are about to drop the column `activo` on the `rol_permisos` table. All the data in the column will be lost.
  - You are about to drop the column `moduloPermisoId` on the `rol_permisos` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moduloId,codigo]` on the table `modulo_permisos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rolId,permisoId]` on the table `rol_permisos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fechaActualizacion` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `modulo_permisos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `modulo_rutas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permisoId` to the `rol_permisos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('STARTER', 'PROFESIONAL', 'EMPRESARIAL');

-- DropForeignKey
ALTER TABLE "empresa_modulos" DROP CONSTRAINT "empresa_modulos_moduloId_fkey";

-- DropForeignKey
ALTER TABLE "modulo_dependencias" DROP CONSTRAINT "modulo_dependencias_dependeDeId_fkey";

-- DropForeignKey
ALTER TABLE "modulo_dependencias" DROP CONSTRAINT "modulo_dependencias_moduloId_fkey";

-- DropForeignKey
ALTER TABLE "modulo_permisos" DROP CONSTRAINT "modulo_permisos_moduloId_fkey";

-- DropForeignKey
ALTER TABLE "modulo_rutas" DROP CONSTRAINT "modulo_rutas_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "modulo_rutas" DROP CONSTRAINT "modulo_rutas_moduloId_fkey";

-- DropForeignKey
ALTER TABLE "rol_permisos" DROP CONSTRAINT "rol_permisos_moduloPermisoId_fkey";

-- DropForeignKey
ALTER TABLE "rol_permisos" DROP CONSTRAINT "rol_permisos_rolId_fkey";

-- DropIndex
DROP INDEX "modulo_permisos_moduloId_nombre_accion_key";

-- DropIndex
DROP INDEX "modulo_rutas_moduloId_ruta_metodo_key";

-- DropIndex
DROP INDEX "rol_permisos_rolId_moduloPermisoId_key";

-- AlterTable
ALTER TABLE "empresa_modulos" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "fechaActivacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaDesactivacion" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "empresas" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fechaActualizacion" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "telefono" TEXT,
DROP COLUMN "plan",
ADD COLUMN     "plan" "PlanType" NOT NULL DEFAULT 'STARTER';

-- AlterTable
ALTER TABLE "modulo_dependencias" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "modulo_permisos" DROP COLUMN "accion",
DROP COLUMN "activo",
ADD COLUMN     "codigo" TEXT NOT NULL,
ADD COLUMN     "descripcion" TEXT;

-- AlterTable
ALTER TABLE "modulo_rutas" DROP COLUMN "createdAt",
DROP COLUMN "empresaId",
DROP COLUMN "metodo",
DROP COLUMN "updatedAt",
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "nombre" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "modulos" DROP COLUMN "createdAt",
DROP COLUMN "dependencias",
DROP COLUMN "updatedAt",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "icono" TEXT,
ADD COLUMN     "orden" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "rol_permisos" DROP COLUMN "activo",
DROP COLUMN "moduloPermisoId",
ADD COLUMN     "permisoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "createdAt",
DROP COLUMN "empresaId",
DROP COLUMN "updatedAt",
ADD COLUMN     "descripcion" TEXT;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "apellido" TEXT,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "empresa_configuraciones" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "valor" JSONB NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empresa_configuraciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimientos_caja" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movimientos_caja_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresa_configuraciones_empresaId_clave_key" ON "empresa_configuraciones"("empresaId", "clave");

-- CreateIndex
CREATE UNIQUE INDEX "modulo_permisos_moduloId_codigo_key" ON "modulo_permisos"("moduloId", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "rol_permisos_rolId_permisoId_key" ON "rol_permisos"("rolId", "permisoId");

-- AddForeignKey
ALTER TABLE "empresa_modulos" ADD CONSTRAINT "empresa_modulos_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo_dependencias" ADD CONSTRAINT "modulo_dependencias_dependeDeId_fkey" FOREIGN KEY ("dependeDeId") REFERENCES "modulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo_dependencias" ADD CONSTRAINT "modulo_dependencias_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo_rutas" ADD CONSTRAINT "modulo_rutas_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo_permisos" ADD CONSTRAINT "modulo_permisos_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_permisos" ADD CONSTRAINT "rol_permisos_permisoId_fkey" FOREIGN KEY ("permisoId") REFERENCES "modulo_permisos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_permisos" ADD CONSTRAINT "rol_permisos_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empresa_configuraciones" ADD CONSTRAINT "empresa_configuraciones_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_caja" ADD CONSTRAINT "movimientos_caja_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
