export class FileManager {
  constructor() {}
  static readAsText(file,eventPro) {
    let lector = new FileReader();
    return new Promise((resolve, reject) => {
      lector.addEventListener("load", function ({ target }) {
        resolve({data:target.result});
      });
      lector.addEventListener("progress", function ({lengthComputable,loaded,total}) {
        eventPro(lengthComputable,loaded,total,100*loaded/total);
      });
      lector.addEventListener("error", function (e) {
        reject(e);
      });
      lector.readAsText(file);
    });
  }
  static readAsDataURL(file) {
    let lector = new FileReader();
    return new Promise((resolve, reject) => {
      lector.addEventListener("load", function (e) {
        resolve(e.target.result);
      });
      lector.addEventListener("error", function (e) {
        reject(e);
      });
      lector.readAsDataURL(file);
    });
  }
  static readAsBinaryStrig(file) {
    let lector = new FileReader();
    return new Promise((resolve, reject) => {
      lector.addEventListener("load", function (e) {
        resolve(e.target.result);
      });
      lector.addEventListener("error", function (e) {
        reject(e);
      });
      lector.readAsBinaryString(file);
    });
  }
}
