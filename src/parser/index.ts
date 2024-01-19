import { namedGroupsy } from "../utils/index";

class TextNext {
  text: string;
  lastIndex: number;
  isFinally: boolean;
  constructor(text: string) {
    this.text = text;
    this.lastIndex = 0;
    this.isFinally = false;
  }
  next(stringRegex: string): RegExpExecArray | null {
    const captureRegex = new RegExp(stringRegex, "dy");
    captureRegex.lastIndex = this.lastIndex;
    let result = captureRegex.exec(this.text);
    if (!result) return null;
    this.lastIndex = captureRegex.lastIndex;
    this.isFinally = this.lastIndex == this.text.length;
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

    while (!this.parser.isFinally) {
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
