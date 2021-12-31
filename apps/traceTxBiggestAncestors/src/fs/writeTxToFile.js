const fs = require('fs/promises');
const formatData = require('./helper/formatData');

const writeTxToFile = (txChars, originalTxid) => {
  const tableTitles = ' Number of Inputs | Biggest Input | Transaction Value | Transaction Fee | Transaction ID ';
  const titles = tableTitles.split('|');
  const titleLengths = titles.map(title => title.length);

  const data = [];
  const keyOrder = ['numInputs', 'biggestInput', 'txValue', 'txFee', 'txid'];

  for (let i = 0; i < titleLengths.length; i++) {
    data.push(
      formatData(
        txChars[keyOrder[i]],
        titleLengths[i],
      )
    );
  }

  const line = '\n' + data.join('|');

  const header = originalTxid.slice(0, 7);
  const path = `${__dirname}/../../data/${header}/ancestors.txt`;
  fs.appendFile(path, line);
};

module.exports = writeTxToFile;
