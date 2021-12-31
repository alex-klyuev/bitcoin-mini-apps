const getTx = require('../../../../utils/nodeQueryMethods/transactions/getTx');
const findBiggestInput = require('./findBiggestInput');
const { convertToSatoshis, convertToBtc } = require('../helper/conversions');
const writeTxToFile = require('../fs/writeTxToFile');

// this function takes a txid and recursively traces the tx ancestry of it,
// each time picking the largest input as the parent tx to iterate to

// It also tracks transactions with the largest input, most number of inputs,
// largest transaction value, and largest fee
const traceAncestry = async (txid, tracker, originalTxid) => {

  // maintain ref to original txid for file writing in recursive calls
  if (!originalTxid) originalTxid = txid;

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
  // if true, end the recursion, write the coinbase tx, and return the maxvals up the chain

  const { coinbase } = biggestInput;
  if (coinbase) {
    const value = convertToBtc(outputSum);

    // handle case where txid input by user is a coinbase
    if (!tracker) tracker = {};
    let { counter, maxVals } = tracker;
    if (!counter) counter = 0;
    counter++;
    if (!maxVals) {
      maxVals = {
        maxNumInputs: {
          txid,
          value: 1
        },
        maxInput: {
          txid,
          value: 'coinbase',
        },
        maxTxValue: {
          txid,
          value,
        },
        maxTxFee: {
          txid,
          value: 0,
        },
      };
    }

    // Coinbases have 1 input, 0 txFee, no input values, and the child of the coinbase
    // must have a txValue >= to the coinbase value (as UTXOs must be consumed entirely)
    // so we don't have to compare the coinbase to maxVals

    // write the transaction characteristics we care about to the output file
    const firstTxChars = {
      numInputs: 1,
      biggestInput: 'coinbase',
      txValue: value,
      txFee: 0,
      txid,
    };

    await writeTxToFile(firstTxChars, originalTxid);

    // return maxVals as well as input txid and first (coinbase) txid for the summary
    const results = {
      inputTxid: {
        txid: originalTxid,
        value: '-',
      },
      ...maxVals,
      firstTxid: {
        txid,
        value: '-',
      },
      counter: {
        txid: '-',
        value: counter,
      },
    };

    return results;
  }

  // compute remaining values we want
  const txFeeInSats = totalValInSats - outputSum;
  const txValue = convertToBtc(totalValInSats);
  const txFee = convertToBtc(txFeeInSats);

  // compare to max vals and update tracker
  if (!tracker) tracker = {};
  let { counter, maxVals } = tracker;
  if (!counter) counter = 0;
  if (!maxVals) maxVals = {};
  let { maxNumInputs, maxInput, maxTxValue, maxTxFee } = maxVals;

  if (!maxNumInputs || inputs.length > maxNumInputs.value) maxNumInputs = { txid, value: inputs.length };

  // convert to satoshis to avoid comparing floating points
  const curInput = convertToSatoshis(biggestInput.value);
  const maxInputInSats = maxInput ? convertToSatoshis(maxInput.value) : null;
  if (!maxInput || curInput > maxInputInSats) maxInput = { txid, value: biggestInput.value };
  const curTxValue = convertToSatoshis(txValue);
  const maxTxValueInSats = maxTxValue ? convertToSatoshis(maxTxValue.value) : null;
  if (!maxTxValue || curTxValue > maxTxValueInSats) maxTxValue = { txid, value: txValue };
  const curTxFee = convertToSatoshis(txFee);
  const maxTxFeeInSats = maxTxFee ? convertToSatoshis(maxTxFee.value) : null;
  if (!maxTxFee || curTxFee > maxTxFeeInSats) maxTxFee = { txid, value: txFee };

  counter++;
  maxVals = {
    maxNumInputs,
    maxInput,
    maxTxValue,
    maxTxFee,
  };

  tracker = { counter, maxVals };

  // write the transaction characteristics we care about to the output file
  const txChars = {
    numInputs: inputs.length,
    biggestInput: biggestInput.value,
    txValue,
    txFee,
    txid,
  };

  await writeTxToFile(txChars, originalTxid);

  // don't need await here; promise chain will resolve once base case is hit (coinbase tx)
  return traceAncestry(biggestInput.txid, tracker, originalTxid);
};

module.exports = traceAncestry;
