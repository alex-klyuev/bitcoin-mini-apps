const traceAncestry = require('./src/traceAncestry');

// Either input the tx here or on the command line
let txid = 'b01e9d5c65600b5d0a0e6d99c25158722cd9e89eaa049dda740d5fc3bab7cf06';

/*
  Some tx's to test
  - Mastering Bitcoin transaction: 0627052b6f28912f2703066a912ea577f2ce4da4caa5a5fbd8a57286c345c2f2
  - Coinbase transaction from block 2: 9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5
  - A transaction that is 2 steps away from the coinbase transaction in block 25,000:
    b01e9d5c65600b5d0a0e6d99c25158722cd9e89eaa049dda740d5fc3bab7cf06
*/

txid = txid || process.argv[2];

// traceAncestry(txid);

(async () => console.log('FINAL OUTPUT', await traceAncestry(txid)))();
