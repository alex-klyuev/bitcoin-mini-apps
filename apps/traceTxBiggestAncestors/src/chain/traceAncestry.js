const getTx = require('../../../../utils/nodeQueryMethods/transactions/getTx');
const findBiggestInput = require('./findBiggestInput');
const { convertToSatoshis, convertToBtc } = require('../helper/conversions');

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
  // get the total val of the transaction (sum all the inputs)
  const { biggestInput, totalValInSats } = await findBiggestInput(inputs);

  // get the total val of the outputs; the difference is the tx fee
  let outputSum = 0;
  for (let i = 0; i < outputs.length; i++) outputSum += convertToSatoshis(outputs[i].value);

  // the first tx in the ancestry will be a coinbase; check for that here
  // if true, end the recursion and return the maxvals + first transaction up the chain
  if (biggestInput.coinbase) {
    const value = convertToBtc(outputSum);

    // handle case where txid input by user is a coinbase
    if (!maxVals) {
      maxVals = {
        maxNumInputs: {
          txid: null,
          value: null,
        },
        maxInput: {
          txid: null,
          value: null,
        },
        maxTxValue: {
          txid,
          value,
        },
        maxTxFee: {
          txid: null,
          value: null,
        },
      };
    }

    // these are the characteristics we want to summarize about the ancestry chain as a whole
    const overallChars = {
      maxVals,
      firstTx: {
        value: convertToBtc(outputSum),
        ...biggestInput,
      },
    }

    return overallChars;
  }

  // compute remaining values we want
  const txFeeInSats = totalValInSats - outputSum;
  const txValue = convertToBtc(totalValInSats);
  const txFee = convertToBtc(txFeeInSats);

  // compare to max vals and update tracker
  if (!maxVals) maxVals = {};
  let { maxNumInputs, maxInput, maxTxValue, maxTxFee } = maxVals;

  if (!maxNumInputs || inputs.length > maxNumInputs.value) maxNumInputs = { txid, value: inputs.length };

  // convert to satoshis to avoid comparing floating points
  const curInput = convertToSatoshis(biggestInput.value);
  const maxInputInSats = maxInput ? convertToSatoshis(maxInput.value) : null;
  if (!maxInput || curInput > maxInputInSats) maxInput = { txid, ...biggestInput };
  const curTxValue = convertToSatoshis(txValue);
  const maxTxValueInSats = maxTxValue ? convertToSatoshis(maxTxValue.value) : null;
  if (!maxTxValue || curTxValue > maxTxValueInSats) maxTxValue = { txid, value: txValue };
  const curTxFee = convertToSatoshis(txFee);
  const maxTxFeeInSats = maxTxFee ? convertToSatoshis(maxTxFee.value) : null;
  if (!maxTxFee || curTxFee > maxTxFeeInSats) maxTxFee = { txid, value: txFee };

  maxVals = {
    maxNumInputs,
    maxInput,
    maxTxValue,
    maxTxFee,
  };

  // write the transaction characteristics we care about to the output file
  const txChars = {
    numInputs: inputs.length,
    biggestInput: biggestInput.value,
    txValue,
    txFee,
    txid,
  };

  console.log('TX CHARS', txChars);

  return traceAncestry(biggestInput.txid, maxVals);
};

module.exports = traceAncestry;
