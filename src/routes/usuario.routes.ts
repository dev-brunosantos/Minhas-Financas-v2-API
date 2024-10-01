import { Router } from 'express';
import { UsuarioControllers } from "../controllers/UsuarioControllers";
import ValidarCampos from '../middleware/validarCampos';

const UsuarioRoutes = Router()

UsuarioRoutes.post('/usuario/cadastrar', ValidarCampos, UsuarioControllers.cadastrar)
UsuarioRoutes.get('/usuario', UsuarioControllers.usuarios)
UsuarioRoutes.get('/usuario/:id', UsuarioControllers.usuarioID)
UsuarioRoutes.put('/usuario/editar/:id', ValidarCampos, UsuarioControllers.editar)
UsuarioRoutes.delete('/usuario/apagar/:id', ValidarCampos, UsuarioControllers.apagar)

UsuarioRoutes.post('/login', UsuarioControllers.login)

export { UsuarioRoutes } 
