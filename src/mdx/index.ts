let mdx: string = `
[NOTE] Hola a todod como estan
[IMPORTANT] Magnifico

T1: malsss
T2: Array Methods
T3: planet
@widget 
  
Code:JavaScript
  function manierfd
 -loop
  const bilds
[image] file
[flux]
Img: https://figma.com/image/create.png

$ npm install
Paragraph: Para empezar el mundo es grande
`;


const rules = [
  {
    pattern: /\[([a-zA-Z]+)\]\s+/,
    onPattern(res: RegExpExecArray, rest: string) {
      return { type: `CITA`, name: res[1], text: rest };
    },
  },
  {
    pattern: /T([0-9]):\s+/,
    onPattern(res: RegExpExecArray, text: string) {
      return { type: `TITLE`, level: `${res[1]}`, text };
    },
  },
  {
    pattern: /Img:\s+/,
    onPattern(res: RegExpExecArray, src: string) {
      return { type: `IMAGE`, src };
    },
  },
];

function mdxcompile(markBook: string) {
  let groupIndent = markBook
    .trim()
    .split(/\n(?=[^ ])/)
    .filter((m) => m !== "")
    .map((m) => m.trim());

  return groupIndent
    .map((text) => {
      for (const { pattern, onPattern } of rules) {
        const reg = new RegExp(pattern, "d");
        const re = reg.exec(text);
        if (re) {
          const er = onPattern(re, text.slice(re[0].length));
          return er;
        }
      }
    })
    .filter((m) => m !== undefined);
}
let dfb = mdxcompile(mdx);
console.log(dfb);
