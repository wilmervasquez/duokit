type ResultAgruped = Array<{ name: String; value: string }>;
export function agruparToArray(array: any[]): ResultAgruped {
  let acumulado = array[0];
  if (!acumulado) return [];

  const list = [];
  for (let i = 1; i < array.length; i++) {
    const element = array[i];
    if (acumulado.name === element.name) {
      acumulado.value += element.value;
      continue;
    }
    list.push(acumulado);
    acumulado = element;
  }
  list.push(acumulado);
  return list;
}

export function namedGroupsy(
  resultRegex: RegExpExecArray,
  namedGroups: Record<number, string>
): ResultAgruped {
  let keysText = [...resultRegex[0]];
  let textSplit = [...resultRegex[0]];
  const { indices, index } = resultRegex as RegExpExecArray & {
    indices: number[][];
  };
  keysText.fill("", 0);

  for (let key in namedGroups) {
    let rango = indices[key];

    if (rango == undefined) continue;
    rango[0] -= index;
    rango[1] -= index;
    keysText.fill(namedGroups[key], rango[0], rango[1]);
  }

  return agruparToArray(
    keysText.map((j, i) => ({ name: j, value: textSplit[i] }))
  );
}
export function copyText(text: string) {
  window.navigator.clipboard?.writeText &&
    window.navigator.clipboard.writeText(text);
}

export function urlChange(id: string, url: string) {
  window.history.replaceState({ id: id }, url, url);
}
export function getQueryURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams;
}
export function forRange(
  func: (indix: number) => void,
  start = 0,
  end = 1,
  range = 1
) {
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
export function forIn(
  object: Record<string, string>,
  func: (key: string | number, value: any) => void
) {
  for (let key in object) {
    func(key, object[key]);
  }
}

export function monthsNames() {
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
export function daysNames() {
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
export function diferenceTime(antes:[], hoy:[]) {
  const antes_ = new Date(...antes);
  const hoy_ = new Date(...hoy);
  let diference:number = hoy_.getTime() - antes_.getTime();
  return {
    day: diference / (1000 * 60 * 60 * 24),
    hora: diference / (1000 * 60 * 60),
    minuto: diference / (1000 * 60),
    segundo: diference / 1000,
    milisegundos: diference,
  };
}
export function getIdUnic() {
  const inicio = Date.now().toString(36);
  const final = Math.random().toString(36).substring(2);

  return inicio + final;
}
export function XMLToJSON(node:HTMLCollection | HTMLElement) {
  let json: object[] = [];
  let attr:[string,string][] = [];
  
  // const nodeIterable = Array.from(node) ;
  // nodeIterable.forEach((e) => {
  //   for (const at of Array.from(e.attributes)) {
  //     attr.push([at.name, at.value]);
  //   }
  //   attr = Object.fromEntries(attr);

  //   json.push(
  //     Object.fromEntries([
  //       ["tag", e.tagName.toLowerCase()],
  //       ["attrs", attr],
  //       ["text", e.innerText],
  //       ["childs", XMLToJSON(e.children)],
  //     ])
  //   );

  //   attr = [];
  // });
  return json;
}
export function setQueryURLFormat(obj:Record<string,string>) {
  let re = [],
    n = [];

  for (const key in obj) {
    re.push([key, encodeURIComponent(obj[key])]);
  }
  re = re.map((d) => d.join("="));
  return re.join("&");
}
export function getCaretCoordinates() {
  let x = 0,
    y = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    if (selection) {
      if (selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
        const rect = range.getClientRects()[0];
        if (rect) {
          x = rect.left;
          y = rect.top;
        }
      }
    }
    
  }
  return { x, y };
}
export function getCaretIndex(element: HTMLElement) {
  let position = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    if (selection?.rangeCount !== 0) {
      const range = window.getSelection()?.getRangeAt(0);
      if (range) {
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        position = preCaretRange.toString().length;
      }
  
    }
  }
  return position;
}

export class Query {
  static get get() {
    const query = new URLSearchParams(location.search);
    return Object.fromEntries(query.entries()) 
  }
  static set(key:string, value:string) {
    const query = new URLSearchParams(location.search);
    query.set(key, value);
    location.search = query.toString();
    console.log(90);
  }
}

export function countRegresiva(fecha:[number,number,number,number,number,number], event:(message:string)=>void) {
  let dias:number, ahora:Date, limit:Date, dif:number, days:number, hours:number, mins:number, segunds:number;
  limit = new Date(...fecha);

  let updateTime = setInterval(() => {
    dias = 1000 * 60 * 60 * 24;
    ahora = new Date();

    dif = limit.getTime() - ahora.getTime();

    days = Math.floor(dif / (1000 * 60 * 60 * 24));
    hours = Math.floor(dif / (1000 * 60 * 60)) % 24;
    mins = Math.floor(dif / (1000 * 60)) % 60;
    segunds = Math.floor(dif / 1000) % 60;

    event(
      `Faltan ${days} dias, ${hours} Hora,  ${mins} minutos, ${segunds} segundos`
    );
    if (days == 0 && hours == 0 && mins == 0 && segunds == 0) {
      clearInterval(updateTime);
    }
  }, 1000);
}
export class ObserverElement {
  isVisible: boolean;
  element: HTMLElement;
  __observer: IntersectionObserver;
  constructor(
    element: HTMLElement,
    events: {
      onVisible: () => void;
      onOcult: () => void;
    }
  ) {
    this.isVisible = false;
    this.element = element;

    this.__observer = new IntersectionObserver(
      (entry) => {
        let condicion = entry[0].isIntersecting;
        if (condicion) {
          events.onVisible();
          this.isVisible = true;
        } else {
          events.onOcult();
          this.isVisible = false;
        }
      },
      {
        // root: document.querySelector(".load"),
        rootMargin: "0px",
        threshold: 1,
      }
    );
    this.__observer.observe(this.element);
  }
}


