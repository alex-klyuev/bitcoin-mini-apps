const getTx = require('../../utils/nodeQueryMethods/getTx');
const findBiggestInput = require('./findBiggestInput');

// this function takes a txid and recursively traces the tx ancestry of it,
// each time picking the largest input as the parent tx to iterate to

const traceAncestry = async (txid) => {

  // get the full transaction object from the txid (2 rpc calls)
  const txObj = await getTx(txid);

  const {
    vin: inputs,
    vout: outputs,
  } = txObj;

  // get the txid and value of the biggest input tx (2 * # of inputs rpc calls)
  const biggestInput = await findBiggestInput(inputs);
  if (biggestInput.coinbase) return biggestInput;
  traceAncestry(biggestInput.txid);
};

module.exports = traceAncestry;
