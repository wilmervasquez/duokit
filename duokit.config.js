import fs from "fs";
const baseURL ="C:\\Users\\Wilmer\\Dev\\@npm\\duokit\\package.json";
let file = fs.readFileSync(baseURL, "utf-8");

console.log(file)
// fs.writeFileSync(
//   "C:\\Users\\Wilmer\\Dev\\@npm\\duokit\\types\\index.d.ts",
//   files
// );
