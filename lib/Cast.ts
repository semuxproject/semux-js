import Long from "long";

/**
 * Type casting utils.
 */
export default class Cast {

  public static byte(n: number): number {
    return new Int8Array([n])[0];
  }

  /**
   * @param {number} n
   * @returns {number}
   */
  public static int16(n: number): number {
    return new Int16Array([n])[0];
  }

  /**
   * @param {number} n
   * @returns {number}
   */
  public static int32(n: number): number {
    return new Int32Array([n])[0];
  }

  /**
   * @param {number} n
   * @returns {Long}
   */
  public static int64(n: number): Long {
    return Long.fromInt(n);
  }
}
