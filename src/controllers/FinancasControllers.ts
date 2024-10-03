import e, { Request, Response } from "express";
import { PrismaConfig } from "../config/prisma";
import { calcularValorTotal } from "../config/CalcularValorTotal";

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
        let valorTotalEntrada = calcularValorTotal(entradasTotal, "valor")

        const saidasTotal = await saidas.findMany()
        let valorTotalSaida = calcularValorTotal(saidasTotal, "valor")

        const total = valorTotalEntrada - valorTotalSaida

        return res.json({ restante: total})
    }
}

export { Financas }