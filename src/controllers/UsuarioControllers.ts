import { Request, Response, } from "express";
import { UsuarioServices, UsuarioLoginServices } from "../services/UsuarioServices";

const service = new UsuarioServices()
const serviceLogin = new UsuarioLoginServices()

class Usuario {
    async cadastrar(req: Request, res: Response) {
        const { nome, email, senha } = req.body
        const criar = await service.cadastrarUsuario({ nome, email, senha })
        return res.json(criar)
    }
    async usuarios(req: Request, res: Response) {
        const usuarios = await service.ListarUsuarios()
        return res.json(usuarios)
    }
    async usuarioID(req: Request, res: Response) {
        const { id } = req.params
        const usuario = await service.ListarUsuarioID(id)
        return res.json(usuario)
    }
    async editar(req: Request, res: Response) {
        const { id } = req.params
        const { nome, email } = req.body
        const editarUsuario = await service.editarUsuario(id, nome, email)
        return res.json(editarUsuario)
    }
    async apagar(req: Request, res: Response) {
        const { id } = req.params
        const apagarUsuario = await service.apagarUsuario(id)
        return res.json(apagarUsuario)
    }

    async login(req: Request, res: Response) {
        const { email, senha } = req.body
        const usuarioLogin = await serviceLogin.login(email, senha)
        return res.json(usuarioLogin)
    }

    // ---> OBS: ESSE CODIGO DEVE SER EXCLUÍDO APÓS A FINALIZAÇÃO DO PROJETO
    async rotaExclusaoTeste(req: Request, res: Response) {
        const usuarioexistente = await serviceLogin.rotaExclusaoTeste()
        return res.json(usuarioexistente)
    }
}

const UsuarioControllers = new Usuario()

export { UsuarioControllers }