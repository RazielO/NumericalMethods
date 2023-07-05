import { mean, sum } from "mathjs";

export class LeastSquares {
    private x: number[];
    private y: number[];
    private slope: number;
    private yIntercept: number;

    /**
     * @param x values
     * @param y values
     */
    constructor(x: number[], y: number[]) {
        this.x = x;
        this.y = y;
        this.slope = this.calcSlope();
        this.yIntercept = this.calcYIntercept();
    }

    /**
     * m = ((sum x*y * length x) - (sum x * sum y)) / ((length x * sum x^2) - (sum x)^2)
     *
     * @returns double Valor de a1
     */
    private calcSlope(): number {
        let sumX = sum(this.x);
        let sumY = sum(this.y);
        let xy = sum(this.x.map((val, i) => val * this.y[i]));
        let x2 = sum(this.x.map(x => x ** 2));

        let dividend = (xy * this.x.length) - (sumX * sumY);
        let divider = (this.x.length * x2) - Math.pow(sumX, 2);

        return dividend / divider;
    }

    /**
     * b = meanY - (m * meanX)
     *
     * @returns number y-intercept value
     */
    private calcYIntercept(): number {
        return mean(this.y) - (this.slope * mean(this.x));
    }

    /**
     * @return number How good is the approximation
     */
    rValue(): number {
        let meanY = mean(this.y);
        let st = sum(this.y.map(val => (val - meanY) ** 2));
        let sr = sum(this.y.map((val, i) => (val - this.yIntercept - this.slope * this.x[i]) ** 2));

        return Math.sqrt((st - sr) / st);
    }

    /**
     * @returns string Function found on the regression
     */
    getFunction(): string {
        this.yIntercept = this.calcYIntercept();
        this.slope = this.calcSlope();

        let neg = this.slope < 0;

        return `${this.yIntercept.toFixed(6)} ${neg ? '-' : '+'} ${Math.abs(this.slope).toFixed(6)}x`;
    }
}