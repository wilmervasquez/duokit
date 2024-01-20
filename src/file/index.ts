export class FileManager {
  static readAsText(file:Blob, eventPro:(z:boolean,s:number,e:number,r:number)=>void) {
    let lector = new FileReader();
    return new Promise((resolve, reject) => {
      lector.addEventListener("load", function ({ target }) {
        if (target) {
          resolve({ data: target.result }); 
        }
      });
      lector.addEventListener(
        "progress",
        function ({ lengthComputable, loaded, total }) {
          eventPro(lengthComputable, loaded, total, (100 * loaded) / total);
        }
      );
      lector.addEventListener("error", function (e) {
        reject(e);
      });
      lector.readAsText(file);
    });
  }
  static readAsDataURL(file:Blob) {
    let lector = new FileReader();
    return new Promise((resolve, reject) => {
      lector.addEventListener("load", function ({target}) {
        if (target) {
        resolve(target.result);
          
        }
      });
      lector.addEventListener("error", function (e) {
        reject(e);
      });
      lector.readAsDataURL(file);
    });
  }
  static readAsBinaryStrig(file:Blob) {
    let lector = new FileReader();
    return new Promise((resolve, reject) => {
      lector.addEventListener("load", function ({target}) {
        if (target) {
          resolve(target.result);
        }
      });
      lector.addEventListener("error", function (e) {
        reject(e);
      });
      lector.readAsBinaryString(file);
    });
  }
}
