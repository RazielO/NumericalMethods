import { compile, sum, type EvalFunction } from "mathjs";

export class Differentiation {
    private f: EvalFunction;
    private x: number;
    private h: number;

    constructor(f: string, x: number, h: number) {
        this.f = compile(f);
        this.x = x;
        this.h = h;
    }

    forward(degree: number): number {
        let coefficients: { [key: number]: number[] } = {
            1: [-3, 4, -1],
            2: [2, -5, 4, -1],
            3: [-5, 18, -24, 14, -3],
            4: [3, -14, 26, -24, 11, -2]
        }

        let dividend = sum(coefficients[degree]
            .map((n, i) => n * this.f.evaluate({ x: this.x + this.h * i })));
        let divisor = (degree % 2 === 1 ? 2 : 1) * (this.h ** degree);

        return dividend / divisor;
    }

    backward(degree: number): number {
        let coefficients: { [key: number]: number[] } = {
            1: [3, -4, 1],
            2: [2, -5, 4, -1],
            3: [5, -18, 24, -14, 3],
            4: [3, -14, 26, -24, 11, -2]
        }

        let dividend = sum(coefficients[degree]
            .map((n, i) => n * this.f.evaluate({ x: this.x - this.h * i })));
        let divisor = (degree % 2 === 1 ? 2 : 1) * (this.h ** degree);

        return dividend / divisor;
    }

    central(degree: number): number {
        let coefficients: { [key: number]: number[] } = {
            1: [0, -1, 0, 1, 0],
            2: [0, 1, -2, 1, 0],
            3: [-1, 2, 0, -2, 1],
            4: [1, -4, 6, -4, 1]
        }

        let keys = [-2, -1, 0, 1, 2];

        let dividend = sum(coefficients[degree]
            .map((n, i) => n * this.f.evaluate({ x: this.x + this.h * keys[i] })));
        let divisor = (degree % 2 === 1 ? 2 : 1) * (this.h ** degree);

        return dividend / divisor;
    }
}