const rpc = require('../nodeConnections/rpc');

const getBlockchainInfo = async () => {
  const options = {
    jsonrpc: '2.0',
    method: 'getblockchaininfo',
    params: [],
  };

  return await rpc(options);
}

module.exports = getBlockchainInfo;
