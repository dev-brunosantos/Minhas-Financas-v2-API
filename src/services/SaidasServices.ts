import { PrismaConfig } from "../config/prisma";

const { saidas } = PrismaConfig

interface DadosEntradas {
    id_sai: number;
    titulo: string;
    descricao: string;
    valor: string;
    id_usuario: string;
}

class SaidasServices {
    async cadastrarEntrada({ id_sai, titulo, descricao, valor, id_usuario }: DadosEntradas) {
        const entradaExistente = await saidas.findFirst({ where: { titulo } })
        if (!entradaExistente) {
            const novaEntrada = await saidas.create({
                data: { id_sai, titulo, descricao, valor, id_usuario }
            })
            return {
                status: "Nova entrada cadastrada com sucesso.",
                novaEntrada
            }
        }
        return { erro: "Ja existe uma entrada cadastrada com esse titulo." }
    }
    async mostrarEntrada() {
        const todasEntradas = await saidas.findMany()
        if (!todasEntradas) {
            return {
                erro: "Não existe nenhuma entrada cadastrada no sistema."
            }
        }

        return { todasEntradas }
    }
    async filtrarEntradaID(id_sai: number) {
        const idEntrada = await saidas.findFirst({ where: { id_sai }})
        if(idEntrada) {
            return { idEntrada }
        }
        return { erro: "O ID informado não esta vinculado a nenhuma entrada cadastrada no sistema."}
    }
    async editarEntrada(titulo:string, descricao:string, valor:string) {
        const editarEntrada = await saidas.findFirst({ where: { titulo }})
        if(editarEntrada) {
            const id_sai = editarEntrada.id_sai
            const id_usuario = editarEntrada.id_usuario

            const editar = await saidas.update({
                where: { titulo },
                data: {
                    id_sai, titulo, descricao, valor, id_usuario
                }
            })

            return {
                status: `A entrada ${editarEntrada.titulo} foi editada com sucesso.`,
                dados_antigos: editarEntrada,
                dados_atualizados: editar
            }
        }
        return { erro: `Não existe nenhuma entrada cadastrada com o titulo informado: '${titulo}'`}
    }
    async apagarEntrada(id_sai: number) {
        const apagar = await saidas.findFirst({ where: { id_sai }})
        if(!apagar) { 
            return { erro: "Não existe nenhuma entrada com o ID informado."}
        }

        await saidas.delete({ where: { id_sai }})
        return { status: `A entrada ${apagar.titulo} foi deletada.`} 
    }
}

export { SaidasServices }