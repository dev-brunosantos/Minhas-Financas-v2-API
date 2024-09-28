-- CreateTable
CREATE TABLE "Saidas" (
    "id_sai" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_atualizacao" TIMESTAMP(3) NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "Saidas_pkey" PRIMARY KEY ("id_sai")
);

-- CreateIndex
CREATE UNIQUE INDEX "Saidas_id_sai_key" ON "Saidas"("id_sai");

-- AddForeignKey
ALTER TABLE "Saidas" ADD CONSTRAINT "Saidas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
