const rpc = require('../nodeConnections/rpc');

const getPeerInfo = () => {
  const options = {
    jsonrpc: '2.0',
    method: 'getpeerinfo',
    params: [],
  };

  return rpc(options);
}

const analyzePeerInfo = async () => {
  const peerInfo = await getPeerInfo();

  // iterate through peer info array and pick out data we want
  const connectionCount = peerInfo.length;
  const connectionTypes = {};
  const networks = {};
  const addresses = [];

  peerInfo.forEach(peer => {
    const {
      addr,
      addrbind: addrBind,
      addrlocal: addrLocal,
      network,
      connection_type: connectionType,
    } = peer;

    connectionTypes[connectionType] = connectionTypes[connectionType] ? connectionTypes[connectionType] + 1 : 1;
    networks[network] = networks[network] ? networks[network] + 1 : 1;

    const addrInfo = { addr, addrBind };
    if (addrLocal) addrInfo.addrLocal = addrLocal;

    addresses.push(addrInfo);
  });

  return {
    connectionCount,
    connectionTypes,
    networks,
    addresses,
  };
};

module.exports = analyzePeerInfo;
