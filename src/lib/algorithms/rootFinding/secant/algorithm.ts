import { compile, type EvalFunction } from "mathjs";
import type { SecantStep } from "./type";

export class Secant {
    private x0: number;
    private x1: number;
    private fx1: number;
    private fx0: number;
    private x2: number;
    private error: number;
    private ep: number;
    private f: EvalFunction;

    /**
     * @param x0 Initial approximation
     * @param x1 Initial approximation
     * @param ep Allowed error
     * @param f Function f(x)
     */
    constructor(x0: number, x1: number, ep: number, f: string) {
        this.x0 = x0;
        this.x1 = x1;
        this.ep = ep;
        this.f = compile(f);
        this.fx1 = 0;
        this.fx0 = 0;
        this.x2 = 0;
        this.error = 100;
    }

    /**
     * @returns number value of x2
     */
    private calcX2(): number {
        this.fx1 = this.f.evaluate({ x: this.x1 });
        this.fx0 = this.f.evaluate({ x: this.x0 });
        return this.x1 - ((this.fx1 * (this.x0 - this.x1)) / (this.fx0 - this.fx1));
    }

    /**
     * Calculate the percentage relative error
     * @returns boolean The algorithm continue if the error is 0 or less than the allowed error
     */
    private continue(): boolean {
        this.error = Math.abs((this.x2 - this.x1) / this.x2) * 100;

        return this.error > this.ep && this.error !== 0;
    }

    /**
     * Secant method:
     *      1. Calculate x2
     *      2. Evaluate the error
     * @returns Array of steps of the algorithm
     */
    public steps(): Array<SecantStep> {
        let flag: boolean = true;
        let list: Array<SecantStep> = new Array();
        let iteration: number = 1;

        while (flag) {
            this.x2 = this.calcX2();
            flag = this.continue();

            let step: SecantStep = {
                iteration,
                x0: this.x0,
                x1: this.x1,
                x2: this.x2,
                fx1: this.fx1,
                error: this.error
            }

            list.push(step);

            this.x0 = this.x1;
            this.x1 = this.x2;
            iteration = iteration + 1;
        }

        return list;
    }
}