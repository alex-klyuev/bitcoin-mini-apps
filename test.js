const getBlockchainInfo = require('./nodeQueryMethods/getBlockchainInfo');
const getRawTransaction = require('./nodeQueryMethods/getRawTransaction');

const requestDataAndPrint = async () => {
  console.log(await getRawTransaction('0627052b6f28912f2703066a912ea577f2ce4da4caa5a5fbd8a57286c345c2f2'));
};

requestDataAndPrint();
