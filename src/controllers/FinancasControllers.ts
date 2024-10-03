import e, { Request, Response } from "express";
import { PrismaConfig } from "../config/prisma";

const { entradas, saidas } = PrismaConfig

class Financas {
    async ValorTotalEntrada(req: Request, res: Response) {
        const entradasTotal = await entradas.findMany();
        let valorTotal = entradasTotal.reduce((acc, entrada) => {
            return acc + parseFloat(entrada.valor);
        }, 0); // '0' é o valor inicial do acumulador
    
        res.json({ total: valorTotal });
    }
    
    async ValorTotalSaidas(req: Request, res: Response) {
        const saidasTotal = await saidas.findMany()
        let valorTotal = saidasTotal.reduce((num, saida) => {
            return num + parseFloat(saida.valor) 
        }, 0)

        res.json(valorTotal)
    }

    async ValorRestante(req: Request, res: Response) {
        const entradasTotal = await entradas.findMany();
        let valorTotalEntrada = entradasTotal.reduce((acc, entrada) => {
            return acc + parseFloat(entrada.valor);
        }, 0)

        const saidasTotal = await saidas.findMany()
        let valorTotalSaida = saidasTotal.reduce((num, saida) => {
            return num + parseFloat(saida.valor) 
        }, 0)

        const total = valorTotalEntrada - valorTotalSaida

        return res.json({ restante: total})
    }
}

export { Financas }