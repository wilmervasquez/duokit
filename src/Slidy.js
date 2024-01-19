export class Each{
  static generate(arr, callback){
    const fragment = document.createDocumentFragment();
    for (const item of arr) {
      fragment.appendChild(callback(item));
    }
    return fragment;
  }
}