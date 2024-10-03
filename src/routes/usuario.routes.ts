import { Router } from 'express';
import { UsuarioControllers } from "../controllers/UsuarioControllers";
import ValidarCampos from '../middleware/validarCampos';
import Autenticacao from '../middleware/autenticacao';

const UsuarioRoutes = Router()

UsuarioRoutes.post('/usuario/cadastrar', ValidarCampos, UsuarioControllers.cadastrar)
UsuarioRoutes.get('/usuario', UsuarioControllers.usuarios)
UsuarioRoutes.get('/usuario/:id', UsuarioControllers.usuarioID)
UsuarioRoutes.put('/usuario/editar/:id', ValidarCampos, UsuarioControllers.editar)
UsuarioRoutes.delete('/usuario/apagar/:id', Autenticacao, UsuarioControllers.apagar)

UsuarioRoutes.post('/login', UsuarioControllers.login)
UsuarioRoutes.delete('/teste', UsuarioControllers.rotaExclusaoTeste)

export { UsuarioRoutes } 
