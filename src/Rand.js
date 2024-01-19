class Rand {
  static array(array, largo) {
    array.sort(() => Math.random() - 0.5);
    return array.slice(0, largo);
  }
  static number(min, max) {
    let number = Math.round(Math.random() * max);

    while (!(min <= number && number <= max)) {
      number = Math.round(Math.random() * max);
    }
    return number;
  }
  
  static get bool() {
    let bool = [true, false];
    Rand.array(bool);
    return bool[1];
  }
  static shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }
  /** @returns {String} */
  
  static get color() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
  }
  static getOne(...values) {
    values.sort(() => Math.random() - 0.5);
    return values[1];
  }
}

// @ts-ignore
