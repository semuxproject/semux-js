import Signature from "./Signature";
/**
 * Represents a key pair for the ED25519 signature algorithm.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/crypto/Key.java
 */
export default class Key {
    static readonly PUBLIC_KEY_LEN: number;
    static readonly ENCODED_PUBLIC_KEY_LEN: number;
    static readonly PRIVATE_KEY_LEN: number;
    static readonly ENCODED_PRIVATE_KEY_LEN: number;
    static readonly SEED_LEN: number;
    static readonly ADDRESS_LEN: number;
    /**
     * Verify a signature message.
     */
    static verify(message: Uint8Array, signature: Signature): boolean;
    /**
     * Generate a key-pair.
     */
    static generateKeyPair(): Key;
    /**
     * Import a PKCS8 encoded private key.
     */
    static importEncodedPrivateKey(pkcs8EncodedPrivateKey: Uint8Array): Key;
    /**
     * 32-byte Standard ED25519 public key.
     */
    private readonly publicKey;
    /**
     * 44-byte publicKey encoded in X.509
     */
    private readonly encodedPublicKey;
    /**
     * 64-byte Standard ED25519 private key.
     */
    private readonly privateKey;
    /**
     * 48-byte privateKey encoded in PKCS#8.
     */
    private readonly encodedPrivateKey;
    /**
     * 32-byte Standard seed of EDD25519 key-pair.
     */
    private readonly seed;
    /**
     * Constructor of Semux key-pair.
     */
    constructor(publicKey: Uint8Array, privateKey: Uint8Array, seed: Uint8Array);
    getPublicKey(): Uint8Array;
    getEncodedPublicKey(): Uint8Array;
    getPrivateKey(): Uint8Array;
    getEncodedPrivateKey(): Uint8Array;
    getSeed(): Uint8Array;
    /**
     * Convert public key into a Semux address.
     */
    toAddressBytes(): Uint8Array;
    /**
     * Convert address bytes into a hexadecimal string.
     */
    toAddressHexString(): string;
    /**
     * Sign a message.
     */
    sign(message: Uint8Array): Signature;
}
