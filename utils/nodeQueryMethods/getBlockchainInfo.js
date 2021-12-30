const rpc = require('../nodeConnections/rpc');

const getBlockchainInfo = () => {
  const options = {
    jsonrpc: '2.0',
    method: 'getblockchaininfo',
    params: [],
  };

  return rpc(options);
}

module.exports = getBlockchainInfo;
