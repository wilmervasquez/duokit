function $s(text, ...args) {
  let i = 0;
  text = text.replace(/%s/g, () => {
    return args[i++];
  });
}
const tailwind = [
  // paddingg
  [
    /(p|px|py|pt|pr|pb|pl)-([0-9]+)/y,
    (className, result) => {
      switch (className) {
        case "p":
          return `.${className}{padding:${result[1] / 16}rem}`;
          break;

        default:
          break;
      }
    },
  ],
  [
    /px-([0-9]+)/y,
    (className, result) =>
      $s(
        ".%s{padding-left:%srem;padding-right:%srem}",
        className,
        result[1] / 16,
        result[1] / 16
      ),
  ],
  [
    /py-([0-9]+)/y,
    (className, result) =>
      `.${className}{padding-top:${result[1] / 16}rem;padding-bottom:${
        result[1] / 16
      }rem}`,
  ],
  [
    /pt-([0-9]+)/y,
    (className, result) => `.${className}{padding-top:${result[1] / 16}rem}`,
  ],
  [
    /pr-([0-9]+)/y,
    (className, result) => `.${className}{padding-right:${result[1] / 16}rem}`,
  ],
  [
    /pb-([0-9]+)/y,
    (className, result) => `.${className}{padding-bottom:${result[1] / 16}rem}`,
  ],
  [
    /pl-([0-9]+)/y,
    (className, result) => `.${className}{padding-left:${result[1] / 16}rem}`,
  ],

  // margin
  [
    /m-([0-9]+)/y,
    (className, result) => `.${className}{margin:${result[1] / 16}rem}`,
  ],
  [
    /mx-([0-9]+)/y,
    (className, result) =>
      `.${className}{margin-left:${result[1] / 16}rem;margin-right:${
        result[1] / 16
      }rem}`,
  ],
  [
    /my-([0-9]+)/y,
    (className, result) =>
      `.${className}{margin-top:${result[1] / 16}rem;margin-botton:${
        result[1] / 16
      }rem}`,
  ],
  [
    /mt-([0-9]+)/y,
    (className, result) => `.${className}{margin-top:${result[1] / 16}rem}`,
  ],
  [
    /mr-([0-9]+)/y,
    (className, result) => `.${className}{margin-left:${result[1] / 16}rem}`,
  ],
  [
    /mb-([0-9]+)/y,
    (className, result) => `.${className}{margin-bottom:${result[1] / 16}rem}`,
  ],
  [
    /ml-([0-9]+)/y,
    (className, result) => `.${className}{margin-left:${result[1] / 16}rem}`,
  ],
];
function renderStyle() {
  let elementAll = document.querySelectorAll("*");
  let classNames = [];
  for (const element of elementAll) {
    let className = element.getAttribute("class");
    classNames.push(className);
  }
  classNames = classNames.filter((a) => a ?? false);
  classNames = classNames.join(" ").trim();

  let allClassName = classNames.split(/\s+/);
  allClassName = [...new Set(allClassName)];

  allClassName = allClassName.map((className) => {
    let result = null;
    for (const [regExp, event] of tailwind) {
      if ((result = className.match(regExp))) {
        return event(className, result);
      }
    }
  });
  allClassName = allClassName.filter((a) => a ?? false);

  let style = document.createElement("style");
  style.innerHTML = allClassName.join("");
  document.querySelector("head").appendChild(style);
}
renderStyle();
export const er = 45;
