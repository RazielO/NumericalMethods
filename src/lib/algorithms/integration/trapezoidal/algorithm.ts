import { compile, sum, type EvalFunction } from "mathjs";

export class Trapezoidal {
    private f: EvalFunction;
    private a: number;
    private b: number;
    private n: number;

    constructor(f: string, a: number, b: number, n: number) {
        this.f = compile(f);
        this.a = a;
        this.b = b;
        this.n = n;
    }

    integrate() {
        let h = (this.b - this.a) / this.n;
        let r = (this.f.evaluate({ x: this.a }) + this.f.evaluate({ x: this.b })) / 2
        let s = sum([...new Array(this.n).keys()].map(i => this.f.evaluate({ x: this.a + h * i })));

        return h * (r + s);
    }
}