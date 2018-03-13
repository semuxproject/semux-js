import { Buffer } from "buffer";
import chai from "chai";
import Hash from "./Hash";
import Key from "./Key";
import nacl from "./nacl";
import Signature from "./Signature";

describe("Key", () => {
  const TEST_ADDRESS = "0680a919c78faa59b127014b6181979ae0a62dbd";
  const TEST_ENCODED_PRIVATEKEY = "302e020100300506032b657004220420bd2f24b259aac4bfce3792c31d0f62a7f28b439c3e4feb97050efe5fe254f2af";
  const TEST_ENCODED_PUBLICKEY = "302a300506032b6570032100b72dc8ebc9f53d21837dc96483da08765ea11f25c1bd4c3cb49318c944d67b9b";
  const TEST_SIG = "e345ba4cbdc7dcca559d7b60a4740a750d565409481ffb6ee18e4d0c104bdd8d37457e383b1cd515e2f8e1a4a3ecbd771a29ef0520e4b017ca6e005881f07606b72dc8ebc9f53d21837dc96483da08765ea11f25c1bd4c3cb49318c944d67b9b";

  it("generates as key-pair", () => {
    const key = Key.generateKeyPair();
    chai.assert.strictEqual(key.getPublicKey().length, Key.PUBLIC_KEY_LEN);
    chai.assert.strictEqual(key.getEncodedPublicKey().length, Key.ENCODED_PUBLIC_KEY_LEN);
    chai.assert.strictEqual(key.getPrivateKey().length, Key.PRIVATE_KEY_LEN);
    chai.assert.strictEqual(key.getEncodedPrivateKey().length, Key.ENCODED_PRIVATE_KEY_LEN);
    chai.assert.strictEqual(key.toAddressBytes().length, Key.ADDRESS_LEN);
  });

  it("decodes & encodes a key-pair in PKCS8/X.509", () => {
    const key = Key.importEncodedPrivateKey(Buffer.from(TEST_ENCODED_PRIVATEKEY, "hex"));
    const privKey = key.getEncodedPrivateKey();
    const pubKey = key.getEncodedPublicKey();
    chai.assert.strictEqual(Buffer.from(privKey.buffer, 0, privKey.length).toString("hex"), TEST_ENCODED_PRIVATEKEY);
    chai.assert.strictEqual(Buffer.from(pubKey.buffer, 0, pubKey.length).toString("hex"), TEST_ENCODED_PUBLICKEY);
    chai.assert.strictEqual(key.toAddressHexString(), TEST_ADDRESS);

    const key2 = Key.importEncodedPrivateKey(key.getEncodedPrivateKey());
    chai.assert.deepEqual(key2.getEncodedPrivateKey(), key.getEncodedPrivateKey());
    chai.assert.deepEqual(key2.getSeed(), key.getSeed());
    chai.assert.deepEqual(key2.getPrivateKey(), key.getPrivateKey());
    chai.assert.deepEqual(key2.getPublicKey(), key.getPublicKey());
    chai.assert.deepEqual(key2.toAddressBytes(), key.toAddressBytes());
    chai.assert.strictEqual(key2.toAddressHexString(), key.toAddressHexString());
  });

  it("signs & verifies a message", () => {
    const key = Key.generateKeyPair();
    const message = Hash.h256(Buffer.from("test"));
    const sig = key.sign(message);

    chai.assert.strictEqual(sig.toBytes().length, Signature.LENGTH);
    chai.assert.isOk(Key.verify(message, sig));
    chai.assert.deepEqual(sig.getPublicKey(), key.getPublicKey());
    chai.assert.deepEqual(sig.getAddress(), key.toAddressBytes());
  });

  it("signs & verifies large data", () => {
    const data = nacl.randomBytes(1024 * 1024);
    const key = Key.generateKeyPair();
    const sig = key.sign(data);

    chai.assert.isOk(Key.verify(data, sig));
    chai.assert.deepEqual(sig.getPublicKey(), key.getPublicKey());
  });

  it("does not verify invalid signatures", () => {
    const data = Buffer.from("test");
    const hash = Hash.h256(data);

    chai.assert.isOk(!Key.verify(hash, Signature.fromBytes(nacl.randomBytes(Signature.LENGTH))));
  });

  it("verifies encoded signatures", () => {
    const key = Key.importEncodedPrivateKey(Buffer.from(TEST_ENCODED_PRIVATEKEY, "hex"));
    const sig = Signature.fromBytes(Buffer.from(TEST_SIG, "hex"));

    chai.assert.deepEqual(sig.getPublicKey(), key.getPublicKey());
    chai.assert.deepEqual(sig.getSignedMsg(), key.sign(Buffer.from("test")).getSignedMsg());
    chai.assert.deepEqual(sig.getAddress(), key.toAddressBytes());
    chai.assert.deepEqual(sig.toBytes(), Buffer.from(TEST_SIG, "hex"));
  });
});
