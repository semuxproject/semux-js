/// <reference types="long" />
import Long from "long";
/**
 * Semux byte decoder.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/util/SimpleDecoder.java
 */
export default class SimpleDecoder {
    private readonly bytes;
    private readonly from;
    private readonly to;
    private index;
    constructor(bytes: Uint8Array, from: number, to: number);
    readBoolean(): boolean;
    readByte(): number;
    readShort(): number;
    readInt(): number;
    readLong(): Long;
    readBytes(): Uint8Array;
    readString(): string;
    readSize(): number;
    require(n: number): void;
    getReadIndex(): number;
}
