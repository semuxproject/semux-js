/**
 * Utility class of byte operations on Uint8Array.
 */
export default class Bytes {
    /**
     * Merge 2 Uint8Array.
     */
    static merge(b1: Uint8Array, b2: Uint8Array): Uint8Array;
    /**
     * Check whether 2 Uint8Array are equal.
     */
    static equal(b1: Uint8Array, b2: Uint8Array): boolean;
}
