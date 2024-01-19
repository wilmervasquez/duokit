export function getCaretCoordinates() {
  let x = 0,
    y = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
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
  return { x, y };
}
export function getCaretIndex(element) {
  let position = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    if (selection?.rangeCount !== 0) {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      position = preCaretRange.toString().length;
    }
  }
  return position;
}

export class Query {
  static get get() {
    let data = {};
    const query = new URLSearchParams(location.search);
    for (const key of query.keys()) {
      data[key] = query.get(key);
    }
    return data;
  }
  static set(key, value) {
    const query = new URLSearchParams(location.search);
    query.set(key, value);
    location.search = query.toString();
    console.log(90);
  }
}

export function countRegresiva(fecha, event) {
  let date, dias, ahora, limit, dif, days, hours, mins, segunds;
  limit = new Date(...fecha);

  let n = setInterval(() => {
    dias = 1000 * 60 * 60 * 24;
    ahora = new Date();

    dif = limit - ahora;

    days = Math.floor(dif / (1000 * 60 * 60 * 24));
    hours = Math.floor(dif / (1000 * 60 * 60)) % 24;
    mins = Math.floor(dif / (1000 * 60)) % 60;
    segunds = Math.floor(dif / 1000) % 60;

    event(
      `Faltan ${days} dias, ${hours} Hora,  ${mins} minutos, ${segunds} segundos`
    );
    if (days == 0 && hours == 0 && mins == 0 && segunds == 0) {
      clearInterval(n);
    }
  }, 1000);
}
export class ObserverElement {
  constructor(element,{onVisible,onOcult}) {
    this.visible;
    this.element = element;
    
    this.__observer = new IntersectionObserver((entry) => {
        let condicion = entry[0].isIntersecting;
        if (condicion) {
          onVisible.call(this)
          this.visible = true;
        } else {
          onOcult(this);
          this.visible = false;
        }
      },{
        // root: document.querySelector(".load"),
        rootMargin: "0px",
        threshold: 1,
      });
    this.__observer.observe(this.element);
  }
 
}
