export class GaussJordan {
    private matrix: number[][];
    private column: number;

    /**
     * Constructor de la clase, toma la matriz de coeficientes y se asigna un apuntador a la primera columna
     * @param matrix Matriz de coeficientes del sistema de ecuaciones
     */
    constructor(matrix: number[][]) {
        this.matrix = matrix;
        this.column = 0;
    }

    /**
     * Gauss-Jordan method:
     *   1. Divide the nth row by the value on (n, n)
     *   2. Make the nth column all zeroes but the cell (n, n)
     * @returns Array of steps (matrices)
     */
    public steps(): Array<number[][]> {
        let value;
        let list: Array<number[][]> = new Array();

        while (this.column < this.matrix.length) {
            if (this.matrix[this.column][this.column] != 1) {
                value = this.matrix[this.column][this.column];
                for (let i = 0; i <= this.matrix.length; i++)
                    this.matrix[this.column][i] = this.matrix[this.column][i] / value;
            }

            for (let i = 0; i < this.matrix.length; i++)
                if (this.matrix[i][this.column] !== 0 && i !== this.column) {
                    value = this.matrix[i][this.column];
                    for (let j = 0; j <= this.matrix.length; j++)
                        this.matrix[i][j] = this.matrix[i][j] - (value * this.matrix[this.column][j]);
                }

            list.push(this.copyMatrix());
            this.column = this.column + 1;
        }
        return list;
    }

    /**
     * @returns string[] array of results
     */
    public results(): string[] {
        return this.matrix.map(row => row[row.length - 1].toFixed(6));
    }

    /**
     * @returns number[][] Clone of the object matrix
     */
    private copyMatrix(): number[][] {
        return this.matrix.slice().map(x => x.slice());
    }
}