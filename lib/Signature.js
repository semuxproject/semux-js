const Bytes = require('./Bytes');
const Hash = require('./Hash');
const _ = require('lodash');
const KeyCodec = require('./KeyCodec');

const LENGTH = 96;
const S_LEN = 64;
const A_LEN = 32;

/**
 * Represents an EdDSA signature, wrapping the raw signature and public key.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/crypto/Key.java
 */
class Signature {
  static get LENGTH () {
    return LENGTH;
  }

  /**
   * @param {Uint8Array} signedMsg
   * @param {Uint8Array} publicKey
   * @throws {Error}
   */
  constructor (signedMsg, publicKey) {
    if (!_.isObject(signedMsg) || !(signedMsg instanceof Uint8Array) || signedMsg.length !== S_LEN) {
      throw new Error('Invalid signedMsg');
    }

    if (!_.isObject(publicKey) || !(publicKey instanceof Uint8Array) || publicKey.length !== A_LEN) {
      throw new Error('Invalid publicKey');
    }

    // private properties
    const _s = signedMsg.slice();
    const _a = publicKey.slice();

    // getters of private properties
    /**
     * @returns {Uint8Array}
     */
    this.getSignedMsg = () => _s;

    /**
     * @returns {Uint8Array}
     */
    this.getPublicKey = () => _a;

    /**
     * @returns {Uint8Array}
     */
    this.getAddress = () => Hash.h160(KeyCodec.encodePublicKey(_a));

    /**
     * @returns {Uint8Array}
     */
    this.toBytes = () => Bytes.merge(_s, _a);
  }

  /**
   * @param {Uint8Array} bytes
   * @returns {Signature}
   */
  static fromBytes (bytes) {
    if (!_.isObject(bytes) || !(bytes instanceof Uint8Array) || bytes.length !== LENGTH) {
      return null;
    }

    return new Signature(
      bytes.slice(0, S_LEN),
      bytes.slice(S_LEN, LENGTH)
    );
  }
}

module.exports = Signature;
