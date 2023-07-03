import { compile, type EvalFunction } from "mathjs";
import type { FixedPointStep } from "./type";

export class FixedPoint {
    private x0: number;
    private x1: number;
    private ep: number;
    private x1Prev: number;
    private error: number;
    private g: EvalFunction;

    /**
     * @param x0 Initial fixed point
     * @param g Function g(x)
     * @param ep Allowed error
     */
    constructor(x0: number, g: string, ep: number) {
        this.x0 = x0;
        this.g = compile(g);
        this.ep = ep;
        this.x1 = x0;
        this.x1Prev = x0;
        this.error = 100;
    }

    /**
     * @returns number Evaluate x1 = g(x0)
     */
    private calcX1(): number {
        return this.g.evaluate({ x: this.x0 });
    }

    /**
     * Calculate the percentage relative error
     * @return boolean The algorithm continue if the error is 0 or less than the allowed error
     */
    private continue(): boolean {
        this.error = Math.abs((this.x1 - this.x1Prev) / this.x1) * 100;

        return this.error > this.ep && this.error !== 0;
    }

    /**
     * Fixed point method
     *      1. Calculate x1
     *      2. Evaluate the error
     * @return Array of steps of the algorithm
     */
    public steps(): Array<FixedPointStep> {
        let steps: Array<FixedPointStep> = new Array();
        let flag: boolean = true;
        let iteration: number = 1;

        while (flag && iteration < 100) {
            this.x1 = this.calcX1();
            flag = this.continue();

            let step: FixedPointStep = {
                iteration,
                x0: this.x0,
                x1: this.x1,
                gx1: this.g.evaluate({ x: this.x1 }),
                error: this.error
            };

            this.x1Prev = this.x1;
            this.x0 = this.x1;

            steps.push(step);
            iteration = iteration + 1;

        }
        return steps;
    }
}