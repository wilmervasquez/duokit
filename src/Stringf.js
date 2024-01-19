class Stringf {
  static separateQuotes(text) {
    /** @return {Array} */
    let r = "",
      comilla = false,
      separateComilla = [];

    let code = [...text];
    code.forEach((leter, index) => {
      let anterior = code[index - 1] ?? null;
      if (leter == '"' && anterior != "\\") {
        if (comilla == false) {
          separateComilla.push(r);
          r = "";
          r += leter; //es decir una comilla
        } else {
          r += leter;
          separateComilla.push(r);
          r = "";
        }
        comilla = !comilla;
        return;
      }

      if (comilla == false) {
        r += leter;
      }
      if (comilla == true) {
        r += leter;
      }

      if (index + 1 == code.length) {
        separateComilla.push(r);
      }
    });
    return separateComilla;
  }
  static concatZ(init, ...vars) {
    init = [...init];
    let value = "";
    let cont = 0;

    for (let i = 0; i < init.length; i++) {
      if (init[i] == "#") {
        value += vars[cont];
        cont++;
        continue
      }
      value += init[i];
    }
    return value;
  }
  static format = function (init,...vars) {
    init=[...init]
    let value = ""
    let cont=0
  
    for (let i = 0; i < init.length; i++) {
      if (init[i]=="#") {
        value+=vars[0]
        cont++
      }
      value+=init[i]
    }
    return value
  }
  static concat(string="",data={}){
    let format = string.replace(/(?:{(.+?)})/g,(x)=> data[x.slice(1,-1)]);
    return format
  }
}
