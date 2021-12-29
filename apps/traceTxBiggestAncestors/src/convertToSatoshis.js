const convertToSatoshis = (valInBtc) => {
  let str = valInBtc.toString();
  const comps = str.split('.');
  const el1 = Number(comps[0]) * 100000000;
  if (!comps[1]) return el1;
  const dec = comps[1];
  const n = 8 - dec.length;
  const el2 = Number(dec) * 10 ** n;
  return el1 + el2;
};

module.exports = convertToSatoshis;
