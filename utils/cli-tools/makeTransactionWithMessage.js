/** Function to make a transaction from one utxo to one address
 * and include data in a OP_RETURN script in a second output.
 *
 * Usage: make-tx-with-msg [txid] [vout] [address] [value] [data] [privkey]
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
 * data: data, in hex, that you want to store in the UTXO.
 *
 * privkey: private key used to sign the transaction / unlock the input.
 *
 * Fee is automatically calculated from output value minus input value.
 */


const rpc = require('../nodeConnections/rpc');

const txid = process.argv[2];
const vout = process.argv[3];
const address = process.argv[4];
const value = process.argv[5];
const data = process.argv[6];
const privKey = process.argv[7];

const inputs = [{
    txid,
    vout: Number(vout),
}];

const outputs = [
    {
        [address]: value,
    }, {
        data,
    },
];

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
