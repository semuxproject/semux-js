const {blake2b} = require('blakejs');
const RIPMED160 = require('ripemd160');
const {Buffer} = require('buffer');

/**
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/crypto/Hash.java
 */
class Hash {
  static get HASH_LEN () {
    return 32;
  }

  /**
   * 32-bytes blake2b hash.
   *
   * @param {Uint8Array} input
   * @returns Uint8Array
   */
  static h256 (input) {
    return blake2b(input, null, this.HASH_LEN);
  }

  /**
   * 20-bytes RIPMED160(blake2b) hash.
   *
   * @param {Uint8Array} input
   * @returns Uint8Array
   */
  static h160 (input) {
    return new RIPMED160().update(Buffer.from(this.h256(input))).digest();
  }
}

module.exports = Hash;
