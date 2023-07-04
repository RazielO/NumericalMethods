import { compile, type EvalFunction } from 'mathjs';
import type { NewtonRaphsonStep } from './type';


export class MultivariableNewtonRaphson {
    private f: EvalFunction;
    private g: EvalFunction;
    private Fx: EvalFunction;
    private Fy: EvalFunction;
    private Gx: EvalFunction;
    private Gy: EvalFunction;
    private evalF: number;
    private evalG: number;
    private evalFx: number;
    private evalFy: number;
    private evalGx: number;
    private evalGy: number;
    private x: number;
    private y: number;
    private deltaX: number;
    private deltaY: number;
    private errorX: number;
    private errorY: number;
    private x1: number;
    private y1: number;
    private ep: number;

    /**
     * Constructor de la clase
     *
     * @param f Funcion f
     * @param g Funcion g
     * @param fx Derivada parcial en x de f
     * @param fy Derivada parcial en y de f
     * @param gx Derivada parcial en x de g
     * @param gy Derivada parcial en y de g
     * @param x Valor inicial de x
     * @param y Valor inicial de y
     * @param ep Error permitido
     */
    constructor(f: string, g: string, fx: string, fy: string, gx: string, gy: string, x: number, y: number, ep: number) {
        this.f = compile(f);
        this.g = compile(g);
        this.Fx = compile(fx);
        this.Fy = compile(fy);
        this.Gx = compile(gx);
        this.Gy = compile(gy);
        this.x = x;
        this.y = y;
        this.ep = ep;
        this.evalF = 0;
        this.evalG = 0;
        this.evalFx = 0;
        this.evalFy = 0;
        this.evalGx = 0;
        this.evalGy = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.errorX = 0;
        this.errorY = 0;
        this.x1 = 0;
        this.y1 = 0;
    }

    /**
     * Calcula el error
     *
     * @param actual Valor actual
     * @param anterior Valor anterior
     * @return Double error relativo entre los valores
     */
    private error(actual: number, anterior: number): number {
        return Math.abs((actual - anterior) / actual) * 100;
    }

    /**
     * Evalua las funciones en los puntos x y
     */
    private evaluateFunctions() {
        let vars = { x: this.x, y: this.y };

        this.evalF = this.f.evaluate(vars);
        this.evalG = this.g.evaluate(vars);
        this.evalFx = this.Fx.evaluate(vars);
        this.evalGx = this.Gx.evaluate(vars);
        this.evalFy = this.Fy.evaluate(vars);
        this.evalGy = this.Gy.evaluate(vars);
    }

    /**
     * Calculo de deltas para los nuevos valores
     */
    private calculateDeltas(): void {
        this.deltaX = ((this.evalG * this.evalFy) - (this.evalF * this.evalGy)) / ((this.evalFx * this.evalGy) - (this.evalGx * this.evalFy));
        this.deltaY = ((this.evalF * this.evalGx) - (this.evalG * this.evalFx)) / ((this.evalFx * this.evalGy) - (this.evalGx * this.evalFy));
    }

    /**
     * Realiza el algoritmo Newton-Raphson multivariable
     *
     * @return List Regresa un lista de modelos con los resultados
     */
    public steps(): Array<NewtonRaphsonStep> {
        let flag: boolean = true;
        let iteration: number = 1;
        let list: Array<NewtonRaphsonStep> = new Array();

        while (flag) {
            this.evaluateFunctions();
            this.calculateDeltas();
            this.x1 = this.deltaX + this.x;
            this.y1 = this.deltaY + this.y;

            this.errorX = this.error(this.x1, this.x);
            this.errorY = this.error(this.y1, this.y);


            flag = (this.errorX > this.ep) && (this.errorY > this.ep);

            let step: NewtonRaphsonStep = {
                iteration,
                x: this.x,
                y: this.y,
                deltaX: this.deltaX,
                deltaY: this.deltaY,
                errorX: this.errorX,
                errorY: this.errorY
            };

            list.push(step);

            iteration = iteration + 1;
            this.y = this.y1;
            this.x = this.x1;
        }

        return list;
    }
}