export function range(start: number, end: number, step: number): number[] {
    let array = new Array();
    for (let i = start; i <= end; i += step) array.push(i);
    return array;
}