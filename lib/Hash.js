const {blake2b} = require('blakejs');
const RIPMED160 = require('ripemd160');
const {Buffer} = require('buffer');
const _ = require('lodash');

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
    if (!_.isObject(input) || !(input instanceof Uint8Array)) {
      throw new Error('Invalid input.');
    }
    return blake2b(input, null, this.HASH_LEN);
  }

  /**
   * 20-bytes RIPMED160(blake2b) hash.
   *
   * @param {Uint8Array} input
   * @returns Uint8Array
   */
  static h160 (input) {
    if (!_.isObject(input) || !(input instanceof Uint8Array)) {
      throw new Error('Invalid input.');
    }
    return new RIPMED160().update(Buffer.from(this.h256(input))).digest();
  }
}

module.exports = Hash;
