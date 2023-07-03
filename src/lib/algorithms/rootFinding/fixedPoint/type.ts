export interface FixedPointStep {
    iteration: number,
    x0: number,
    x1: number,
    gx1: number,
    error: number   
}