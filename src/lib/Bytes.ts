/**
 * Utility class of byte operations on Uint8Array.
 */
export default class Bytes {

  /**
   * Merge 2 Uint8Array.
   */
  public static merge(b1: Uint8Array, b2: Uint8Array): Uint8Array {
    const res = new Uint8Array(b1.length + b2.length);
    res.set(b1);
    res.set(b2, b1.length);
    return res;
  }

  /**
   * Check whether 2 Uint8Array are equal.
   */
  public static equal(b1: Uint8Array, b2: Uint8Array): boolean {
    if (b1.length !== b2.length) {
      return false;
    }

    for (let i = 0; i < b1.length; i++) {
      if (b1[i] !== b2[i]) { return false; }
    }

    return true;
  }
}
