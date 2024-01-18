import {namedGroups} from "./namedGroups.js";

class TextNext {
  constructor(text) {
    this.text = text;
    this.lastIndex = 0;
    this.isFinally = false;
  }
  next(rule) {
    rule.lastIndex = this.lastIndex;
    let result = rule.exec(this.text);
    if (!result) return null;
    this.lastIndex = rule.lastIndex;
    this.isFinally = this.lastIndex == this.text.length;
    return {...result};
  }
}

export default class Syntax{
  constructor(text,rules){
    this.parser = new TextNext(text)   
    this.rules = rules
  }
  compile(){
    let resultado = []
    let state = ['main'];
    
   
    while(!(this.parser.isFinally)){
      let se = false;
      
      for (let {match,name} of this.rules[state[0]]) {
        let result = this.parser.next(match)
        if(!result) continue;
      
        let namedt = namedGroups(result,name)
      
        resultado.push(...namedt);
        se = true;
        break;
      }
     

      if(se) continue;
      let result = this.parser.next(/.|\s|\n|\r/dy);
      let namedy = {name:"",value: result[0]};
      resultado.push(namedy); 
      
      

    }
    
    return resultado;
  }
 
}