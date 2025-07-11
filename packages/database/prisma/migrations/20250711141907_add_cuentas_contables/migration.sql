-- CreateEnum
CREATE TYPE "TipoCuenta" AS ENUM ('ACTIVO', 'PASIVO', 'PATRIMONIO', 'INGRESOS', 'GASTOS');

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpires" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "modulo_historico" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "moduloId" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "razon" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "modulo_historico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuentas_contables" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "TipoCuenta" NOT NULL,
    "nivel" INTEGER NOT NULL,
    "cuentaPadreId" TEXT,
    "esMovimiento" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cuentas_contables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cuentas_contables_empresaId_codigo_key" ON "cuentas_contables"("empresaId", "codigo");

-- AddForeignKey
ALTER TABLE "modulo_historico" ADD CONSTRAINT "modulo_historico_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo_historico" ADD CONSTRAINT "modulo_historico_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo_historico" ADD CONSTRAINT "modulo_historico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cuentas_contables" ADD CONSTRAINT "cuentas_contables_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cuentas_contables" ADD CONSTRAINT "cuentas_contables_cuentaPadreId_fkey" FOREIGN KEY ("cuentaPadreId") REFERENCES "cuentas_contables"("id") ON DELETE SET NULL ON UPDATE CASCADE;
