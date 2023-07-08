import { compile, type EvalFunction } from "mathjs";

export class Simpson38 {
    private f: EvalFunction;
    private a: number;
    private b: number;

    constructor(f: string, a: number, b: number) {
        this.f = compile(f);
        this.a = a;
        this.b = b;
    }

    integrate(): number {
        let h = (this.b - this.a) / 8;
        let fa = this.f.evaluate({ x: this.a });
        let f2ab = this.f.evaluate({ x: (2 * this.a + this.b) / 3 })
        let fa2b = this.f.evaluate({ x: (this.a + 2 * this.b) / 3 })
        let fb = this.f.evaluate({ x: this.b });

        return h * (fa + 3 * f2ab + 3 * fa2b + fb);
    }
}