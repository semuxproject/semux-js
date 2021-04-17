import { Buffer } from "buffer";
import Long from "long";
import Cast from "./Cast";

/**
 * Semux byte decoder.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/util/SimpleDecoder.java
 */
export default class SimpleDecoder {

  private readonly bytes: Uint8Array;
  private readonly from: number;
  private readonly to: number;
  private index: number;

  public constructor(bytes: Uint8Array, from: number, to: number) {
    this.bytes = bytes;
    this.from = from;
    this.to = to;
    this.index = from;
  }

  public readBoolean(): boolean {
    this.require(1);
    return this.bytes[this.index++] !== 0;
  }

  public readByte(): number {
    this.require(1);
    return Cast.byte(this.bytes[this.index++]);
  }

  public readShort(): number {
    this.require(2);
    return Cast.int16((this.bytes[this.index++] & 0xFF) << 8 | (this.bytes[this.index++] & 0xFF));
  }

  public readInt(): number {
    this.require(4);
    return Cast.int32(
      (this.bytes[this.index++] << 24) |
        (this.bytes[this.index++] & 0xFF) << 16 |
        (this.bytes[this.index++] & 0xFF) << 8 |
        (this.bytes[this.index++] & 0xFF),
    );
  }

  public readLong(): Long {
    const i1 = this.readInt();
    const i2 = this.readInt();
    return unsignedInt(i1).shiftLeft(32).or(unsignedInt(i2));
  }

  public readBytes(): Uint8Array {
    const len = this.readSize();

    this.require(len);
    const buf = new Uint8Array(len);
    buf.set(this.bytes.slice(this.index, this.index + len), 0);
    this.index += len;

    return buf;
  }

  public readString(): string {
    const buf = this.readBytes();
    return Buffer.from(buf.buffer, 0, buf.length).toString("utf-8");
  }

  public readSize(): number {
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

  public require(n: number): void {
    if (this.to - this.index < n) {
      throw new Error(`input [${this.from}, ${this.to}], require: [${this.index}, ${this.index + n}]`);
    }
  }

  public getReadIndex(): number {
    return this.index;
  }
}

/**
 * @param {number} i
 * @returns {Long}
 */
function unsignedInt(i: number): Long {
  return Long.fromInt(i).and(Long.fromString("0x00000000ffffffff", false, 16));
}
