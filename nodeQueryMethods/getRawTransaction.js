const rpc = require('../nodeConnections/rpc');

const getRawTransaction = async (txid) => {
  const options = {
    jsonrpc: '2.0',
    method: 'getrawtransaction',
    params: [txid],
  };

  return await rpc(options);
}

module.exports = getRawTransaction;
