import { Request, Response, NextFunction } from 'express'

export default function ValidarCampos(req: Request, res: Response, next: NextFunction) {
    const { nome, email, senha } = req.body
    
    if(nome !== "" || email !== "" || senha !== "") {
        return next()
    }
    return res.json({ erro: "Todos os campos devem ser preenchidos."})
}