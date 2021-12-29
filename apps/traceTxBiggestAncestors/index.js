const traceAncestry = require('./src/traceAncestry');

// Either input the tx here or on the command line
let txid = '0627052b6f28912f2703066a912ea577f2ce4da4caa5a5fbd8a57286c345c2f2';

txid = txid || process.argv[2];

traceAncestry(txid);
