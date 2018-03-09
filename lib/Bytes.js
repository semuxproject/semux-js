const _ = require('lodash');

/**
 * Utility class of byte operations on Uint8Array.
 */
class Bytes {
  /**
   * Merge 2 Uint8Array.
   *
   * @param {Uint8Array} b1
   * @param {Uint8Array} b2
   * @returns {Uint8Array}
   */
  static merge (b1, b2) {
    const res = new Uint8Array(b1.length + b2.length);
    res.set(b1);
    res.set(b2, b1.length);
    return res;
  }

  /**
   * Check whether 2 Uint8Array are equal.
   *
   * @param {Uint8Array} b1
   * @param {Uint8Array} b2
   * @returns {boolean}
   */
  static equal (b1, b2) {
    if (!_.isObject(b1) || !(b1 instanceof Uint8Array) || !_.isObject(b2) || !(b2 instanceof Uint8Array)) {
      return false;
    }

    if (b1.length !== b2.length) {
      return false;
    }

    for (let i = 0; i < b1.length; i++) {
      if (b1[i] !== b2[i]) return false;
    }

    return true;
  }
}

module.exports = Bytes;
