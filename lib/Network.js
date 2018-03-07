/**
 * This class represents a network byte and label.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/Network.java
 */
class Network {
  static get MAINNET () {
    return new Network(0, 'mainnet');
  }

  static get TESTNET () {
    return new Network(0, 'testnet');
  }

  static get DEVNET () {
    return new Network(0, 'devnet');
  }

  /**
   * @param {number} id
   * @param {string} label
   */
  constructor (id, label) {
    /**
     * @returns {number}
     */
    this.getId = () => id;

    /**
     * @returns {string}
     */
    this.getLabel = () => label;
  }
}

module.exports = Network;
