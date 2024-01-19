class App {
  static qS(...selectores){
    return selectores.map(selector => document.querySelector(selector));
  }
  static ready(func){
    window.addEventListener('load', func);
  }
}
