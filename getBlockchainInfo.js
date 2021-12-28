const rpc = require('./rpc');

const options = {
  jsonrpc: '2.0',
  method: 'getblockchaininfo',
  params: []
};

const requestDataAndPrint = async () => {
  console.log(await rpc(options));
}

requestDataAndPrint();
