import { Request, Response } from "express";
import { SaidasServices } from "../services/SaidasServices";

const sercives = new SaidasServices()

class Saidas {
    async criar(req: Request, res: Response) {
        const usuario = req.id_usuario
        const { titulo, descricao, valor } = req.body
        const saidaId = Math.floor(Math.random() * 1000000000) + 1

        const novaEntrada = await sercives.cadastrarEntrada({
            id_sai: saidaId, 
            titulo, descricao, valor, 
            id_usuario: usuario
        })

        return res.json(novaEntrada)
    }
    async listar(req: Request, res: Response) {
        const saidas = await sercives.mostrarEntrada()
        return res.json(saidas)
    }
    async filtrarEntrada(req: Request, res: Response) {
        const { id } = req.params
        const saidaID = await sercives.filtrarEntradaID(parseInt(id))
        return res.json(saidaID)
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
        const apagarSaida = await sercives.apagarEntrada(parseInt(id))
        return res.json(apagarSaida)
    }
}

const SaidasControllers = new Saidas()

export { SaidasControllers }