export class LinearInterpolation {
    private x0: number;
    private x1: number;
    private fx0: number;
    private fx1: number;
    private x: number;
    private fx: number;
    private real: number;

    /**
     * @param x0 value of x0
     * @param x1 value of x1
     * @param fx0 value of f(x0)
     * @param fx1 value of f(x1)
     * @param x x value to interpolate
     * @param real real value off(x)
     */
    constructor(x0: number, x1: number, fx0: number, fx1: number, x: number, real: number) {
        this.x0 = x0;
        this.x1 = x1;
        this.fx0 = fx0;
        this.fx1 = fx1;
        this.x = x;
        this.real = real;
        this.fx = 0;
    }

    /**
     * @return number value of f(x) interpolated
     */
    interpolate(): number {
        this.fx = this.fx0 + ((this.fx1 - this.fx0) / (this.x1 - this.x0)) * (this.x - this.x0);
        return this.fx;
    }

    /**
     * @return number relative percentage error
     */
    error(): number {
        return Math.abs((this.real - this.fx) / this.real) * 100;
    }
}