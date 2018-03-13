import { blake2b } from "blakejs";
import { Buffer } from "buffer";
import RIPMED160 from "ripemd160";

/**
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/crypto/Hash.java
 */
export default class Hash {
  public static readonly HASH_LEN = 32;

  /**
   * 32-bytes blake2b hash.
   *
   * @param {Uint8Array} input
   * @returns Uint8Array
   */
  public static h256(input: Uint8Array): Uint8Array {
    return blake2b(input, undefined, this.HASH_LEN);
  }

  /**
   * 20-bytes RIPMED160(blake2b) hash.
   *
   * @param {Uint8Array} input
   * @returns Uint8Array
   */
  public static h160(input: Uint8Array): Uint8Array {
    const h256 = this.h256(input);
    const buf = Buffer.from(h256.buffer, 0, h256.length);
    return new RIPMED160().update(buf).digest();
  }
}
