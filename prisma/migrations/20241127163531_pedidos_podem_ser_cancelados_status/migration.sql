/*
  Warnings:

  - You are about to drop the column `ative` on the `Pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "ative",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ativo';
