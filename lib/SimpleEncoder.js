const _ = require('lodash');
const {Buffer} = require('buffer');
const Long = require('long');

/**
 * Semux byte encoder.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/util/SimpleEncoder.java
 */
class SimpleEncoder {

  constructor () {
    this.out = new Int8Array(0);
  }

  /**
   * @param {boolean} b
   */
  writeBoolean(b) {
    this.writeByte(b ? 1 : 0);
  }

  /**
   * @param {number} b
   */
  writeByte(b) {
    if (!_.isNumber(b)) {
      throw new Error("b must be a number");
    }

    const newOut = new Int8Array(this.out.length + 1)
    newOut.set(this.out, 0);
    newOut[newOut.length - 1] = b;
    this.out = newOut;
  }

  /**
   * @param {number} i
   */
  writeInt(i) {
    if (!_.isNumber(i)) {
      throw new Error("i must be a number");
    }

    // cast i to int32
    const int32 = new Int32Array([i])[0];

    this.writeByte((int32 >>> 24) & 0xFF);
    this.writeByte((int32 >>> 16) & 0xFF);
    this.writeByte((int32 >>> 8) & 0xFF);
    this.writeByte((int32 >>> 0) & 0xFF);
  }

  /**
   * @param {Long} l
   */
  writeLong(l) {
    if (!Long.isLong(l)) {
      throw new Error("l must be a Long object");
    }

    this.writeInt(l.shr(32).toInt());
    this.writeInt(l.toInt());
  }

  /**
   * @param {Uint8Array} bytes
   */
  writeBytes(bytes) {
    if (!_.isObject(bytes) || !(bytes instanceof Uint8Array)) {
      throw new Error("bytes must be an Uint8Array object.");
    }

    // write size
    this.writeSize(bytes.length);

    // write bytes
    const newOut = new Int8Array(this.out.length + bytes.length)
    newOut.set(this.out, 0);
    newOut.set(bytes, this.out.length)
    this.out = newOut;
  }

  /**
   * @param {string} s
   */
  writeString(s) {
    this.writeBytes(Buffer.from(s, "utf-8"));
  }

  /**
   * @returns {Uint8Array}
   */
  toBytes() {
    return new Uint8Array(this.out);
  }

  /**
   * @returns {number}
   */
  getWriteIndex() {
    return this.out.length;
  }

  /**
   * @param {number} size
   */
  writeSize(size) {
    if (size < 0) {
      throw new Error("Size can't be negative: " + size);
    } else if (size > 0x0FFFFFFF) {
      throw new Error("Size can't be larger than 0x0FFFFFFF");
    }

    const buf = new Int32Array(4);
    let i = buf.length;
    do {
      buf[--i] = size & 0x7f;
      size >>>= 7;
    } while (size > 0);

    while (i < buf.length) {
      if (i !== buf.length - 1) {
        this.writeByte(buf[i++] | 0x80);
      } else {
        this.writeByte(buf[i++]);
      }
    }
  }
}

module.exports = SimpleEncoder;