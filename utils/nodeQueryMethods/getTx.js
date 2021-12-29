const getRawTransaction = require('./getRawTransaction');
const decodeRawTransaction = require('./decodeRawTransaction');

const getTx = async (txid) => {
  const rawTx = (await getRawTransaction(txid)).result;
  return (await decodeRawTransaction(rawTx)).result;
};

module.exports = getTx;
