import e, { Request, Response } from "express";
import { PrismaConfig } from "../config/prisma";
import { calcularValorTotal } from "../config/CalcularValorTotal";

const { entradas, saidas } = PrismaConfig

class Financas {
    async ValorTotalEntrada(req: Request, res: Response) {
        const entradasTotal = await entradas.findMany();
        let valorTotal = calcularValorTotal(entradasTotal, "valor")
    
        res.json({ vl_entradas: valorTotal });
    }
    
    async ValorTotalSaidas(req: Request, res: Response) {
        const saidasTotal = await saidas.findMany()
        let valorTotal =  calcularValorTotal(saidasTotal, "valor")

        res.json({vl_saidas: valorTotal})
    }

    async ValorRestante(req: Request, res: Response) {
        const entradasTotal = await entradas.findMany();
        let valorTotalEntrada = calcularValorTotal(entradasTotal, "valor")

        const saidasTotal = await saidas.findMany()
        let valorTotalSaida = calcularValorTotal(saidasTotal, "valor")

        const total = valorTotalEntrada - valorTotalSaida

        return res.json({ restante: total})
    }
}

export { Financas }