class NextRule {
  constructor(textCode) {
    this.textCode = textCode;
    this.lastIndex = 0;
  }
  next(rule) {
    rule.lastIndex = this.lastIndex;
    let result = rule.exec(this.textCode);
    if (!result) return null;
    this.lastIndex = rule.lastIndex;
    console.log(result);
    return result[0];
  }
  nextIf(...rules) {
    let result;
    for (const { rule, func } of rules) {
      rule.lastIndex = this.lastIndex;
      result = rule.exec(this.textCode);
      if (!result) continue;
      this.lastIndex = rule.lastIndex;
      func(result[0]);
      break;
    }
    return result[0];
  }
}

class Store{
  static get(key){
    return JSON.parse(localStorage.getItem(key))
  }
  static set(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  }
}