const EncryptedDb = require('./EncryptedDb')
const crypto = require('crypto');
const Cipher = require('./cipher');
const Cache = require('./cache');
const config = require('./config.json');

exports.init = (name, workdir) => {
    const { latestSaved, salt } = config;
    if (!salt) {
        throw new Error('salt is required');
    }
    const cipherInst = new Cipher(crypto, salt);
    const cacheInst = new Cache(latestSaved || [])
    return new EncryptedDb(name, workdir, cipherInst, cacheInst);
};