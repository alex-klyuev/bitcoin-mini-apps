const getBiggestInputTx = require('./getBiggestInputTx');

// this function takes a txid and recursively traces the tx ancestry of it,
// each time picking the largest input as the parent tx to iterate to

const traceAncestry = async (txid) => {
  const biggestInputTx = await getBiggestInputTx(txid);
  if (biggestInputTx.coinbase) return biggestInputTx;
  traceAncestry(biggestInputTx.txid);
};

traceAncestry('0627052b6f28912f2703066a912ea577f2ce4da4caa5a5fbd8a57286c345c2f2');
