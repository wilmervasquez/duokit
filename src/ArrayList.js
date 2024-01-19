/** @class */
class ArrayList {
  /**
   * @static
   * @param {any[]} array
   * @returns {{}}
   */
  static frecuencies(...array) {
    return array.reduce((a, b) => {
      a[b] = a[b] ? a[b] + 1 : 1;
      return a;
    }, {});
  }
  /**
   * @static
   * @param {any[]} array
   * @returns {any[]}
   */
  static unic(...array) {
    return [...new Set(array)];
  };

  /**
   * @method
   * @static
   * @param {any[]} array
   * @returns {any[]}
   */
  static shuffle(...array) {
    return array.sort(() => Math.random() - 0.5);
  }

}