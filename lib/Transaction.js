const SimpleEncoder = require('./SimpleEncoder');
const Hash = require('./Hash');
const Key = require('./Key');
const Signature = require('./Signature');
const TransactionType = require('./TransactionType');
const _ = require('lodash');
const Long = require('long');

class Transaction {
  /**
   * @param {Network} network
   * @param {TransactionType} type
   * @param {Uint8Array} to
   * @param {Long} value
   * @param {Long} fee
   * @param {Long} nonce
   * @param {Long} timestamp
   * @param {Uint8Array} data
   */
  constructor (
    network,
    type,
    to,
    value,
    fee,
    nonce,
    timestamp,
    data
  ) {
    // getters of private properties
    /**
     * @returns {number}
     */
    this.getNetworkId = () => network.getId();

    /**
     * @returns {TransactionType}
     */
    this.getType = () => type;

    /**
     * @returns {Uint8Array}
     */
    this.getTo = () => to.slice();

    /**
     * @returns {Long}
     */
    this.getValue = () => value;

    /**
     * @returns {Long}
     */
    this.getFee = () => fee;

    /**
     * @returns {Long}
     */
    this.getNonce = () => nonce;

    /**
     * @returns {Long}
     */
    this.getTimestamp = () => timestamp;

    /**
     * @returns {Uint8Array}
     */
    this.getData = () => data.slice();
  }

  /**
   * @returns {Uint8Array}
   */
  getHash () {
    return Hash.h256(encodeTx(this));
  }

  /**
   * @param {Key} key
   * @returns {Transaction}
   */
  sign (key) {
    this.signature = key.sign(this.getHash());
    return this;
  }

  /**
   * @returns {Uint8Array}
   */
  toBytes () {
    const encoder = new SimpleEncoder();
    encoder.writeBytes(this.getHash());
    encoder.writeBytes(encodeTx(this));
    if (_.isObject(this.signature) && this.signature instanceof Signature) {
      encoder.writeBytes(this.signature.toBytes());
    }
    return encoder.toBytes();
  }

  /**
   * Validate this transaction.
   * Return an {Error} object if the validation fails, null otherwise.
   *
   * @param {Network} network
   * @returns {Error|null}
   */
  validate (network) {
    const hash = this.getHash();
    if (!_.isObject(hash) || !(hash instanceof Uint8Array) || hash.length !== Hash.HASH_LEN) {
      return new Error('Invalid hash');
    }

    if (this.getNetworkId() !== network.getId()) {
      return new Error('Invalid networkId');
    }

    const type = this.getType();
    if (!_.isObject(type) || !(type instanceof TransactionType)) {
      return new Error('Invalid type');
    }

    const to = this.getTo();
    if (!_.isObject(to) || !(to instanceof Uint8Array) || to.length !== Key.ADDRESS_LEN) {
      return new Error('Invalid to');
    }

    if (!Long.isLong(this.getValue())) {
      return new Error('Invalid value');
    }

    if (!Long.isLong(this.getFee())) {
      return new Error('Invalid fee');
    }

    if (!Long.isLong(this.getNonce())) {
      return new Error('Invalid nonce');
    }

    if (!Long.isLong(this.getTimestamp())) {
      return new Error('Invalid timestamp');
    }

    if (!_.isObject(this.getData()) || !(this.getData() instanceof Uint8Array)) {
      return new Error('Invalid data');
    }

    if (_.isObject(this.signature) && !(this.signature instanceof Signature)) {
      return new Error('Invalid signature');
    }

    return null;
  }
}

/**
 * @param {Transaction} tx
 */
function encodeTx (tx) {
  const encoder = new SimpleEncoder();
  encoder.writeByte(tx.getNetworkId());
  encoder.writeByte(tx.getType().getCode());
  encoder.writeBytes(tx.getTo());
  encoder.writeLong(tx.getValue());
  encoder.writeLong(tx.getFee());
  encoder.writeLong(tx.getNonce());
  encoder.writeLong(tx.getTimestamp());
  encoder.writeBytes(tx.getData());
  return encoder.toBytes();
}

module.exports = Transaction;
