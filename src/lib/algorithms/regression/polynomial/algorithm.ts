import { GaussJordan } from "$lib/algorithms/equationSolving/gaussJordan/algorithm";
import { mean, simplify, sum } from "mathjs";

export class Polynomial {
    private x: number[];
    private y: number[];
    private degree: number;
    private results: number[];
    private equation: string;

    /**
     * @param x Values of x
     * @param y Values of y
     * @param degree Degree of the polynomial
     */
    constructor(x: number[], y: number[], degree: number) {
        this.x = x;
        this.y = y;
        this.degree = degree;
        this.results = new Array();
        this.equation = '';
    }

    /**
     * @param x Values of x
     * @param y Values of y
     * @param m Exponent m
     *
     * @returns number Sum of X^m * Y
     */
    private sumXmY(x: number[], y: number[], m: number): number {
        return sum(x.map((xi, i) => (Math.pow(xi, m) * y[i])));
    }

    /**
     * @param x values of x
     * @param m exponent m
     *
     * @returns number Sum of x^m
     */
    private sumXm(x: number[], m: number): number {
        return sum(x.map(xi => xi ** m));
    }

    /**
     * @returns number[][] matrix filled with sums
     */
    private createMatrix(): number[][] {
        let matrix = new Array(this.degree + 1)
            .fill([])
            .map(() => Array(this.degree + 2));

        for (let i = 0; i < this.degree + 1; i++) {
            for (let j = 0; j < this.degree + 2; j++)
                if (i == 0 && j == 0)
                    matrix[i][j] = this.x.length;
                else if (j < this.degree + 1)
                    matrix[i][j] = this.sumXm(this.x, i + j);
                else
                    matrix[i][j] = this.sumXmY(this.x, this.y, i);
        }

        return matrix;
    }

    /**
     * @returns number St value for r-value calculation
     */
    private calcSt(): number {
        let meanY = mean(this.y);
        return sum(this.y.map(yi => (yi - meanY) ** 2));
    }

    /**
     * @returns number Sr value for r-value calculation
     */
    private calcSr(): number {
        return sum(this.x.map((xi, i) => this.evalSr(xi, this.y[i]) ** 2));
    }

    /**
     * @param x1 Valor de xi
     * @param y1 Valor de yi
     * @returns double Evaluation of an Sr iteration
     */
    private evalSr(x1: number, y1: number): number {
        let value = y1;

        for (let i = 0; i < this.degree + 1; i++)
            value = value - (this.results[i] * x1 ** i);

        return value;
    }

    /**
     * @returns string Function found on the regression
     */
    getFunction(): string {
        let matrix: number[][] = this.createMatrix();
        let gaussJordan: GaussJordan = new GaussJordan(matrix);
        gaussJordan.steps();
        this.results = gaussJordan.results().map(x => Number.parseFloat(x));

        this.equation = this.results[0] !== 0 ? `${this.results[0]}` : '';
        let values = this.results.slice(1).map((x, i) => x >= 0 ? `+ ${x}*x^${i + 1}` : `${x}*x^${i + 1}`);
        this.equation = `${this.equation} ${values.join(' ')}`

        return simplify(this.equation).toString();
    }

    /**
     * @returns number How good is the approximation
     */
    rValue(): number {
        let st = this.calcSt();
        let sr = this.calcSr();

        return Math.sqrt(((st - sr) / st));
    }
}