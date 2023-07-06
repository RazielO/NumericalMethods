import { GaussJordan } from "$lib/algorithms/equationSolving/gaussJordan/algorithm";
import { mean, simplify, sum } from "mathjs";

export class MultipleLinear {
    private y: number[];
    private x1: number[];
    private x2: number[];
    private results: number[] | undefined;

    /**
     * @param y y values
     * @param x1 x1 values
     * @param x2 x2 values
     */
    constructor(y: number[], x1: number[], x2: number[]) {
        this.y = y;
        this.x1 = x1;
        this.x2 = x2;
    }

    /**
     * @returns number[][] matrix filled with sums
     */
    private fillMatrix() {
        let matrix = new Array(3)
            .fill([])
            .map(() => Array(4));

        matrix[0][0] = this.y.length;
        matrix[0][1] = sum(this.x1);
        matrix[0][2] = sum(this.x2);
        matrix[0][3] = sum(this.y);

        matrix[1][0] = sum(this.x1);
        matrix[1][1] = sum(this.x1.map(xi => xi ** 2));
        matrix[1][2] = sum(this.x1.map((xi, i) => xi * this.x2[i]));
        matrix[1][3] = sum(this.x1.map((xi, i) => xi * this.y[i]));

        matrix[2][0] = sum(this.x2);
        matrix[2][1] = sum(this.x1.map((xi, i) => xi * this.x2[i]));
        matrix[2][2] = sum(this.x2.map(xi => xi ** 2));
        matrix[2][3] = sum(this.x2.map((xi, i) => xi * this.y[i]));

        return matrix;
    }

    /**
     * @returns string Function found on the regression
     */
    public getFunction() {
        let equation: string = "";

        let gaussJordan = new GaussJordan(this.fillMatrix());
        gaussJordan.steps();
        this.results = gaussJordan.results().map(x => Number.parseFloat(x));


        equation = this.results[0] !== 0 ? `${this.results[0]}` : '';
        let values = this.results.slice(1).map((x, i) => x >= 0 ? `+ ${x}*x_${i + 1}` : `${x}*x_${i + 1}`);
        equation = `${equation} ${values.join(' ')}`

        return simplify(equation, { exactFractions: false, fractionsLimit: 100 }).toTex();
    }

    /**
     * @return number How good was the approximation
     */
    rValue(): number {
        if (!this.results)
            this.getFunction();
        let meanY = mean(this.y);
        let sr = sum(this.y.map((yi, i) => (yi - this.results[0] - this.results[1] * this.x1[i] - this.results[2] * this.x2[i]) ** 2));
        let st = sum(this.y.map(yi => (yi - meanY) ** 2));

        return Math.sqrt((st - sr) / st);
    }
}