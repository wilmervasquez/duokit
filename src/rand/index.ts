export function number(min: number, max: number) {
  let number = Math.round(Math.random() * max);

  while (!(min <= number && number <= max)) {
    number = Math.round(Math.random() * max);
  }
  return number;
}

export function shuffle(array:any[]) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

/** @returns {String} Color en hexadecimal*/
export function color(): string {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}
export function getOne(...values: any[]) {
  values.sort(() => Math.random() - 0.5);
  return values[1];
}

export function getRandomBoolean(): boolean {
  return Math.random() > 0.5;
}
