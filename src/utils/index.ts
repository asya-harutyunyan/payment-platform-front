export function addFivePercent(value: number): number {
  const updatedPrice = value * 1.05;
  return Math.ceil(updatedPrice / 50) * 50;
}
