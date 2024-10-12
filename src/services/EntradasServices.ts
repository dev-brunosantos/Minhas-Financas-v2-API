import { PrismaConfig } from "../config/prisma";

const { entradas } = PrismaConfig

interface DadosEntradas {
    id_ent: number;
    titulo: string;
    descricao: string;
    valor: string;
    id_usuario: string;
}

class EntradasServices {
    async cadastrarEntrada({ id_ent, titulo, descricao, valor, id_usuario }: DadosEntradas) {
        const entradaExistente = await entradas.findFirst({ where: { titulo } })
        if (!entradaExistente) {
            await entradas.create({
                data: { id_ent, titulo, descricao, valor, id_usuario }
            })
            return "Nova entrada cadastrada com sucesso."
        }
        return "Ja existe uma entrada cadastrada com esse titulo."
    }
    async mostrarEntrada() {
        const todasEntradas = await entradas.findMany({
            select: {
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
    async buscarEntradaNome(titulo: string) {
        const nomeEntrada = await entradas.findFirst({
            where: { titulo },
            select: {
                titulo: true,
                descricao: true,
                valor: true,
                dt_criacao: true
            }
        })
        if(nomeEntrada) {
            return nomeEntrada
        }
        return "Não foi encontrado nenhuma entrada com o nome informado."
    }
    async filtrarEntradaID(id_ent: number) {
        const idEntrada = await entradas.findFirst({ where: { id_ent }})
        if(idEntrada) { return idEntrada }
        return "O ID informado não esta vinculado a nenhuma entrada cadastrada no sistema."
    }
    async editarEntrada(titulo:string, descricao:string, valor:string) {
        const editarEntrada = await entradas.findFirst({ where: { titulo }})
        if(editarEntrada) {
            const id_ent = editarEntrada.id_ent
            const id_usuario = editarEntrada.id_usuario

            const editar = await entradas.update({
                where: { titulo },
                data: { id_ent, titulo, descricao, valor, id_usuario }
            })

            return {
                status: `A entrada ${editarEntrada.titulo} foi editada com sucesso.`,
                dados_antigos: editarEntrada,
                dados_atualizados: editar
            }
        }
        return `Não existe nenhuma entrada cadastrada com o titulo informado: '${titulo}'`
    }
    async apagarEntrada(id_ent: number) {
        const apagar = await entradas.findFirst({ where: { id_ent }})
        if(!apagar) { 
            return "Não existe nenhuma entrada com o ID informado."
        }

        await entradas.delete({ where: { id_ent }})
        return `A entrada ${apagar.titulo} foi deletada.` 
    }
}

export { EntradasServices }