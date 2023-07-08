import { compile, type EvalFunction } from "mathjs";
import type { EulerStep } from "./type";

export class Euler {
    private f: EvalFunction;
    private x: number;
    private x0: number;
    private y0: number;
    private n: number;

    constructor(f: string, x: number, x0: number, y0: number, n: number) {
        this.f = compile(f);
        this.x0 = x0;
        this.y0 = y0;
        this.n = n;
        this.x = x;
    }

    steps(): Array<EulerStep> {
        let steps: Array<EulerStep> = new Array();
        steps.push({ iteration: 0, evaluation: 0, xi: this.x0, yi: this.y0 });

        let h = (this.x - this.x0) / this.n;
        let xi = this.x0;
        let yi = this.y0;

        for (let i = 1; i <= this.n; i++) {
            let evaluation = this.f.evaluate({ x: xi, y: yi });

            xi = this.x0 + (h * i);
            yi = yi + (h * evaluation);

            let step: EulerStep = {
                iteration: i,
                evaluation,
                xi,
                yi
            };

            steps.push(step);
        }

        return steps;
    }
}