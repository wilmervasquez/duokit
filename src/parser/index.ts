import { namedGroupsy } from "../utils/index";

class TextNext {
  text: string;
  lastIndex: number;
  isEndOfText: boolean;
  constructor(text: string) {
    this.text = text;
    this.lastIndex = 0;
    this.isEndOfText = false;
  }
  next(regexp: string | RegExp): RegExpExecArray | null {
    const searchRegex = new RegExp(regexp, "dy");
    searchRegex.lastIndex = this.lastIndex;
    const result = searchRegex.exec(this.text);
    if (!result) return null;
    this.lastIndex = searchRegex.lastIndex;
    this.isEndOfText = this.lastIndex == this.text.length;
    return result;
  }
}

export default class Syntax {
  parser: TextNext;
  rules: Record<string,any>;
  constructor(text: string, rules: {}) {
    this.parser = new TextNext(text);
    this.rules = rules;
  }
  compile() {
    let resultado = [];
    let state: string[] = ["main"];

    while (!this.parser.isEndOfText) {
      let se = false;

      for (let { match, name } of this.rules[state[0]]) {
        let result = this.parser.next(match);
        if (!result) continue;

        let namedt = namedGroupsy(result, name);

        resultado.push(...namedt);
        se = true;
        break;
      }

      if (se) continue;
      let result = this.parser.next(".|\s|\n|\r")!;
      let namedy = { name: "", value: result[0] };
      resultado.push(namedy);
    }

    return resultado;
  }
}
