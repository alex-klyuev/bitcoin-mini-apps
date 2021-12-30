const rpc = require('../../nodeConnections/rpc');

const getBlockHash = (height) => {
  const options = {
    jsonrpc: '2.0',
    method: 'getblockhash',
    params: [height],
  };

  return rpc(options);
}

module.exports = getBlockHash;
