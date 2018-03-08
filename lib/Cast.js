const Long = require('long');

/**
 * Type casting utils.
 */
class Cast {
  /**
   * @param {number} number
   * @returns {number}
   */
  static byte (number) {
    return new Int8Array([number])[0];
  }

  /**
   * @param {number} number
   * @returns {number}
   */
  static int16 (number) {
    return new Int16Array([number])[0];
  }

  /**
   * @param {number} number
   * @returns {number}
   */
  static int32 (number) {
    return new Int32Array([number])[0];
  }

  /**
   * @param {number} number
   * @returns {Long}
   */
  static int64 (number) {
    return Long.fromInt(number);
  }
}

module.exports = Cast;
