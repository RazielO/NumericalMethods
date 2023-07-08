import { compile, type EvalFunction } from "mathjs";
import type { SecondOrderStep, FourthOrderStep } from "./type";

export class RungeKutta {
    private f: EvalFunction;
    private x: number;
    private x0: number;
    private y0: number;
    private h: number;

    constructor(f: string, x: number, x0: number, y0: number, h: number) {
        this.f = compile(f);
        this.x0 = x0;
        this.y0 = y0;
        this.h = h;
        this.x = x;
    }

    secondOrder(): Array<SecondOrderStep> {
        let steps: Array<SecondOrderStep> = new Array();
        steps.push({ iteration: 0, xi: this.x0, yi: this.y0, k1: 0, k2: 0 });

        let xi = this.x0;
        let yi = this.y0;

        for (let i = 1; i <= Math.abs(this.x0 - this.x) / this.h; i++) {
            let k1 = this.f.evaluate({ x: xi, y: yi });
            let k2 = this.f.evaluate({ x: xi + this.h, y: yi + this.h * k1 });
            
            xi += this.h;
            yi += (k1 + k2) * (this.h / 2);

            let step: SecondOrderStep = {
                iteration: i,
                xi: xi,
                yi: yi,
                k1,
                k2
            };
            steps.push(step);
        }

        return steps;
    }

    fourthOrder(): Array<FourthOrderStep> {
        let steps: Array<FourthOrderStep> = new Array();
        steps.push({ iteration: 0, xi: this.x0, yi: this.y0, k1: 0, k2: 0, k3:0,k4:0 });

        let xi = this.x0;
        let yi = this.y0;

        for (let i = 1; i <= Math.abs(this.x0 - this.x) / this.h; i++) {
            let k1 = this.f.evaluate({ x: xi, y: yi });
            let k2 = this.f.evaluate({ x: xi + 0.5 * this.h, y: yi + this.h * k1 * 0.5 });
            let k3 = this.f.evaluate({ x: xi + 0.5 * this.h, y: yi + this.h * k2 * 0.5 });
            let k4 = this.f.evaluate({ x: xi + this.h, y: yi + this.h * k3 });

            xi += this.h;
            yi += (k1 + 2 * k2 + 2 * k3 + k4) * (this.h / 6);

            let step: FourthOrderStep = {
                iteration: i,
                xi: xi,
                yi: yi,
                k1,
                k2,
                k3,
                k4
            };
            steps.push(step);
        }

        return steps;
    }
}