const getBlockHash = require('./getBlockHash');
const getBlockFromHash = require('./getBlockFromHash');

const getBlock = async (height) => {
  const hash = await getBlockHash(height);
  return getBlockFromHash(hash);
};

module.exports = getBlock;
