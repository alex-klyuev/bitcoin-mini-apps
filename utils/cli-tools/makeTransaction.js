/** Function to make a transaction from one utxo to an address with a specified output
 *
 * Usage: make-tx [txid] [vout] [address] [value] [privkey]
 *
 * Params:
 *
 * utxo inputs
 *  txid: txid of the transaction where the specified utxo was an output
 *  vout: index of the utxo in the transaction specified above
 *
 * address: recipient address
 *
 * value: amount to send (in btc)
 *
 * privkey: private key used to sign the transaction / unlock the utxo.
 *
 * Fee is automatically calculated from output value minus input value.
 */


const rpc = require('../nodeConnections/rpc');

const txid = process.argv[2];
const vout = process.argv[3];
const address = process.argv[4];
const value = process.argv[5];
const privKey = process.argv[6];

const inputs = [{
  txid,
  vout: Number(vout),
}];

const outputs = [{
  [address]: value,
}];

const keys = [privKey];

const createRawTransaction = (inputs, outputs) => {
  const options = {
    jsonrpc: '2.0',
    method: 'createrawtransaction',
    params: [inputs, outputs],
  };

  return rpc(options);
};

const signTransaction = (tx, keys) => {
  const options = {
    jsonrpc: '2.0',
    method: 'signrawtransactionwithkey',
    params: [tx, keys],
  };

  return rpc(options);
};

const sendTransaction = (tx) => {
  const options = {
    jsonrpc: '2.0',
    method: 'sendrawtransaction',
    params: [tx],
  };

  return rpc(options);
}

const exec = async () => {
  const tx = await createRawTransaction(inputs, outputs);
  const signedTx = (await signTransaction(tx, keys)).hex;
  return sendTransaction(signedTx);
};

(async () => console.log(await exec()))();
