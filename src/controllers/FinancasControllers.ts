import e, { Request, Response } from "express";
import { PrismaConfig } from "../config/prisma";

const { entradas, saidas } = PrismaConfig

class Financas {
    async ValorTotalEntrada(req: Request, res: Response) {
        const entradasTotal = await entradas.findMany()
        let valor = 0;

        const total = entradasTotal.map(entrada => { 
            return valor += parseFloat(entrada.valor)
        })

        res.json(total[1])
    }
    async ValorTotalSaidas(req: Request, res: Response) {
        const saidasTotal = await saidas.findMany()
        let valor = 0;

        const total = saidasTotal.map(saida => {
            return valor += parseFloat(saida.valor) 
        })

        res.json(total)
    }
}

export { Financas }