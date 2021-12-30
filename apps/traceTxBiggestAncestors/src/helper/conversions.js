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

const convertToBtc = (valInSats) => {
  let str = valInSats.toString();

  // if less than 1 btc (less than 9 digits), fill with 0's
  if (str.length < 9) {
    const n = 8 - str.length;
    let filledStr = '0.';
    for (let i = 0; i < n; i++) filledStr += '0';
    filledStr += str;
    return Number(filledStr);
  }

  // if more, chop off last 8 digits and reformat
  const n = str.length - 8;
  const els = [str.slice(0, n), str.slice(n)];
  const decStr = els.join('.');
  return Number(decStr);
};

module.exports = { convertToSatoshis, convertToBtc };
