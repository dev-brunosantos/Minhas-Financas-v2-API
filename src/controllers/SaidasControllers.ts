import { Request, Response } from "express";
import { SaidasServices } from "../services/SaidasServices";

const sercives = new SaidasServices()

class Saidas {
    async criar(req: Request, res: Response) {
        const usuario = req.id_usuario
        const { titulo, descricao, valor } = req.body
        // const id_usuario = "cc826011-af9c-4c2a-bfc3-dc46de5a9701"
        const saidaId = Math.floor(Math.random() * 1000000000) + 1

        const novaEntrada = await sercives.cadastrarSaidas({
            id_sai: saidaId, 
            titulo, descricao, valor, 
            id_usuario: usuario
        })

        return res.json(novaEntrada)
    }
    async listar(req: Request, res: Response) {
        const saidas = await sercives.mostrarSaidas()
        return res.json(saidas)
    }
    async SaidaNome(req: Request, res: Response) {
        const { titulo } = req.body
        const nomeSaida = await sercives.filtrarSaidaNome(titulo)
        return res.json(nomeSaida)
    }
    async filtrarSaidas(req: Request, res: Response) {
        const { id } = req.params
        const saidaID = await sercives.filtrarSaidaID(parseInt(id))
        return res.json(saidaID)
    }
    async editar(req: Request, res: Response) {
        const { titulo, descricao, valor } = req.body
        const edicao = await sercives.editarSaida(
            titulo, descricao, valor
        )
        return res.json(edicao)
    }
    async apagar(req: Request, res: Response) {
        const { id } = req.params 
        const apagarSaida = await sercives.apagarSaida(parseInt(id))
        return res.json(apagarSaida)
    }
}

const SaidasControllers = new Saidas()

export { SaidasControllers }