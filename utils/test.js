const getBlockchainInfo = require('./nodeQueryMethods/getBlockchainInfo');
const getRawTransaction = require('./nodeQueryMethods/getRawTransaction');
const decodeRawTransaction = require('./nodeQueryMethods/decodeRawTransaction');

const requestDataAndPrint = async () => {
  const res = await getRawTransaction('0627052b6f28912f2703066a912ea577f2ce4da4caa5a5fbd8a57286c345c2f2');
  const rawTx = res.result;
  console.log(await decodeRawTransaction(rawTx));
};

requestDataAndPrint();
