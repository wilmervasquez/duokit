function agruparToArray(array) {
  let acumulado = array[0];
  if (!acumulado) return [];

  const list = [];
  for (let i = 1; i < array.length; i++) {
    const element = array[i];
    if (acumulado.n === element.n) {
      acumulado.v += element.v;
      continue;
    }
    list.push(acumulado);
    acumulado = element;
  }
  list.push(acumulado);
  return list;
}
function namedGroups(resultRegex, namedGroups) {
  let textSplit = [...resultRegex[0]];
  let keysText = [...resultRegex[0]];
  const { indices, index } = resultRegex;
  keysText.fill("", 0);

  for (let key in namedGroups) {
    let rango = indices[key];

    if (rango == undefined) continue;
    rango[0] -= index;
    rango[1] -= index;
    keysText.fill(namedGroups[key], rango[0], rango[1]);
  }
  const grouped = [];
  let gf = null;

  // Agrupando
  keysText.forEach((g, i) => {
    if (gf == null) {
      gf = { name: g, value: textSplit[i] };
      return;
    }
    if (gf.name == g) {
      gf.value += textSplit[i];
      return;
    }

    grouped.push(gf);
    gf = { name: g, value: textSplit[i] };
  });

  grouped.push(gf);
  return grouped;
}
export { namedGroups, agruparToArray };
