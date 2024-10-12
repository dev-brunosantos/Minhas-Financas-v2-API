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
    async cadastrarSaidas({ id_sai, titulo, descricao, valor, id_usuario }: DadosEntradas) {
        const entradaExistente = await saidas.findFirst({ where: { titulo } })
        if (!entradaExistente) {
            await saidas.create({
                data: { id_sai, titulo, descricao, valor, id_usuario }
            })
            return "Nova entrada cadastrada com sucesso."
        }
        return "Ja existe uma entrada cadastrada com esse titulo."
    }
    async mostrarSaidas() {
        const todasEntradas = await saidas.findMany({
            select: {
                id_sai: true,
                titulo: true,
                descricao: true,
                valor: true,
                dt_criacao: true
            }
        })
        if (!todasEntradas) {
            return "Não existe nenhuma entrada cadastrada no sistema."
        }

        return todasEntradas
    }
    async filtrarSaidaNome(titulo:string) {
        const nomeSaida = await saidas.findFirst({
            where: { titulo },
            select: {
                titulo: true,
                descricao: true,
                valor: true,
                dt_criacao: true
            }
        })
        if(nomeSaida) {
            return nomeSaida
        }

        return "Não encontramos nenhuma saida com o nome informado."
    }
    async filtrarSaidaID(id_sai: number) {
        const idEntrada = await saidas.findFirst({ where: { id_sai }})
        if(idEntrada) { return idEntrada }
        return "O ID informado não esta vinculado a nenhuma entrada cadastrada no sistema."
    }
    async editarSaida(titulo:string, descricao:string, valor:string) {
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
        return `Não existe nenhuma entrada cadastrada com o titulo informado: '${titulo}'`
    }
    async apagarSaida(id_sai: number) {
        const apagar = await saidas.findFirst({ where: { id_sai }})
        if(!apagar) { 
            return "Não existe nenhuma entrada com o ID informado."
        }

        await saidas.delete({ where: { id_sai }})
        return `A entrada ${apagar.titulo} foi deletada.` 
    }
}

export { SaidasServices }