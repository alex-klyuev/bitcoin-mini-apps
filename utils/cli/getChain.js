// execute this file in the command line to get blockchain info

const getBlockchainInfo = require('../nodeQueryMethods/getBlockchainInfo');

(async () => console.log(await getBlockchainInfo()))();
