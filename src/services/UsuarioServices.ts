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

        const { sucesso, erro } = usuario_cadastrado

        if (!usurioExistente) {
            const criar = await usuario.create({
                data: { nome, email, senha: senhaCriptografada }
            })
            return "Usuário cadastrado com sucesso."
        }
        return "Usuário ja cadastrado no sistema"
    }

    async ListarUsuarios() {
        const usuarios = await usuario.findMany()
        if (usuarios) {
            return usuarios
        }
        return "Não existe nenhum usuário cadastrado no sisitema."
    }
    async ListarUsuarioID(id: string) {
        const usuarioID = await usuario.findFirst({ where: { id } })
        if (usuarioID) {
            return usuarioID
        }
        return "O ID informado não esta vinculado a nenhum usuário."
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
        return "O ID informado não esta vinculado a nenhum usuário."
    }

    async apagarUsuario(id: string) {
        const usuarioId = await usuario.findFirst({ where: { id } })
        if (usuarioId) {
            await usuario.delete({ where: { id } })
            return "Os dados do usuário foram exluídos do sistema."
        }return "O ID informado não esta vinculado a nenhum usuário."
    }
}

class UsuarioLoginServices {
    async login(email: string, senha: string) {
        const usuarioExistente = await usuario.findFirst({ where: { email } })
        if (!usuarioExistente) {
            return "Usuário não cadastrado no sistema."
        }

        const senhaDescriptografada = await compare(senha, usuarioExistente.senha)

        if (!senhaDescriptografada) {
            return "Senha incorreta. Tente novamente ou crie sua conta."
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
            return "Não foi possível autenticar o usuário."
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