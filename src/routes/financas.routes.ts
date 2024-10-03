import { Router } from "express";
import { Financas } from "../controllers/FinancasControllers";

const FinancasRoutes = Router()

FinancasRoutes.get('/financas', new Financas().ValorRestante)
FinancasRoutes.get('/financas/entradas', new Financas().ValorTotalEntrada)
FinancasRoutes.get('/financas/saidas', new Financas().ValorTotalSaidas)

export { FinancasRoutes }