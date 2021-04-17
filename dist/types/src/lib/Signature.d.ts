/**
 * Represents an EdDSA signature, wrapping the raw signature and public key.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/crypto/Key.java
 */
export default class Signature {
    static readonly LENGTH: number;
    /**
     * @param {Uint8Array} bytes
     * @returns {Signature}
     */
    static fromBytes(bytes: Uint8Array): Signature;
    private readonly signedMsg;
    private readonly publicKey;
    /**
     * @throws {Error}
     */
    constructor(signedMsg: Uint8Array, publicKey: Uint8Array);
    getSignedMsg(): Uint8Array;
    getPublicKey(): Uint8Array;
    getAddress(): Uint8Array;
    toBytes(): Uint8Array;
}
