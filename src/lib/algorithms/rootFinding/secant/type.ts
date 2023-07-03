export interface SecantStep {
    iteration: number,
    x0: number,
    x1: number,
    x2: number,
    fx1: number,
    error: number
}