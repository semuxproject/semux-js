import { Buffer } from "buffer";
import nacl from "tweetnacl";
import Hash from "./Hash";
import KeyCodec from "./KeyCodec";
import Signature from "./Signature";

/**
 * Represents a key pair for the ED25519 signature algorithm.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/crypto/Key.java
 */
export default class Key {

  public static get PUBLIC_KEY_LEN(): number {
    return 32;
  }

  public static get ENCODED_PUBLIC_KEY_LEN(): number {
    return 44;
  }

  public static get PRIVATE_KEY_LEN(): number {
    return 64;
  }

  public static get ENCODED_PRIVATE_KEY_LEN(): number {
    return 48;
  }

  public static get SEED_LEN(): number {
    return 32;
  }

  public static get ADDRESS_LEN(): number {
    return 20;
  }

  /**
   * Verify a signature message.
   */
  public static verify(message: Uint8Array, signature: Signature) : boolean {
    return nacl.sign.detached.verify(message, signature.getSignedMsg(), signature.getPublicKey());
  }

  /**
   * Generate a key-pair.
   */
  public static generateKeyPair(): Key {
    const seed = nacl.randomBytes(Key.SEED_LEN);
    const keyPair = nacl.sign.keyPair.fromSeed(seed);
    return new Key(keyPair.publicKey, keyPair.secretKey, seed);
  }

  /**
   * Import a PKCS8 encoded private key.
   */
  public static importEncodedPrivateKey(pkcs8EncodedPrivateKey: Uint8Array): Key {
    const seed = KeyCodec.decodePrivateKey(pkcs8EncodedPrivateKey);
    const keyPair = nacl.sign.keyPair.fromSeed(seed);
    return new Key(keyPair.publicKey, keyPair.secretKey, seed);
  }

  /**
   * 32-byte Standard ED25519 public key.
   */
  private readonly publicKey: Uint8Array;

  /**
   * 44-byte publicKey encoded in X.509
   */
  private readonly encodedPublicKey: Uint8Array;

  /**
   * 64-byte Standard ED25519 private key.
   */
  private readonly privateKey: Uint8Array;

  /**
   * 48-byte privateKey encoded in PKCS#8.
   */
  private readonly encodedPrivateKey: Uint8Array;

  /**
   * 32-byte Standard seed of EDD25519 key-pair.
   */
  private readonly seed: Uint8Array;

  /**
   * Constructor of Semux key-pair.
   */
  public constructor(publicKey: Uint8Array, privateKey: Uint8Array, seed: Uint8Array) {
    if (publicKey.length !== Key.PUBLIC_KEY_LEN) {
      throw new Error("Invalid publicKey");
    }

    if (privateKey.length !== Key.PRIVATE_KEY_LEN) {
      throw new Error("Invalid privateKey");
    }

    if (seed.length !== Key.SEED_LEN) {
      throw new Error("Invalid seed");
    }

    this.publicKey = publicKey.slice();
    this.privateKey = privateKey.slice();
    this.seed = seed.slice();
    this.encodedPublicKey = KeyCodec.encodePublicKey(publicKey);
    this.encodedPrivateKey = KeyCodec.encodePrivateKey(seed);
  }

  public getPublicKey(): Uint8Array {
    return this.publicKey.slice();
  }

  public getEncodedPublicKey(): Uint8Array {
    return this.encodedPublicKey.slice();
  }

  public getPrivateKey(): Uint8Array {
    return this.privateKey.slice();
  }

  public getEncodedPrivateKey(): Uint8Array {
    return this.encodedPrivateKey.slice();
  }

  public getSeed(): Uint8Array {
    return this.seed.slice();
  }

  /**
   * Convert public key into a Semux address.
   */
  public toAddressBytes(): Uint8Array {
    return Hash.h160(this.getEncodedPublicKey());
  }

  /**
   * Convert address bytes into a hexadecimal string.
   */
  public toAddressHexString(): string {
    return Buffer.from(this.toAddressBytes().buffer).toString("hex");
  }

  /**
   * Sign a message.
   */
  public sign(message: Uint8Array): Signature {
    return new Signature(nacl.sign.detached(message, this.getPrivateKey()), this.getPublicKey());
  }
}
