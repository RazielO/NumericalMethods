import { compile, type EvalFunction } from "mathjs";
import type { NewtonRaphsonStep } from "./type";

export class NewtonRaphson {
    private x0: number;
    private x1: number;
    private error: number;
    private ep: number;
    private x1Prev: number;
    private fx0: number;
    private fDx0: number;
    private f: EvalFunction;
    private fDer: EvalFunction;

    /**
     * @param x0 Initial approximation
     * @param ep Allowed error
     * @param f Function f(x)
     * @param fDer Derivative of f(x)
     */
    constructor(x0: number, ep: number, f: string, fDer: string) {
        this.x0 = x0;
        this.ep = ep;
        this.f = compile(f);
        this.fDer = compile(fDer);
        this.x1 = x0;
        this.error = 100;
        this.x1Prev = x0;
        this.fx0 = x0;
        this.fDx0 = x0;
    }

    /**
     * @returns Calculate the next approximation f(x)/f'(x)
     */
    private calcX1(): number {
        this.fx0 = this.f.evaluate({ x: this.x0 });
        this.fDx0 = this.fDer.evaluate({ x: this.x0 });
        return this.x0 - (this.fx0 / this.fDx0);
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
     * Newton-Raphson method
     *      1. Calculate x1
     *      2. Evaluate the error
     * @return Array of steps of the algorithm
     */
    public steps(): Array<NewtonRaphsonStep> {
        let list: Array<NewtonRaphsonStep> = new Array();
        let flag: boolean = true;
        let iteration: number = 1;

        while (flag) {
            this.x1 = this.calcX1();
            flag = this.continue();

            let step: NewtonRaphsonStep = {
                iteration,
                x0: this.x0,
                x1: this.x1,
                fx0: this.fx0,
                error: this.error
            }

            this.x1Prev = this.x1;
            this.x0 = this.x1;

            list.push(step);
            iteration = iteration + 1;
        }
        
        return list;
    }
}