const rpc = require('../nodeConnections/rpc');

const decodeRawTransaction = async (rawTx) => {
  const options = {
    jsonrpc: '2.0',
    method: 'decoderawtransaction',
    params: [rawTx],
  };

  return await rpc(options);
}

module.exports = decodeRawTransaction;
