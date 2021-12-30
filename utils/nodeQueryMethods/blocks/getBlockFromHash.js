const rpc = require('../../nodeConnections/rpc');

const getBlockFromHash = (hash) => {
  const options = {
    jsonrpc: '2.0',
    method: 'getblock',
    params: [hash],
  };

  return rpc(options);
}

module.exports = getBlockFromHash;
