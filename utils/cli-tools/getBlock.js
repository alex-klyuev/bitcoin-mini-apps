// execute this file in the command line with a block height (i.e. block number) as the argument
// to retrieve the full block object

const getBlock = require('../nodeQueryMethods/blocks/getBlock');

(async () => console.log(await getBlock(Number(process.argv[2]))))();
