const axios = require('axios');
const { user, password, adr, port } = require('../nodeDetails.js');

const rpc = async (params) => {
  try {
    const res = await axios.post(`http://${user}:${password}@${adr}:${port}`, params);
    return res.data.result;
  } catch (err) {
    console.log(err.response.data.error);
  }
};

module.exports = rpc;
