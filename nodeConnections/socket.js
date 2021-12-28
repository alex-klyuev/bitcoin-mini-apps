const net = require('net');
const { user, password, adr, port } = require('../nodeDetails.js');

const client = new net.Socket();

client.on('data', data => {
  console.log(data);
  client.destroy();
});

client.connect(port, adr);

client.on('connect', () => console.log('Connection opened'));
client.on('err', err => console.log(err));
client.on('close', () => console.log('Connection closed'));