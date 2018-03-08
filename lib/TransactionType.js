class TransactionType {
  static get COINBASE () { return new TransactionType(0x00); }

  static get TRANSFER () { return new TransactionType(0x01); }

  static get DELEGATE () { return new TransactionType(0x02); }

  static get VOTE () { return new TransactionType(0x03); }

  static get UNVOTE () { return new TransactionType(0x04); }

  static get CREATE () { return new TransactionType(0x05); }

  static get CALL () { return new TransactionType(0x06); }

  /**
   * @param {number} code
   */
  constructor (code) {
    /**
     * @returns {number}
     */
    this.getCode = () => code;
  }

  /**
   * @param {TransactionType} type
   * @returns {boolean}
   */
  equals (type) {
    return this.getCode() === type.getCode();
  }

  /**
   * @param {number} code
   * @returns {TransactionType}
   */
  static of (code) {
    switch (code) {
      case 0x00:
        return TransactionType.COINBASE;
      case 0x01:
        return TransactionType.TRANSFER;
      case 0x02:
        return TransactionType.DELEGATE;
      case 0x03:
        return TransactionType.VOTE;
      case 0x04:
        return TransactionType.UNVOTE;
      case 0x05:
        return TransactionType.CREATE;
      case 0x06:
        return TransactionType.CALL;
      default:
        throw new Error('Unsupported transaction type');
    }
  }
}

module.exports = TransactionType;
