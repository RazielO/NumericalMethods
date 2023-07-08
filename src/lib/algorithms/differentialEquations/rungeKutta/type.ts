export interface SecondOrderStep {
    iteration: number,
    xi: number,
    yi: number,
    k1: number,
    k2: number
}

export interface FourthOrderStep {
    iteration: number,
    xi: number,
    yi: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number
}