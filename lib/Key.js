const nacl = require('tweetnacl');
const Hash = require('./Hash');
const {Buffer} = require('buffer');
const KeyCodec = require('./KeyCodec');
const Signature = require('./Signature');
const _ = require('lodash');

/**
 * Represents a key pair for the ED25519 signature algorithm.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/crypto/Key.java
 */
class Key {
  static get PUBLIC_KEY_LEN () {
    return 32;
  }

  static get ENCODED_PUBLIC_KEY_LEN () {
    return 44;
  }

  static get PRIVATE_KEY_LEN () {
    return 64;
  }

  static get ENCODED_PRIVATE_KEY_LEN () {
    return 48;
  }

  static get ADDRESS_LEN () {
    return 20;
  }

  /**
   * Generate a key-pair.
   *
   * @returns {Key}
   */
  static generateKeyPair () {
    const seed = nacl.randomBytes(nacl.lowlevel.crypto_sign_SEEDBYTES);
    const keyPair = nacl.sign.keyPair.fromSeed(seed);
    return new Key(keyPair.publicKey, keyPair.secretKey, seed);
  }

  /**
   * Import a PKCS8 encoded private key.
   *
   * @param {Uint8Array} pkcs8EncodedPrivateKey
   * @returns {Key}
   */
  static importEncodedPrivateKey (pkcs8EncodedPrivateKey) {
    if (!_.isObject(pkcs8EncodedPrivateKey) || !(pkcs8EncodedPrivateKey instanceof Uint8Array)) {
      throw new Error('Invalid pkcs8EncodedPrivateKey');
    }

    const seed = KeyCodec.decodePrivateKey(pkcs8EncodedPrivateKey);
    const keyPair = nacl.sign.keyPair.fromSeed(seed);
    return new Key(keyPair.publicKey, keyPair.secretKey, seed);
  }

  /**
   * Constructor of Semux key-pair.
   *
   * @param {Uint8Array} publicKey
   * @param {Uint8Array} privateKey
   * @param {Uint8Array} seed
   * @throws {Error}
   */
  constructor (publicKey, privateKey, seed) {
    if (!_.isObject(publicKey) || !(publicKey instanceof Uint8Array) || publicKey.length !== Key.PUBLIC_KEY_LEN) {
      throw new Error('Invalid publicKey');
    }

    if (!_.isObject(privateKey) || !(privateKey instanceof Uint8Array) || privateKey.length !== Key.PRIVATE_KEY_LEN) {
      throw new Error('Invalid privateKey');
    }

    if (!_.isObject(seed) || !(seed instanceof Uint8Array) || seed.length !== nacl.lowlevel.crypto_sign_SEEDBYTES) {
      throw new Error('Invalid seed');
    }

    // private properties
    const _seed = seed.slice();
    const _publicKey = publicKey.slice();
    const _encodedPublicKey = KeyCodec.encodePublicKey(_publicKey);
    const _privateKey = privateKey.slice();
    const _encodedPrivateKey = KeyCodec.encodePrivateKey(_privateKey, _seed);

    // getters of private properties
    /**
     * @returns {Uint8Array}
     */
    this.getPublicKey = () => _publicKey;

    /**
     * @returns {Uint8Array}
     */
    this.getEncodedPublicKey = () => _encodedPublicKey;

    /**
     * @returns {Uint8Array}
     */
    this.getPrivateKey = () => _privateKey;

    /**
     * @returns {Uint8Array}
     */
    this.getEncodedPrivateKey = () => _encodedPrivateKey;

    /**
     * @returns {Uint8Array}
     */
    this.getSeed = () => _seed;
  }

  /**
   * Convert public key into a Semux address.
   *
   * @returns {Uint8Array}
   */
  toAddressBytes () {
    return Hash.h160(this.getEncodedPublicKey());
  }

  /**
   * Convert address bytes into a hexadecimal string.
   *
   * @returns {string}
   */
  toAddressHexString () {
    return Buffer.from(this.toAddressBytes().buffer).toString('hex');
  }

  /**
   * Sign a message.
   *
   * @param {Uint8Array} message
   * @returns {Signature}
   */
  sign (message) {
    return new Signature(nacl.sign.detached(message, this.getPrivateKey()), this.getPublicKey());
  }

  /**
   * Verify a signature message.
   *
   * @param {Uint8Array} message
   * @param {Signature} signature
   * @returns {boolean}
   */
  static verify (message, signature) {
    if (
      !_.isObject(message) ||
      !(message instanceof Uint8Array) ||
      !_.isObject(signature) ||
      !(signature instanceof Signature)
    ) {
      return false;
    }

    return nacl.sign.detached.verify(message, signature.getSignedMsg(), signature.getPublicKey());
  }
}

module.exports = Key;
