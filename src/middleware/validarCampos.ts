import { Request, Response, NextFunction } from 'express'

export default function ValidarCampos(req: Request, res: Response, next: NextFunction) {
    const { nome, email, senha } = req.body
    
    if(!nome.trim() || !email.trim() || !senha.trim()) {
        return res.json({ erro: "Todos os campos devem ser preenchidos."})
    }
    return next()
}