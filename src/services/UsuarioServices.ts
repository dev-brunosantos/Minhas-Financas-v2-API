import { PrismaConfig } from "../config/prisma";
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

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
            return { status: `O usuário ${usuarioId.nome} foi exluído do sistema.` }
        }
        return { erro: "O ID informado não esta vinculado a nenhum usuário." }
    }
}

class UsuarioLoginServices {
    async login(email: string, senha: string) {
        const usuarioExistente = await usuario.findFirst({ where: { email } })
        if (!usuarioExistente) {
            return { erro: "Usuário não cadastrado no sistema. " }
        }

        const senhaDescriptografada = await compare(senha, usuarioExistente.senha)

        if (!senhaDescriptografada) {
            return { erro: "Senha incorreta." }
        }

        try {
            const dia = new Date()
            const token = sign(
                {
                    id: usuarioExistente.id,
                    email: usuarioExistente.email,
                    data: dia.getDate()
                },
                process.env.SECRET_JWT as string,
                {
                    expiresIn: '1h',
                    subject: usuarioExistente.id
                }
            )
            return {
                usuarioExistente,
                token
            }
        } catch (error) {
            return { erro: "Não foi possível autenticar o usuário."}
        }
    }
}

export { UsuarioServices, UsuarioLoginServices }