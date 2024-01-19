class System {
  static copyText(text) {
    window.navigator.clipboard?.writeText &&
      window.navigator.clipboard.writeText(text);
  }
  static getTime() {}
  static setDef(exist, value) {
    return exist ? exist : value;
  }
  static isNumber(number) {
    return !isNaN(number);
  }
  static urlChange(id, url) {
    window.history.replaceState({ id: id }, url, url);
  }
  static get getQueryURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
  }
  static range(func, start = 0, end = 1, range = 1) {
    if (start < end) {
      for (let i = start; i <= end; i += range) {
        func(i);
      }
    } else if (start == end) {
      for (let i = start; i < end; start++) {
        func(i);
      }
    } else {
      for (let i = start; i >= end; i -= range) {
        func(i);
      }
    }
  }
  static forIn(object, func) {
    for (let key in object) {
      func(key, object[key]);
    }
  }
 
  static get monthsNames() {
    let meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    return meses;
  }
  static get daysNames() {
    let daysWeek = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ];

    return daysWeek;
  }
  static diferenceTime(antes, hoy) {
    antes = new Date(...antes);
    hoy = new Date(...hoy);
    let diference = hoy.getTime() - antes.getTime();
    return {
      day: parseInt(diference / (1000 * 60 * 60 * 24)),
      hora: parseInt(diference / (1000 * 60 * 60)),
      minuto: parseInt(diference / (1000 * 60)),
      segundo: parseInt(diference / 1000),
      milisegundos: parseInt(diference),
    };
  }
  static getIdUnic() {
    const inicio = Date.now().toString(36);
    const final = Math.random().toString(36).substring(2);

    return inicio + final;
  }
  static XMLToJSON(node) {
    let json = [];
    let attr = [];

    node = Array.from(node);
    node.forEach((e) => {
      for (const at of Array.from(e.attributes)) {
        attr.push([at.name, at.value]);
      }
      attr = Object.fromEntries(attr);

      json.push(
        Object.fromEntries([
          ["tag", e.tagName.toLowerCase()],
          ["attrs", attr],
          ["text", e.innerText],
          ["childs", System.XMLToJSON(e.children)],
        ])
      );

      attr = [];
    });
    return json;
  }
  static setQueryURLFormat(obj){
    let re=[],n=[]

    for (const key in obj) {
      re.push([key,encodeURIComponent(obj[key])])
    }
    re=re.map(d => d.join("="));
    return re.join("&")
  }
}

