import { Router } from 'express';
import Autenticacao from '../middleware/autenticacao';
import { EntradasControllers } from '../controllers/EntradasControllers';

const EntradasRoutes = Router()

EntradasRoutes.post('/entradas/criar', Autenticacao, EntradasControllers.criar)
EntradasRoutes.get('/entradas', EntradasControllers.listar)
EntradasRoutes.get('/entradas/:id', EntradasControllers.filtrarEntrada)
EntradasRoutes.put('/entradas/editar/:id', EntradasControllers.editar)
EntradasRoutes.delete('/entradas/apagar/:id', EntradasControllers.apagar)

export { EntradasRoutes } 
