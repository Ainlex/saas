/*
  Warnings:

  - The values [INGRESOS,GASTOS] on the enum `TipoCuenta` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoCuenta_new" AS ENUM ('ACTIVO', 'PASIVO', 'PATRIMONIO', 'INGRESO', 'GASTO');
ALTER TABLE "cuentas_contables" ALTER COLUMN "tipo" TYPE "TipoCuenta_new" USING ("tipo"::text::"TipoCuenta_new");
ALTER TYPE "TipoCuenta" RENAME TO "TipoCuenta_old";
ALTER TYPE "TipoCuenta_new" RENAME TO "TipoCuenta";
DROP TYPE "TipoCuenta_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "cuentas_contables" DROP CONSTRAINT "cuentas_contables_empresaId_fkey";

-- AlterTable
ALTER TABLE "cuentas_contables" ADD COLUMN     "descripcion" TEXT,
ALTER COLUMN "esMovimiento" SET DEFAULT true;

-- AddForeignKey
ALTER TABLE "cuentas_contables" ADD CONSTRAINT "cuentas_contables_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
