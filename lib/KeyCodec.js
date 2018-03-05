const OID_OLD = 100;
const OID_ED25519 = 112;
const OID_BYTE = 11;
const IDLEN_BYTE = 6;

/**
 * This is a key codec for Semux private/public key.
 * Ported from: https://github.com/str4d/ed25519-java/
 *
 * Private key format: PKCS#8
 * Public key format: X.509
 */
class KeyCodec {
  /**
   * Encode a private key into PKCS8 format.
   *
   * @param {Uint8Array} privateKey
   * @param {Uint8Array} seed
   * @returns {Uint8Array}
   */
  static encodePrivateKey (privateKey, seed) {
    const totlen = 16 + seed.length;
    const rv = new Uint8Array(totlen);
    let idx = 0;

    // sequence
    rv[idx++] = 0x30;
    rv[idx++] = (totlen - 2);
    // version
    rv[idx++] = 0x02;
    rv[idx++] = 1;
    // v1 - no public key included
    rv[idx++] = 0;
    // Algorithm Identifier
    // sequence
    rv[idx++] = 0x30;
    rv[idx++] = 5;
    // OID
    // https://msdn.microsoft.com/en-us/library/windows/desktop/bb540809%28v=vs.85%29.aspx
    rv[idx++] = 0x06;
    rv[idx++] = 3;
    rv[idx++] = (1 * 40) + 3;
    rv[idx++] = 101;
    rv[idx++] = OID_ED25519;
    // params - absent
    // PrivateKey
    rv[idx++] = 0x04; // octet string
    rv[idx++] = 2 + seed.length;
    // CurvePrivateKey
    rv[idx++] = 0x04; // octet string
    rv[idx++] = seed.length;
    // the key
    rv.set(seed, idx);
    return rv;
  }

  /**
   * Decode a PKCS8 encoded private key.
   *
   * @param {Uint8Array} privateKey
   * @returns {Uint8Array}
   */
  static decodePrivateKey (d) {
    //
    // Setup and OID check
    //
    let totlen = 48;
    let idlen = 5;
    const doid = d[OID_BYTE];
    if (doid === OID_OLD) {
      totlen = 49;
      idlen = 8;
    } else if (doid === OID_ED25519) {
      // Detect parameter value of NULL
      if (d[IDLEN_BYTE] === 7) {
        totlen = 50;
        idlen = 7;
      }
    } else {
      throw new Error('unsupported key spec');
    }

    //
    // Pre-decoding check
    //
    if (d.length !== totlen) {
      throw new Error('invalid key spec length');
    }

    //
    // Decoding
    //
    let idx = 0;
    if (d[idx++] !== 0x30 ||
      d[idx++] !== (totlen - 2) ||
      d[idx++] !== 0x02 ||
      d[idx++] !== 1 ||
      d[idx++] !== 0 ||
      d[idx++] !== 0x30 ||
      d[idx++] !== idlen ||
      d[idx++] !== 0x06 ||
      d[idx++] !== 3 ||
      d[idx++] !== (1 * 40) + 3 ||
      d[idx++] !== 101) {
      throw new Error('unsupported key spec');
    }
    idx++; // OID, checked above
    // parameters only with old OID
    if (doid === OID_OLD) {
      if (d[idx++] !== 0x0a ||
        d[idx++] !== 1 ||
        d[idx++] !== 1) {
        throw new Error('unsupported key spec');
      }
    } else {
      // Handle parameter value of NULL
      //
      // Quote https://tools.ietf.org/html/draft-ietf-curdle-pkix-04 :
      //   For all of the OIDs, the parameters MUST be absent.
      //   Regardless of the defect in the original 1997 syntax,
      //   implementations MUST NOT accept a parameters value of NULL.
      //
      // But Java's default keystore puts it in (when decoding as
      // PKCS8 and then re-encoding to pass on), so we must accept it.
      if (idlen === 7) {
        if (d[idx++] !== 0x05 ||
          d[idx++] !== 0) {
          throw new Error('unsupported key spec');
        }
      }
      // PrivateKey wrapping the CurvePrivateKey
      if (d[idx++] !== 0x04 ||
        d[idx++] !== 34) {
        throw new Error('unsupported key spec');
      }
    }
    if (d[idx++] !== 0x04 ||
      d[idx++] !== 32) {
      throw new Error('unsupported key spec');
    }
    const rv = new Uint8Array(32);
    rv.set(d.slice(idx, idx + 32), 0);
    return rv;
  }

  /**
   * Encode a public key into X.059 format.
   *
   * @param {Uint8Array} publicKey
   * @returns {Uint8Array}
   */
  static encodePublicKey (publicKey) {
    const totlen = 12 + publicKey.length;
    const rv = new Uint8Array(totlen);
    let idx = 0;
    // sequence
    rv[idx++] = 0x30;
    rv[idx++] = (totlen - 2);
    // Algorithm Identifier
    // sequence
    rv[idx++] = 0x30;
    rv[idx++] = 5;
    // OID
    // https://msdn.microsoft.com/en-us/library/windows/desktop/bb540809%28v=vs.85%29.aspx
    rv[idx++] = 0x06;
    rv[idx++] = 3;
    rv[idx++] = (1 * 40) + 3;
    rv[idx++] = 101;
    rv[idx++] = OID_ED25519;
    // params - absent
    // the key
    rv[idx++] = 0x03; // bit string
    rv[idx++] = 1 + publicKey.length;
    rv[idx++] = 0; // number of trailing unused bits
    rv.set(publicKey, idx);
    return rv;
  }
}

module.exports = KeyCodec;
