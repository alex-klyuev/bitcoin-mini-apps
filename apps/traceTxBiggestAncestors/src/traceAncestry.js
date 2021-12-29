const getTx = require('../../../utils/nodeQueryMethods/getTx');
const findBiggestInput = require('./findBiggestInput');
const convertToSatoshis = require('./convertToSatoshis');

// this function takes a txid and recursively traces the tx ancestry of it,
// each time picking the largest input as the parent tx to iterate to

// It also tracks transactions with the largest input and the most number of inputs
const traceAncestry = async (txid, maxVals) => {

  // get the full transaction object from the txid (2 rpc calls)
  const txObj = await getTx(txid);

  const {
    vin: inputs,
    vout: outputs,
  } = txObj;

  // get the txid and value of the biggest input tx (2 * # of inputs rpc calls)
  const biggestInput = await findBiggestInput(inputs);

  // the first tx in the ancestry will be a coinbase
  // check for that here
  if (biggestInput.coinbase) /* code for coinbase csae */ return;

  // compare to max vals
  if (!maxVals) maxVals = {};
  let { maxInput, maxNumInputs } = maxVals;

  // convert to satoshis to avoid comparing floating points
  const curInput = convertToSatoshis(biggestInput.value);
  const curMaxInput = maxInput ? convertToSatoshis(maxInput.value) : null;
  if (!maxInput || curInput > curMaxInput) maxInput = { txid, ...biggestInput };
  if (!maxNumInputs || inputs.length > maxNumInputs.value) maxNumInputs = { txid, value: inputs.length };

  maxVals = { maxInput, maxNumInputs };

  traceAncestry(biggestInput.txid, maxVals);
};

module.exports = traceAncestry;
