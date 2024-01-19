class InitApp {
  static css() {
    let url = [
      "C:\\Users\\Wilmer\\Desktop\\Dev\\MyApp\\Style\\Basic.css",
      "C:\\Users\\Wilmer\\Desktop\\Dev\\MyApp\\Style\\Flex.css",
    ];
    for (const ur of url) {
      let d = document.createElement("link");
      d.rel = "stylesheet";
      d.href = ur;
      document.head.appendChild(d);
    }
  }
  static script() {
    let g = document.querySelector('meta[name="import"]');
    let go = g.getAttribute("from").split(/ /);

    for (const e of go) {
      let sc = document.createElement("script");
      sc.async = true;
      sc.src = `C:\\Users\\Wilmer\\Desktop\\Dev\\MyApp\\Script\\${e}.js`;

      document.head.appendChild(sc);
    }
  }
}
(() => {
  let head = [
    { charset: "UTF-8" },
    { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ];
  let title = location.pathname;
  title = title.split("/").at(-1);
  document.title = title;
  InitApp.css();
  InitApp.script();
})();
