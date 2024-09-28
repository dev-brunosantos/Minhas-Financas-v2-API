-- CreateTable
CREATE TABLE "Entradas" (
    "id_ent" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_atualizacao" TIMESTAMP(3) NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "Entradas_pkey" PRIMARY KEY ("id_ent")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entradas_id_ent_key" ON "Entradas"("id_ent");

-- AddForeignKey
ALTER TABLE "Entradas" ADD CONSTRAINT "Entradas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
