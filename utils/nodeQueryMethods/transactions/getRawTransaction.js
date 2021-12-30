const rpc = require('../../nodeConnections/rpc');

const getRawTransaction = (txid) => {
  const options = {
    jsonrpc: '2.0',
    method: 'getrawtransaction',
    params: [txid],
  };

  return rpc(options);
}

module.exports = getRawTransaction;
