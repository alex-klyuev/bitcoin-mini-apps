const fs = require('fs/promises');

const write = async () => {
  await fs.mkdir('test');
  await fs.writeFile('test/test.txt', 'test');
  return (await fs.readFile('test/test.txt')).toString();
};

(async () => console.log(await write()))();
