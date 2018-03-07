const SimpleEncoder = require('./SimpleEncoder');
const Hash = require('./Hash');

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
    return Hash.h256(this.encode());
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
    encoder.writeBytes(this.signature.toBytes());
    return encoder.toBytes();
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
