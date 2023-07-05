import { GaussJordan } from "$lib/algorithms/equationSolving/gaussJordan/algorithm";
import { mean, simplify, sum } from "mathjs";

export class Polynomial {
    private x: number[];
    private y: number[];
    private degree: number;
    private results: number[];
    private equation: string;

    /**
     * Constructor de la clase
     *
     * @param x Valores de x
     * @param y Valores de y
     * @param orden Orden del polinomio
     */
    constructor(x: number[], y: number[], degree: number) {
        this.x = x;
        this.y = y;
        this.degree = degree;
        this.results = new Array();
        this.equation = '';
    }

    /**
     * Sumatoria de X^m * Y
     *
     * @param x Valores de x
     * @param y Valores de y
     * @param m Valor de m
     *
     * @return Double Sumatoria de X^m * Y
     */
    private sumXmY(x: number[], y: number[], m: number): number {
        return sum(x.map((xi, i) => (Math.pow(xi, m) * y[i])));
    }

    /**
     * Sumatoria de x^m
     *
     * @param x Valores de x
     * @param m Valor de m
     *
     * @return Double Sumatoria de x^m
     */
    private sumXm(x: number[], m: number): number {
        return sum(x.map(xi => xi ** m));
    }

    /**
     * Llena la matriz con sumatorias
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
     * Calcula st
     *
     * @return double Regresa st
     */
    private calcSt(): number {
        let meanY = mean(this.y);
        return sum(this.y.map(yi => (yi - meanY) ** 2));
    }

    /**
     * Calcula sr
     *
     * @return double Regresa sr
     */
    private calcSr(): number {
        return sum(this.x.map((xi, i) => this.evalSr(xi, this.y[i]) ** 2));
    }

    /**
     * Hace las iteraciones de sr;
     *
     * @param x1 Valor de xi
     * @param y1 Valor de yi
     * @return double Regresa una evaluacion de sr
     */
    private evalSr(x1: number, y1: number): number {
        let value = y1;

        for (let i = 0; i < this.degree + 1; i++)
            value = value - (this.results[i] * x1 ** i);

        return value;
    }

    /**
     * Calcula la ecuacion
     *
     * @return String Regresa la ecuacion
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
     * Calcula que tan buena fue la aproximacion
     *
     * @return String Regresa el valor de r
     */
    rValue(): number {
        let st = this.calcSt();
        let sr = this.calcSr();

        return Math.sqrt(((st - sr) / st));
    }
}