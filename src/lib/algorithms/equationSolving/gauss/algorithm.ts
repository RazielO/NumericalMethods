export class Gauss {
    private matrix: number[][];
    private column: number;

    /**
     * @param matrix Coefficient matrix
     */
    constructor(matrix: number[][]) {
        this.matrix = matrix;
        this.column = 0;
    }

    /**
     * Metodo que realiza el algoritmo para resolver un sistema de ecuacions por Gauss:
     *      1. Dividir la n-esima fila entre el valor de la celda n, n
     *      2. Hacer ceros la n-esima columna debajo de la celda n, n
     * @return ArrayList Regresa una lista con las matrices que se van generando en el algoritmo.
     */
    steps(): Array<number[][]> {
        let valor: number;
        let steps: Array<number[][]> = new Array();

        steps.push(this.copyMatrix());

        while (this.column < this.matrix.length) {
            if (this.matrix[this.column][this.column] != 1) {
                valor = this.matrix[this.column][this.column];
                for (let i = 0; i <= this.matrix.length; i++)
                    this.matrix[this.column][i] = this.matrix[this.column][i] / valor;
            }
            for (let i = 0; i < this.matrix.length; i++)
                if (this.matrix[i][this.column] != 0 && i > this.column) {
                    valor = this.matrix[i][this.column];
                    for (let j = 0; j <= this.matrix.length; j++)
                        this.matrix[i][j] = this.matrix[i][j] - (valor * this.matrix[this.column][j]);
                }

            steps.push(this.copyMatrix());
            this.column = this.column + 1;
        }
        return steps;
    }

    /**
     * Back substitution to get the results
     * @returns string[] Array with the solutions rounded to 6 places
     */
    results(): string[] {
        let n = this.matrix.length;
        let values: number[] = Array(n);
        let results: string[] = new Array();

        values[n - 1] = this.matrix[n - 1][n];
        for (let i = n - 2; i >= 0; i--) {
            let result: number = 0;

            for (let j = i + 1; j < n; j++) {
                result += this.matrix[i][j] * values[j];
            }

            values[i] = this.matrix[i][n] - result;
        }

        for (let i = 0; i < values.length; i++)
            results[i] = values[i].toFixed(6);
        return results;
    }

    /**
     * @returns number[][] Clone of the object matrix
     */
    private copyMatrix(): number[][] {
        return this.matrix.slice().map(x => x.slice());
    }
}