/*
  Warnings:

  - You are about to drop the `cuentas_contables` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cuentas_contables" DROP CONSTRAINT "cuentas_contables_cuentaPadreId_fkey";

-- DropForeignKey
ALTER TABLE "cuentas_contables" DROP CONSTRAINT "cuentas_contables_empresaId_fkey";

-- DropTable
DROP TABLE "cuentas_contables";

-- CreateTable
CREATE TABLE "plan_cuentas" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "codigoPadre" TEXT,
    "nivel" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "nombreCompleto" TEXT,
    "nombreCorto" TEXT,
    "tipoMayor" TEXT NOT NULL,
    "tipoDetalle" TEXT,
    "naturaleza" TEXT NOT NULL,
    "permiteMovimiento" BOOLEAN NOT NULL DEFAULT true,
    "esAuxiliar" BOOLEAN NOT NULL DEFAULT false,
    "nivelMaximo" INTEGER NOT NULL DEFAULT 4,
    "monedaPermitida" TEXT NOT NULL DEFAULT 'GUARANIES',
    "centroCostoObligatorio" BOOLEAN NOT NULL DEFAULT false,
    "proyectoObligatorio" BOOLEAN NOT NULL DEFAULT false,
    "requiereReferencia" BOOLEAN NOT NULL DEFAULT false,
    "requiereCliente" BOOLEAN NOT NULL DEFAULT false,
    "requiereProveedor" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_cuentas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plan_cuentas_empresaId_codigo_key" ON "plan_cuentas"("empresaId", "codigo");

-- AddForeignKey
ALTER TABLE "plan_cuentas" ADD CONSTRAINT "plan_cuentas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
