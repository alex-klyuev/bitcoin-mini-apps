const rpc = require('../../nodeConnections/rpc');

const decodeRawTransaction = (rawTx) => {
  const options = {
    jsonrpc: '2.0',
    method: 'decoderawtransaction',
    params: [rawTx],
  };

  return rpc(options);
}

module.exports = decodeRawTransaction;
