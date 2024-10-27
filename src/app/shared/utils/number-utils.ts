export function roundToNearestFive(number: number): number {
  return Math.ceil(number * 20) / 20;
}


export function sumOf(numbers: number[]): number{
  return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
