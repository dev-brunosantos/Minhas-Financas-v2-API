import { Request, Response, NextFunction } from 'express'

export default function ValidarCampos(req: Request, res: Response, next: NextFunction) {
    const { nome, email, senha } = req.body
    // const { titulo, descricao, valor } = req.body
    
    if(!nome.trim() || !email.trim() || !senha.trim() ) {
        return res.json({ erro: "Todos os campos devem ser preenchidos."})
    }
    // if(!titulo.trim() || !descricao.trim() || !valor.trim() ) {
    //     return res.json({ erro: "Todos os campos devem ser preenchidos."})
    // }
    return next()
}