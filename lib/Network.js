/**
 * This class represents a network byte and label.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/Network.java
 */
class Network {
  static get MAINNET () {
    return new Network(0, 'mainnet');
  }

  static get TESTNET () {
    return new Network(1, 'testnet');
  }

  static get DEVNET () {
    return new Network(2, 'devnet');
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

  /**
   * @param {number} id
   * @returns {Network}
   * @throws {Error}
   */
  static of (id) {
    switch (id) {
      case 0:
        return Network.MAINNET;
      case 1:
        return Network.TESTNET;
      case 2:
        return Network.DEVNET;
      default:
        throw new Error('Unsupported network');
    }
  }
}

module.exports = Network;
