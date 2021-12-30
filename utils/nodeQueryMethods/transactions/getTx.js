const getRawTransaction = require('./getRawTransaction');
const decodeRawTransaction = require('./decodeRawTransaction');

const getTx = async (txid) => {
  const rawTx = await getRawTransaction(txid);
  return decodeRawTransaction(rawTx);
};

module.exports = getTx;
