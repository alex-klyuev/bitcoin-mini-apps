const axios = require('axios');
const { user, password, adr, port } = require('./nodeDetails.js');

const rpc = async (params) => {
  const res = await axios.post(`http://${user}:${password}@${adr}:${port}`, params);
  return res.data;
};

module.exports = rpc;
