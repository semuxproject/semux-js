const Key = require('./Key');
const {Buffer} = require('buffer');

module.exports = Object.freeze({
  COINBASE_KEY: Key.importEncodedPrivateKey(Buffer.from('302e020100300506032b657004220420acdd12174cbc3fa6e4076cb1e270989cf4d47b0de8942c8542fe6a3bed34d7bf', 'hex')),
  DEVNET_KEY: Key.importEncodedPrivateKey(Buffer.from('302e020100300506032b657004220420acbd5f2cb2b6053f704376d12df99f2aa163d267a755c7f1d9fe55d2a2dc5405', 'hex'))
});
