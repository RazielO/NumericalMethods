import { compile, sum, type EvalFunction } from "mathjs";

export class Simpson13 {
    private f: EvalFunction;
    private a: number;
    private b: number;

    constructor(f: string, a: number, b: number) {
        this.f = compile(f);
        this.a = a;
        this.b = b;
    }

    integrate() {
        let h = (this.b - this.a) / 6;
        let fa = this.f.evaluate({ x: this.a });
        let fb = this.f.evaluate({ x: this.b });
        let fab = this.f.evaluate({ x: (this.a + this.b) / 2 });

        return h * (fa + 4 * fab + fb)
    }
}