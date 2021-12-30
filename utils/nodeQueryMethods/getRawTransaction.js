const rpc = require('../nodeConnections/rpc');

const getRawTransaction = async (txid) => {
  const options = {
    jsonrpc: '2.0',
    method: 'getrawtransaction',
    params: [txid],
  };

  return rpc(options);
}

(async () => console.log(await getRawTransaction('b01e9d5c65600b5d0a0e6d99c25158722cd9e89eaa049dda740d5fc3bab7cf06')))();

module.exports = getRawTransaction;
