const fs = require('fs/promises');
const axios = require('axios');
const formatData = require('./helper/formatData');

const createLine = async (label, value, txid, titleLengths) => {
  // get block height from txid by pinging the blockchain.com API
  const res = txid !== '-' ? await axios.get(`https://blockchain.info/rawtx/${txid}`) : null;
  const blockHeight = res ? res.data.block_height : '-';

  const order = [label, value, blockHeight, txid];

  const data = [];
  for (let i = 0; i < titleLengths.length; i++) {
    data.push(
      formatData(
        order[i],
        titleLengths[i],
      )
    );
  }
  const line = data.join('|');
  return line;
};

const writeSummary = async (results, header) => {
  const tableTitles = ' Ancestry Highlights                    | Value           | Block Height | Transaction ID ';
  const titles = tableTitles.split('|');
  const titleLengths = titles.map(title => title.length);

  const data = [];
  const keyOrder = ['inputTxid', 'maxNumInputs', 'maxInput', 'maxTxValue', 'maxTxFee', 'firstTxid', 'counter'];

  const keyToNameMap = {
    inputTxid: 'Input Transaction:',
    maxNumInputs: 'Most Inputs in a Tx:',
    maxInput: 'Largest Input Value in a Tx:',
    maxTxValue: 'Largest Transaction Value:',
    maxTxFee: 'Largest Transaction Fee:',
    firstTxid: 'First Tx in Chain (always a coinbase):',
    counter: 'Total # of Tx\'s in Chain:'
  }

  for (let i = 0; i < keyOrder.length; i++) {
    data.push(
      await createLine(
        keyToNameMap[keyOrder[i]],
        results[keyOrder[i]].value,
        results[keyOrder[i]].txid,
        titleLengths,
      )
    );
  }

  const summary = '\n' + data.join('\n');

  const path = `${__dirname}/../../data/${header}/ancestry-summary.txt`;
  fs.appendFile(path, summary);
};

module.exports = writeSummary;
