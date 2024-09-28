import { Request, Response,  } from "express";
import { UsuarioServices } from "../services/UsuarioServices";

const service = new UsuarioServices()

class Usuario {
    async cadastrar(req: Request, res: Response ) {
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
        const { nome, email} = req.body 
        const editarUsuario = await service.editarUsuario(id, nome, email)
        return res.json(editarUsuario)
    }
    async apagar(req: Request, res: Response) {
        const { id } = req.params
        const apagarUsuario = await service.apagarUsuario(id)
        return res.json(apagarUsuario)
    }
}

const UsuarioControllers = new Usuario()

export { UsuarioControllers }