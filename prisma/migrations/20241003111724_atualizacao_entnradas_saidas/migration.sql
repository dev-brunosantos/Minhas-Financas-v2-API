/*
  Warnings:

  - A unique constraint covering the columns `[titulo]` on the table `Entradas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[titulo]` on the table `Saidas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Entradas_titulo_key" ON "Entradas"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Saidas_titulo_key" ON "Saidas"("titulo");
