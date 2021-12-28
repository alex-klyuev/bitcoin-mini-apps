const getRawTransaction = require('../nodeQueryMethods/getRawTransaction');
const decodeRawTransaction = require('../nodeQueryMethods/decodeRawTransaction');

const getTx = async (txid) => {
  const rawTx = (await getRawTransaction(txid)).result;
  return (await decodeRawTransaction(rawTx)).result;
};

// next step: get values
// search by vout -> n to find correct output
// push output value to array
// then you can search through values for largest one (you'll need reference to the txid too)

const getTxInputTxs = async (txid) => {
  const tx = await getTx(txid);

  console.log('query TX', tx);
  const inputs = tx.vin;
  const inputTxs = [];

  for (let i = 0; i < inputs.length; i++) {
    const inputTx = await getTx(inputs[i].txid);
    inputTxs.push(inputTx);
  }

  console.log('input TXs', inputTxs);
};

getTxInputTxs('0627052b6f28912f2703066a912ea577f2ce4da4caa5a5fbd8a57286c345c2f2');
