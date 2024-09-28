import { PrismaConfig } from "../config/prisma";
import { hash } from 'bcrypt'

interface UsuarioDados {
    nome: string;
    email: string;
    senha: string;
}

const { usuario } = PrismaConfig

class UsuarioServices {
    async cadastrarUsuario({ nome, email, senha }: UsuarioDados) {
        const usurioExistente = await usuario.findFirst({ where: { email: email } })
        const senhaCriptografada = await hash(senha, 8)
        if (!usurioExistente) {
            const criar = await usuario.create({
                data: { nome, email, senha: senhaCriptografada }
            })
            return {
                status: "Usuário cadastrado com sucesso.",
                criar
            }
        }
        return { erro: "Usuário ja cadastrado no sistema" }
    }

    async ListarUsuarios() {
        const usuarios = await usuario.findMany()
        if (usuario) {
            return { usuarios }
        }
        return { erro: "Não existe nenhum usuário cadastrado no sisitema." }
    }
    async ListarUsuarioID(id: string) {
        const usuarioID = await usuario.findFirst({ where: { id } })
        if (usuarioID) {
            return { usuarioID }
        }
        return { erro: "O ID informado não esta vinculado a nenhum usuário." }
    }

    async editarUsuario(id: string, nome: string, email: string) {
        const usuarioId = await usuario.findFirst({ where: { id } })
        if (usuarioId) {
            const editar = await usuario.update({
                where: { id },
                data: { nome, email }
            })
            return {
                status: "A edição foi realizada com sucesso.",
                dados_antigos: usuarioId,
                dados_atualizados: editar
            }
        }
        return { erro: "O ID informado não esta vinculado a nenhum usuário." }
    }

    async apagarUsuario(id: string) {
        const usuarioId = await usuario.findFirst({ where: { id } })
        if (usuarioId) {
            await usuario.delete({ where: { id } })
            return { status: `O usuário ${usuarioId.nome} foi exluído do sistema.`}
        }
        return { erro: "O ID informado não esta vinculado a nenhum usuário." }
    }
}

export { UsuarioServices }