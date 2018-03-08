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
}

module.exports = TransactionType;
