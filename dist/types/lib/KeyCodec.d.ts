/**
 * This is a key codec for Semux private/public key.
 * Ported from: https://github.com/str4d/ed25519-java/
 *
 * Private key format: PKCS#8
 * Public key format: X.509
 */
export default class KeyCodec {
    /**
     * Encode a private key into PKCS8 format.
     */
    static encodePrivateKey(seed: Uint8Array): Uint8Array;
    /**
     * Decode a PKCS8 encoded private key.
     */
    static decodePrivateKey(d: Uint8Array): Uint8Array;
    /**
     * Encode a public key into X.059 format.
     */
    static encodePublicKey(publicKey: Uint8Array): Uint8Array;
}
