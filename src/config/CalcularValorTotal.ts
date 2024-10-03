export const calcularValorTotal = (array: any[], chave: string): number => {
    return array.reduce((acc, item) => {
        return acc + parseFloat(item[chave]);
    }, 0); // '0' é o valor inicial do acumulador
}
