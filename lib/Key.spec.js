const Assert = require('assert');
const Key = require('./Key');
const Hash = require('./Hash');
const Signature = require('./Signature');
const nacl = require('tweetnacl');
const {Buffer} = require('buffer');

describe('Key', () => {
  const TEST_ADDRESS = "0680a919c78faa59b127014b6181979ae0a62dbd";
  const TEST_ENCODED_PRIVATEKEY = "302e020100300506032b657004220420bd2f24b259aac4bfce3792c31d0f62a7f28b439c3e4feb97050efe5fe254f2af";
  const TEST_ENCODED_PUBLICKEY = "302a300506032b6570032100b72dc8ebc9f53d21837dc96483da08765ea11f25c1bd4c3cb49318c944d67b9b";
  const TEST_SIG = "e345ba4cbdc7dcca559d7b60a4740a750d565409481ffb6ee18e4d0c104bdd8d37457e383b1cd515e2f8e1a4a3ecbd771a29ef0520e4b017ca6e005881f07606b72dc8ebc9f53d21837dc96483da08765ea11f25c1bd4c3cb49318c944d67b9b";

  it('generates a key-pair', () => {
    const key = Key.generateKeyPair();
    Assert.equal(key.getPublicKey().length, Key.PUBLIC_KEY_LEN);
    Assert.equal(key.getEncodedPublicKey().length, Key.ENCODED_PUBLIC_KEY_LEN);
    Assert.equal(key.getPrivateKey().length, Key.PRIVATE_KEY_LEN);
    Assert.equal(key.getEncodedPrivateKey().length, Key.ENCODED_PRIVATE_KEY_LEN);
    Assert.equal(key.toAddressBytes().length, Key.ADDRESS_LEN);
  });

  it('decodes & encodes private/public key in PKCS8', () => {
    const key = Key.importEncodedPrivateKey(Buffer.from(TEST_ENCODED_PRIVATEKEY, "hex"));
    Assert.equal(Buffer.from(key.getEncodedPrivateKey()).toString("hex"), TEST_ENCODED_PRIVATEKEY);
    Assert.equal(Buffer.from(key.getEncodedPublicKey()).toString("hex"), TEST_ENCODED_PUBLICKEY);
    Assert.equal(key.toAddressHexString(), TEST_ADDRESS);

    const key2 = Key.importEncodedPrivateKey(key.getEncodedPrivateKey());
    Assert.deepEqual(key2.getEncodedPrivateKey(), key.getEncodedPrivateKey());
    Assert.deepEqual(key2.getSeed(), key.getSeed());
    Assert.deepEqual(key2.getPrivateKey(), key.getPrivateKey());
    Assert.deepEqual(key2.getPublicKey(), key.getPublicKey());
    Assert.deepEqual(key2.toAddressBytes(), key.toAddressBytes());
    Assert.equal(key2.toAddressHexString(), key.toAddressHexString());
  });

  it('signs & verifies a message', () => {
    const key = Key.generateKeyPair();
    const message = Hash.h256(Buffer.from("test"));
    const sig = key.sign(message);

    Assert.equal(sig.toBytes().length, Signature.LENGTH);
    Assert.ok(Key.verify(message, sig));
    Assert.deepEqual(sig.getPublicKey(), key.getPublicKey());
    Assert.deepEqual(sig.getAddress(), key.toAddressBytes());
  });

  it('signs & verifies large data', () => {
    const data = nacl.randomBytes(1024 * 1024);
    const key = Key.generateKeyPair();
    const sig = key.sign(data);

    Assert.ok(Key.verify(data, sig));
    Assert.deepEqual(sig.getPublicKey(), key.getPublicKey());
  });

  it('does not verify invalid signatures', () => {
    const data = Buffer.from("test");
    const hash = Hash.h256(data);

    Assert.ok(Key.verify(hash, Signature.fromBytes(nacl.randomBytes(20))) === false);
    Assert.ok(Key.verify(hash, Signature.fromBytes(nacl.randomBytes(Signature.LENGTH))) === false);
    Assert.ok(Key.verify(hash, Signature.fromBytes(nacl.randomBytes(200))) === false);
  });

  it('verifies encoded signatures', () => {
    const key = Key.importEncodedPrivateKey(Buffer.from(TEST_ENCODED_PRIVATEKEY, "hex"));
    const sig = Signature.fromBytes(Buffer.from(TEST_SIG, "hex"));

    Assert.deepEqual(sig.getPublicKey(), key.getPublicKey());
    Assert.deepEqual(sig.getSignedMsg(), key.sign(Buffer.from("test")).getSignedMsg());
    Assert.deepEqual(sig.getAddress(), key.toAddressBytes());
    Assert.deepEqual(sig.toBytes(), Buffer.from(TEST_SIG, "hex"));
  });
});
