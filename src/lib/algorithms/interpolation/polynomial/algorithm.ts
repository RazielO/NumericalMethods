import { prod } from "mathjs";

export class PolynomialInterpolation {
    private x: number[];
    private fx: number[];
    private degree: number;
    private xInt: number;

    /**
     * @param x values of x
     * @param fx values of f(x)
     * @param degree of the polynomial
     * @param xInt value to interpolate
     */
    constructor(x: number[], fx: number[], degree: number, xInt: number) {
        this.x = x;
        this.fx = fx;
        this.degree = degree;
        this.xInt = xInt;
    }

    /**
     * @returns number interpolated f(x)
     */
    public interpolate(): number {
        let matrix = this.differences();
        let result = this.fx[0];

        for (let i = 0; i < this.degree - 1; i++) {
            result += matrix[i][i] * prod(this.x.slice(0, i + 1).map(xi => this.xInt - xi));
        }

        return result;
    }

    /**
     * @returns number[][] filled with divided differences
     */
    private differences(): number[][] {
        let matrix = new Array(this.degree - 1)
            .fill([])
            .map(() => Array(this.degree - 1));

        let m = this.degree - 1;

        for (let i = 0; i <= m - 1; i++)
            matrix[i][0] = (this.fx[i + 1] - this.fx[i]) / (this.x[i + 1] - this.x[i]);

        for (let j = 1; j <= m - 1; j++)
            for (let i = j; i <= m - 1; i++)
                matrix[i][j] = (matrix[i][j - 1] - matrix[i - 1][j - 1]) / (this.x[i + 1] - this.x[i - j]);

        return matrix;
    }
}