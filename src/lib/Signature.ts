import Bytes from "./Bytes";
import Hash from "./Hash";
import KeyCodec from "./KeyCodec";

const LENGTH = 96;
const S_LEN = 64;
const A_LEN = 32;

/**
 * Represents an EdDSA signature, wrapping the raw signature and public key.
 * Ported from: https://github.com/semuxproject/semux/blob/master/src/main/java/org/semux/crypto/Key.java
 */
export default class Signature {

  public static get LENGTH() {
    return LENGTH;
  }

  /**
   * @param {Uint8Array} bytes
   * @returns {Signature}
   */
  public static fromBytes(bytes: Uint8Array): Signature {
    if (bytes.length !== LENGTH) {
      throw new Error("Invalid length of bytes.");
    }

    return new Signature(
      bytes.slice(0, S_LEN),
      bytes.slice(S_LEN, LENGTH),
    );
  }

  private readonly signedMsg: Uint8Array;

  private readonly publicKey: Uint8Array;

  /**
   * @throws {Error}
   */
  public constructor(signedMsg: Uint8Array, publicKey: Uint8Array) {
    if (signedMsg.length !== S_LEN) {
      throw new Error("Invalid signedMsg");
    }

    if (publicKey.length !== A_LEN) {
      throw new Error("Invalid publicKey");
    }

    this.signedMsg = signedMsg;
    this.publicKey = publicKey;
  }

  public getSignedMsg(): Uint8Array {
    return this.signedMsg.slice();
  }

  public getPublicKey(): Uint8Array {
    return this.publicKey.slice();
  }

  public getAddress(): Uint8Array {
    return Hash.h160(KeyCodec.encodePublicKey(this.publicKey));
  }

  public toBytes(): Uint8Array {
    return Bytes.merge(this.signedMsg, this.publicKey);
  }
}
