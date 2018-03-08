const SimpleEncoder = require('./SimpleEncoder');
const Hash = require('./Hash');
const Key = require('./Key');
const Signature = require('./Signature');
const TransactionType = require('./TransactionType');
const _ = require('lodash');
const Long = require('long');
const Constants = require('./Constants');
const Bytes = require('./Bytes');

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
   * @param {Uint8Array} [hash]
   */
  constructor (
    network,
    type,
    to,
    value,
    fee,
    nonce,
    timestamp,
    data,
    hash
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

    /**
     * @returns {Signature|undefined}
     */
    this.getSignature = () => this.signature;

    /**
     * @returns {Uint8Array}
     */
    this.getHash = () => hash ? hash.slice() : hashTx(this);
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

    if (!Long.isLong(this.getValue()) || this.getValue().lt(0)) {
      return new Error('Invalid value');
    }

    if (!Long.isLong(this.getFee()) || this.getFee().lt(0)) {
      return new Error('Invalid fee');
    }

    if (!Long.isLong(this.getNonce()) || this.getNonce().lt(0)) {
      return new Error('Invalid nonce');
    }

    if (!Long.isLong(this.getTimestamp()) || this.getTimestamp().lt(0)) {
      return new Error('Invalid timestamp');
    }

    if (!_.isObject(this.getData()) || !(this.getData() instanceof Uint8Array)) {
      return new Error('Invalid data');
    }

    if (!Bytes.equal(hashTx(this), hash)) {
      return new Error('Invalid hash');
    }

    if (!_.isObject(this.getSignature()) || !(this.getSignature() instanceof Signature) || !Key.verify(hash, this.getSignature())) {
      return new Error('Invalid signature');
    }

    if (!this.getType().equals(TransactionType.COINBASE) && Bytes.equal(this.getSignature().getAddress(), Constants.COINBASE_KEY.toAddressBytes())) {
      return new Error('Invalid signature');
    }

    return null;
  }
}

/**
 * @param {Transaction} tx
 * @returns {Uint8Array}
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

/**
 * @param {Transaction} tx
 * @returns {Uint8Array}
 */
function hashTx (tx) {
  return Hash.h256(encodeTx(tx));
}

module.exports = Transaction;
