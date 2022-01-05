// execute this file in the command line to get peer info

const analyzePeerInfo = require('../nodeQueryMethods/getPeerInfo');

(async () => console.log(await analyzePeerInfo()))();