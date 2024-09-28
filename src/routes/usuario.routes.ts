import { Router } from "express";
import { UsuarioControllers } from "../controllers/UsuarioControllers";

const UsuarioRoutes = Router()

UsuarioRoutes.post('/usuario/cadastrar', UsuarioControllers.cadastrar)
UsuarioRoutes.get('/usuario', UsuarioControllers.usuarios)
UsuarioRoutes.get('/usuario/:id', UsuarioControllers.usuarioID)
UsuarioRoutes.put('/usuario/editar/:id', UsuarioControllers.editar)
UsuarioRoutes.delete('/usuario/apagar/:id', UsuarioControllers.apagar)

export { UsuarioRoutes }