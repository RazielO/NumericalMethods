import { compile, type EvalFunction } from 'mathjs';
import type { GaussSeidelStep } from './type';

export class GaussSeidel {
    private matrix: number[][];
    private ep: number;
    private values: number[];
    private errors: number[];
    private expressions: EvalFunction[];

    /**
     * @param matrix Matrix to solve
     * @param ep Allowed error
     * @param values Initial values
     */
    constructor(matrix: number[][], ep: number, values: number[]) {
        this.matrix = matrix;
        this.ep = ep;
        this.values = values;
        this.expressions = this.equationsFromMatrix();
        this.errors = new Array(values.length);
    }

    /**
     * Gauss-Seidel method
     *
     * @return Array of steps
     */
    public steps(): Array<GaussSeidelStep> {
        let list: Array<GaussSeidelStep> = new Array();
        let iteration: number = 1;
        let flag: boolean = true;

        while (flag) {
            let vars: { [key: string]: number };
            let a = 97;
            let temp: number[] = new Array(this.expressions.length);

            for (let i = 0; i < this.expressions.length; i++) {
                let expr: EvalFunction = this.expressions[i];
                vars = {};
                let pointer = 0;

                for (let j = 0; j < this.expressions.length; j++) {
                    if (i !== j)
                        vars[String.fromCharCode(a + j)] = this.values[pointer];
                    pointer = pointer + 1;
                }

                temp[i] = expr.evaluate(vars);
            }

            flag = this.continue(this.values, temp, this.ep);

            let step: GaussSeidelStep = {
                iteration,
                values: this.values.map(x => x.toFixed(6)),
                newValues: temp.map(x => x.toFixed(6)),
                errors: this.errors.map(x => x.toFixed(6))
            }

            list.push(step);

            this.values = temp;
            iteration = iteration + 1;
        }

        return list;
    }

    /**
     * @param previous Previous values
     * @param current New values
     * @param ep Allowed error
     * @return boolean Should the algorithm continue
     */
    private continue(previous: number[], current: number[], ep: number): boolean {
        let flag: boolean = false;
        for (let i = 0; i < previous.length; i++) {
            let error = this.error(previous[i], current[i]);
            if (error >= ep)
                flag = true;
            this.errors[i] = error;
        }
        return flag;
    }

    /**
     * @param previous Previous value
     * @param current Current value
     * @return double Relative percent error
     */
    private error(previous: number, current: number): number {
        return Math.abs((current - previous) / current) * 100;
    }

    /**
     * @returns EvalFunction[] Array of compiled equations
     */
    private equationsFromMatrix(): EvalFunction[] {
        let size = this.matrix.length;
        let equation: string;
        let equations: string[] = new Array(this.matrix.length);

        for (let i = 0; i < size; i++) {
            let coefficient = this.matrix[i][i];
            let coefficients = this.matrix[i].slice(0, size)
                .map((x, idx) => x > 0
                    ? ` - ${x} * ${String.fromCharCode(97 + idx)}`
                    : ` + ${Math.abs(x)} * ${String.fromCharCode(97 + idx)}`)
                .filter((_, idx) => idx !== i).join(' ');
            let result = this.matrix[i][size];

            equation = `(${result} ${coefficients}) / ${coefficient}`
            equations[i] = equation;
        }

        return equations.map(equation => compile(equation));
    }
}