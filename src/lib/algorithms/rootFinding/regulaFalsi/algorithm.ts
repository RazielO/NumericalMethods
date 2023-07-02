import { compile, type EvalFunction } from "mathjs";
import type { RegulaFalsiStep } from "./type";

export class RegulaFalsi {
    private a: number;
    private b: number;
    private xrCurr: number;
    private xrPrev: number;
    private error: number;
    private ep: number;
    private f: EvalFunction;

    /**
     * @param a Start of range [a, b]
     * @param b End of range [a, b]
     * @param ep Allowed error
     * @param f Function f(x)
     */
    constructor(a: number, b: number, ep: number, f: string) {
        this.a = a;
        this.b = b;
        this.ep = ep;
        this.f = compile(f);
        this.xrCurr = a;
        this.xrPrev = a;
        this.error = 100;
    }

    /**
     * @returns number Root approximation
     */
    private approximation(): number {
        let fa: number = this.f.evaluate({ x: this.a });
        let fb: number = this.f.evaluate({ x: this.b });
        
        return this.b - ((fb * (this.a - this.b)) / (fa - fb));
    }

    /**
     * @return number Percent relative error
     */
    private relativeError(): number {
        return Math.abs((this.xrCurr - this.xrPrev) / this.xrCurr) * 100;
    }

    /**
     * Continue if one of the following:
     *   1. The error is more than the allowed error
     *   2. f(a) * f(Xr) != 0
     *   3. error != 0
     * @returns boolean Should the algorithm continue
     */
    private continue(): boolean {
        let fa: number = this.f.evaluate({ x: this.a });
        let fxr: number = this.f.evaluate({ x: this.xrCurr });

        return this.error > this.ep && fa * fxr !== 0 && this.error !== 0;
    }

    /**
     * The new interval is:
     *   1. If f(a) x f(xr) > 0: [xr, b]
     *   2. If f(a) x f(xr) < 0: [a, xr]
     * @returns tuple New interval [a, b]
     */
    private interval(): [number, number] {
        let fa: number = this.f.evaluate({ x: this.a });
        let fxr: number = this.f.evaluate({ x: this.xrCurr });

        if ((fa * fxr) > 0)
            return [this.xrCurr, this.b];
        else
            return [this.a, this.xrCurr];
    }

    /**
     * Bisection method:
     *   1. Calculate the root approximation
     *   2. Calculate the relative error
     *   3. Decide if the method should continue
     *   4. Select the new interval
     * @returns Array of each step
     */
    public steps(): Array<RegulaFalsiStep> {
        let list = new Array();

        let flag: boolean = true;
        let iteration: number = 1;

        while (flag && iteration < 100) {
            this.xrCurr = this.approximation();
            this.error = this.relativeError();
            flag = this.continue();
            this.xrPrev = this.xrCurr;

            let step: RegulaFalsiStep = {
                iteration: iteration,
                a: this.a.toFixed(6),
                b: this.b.toFixed(6),
                xr: this.xrCurr.toFixed(6),
                fxr: this.f.evaluate({ x: this.xrCurr }).toFixed(6),
                error: iteration === 1 ? "" : this.error.toFixed(6)
            }

            let interval = this.interval();
            this.a = interval[0];
            this.b = interval[1];

            list.push(step);
            iteration = iteration + 1;
        }
        return list;
    }
}