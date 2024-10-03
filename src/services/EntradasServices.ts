import { PrismaConfig } from "../config/prisma";

const { entradas } = PrismaConfig

class EntradasServices {
    async cadastrarEntrada() {
        const entradaExistente = await entradas.findFirst({ where: { }})
    }
    async mostrarEntrada() {

    }
    async filtrarEntradaID() {

    }
    async editarEntrada() {

    }
    async apagarEntrada() {

    }
}

export { EntradasServices }