const getBlockHash = require('./getBlockHash');
const getBlockFromHash = require('./getBlockFromHash');

const getBlock = async (height) => {
  const hash = await getBlockHash(height);
  return getBlockFromHash(hash);
};

// (async () => console.log(await getBlock(2)))();

module.exports = getBlock;
