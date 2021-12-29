const getTx = require('../../utils/nodeQueryMethods/getTx');
const findBiggestInput = require('./findBiggestInput');

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

  // compare to max vals
  const { maxInput, maxNumInputs } = maxVals;
  // if (!maxInput || biggestInput.value > maxInput.value) maxInput = { txid, ...biggestInput };
  // if (!maxNumInputs || inputs.length > maxNumInputs.value) maxNumInputs = { txid, value: inputs.length };

  if (!maxInput || biggestInput.value > maxInput.value) {
    maxInput = { txid, ...biggestInput };
    console.log('NEW MAX INPUT', maxInput);
  }
  if (!maxNumInputs || inputs.length > maxNumInputs.value) {
    maxNumInputs = { txid, value: inputs.length };
    console.log('NEW MAX NUM INPUTS', maxNumInputs);
  }

  if (biggestInput.coinbase) return biggestInput;
  traceAncestry(biggestInput.txid);
};

module.exports = traceAncestry;

// {
//   maxInput: {
//     txid:
//     value:
//   }
//   maxNumInputs
// }
