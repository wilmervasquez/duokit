class Ajax {
  solicitud: XMLHttpRequest;
  constructor(url: string, { events, method, responseType }) {
    this.solicitud = new XMLHttpRequest();
    this.solicitud.responseType = responseType;
    this.solicitud.open(method, props.url);

    if ("loadStart" in events) {
      this.solicitud.addEventListener("loadstart", events.loadStart);
    }
    if ("progress" in events) {
      this.solicitud.addEventListener("progress", events.progress);
    }
    if ("load" in events) {
      this.solicitud.addEventListener("progress", events.load);
    }
  }
  send() {
    this.solicitud.send(null);
  }
  abort() {
    this.solicitud.abort();
  }

  static get(url, query) {
    return new Promise((resolve, reject) => {
      const solicitud = new XMLHttpRequest();
      solicitud.responseType = "json";
      solicitud.addEventListener("load", function (e) {
        console.log(e.target);
        if (e.target.status == 200) {
          if (e.target.response == null) {
            reject({ state: false, message: "ErrorConvertionJSON" });
          } else {
            resolve(e.target.response);
          }
        } else {
          reject({ state: false, message: "ErrorStatus" });
        }
      });
      solicitud.open("GET", `${url}?${this.setQueryURLFormat(query)}`, true);
      solicitud.send(null);
    });
  }
  static setQueryURLFormat(obj) {
    let re = [],
      n = [];
    for (const key in obj) {
      re.push([key, encodeURIComponent(obj[key])]);
    }
    re = re.map((d) => d.join("="));
    return re.join("&");
  }
}

export async function fetchJSON(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    return { data: null, error: true };
  }
  const data = await response.json();
  return { data: data, error: false };
}
