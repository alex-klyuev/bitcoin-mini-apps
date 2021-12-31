const fs = require('fs/promises');
const formatData = require('./helper/formatData');

let lit = {
  maxNumInputs: {
    txid: '6602f2800613e3db64674a11c7997ff26a9fe58d4e599ff5581c24e8fe7ee01a',
    value: 30
  },
  maxInput: {
    txid: '6602f2800613e3db64674a11c7997ff26a9fe58d4e599ff5581c24e8fe7ee01a',
    value: 1457.491
  },
  maxTxValue: {
    txid: '6602f2800613e3db64674a11c7997ff26a9fe58d4e599ff5581c24e8fe7ee01a',
    value: 1500
  },
  maxTxFee: {
    txid: 'b01e9d5c65600b5d0a0e6d99c25158722cd9e89eaa049dda740d5fc3bab7cf06',
    value: 0
  }
};

const createLine = (label, value, txid, titleLengths) => {
  const order = [label, value, txid];
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

const writeSummary = async (maxVals, header) => {
  const tableTitles = ' Ancestry Highlights        | Value           | Transaction ID ';
  const titles = tableTitles.split('|');
  const titleLengths = titles.map(title => title.length);

  const data = [];
  const keyOrder = ['maxNumInputs', 'maxInput', 'maxTxValue', 'maxTxFee'];

  const keyToNameMap = {
    maxNumInputs: ' Most Inputs in a Tx: ',
    maxInput: ' Largest Input Value in a Tx: ',
    maxTxValue: ' Largest Transaction Value: ',
    maxTxFee: ' Largest Transaction Fee: ',
  }

  for (let i = 0; i < keyOrder.length; i++) {
    data.push(
      createLine(
        keyToNameMap[keyOrder[i]],
        maxVals[keyOrder[i]].value,
        maxVals[keyOrder[i]].txid,
        titleLengths,
      )
    );
  }

  const summary = '\n' + data.join('\n');

  console.log(summary);

  const path = `${__dirname}/../../data/${header}/ancestors.txt`;
  fs.appendFile(path, line);
};

writeSummary(lit);

module.exports = writeSummary;
