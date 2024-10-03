export const calcularValorTotal = (array: any[], chave: string): number => {
    return array.reduce((res, item) => {
        return res + parseFloat(item[chave]);
    }, 0);
}
