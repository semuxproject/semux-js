/// <reference types="long" />
import Long from "long";
/**
 * Type casting utils.
 */
export default class Cast {
    static byte(n: number): number;
    /**
     * @param {number} n
     * @returns {number}
     */
    static int16(n: number): number;
    /**
     * @param {number} n
     * @returns {number}
     */
    static int32(n: number): number;
    /**
     * @param {number} n
     * @returns {Long}
     */
    static int64(n: number): Long;
}
