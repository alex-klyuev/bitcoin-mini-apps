const axios = require('axios');
const { user, password, network } = require('./nodeDetails.js');

// set to 'local' if node runs on same machine
// set to 'lan' if node runs on another machine on local network
const node = 'local';

const { adr, port } = network[node];

const rpc = async (params) => {
  const res = await axios.post(`http://${user}:${password}@${adr}:${port}`, params);
  return res.data;
};

module.exports = rpc;
