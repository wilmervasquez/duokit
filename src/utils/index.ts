type ResultAgruped = Array<{name:String,value:string}>
function agruparToArray(array: any[]): ResultAgruped {
  let acumulado = array[0];
  if (!acumulado) return [];

  const list = [];
  for (let i = 1; i < array.length; i++) {
    const element = array[i];
    if (acumulado.name === element.name) {
      acumulado.value += element.value;
      continue;
    }
    list.push(acumulado);
    acumulado = element;
  }
  list.push(acumulado);
  return list;
}

function namedGroupsy(
  resultRegex: RegExpExecArray,
  namedGroups: Record<number, string>
): ResultAgruped {
  let keysText = [...resultRegex[0]];
  let textSplit = [...resultRegex[0]];
  const { indices, index } = resultRegex as RegExpExecArray & {
    indices: number[][];
  };
  keysText.fill("", 0);

  for (let key in namedGroups) {
    let rango = indices[key];

    if (rango == undefined) continue;
    rango[0] -= index;
    rango[1] -= index;
    keysText.fill(namedGroups[key], rango[0], rango[1]);
  }

  return agruparToArray(
    keysText.map((j, i) => ({ name: j, value: textSplit[i] }))
  );
}
export { namedGroupsy, agruparToArray };
