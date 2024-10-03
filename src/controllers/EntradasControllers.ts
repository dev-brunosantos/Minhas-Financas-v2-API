import { Request, Response } from "express";
import { EntradasServices } from "../services/EntradasServices";

const sercives = new EntradasServices()

class Entradas {
    async criar(req: Request, res: Response) {
        const usuario = req.id_usuario
        const { titulo, descricao, valor } = req.body
        const entradaId = Math.floor(Math.random() * 1000000000) + 1

        const novaEntrada = await sercives.cadastrarEntrada({
            id_ent: entradaId, 
            titulo, descricao, valor, 
            id_usuario: usuario
        })

        return res.json(novaEntrada)
    }
    async listar(req: Request, res: Response) {
        const entradas = await sercives.mostrarEntrada()
        return res.json(entradas)
    }
    async filtrarEntrada(req: Request, res: Response) {
        const { id } = req.params
        const entradaID = await sercives.filtrarEntradaID(parseInt(id))
        return res.json(entradaID)
    }
    async editar(req: Request, res: Response) {
        
        const { titulo, descricao, valor } = req.body
        const edicao = await sercives.editarEntrada(
            titulo, descricao, valor
        )
        return res.json(edicao)
    }
    async apagar(req: Request, res: Response) {
        const { id } = req.params 
        const apagarEntrada = await sercives.apagarEntrada(parseInt(id))
        return res.json(apagarEntrada)
    }
}

const EntradasControllers = new Entradas()

export { EntradasControllers }