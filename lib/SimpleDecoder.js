const Long = require('long');
const {byte, int16, int32} = require('./Cast');

/**
 * Semux byte decoder.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/util/SimpleDecoder.java
 */
class SimpleDecoder {
  /**
   * @param {Uint8Array} bytes
   * @param {number} from
   * @param {number} to
   */
  constructor (bytes, from, to) {
    this.bytes = bytes;
    this.from = from;
    this.to = to;
    this.index = from;
  }

  /**
   * @returns {boolean}
   */
  readBoolean () {
    this.require(1);
    return this.bytes[this.index++] !== 0;
  }

  /**
   * @returns {number}
   */
  readByte () {
    this.require(1);
    return byte(this.bytes[this.index++]);
  }

  /**
   * @returns {number}
   */
  readShort () {
    this.require(2);
    return int16((this.bytes[this.index++] & 0xFF) << 8 | (this.bytes[this.index++] & 0xFF));
  }

  /**
   * @returns {number}
   */
  readInt () {
    this.require(4);
    return int32(this.bytes[this.index++] << 24 | (this.bytes[this.index++] & 0xFF) << 16 | (this.bytes[this.index++] & 0xFF) << 8 | (this.bytes[this.index++] & 0xFF));
  }

  /**
   * @returns {Long}
   */
  readLong () {
    const i1 = this.readInt();
    const i2 = this.readInt();
    return unsignedInt(i1).shiftLeft(32).or(unsignedInt(i2));
  }

  /**
   * @returns {Uint8Array}
   */
  readBytes () {
    const len = this.readSize();

    this.require(len);
    const buf = new Uint8Array(len);
    buf.set(this.bytes.slice(this.index, this.index + len), 0);
    this.index += len;

    return buf;
  }

  /**
   * @returns {string}
   */
  readString () {
    return Buffer.from(this.readBytes()).toString('utf-8');
  }

  readSize () {
    let size = 0;
    for (let i = 0; i < 4; i++) {
      this.require(1);
      const b = this.bytes[this.index++];

      size = (size << 7) | (b & 0x7F);
      if ((b & 0x80) === 0) {
        break;
      }
    }
    return size;
  }

  /**
   * @param {number} n
   * @throws {Error}
   */
  require (n) {
    if (this.to - this.index < n) {
      throw new Error(`input [${this.from}, ${this.to}], require: [${this.index}, ${this.index + n}]`);
    }
  }

  /**
   * @returns {number}
   */
  getReadIndex () {
    return this.index;
  }
}

/**
 * @param {number} i
 * @returns {Long}
 */
function unsignedInt (i) {
  return Long.fromInt(i).and(Long.fromString('0x00000000ffffffff', false, 16));
}

module.exports = SimpleDecoder;
