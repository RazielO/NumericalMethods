export interface NewtonRaphsonStep {
    iteration: number,
    x: number,
    y: number,
    deltaX: number,
    deltaY: number,
    errorX: number,
    errorY: number
};