const getTx = require('../../../../utils/nodeQueryMethods/transactions/getTx');
const { convertToSatoshis } = require('../helper/conversions');

// Inputs as represented in a transaction don't record the input value
// This function uses the txid of each input to fetch the full tx where
// that input was an output and find its value

// This method makes 2 * number of inputs rpc calls
const findBiggestInput = async (inputs) => {
  const inputTxs = [];

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    // the first tx in the ancestry will be a coinbase
    // check for that here
    const { coinbase } = input;
    if (coinbase) {

      const firstTx = {
        biggestInput: {
          coinbase,
        },
      };
      return firstTx;
    }

    const { vout } = input;

    const inputTx = await getTx(input.txid);
    inputTx.vout.forEach(output => {
      if (output.n === vout) {

        inputTxs.push({
          txid: inputTx.txid,
          value: output.value,
        });
      }
    });
  }

  // sum the inputs
  // find and return biggest input tx by value
  let sum = 0;
  // let { value: maxVal, txid: txidOfMax } = inputTxs[0];
  let maxVal = 0;

  for (let i = 0; i < inputTxs.length; i++) {
    // convert to satoshis to avoid floating points
    const inputVal = convertToSatoshis(inputTxs[i].value);
    sum += inputVal;

    if (inputVal > convertToSatoshis(maxVal)) {
      maxVal = inputTxs[i].value;
      txidOfMax = inputTxs[i].txid;
    }
  }

  const biggestInput = {
    value: maxVal,
    txid: txidOfMax,
  };

  return { biggestInput, totalValInSats: sum };
};

module.exports = findBiggestInput;
