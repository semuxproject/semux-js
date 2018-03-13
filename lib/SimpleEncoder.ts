import { Buffer } from "buffer";
import Long from "long";
import Cast from "./Cast";

/**
 * Semux byte encoder.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/util/SimpleEncoder.java
 */
export default class SimpleEncoder {

  /**
   * Output buffer.
   */
  private out: Uint8Array;

  public constructor() {
    this.out = new Uint8Array(0);
  }

  public writeBoolean(b: boolean): void {
    this.writeByte(b ? 1 : 0);
  }

  public writeByte(b: number): void {
    const newOut = new Uint8Array(this.out.length + 1);
    newOut.set(this.out, 0);
    newOut[newOut.length - 1] = b;
    this.out = newOut;
  }

  public writeShort(i: number): void {
    // cast i to int16
    const i16 = Cast.int16(i);

    this.writeByte(0xFF & (i16 >>> 8));
    this.writeByte(0xFF & (i16 >>> 0));
  }

  public writeInt(i: number): void {
    // cast i to int32
    const i32 = Cast.int32(i);

    this.writeByte(0xFF & (i32 >>> 24));
    this.writeByte(0xFF & (i32 >>> 16));
    this.writeByte(0xFF & (i32 >>> 8));
    this.writeByte(0xFF & (i32 >>> 0));
  }

  public writeLong(l: Long): void {
    this.writeInt(l.shr(32).toInt());
    this.writeInt(l.toInt());
  }

  public writeBytes(bytes: Uint8Array): void {
    // write size
    this.writeSize(bytes.length);

    // write bytes
    const newOut = new Uint8Array(this.out.length + bytes.length);
    newOut.set(this.out, 0);
    newOut.set(bytes, this.out.length);
    this.out = newOut;
  }

  public writeString(s: string): void {
    this.writeBytes(Buffer.from(s, "utf-8"));
  }

  public toBytes(): Uint8Array {
    return new Uint8Array(this.out);
  }

  public getWriteIndex(): number {
    return this.out.length;
  }

  public writeSize(size: number): void {
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
