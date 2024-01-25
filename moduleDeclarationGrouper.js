import fs from "fs";

let files = "";
const setDeclarationModule = [
  { name: "duokit", fileDTS: "dist/index.d.ts" },
  { name: "duokit/canvas", fileDTS: "dist/canvas/index.d.ts" },
  { name: "duokit/color", fileDTS: "dist/color/index.d.ts" },
  { name: "duokit/doc", fileDTS: "dist/doc/index.d.ts" },
  { name: "duokit/file", fileDTS: "dist/file/index.d.ts" },
  { name: "duokit/math", fileDTS: "dist/math/index.d.ts" },
  { name: "duokit/mdx", fileDTS: "dist/mdx/index.d.ts" },
  { name: "duokit/parser", fileDTS: "dist/parser/index.d.ts" },
  { name: "duokit/rand", fileDTS: "dist/rand/index.d.ts" },
  { name: "duokit/request", fileDTS: "dist/request/index.d.ts" },
  { name: "duokit/server", fileDTS: "dist/server/index.d.ts" },
  { name: "duokit/struct", fileDTS: "dist/struct/index.d.ts" },
  { name: "duokit/utils", fileDTS: "dist/utils/index.d.ts" },
];

setDeclarationModule.forEach(({ name, fileDTS },i) => {
  const baseURL =
    "C:\\Users\\Wilmer\\Dev\\@npm\\duokit\\" + fileDTS.replace(/\\/g, "\\");
  let file = fs.readFileSync(baseURL, "utf-8");
  // elimar el archivo
  fs.unlink(baseURL, (error) => {
    if (error) {
    } else {
      console.log(i,"⚡: File delete: ", fileDTS);
    }
  });
  file = file.replace(/^/gm, "  ");
  file = file.replace(/declare /gm, "");

  files += `declare module '${name}' {
${file}
}\n`;
});

fs.writeFileSync(
  "C:\\Users\\Wilmer\\Dev\\@npm\\duokit\\types\\index.d.ts",
  files
);
