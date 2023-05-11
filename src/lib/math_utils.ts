export function roundExposure(value: number): number {
  let newValue = 100000;
  if (value > 0.8) {
    newValue = Math.round(value);
  } else if (value > 0.08) {
    newValue = Math.round(value * 10) / 10;
  } else if (value > 0.008) {
    newValue = Math.round(value * 100) / 100;
  } else {
    newValue = Math.round(value * 1000) / 1000;
  }

  return newValue;
}

export function olderThanHours(prevTime: number, hours: number): boolean {
  const oneDay = hours * 60 * 60 * 1000;
  return Date.now() - prevTime > oneDay;
}
