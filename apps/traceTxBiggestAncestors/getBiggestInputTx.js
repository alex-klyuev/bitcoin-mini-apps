const getTx = require('../../utils/nodeQueryMethods/getTx');

// This method requires 2n + 2 rpc calls, where n is the number of inputs in the transaction
const getBiggestInputTx = async (txid) => {
  const tx = await getTx(txid);

  // inputs as represented in the transaction; does not hold input value
  const inputs = tx.vin;

  // use input txids to get input transaction values and their previous txids
  const inputTxs = [];

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    // the first tx in the ancestry will be a coinbase
    // check for that here
    const { coinbase } = input;
    if (coinbase) {
      const firstTx = {
        txid,
        value: tx.vout[0].value,
        coinbase,
      };
      console.log('First transaction in lineage (coinbase): ', firstTx);
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

  // find and return biggest input tx by value
  let { value: maxVal, txid: txidOfMax } = inputTxs[0];

  for (let i = 1; i < inputTxs.length; i++) {
    if (inputTxs[i].value > maxVal) {
      maxVal = inputTxs[i].value;
      txidOfMax = inputTxs[i].txid;
    }
  }

  const biggestInput = {
    value: maxVal,
    txid: txidOfMax,
  };

  console.log(biggestInput);
  return biggestInput;
};

module.exports = getBiggestInputTx;
