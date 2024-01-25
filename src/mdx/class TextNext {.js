class TextNext {
  constructor(text) {
    this.text = text;
    this.lastIndex = 0;
    this.isEndOfText = false;
  }
  next(regexp) {
    const searchRegex = new RegExp(regexp, "dy");
    searchRegex.lastIndex = this.lastIndex;
    const result = searchRegex.exec(this.text);
    if (!result) return null;
    this.lastIndex = searchRegex.lastIndex;
    this.isEndOfText = this.lastIndex == this.text.length;
    return result;
  }
} 

class ResolveSyntax{
  constructor(code,rules){
    this.code = new TextNext(code)
    this.rules = rules
  }
  exec(){
    let state = ["main"];
    let i = 0;
    let resultado = ""

    while (true) {
      for (let { pattern, onPattern } of this.rules) {
        let result = this.code.next(pattern);
        if (!result) continue;
        resultado += onPattern(result)
        break;
      }

      i++
      if (i>200 || this.code.isEndOfText) {
        break
      }
    }
    return resultado;
  }
}
let code = `
HTML(lang: esES, class:dark){
  Head(){
    meta(href:wer)
  }
  Body(){
📚  Button(text: Hola) 
    Dib(src:img)
    Flex()
    Text.render(){
      Row.lisr(){

      }
    }
  }
}
`.trim();

let tagClose = []
const config = [{
  pattern: "([a-zA-Z.]+)\\(",
  onPattern: (r)=>{
    tagClose.push(r[1])
    return `<${r[1]} `
  }
},{
  pattern: "([a-zA-Z.]+)\\s*:\\s*([a-zA-Z.]+)",
  onPattern: (r)=>{
    return `${r[1]}="${r[2]}" `
  }
},{
  pattern: "\\)\\s*(\\{)?",
  onPattern: (r)=>{
    if (!r[1]) {
      let f = `/>\n`
      tagClose.pop()
      return f
    }
    return `>`
  }
},{
  pattern: "\\}",
  onPattern: (r)=>{
    let f = `</${tagClose[tagClose.length-1]}>`
    tagClose.pop()
    return f
  }
},{
  pattern: ".|\s|\n",
  onPattern: (r)=>{
    return r[0]
  }
}]
const d = new ResolveSyntax(code,config)

console.log(d.exec())
console.log(tagClose)
