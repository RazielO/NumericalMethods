import { prod, sum } from "mathjs";

export class Lagrange {
    private xInt: number;
    private x: number[];
    private fx: number[];

    /**
     * @param x values of x
     * @param fx values of f(x)
     * @param xInt value to interpolate
     */
    constructor(x: number[], fx: number[], xInt: number) {
        this.x = x;
        this.fx = fx;
        this.xInt = xInt;
    }

    /**
     * @returns number interpolated value of f(x)
     */
    interpolate(): number {
        return sum(this.fx.map((fi, i) => this.L(i) * fi));
    }

    /**
     * @param i
     * @returns number L(i) = (x - xj) / (xi - xj)
     */
    private L(i: number): number {
        let xi = this.x[i];

        return prod(
            this.x.map(xj => (this.xInt - xj) / (xi - xj))
                .filter((_, j) => i !== j)
        );
    }
}