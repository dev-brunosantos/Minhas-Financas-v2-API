import { Router } from 'express';
import Autenticacao from '../middleware/autenticacao';
import { SaidasControllers } from '../controllers/SaidasControllers';

const SaidasRoutes = Router()

SaidasRoutes.post('/saidas/criar', Autenticacao, SaidasControllers.criar)
SaidasRoutes.get('/saidas', SaidasControllers.listar)
SaidasRoutes.get('/saidas/:id', SaidasControllers.filtrarEntrada)
SaidasRoutes.put('/saidas/editar/:id', SaidasControllers.editar)
SaidasRoutes.delete('/saidas/apagar/:id', SaidasControllers.apagar)

export { SaidasRoutes } 
