function carrusel(control,nodoDeImagenes,) {
  let imagenes = document.querySelectorAll(nodoDeImagenes);
  let carrusel = document.querySelector(".carrusel");
  let historia = document.querySelectorAll(control);
  let atras = historia[0], suiguiente = historia[1];
  let cantidadDeImagenes = imagenes.length - 1;
  carrusel.style.left = "0px";
  //let cantidadDeImagenes = new Number(imagenes.length * 200);
  atras.addEventListener("click",()=>{ 
    for(let i = 0;i < (cantidadDeImagenes * 200); i+=200){
      if(carrusel.style.left == "-" + new String(i + 200) + "px"){
        carrusel.style.left = "-" + i + "px";  
        break;
      }
    }
  });
  suiguiente.addEventListener("click",()=>{
    let line = "";
    for(let i = 0;i < (cantidadDeImagenes * 200); i+=200){
      if(carrusel.style.left == (line + new String(i)+ "px")){
        carrusel.style.left = "-" + new String(i + 200) + "px";  
        break;
      }
      line = "-";
    }
  });
}
