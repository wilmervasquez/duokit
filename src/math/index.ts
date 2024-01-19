function angleToRadian(angle: number) {
  return angle * (Math.PI / 180);
}
function getCircleXY(x:number, y:number, r:number, deg:number) {
  x = x - Math.cos(angleToRadian(deg)) * r;
  y = Math.sin(angleToRadian(deg)) * r + y;
  return [y, x];
}
function getHipo(catetoOpuesto:number, catetoAdjacente:number) {
  return (Math.tan(catetoOpuesto / catetoAdjacente) * 180) / Math.PI;
}
function getHipotenusa(w:number, h:number) {
  return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
}
function getAreaTriangulo(base:number, altura:number) {
  return (base * altura) / 2;
}
function numberToBinario(number:number) {
  let division;
  let nums = [];
  let residuo = 0;
  while (number >= 2) {
    residuo = number % 2;
    division = Math.floor(number / 2);

    nums.push(residuo);

    number = division;
  }
  nums.push(1);
  return nums.reverse().join("");
}


function suma(...numeros:number[]) {
  return numeros.reduce((a, b) => a + b);
}
function binarioToNumber(binario:string) {
  let reserva = [];
  let binarioArray = [...String(binario)];
  let binarioReverse = binarioArray.map((n) => Number(n)).reverse();
  for (let i = 0; i < binarioReverse.length; i++) {
    reserva.push(binarioReverse[i] * 2 ** i);
  }
  return suma(...reserva);
}
function mcm(number: number) {
  let dat = [];
  let r = 0;
  while (number > 1) {
    if (number % 2 == 0) {
      dat.push(2);
      number = number / 2;
    } else if (number % 3 == 0) {
      dat.push(3);

      number = number / 3;
    } else if (number % 5 == 0) {
      dat.push(5);

      number = number / 5;
    } else if (number % 7 == 0) {
      dat.push(7);

      number = number / 7;
    } else {
      dat.push(number);

      break;
    }
  }
  return dat.join(" • ");
}
function areaDeUnCirculo(radio:number) {
  return Math.PI * radio;
}
function promedio(...args:number[]) {
  let aritmetica = args.reduce((a, b) => a + b) / args.length;
  let geometrico = Math.sqrt(args.reduce((a, b) => a * b));
  let armonico = args.length / args.map((n) => 1 / n).reduce((a, b) => a + b);

  return { aritmetica, geometrico, armonico };
}
function descuento(precio:number, descuento:number) {
  return {
    precioAhora: precio - (precio * descuento) / 100,
    descuento: 200 - (precio - (precio * descuento) / 100),
  };
}
function dividir(n:number, v:number) {
  return {
    result: n / v,
    residuo: n % v,
  };
}
export {dividir,descuento,promedio,areaDeUnCirculo,}