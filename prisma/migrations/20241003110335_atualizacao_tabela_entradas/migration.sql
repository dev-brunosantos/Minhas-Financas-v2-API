/*
  Warnings:

  - Added the required column `titulo` to the `Entradas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entradas" ADD COLUMN     "titulo" TEXT NOT NULL;
