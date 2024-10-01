import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
    sub: string;
}

const { SECRET_JWT } = process.env

export default function Autenticacao(req: Request, res: Response, next: NextFunction) {
    const autenticacao = req.headers.authorization
    const { emall, senha } = req.body;

    if(!autenticacao) {
        return res.status(401).json({
            erro: "Usuário não tem permissão para acessar a rota."
        }).end()
    }

    const token = autenticacao.split(' ')[1]

    try {
        const { sub } = verify(token, SECRET_JWT as string ) as Payload
        req.id_usuario = sub
        return next()
    } catch (error) {
        return res.status(401).json({
            erro: "Usuário não tem permissão para acessar a rota."
        }).end()
    }
}