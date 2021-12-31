const fs = require('fs/promises');

const createFiles = async (header) => {
  const dataDir = `${__dirname}/../../data/${header}`;
  try {
    await fs.mkdir(dataDir);
  } catch { /* dir exists - nothing needs to be done */ }

  const ancestorTableTitles = ' Number of Inputs | Biggest Input | Transaction Value | Transaction Fee | Transaction ID ';
  const summaryTableTitles = ' Ancestry Highlights        | Value           | Transaction ID ';;

  await fs.writeFile(`${dataDir}/ancestors.txt`, ancestorTableTitles);
  await fs.writeFile(`${dataDir}/ancestors-summary.txt`, summaryTableTitles);
};

module.exports = createFiles;
