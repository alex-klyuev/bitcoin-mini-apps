// execute this file in the command line with a transaction hash as the argument
// to retrieve the full transaction object

const getTx = require('../nodeQueryMethods/getTx');

(async () => console.log(await getTx(process.argv[2])))();
