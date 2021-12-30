const traceAncestry = require('./src/traceAncestry');

// Either input the tx here or on the command line
let txid = '0627052b6f28912f2703066a912ea577f2ce4da4caa5a5fbd8a57286c345c2f2';

/*
  Some tx's to test
  - Mastering Bitcoin transaction: 0627052b6f28912f2703066a912ea577f2ce4da4caa5a5fbd8a57286c345c2f2
  - Coinbase transaction from block 2: 9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5
*/

txid = txid || process.argv[2];

console.log('WE GOT TO THE END!', traceAncestry(txid));
// traceAncestry(txid);
