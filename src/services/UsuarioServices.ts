import { PrismaConfig } from "../config/prisma";
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import erros from '../json/erros.usuarios.json'

interface UsuarioDados {
    nome: string;
    email: string;
    senha: string;
}

const { usuario } = PrismaConfig
const { 
    usuario_cadastrado, 
    usuarios_nao_exisentes,
    id_nao_vinculado,
    usuario_edicao_de_dados,
    apagar_dados_de_usuario,
    usuario_login 
} = erros

class UsuarioServices {
    async cadastrarUsuario({ nome, email, senha }: UsuarioDados) {
        const usurioExistente = await usuario.findFirst({ where: { email: email } })
        const senhaCriptografada = await hash(senha, 8)
        if (!usurioExistente) {
            const criar = await usuario.create({
                data: { nome, email, senha: senhaCriptografada }
            })
            return usuario_cadastrado.sucesso
        }
        return usuario_cadastrado.erro
    }

    async ListarUsuarios() {
        const usuarios = await usuario.findMany()
        if (usuarios) {
            return usuarios
        }
        return usuarios_nao_exisentes
    }
    async ListarUsuarioID(id: string) {
        const usuarioID = await usuario.findFirst({ where: { id } })
        if (usuarioID) {
            return usuarioID
        }
        return id_nao_vinculado
    }

    async editarUsuario(id: string, nome: string, email: string) {
        const usuarioId = await usuario.findFirst({ where: { id } })
        if (usuarioId) {
            const editar = await usuario.update({
                where: { id },
                data: { nome, email }
            })
            return {
                status: usuario_edicao_de_dados.sucesso,
                dados_antigos: usuarioId,
                dados_atualizados: editar
            }
        }
        return usuario_edicao_de_dados.erro
    }

    async apagarUsuario(id: string) {
        const usuarioId = await usuario.findFirst({ where: { id } })
        if (usuarioId) {
            await usuario.delete({ where: { id } })
            return apagar_dados_de_usuario.sucesso
        }return apagar_dados_de_usuario.erro 
    }
}

class UsuarioLoginServices {
    async login(email: string, senha: string) {
        const usuarioExistente = await usuario.findFirst({ where: { email } })
        if (!usuarioExistente) {
            return usuario_login.erro
        }

        const senhaDescriptografada = await compare(senha, usuarioExistente.senha)

        if (!senhaDescriptografada) {
            return usuario_login.erro_senha
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
            return usuario_login.erro_generico
        }
    }

    // ---> OBS: ESSE CODIGO DEVE SER EXCLUÍDO APÓS A FINALIZAÇÃO DO PROJETO
    async rotaExclusaoTeste() {
        const usuarios = await usuario.findMany()
        
        if(usuarios) {
           usuarios.forEach( async (user) => {
            await usuario.delete({ where: { id: user.id }})
           }) 
           return "Usuários excluídos do sistema."
        }
        
        return  "Nenhum usuário cadastrado no sistema."
    }
}

export { UsuarioServices, UsuarioLoginServices }