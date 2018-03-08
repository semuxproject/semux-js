const Network = require('./Network');
const TransactionType = require('./TransactionType');
const Transaction = require('./Transaction');
const Long = require('long');
const Assert = require('assert');
const Key = require('./Key');
const {Buffer} = require('buffer');

describe("Transaction", () => {
  function TEST_TX() {
    return new Transaction(
      TEST_TX.network,
      TEST_TX.type,
      TEST_TX.to,
      TEST_TX.value,
      TEST_TX.fee,
      TEST_TX.nonce,
      TEST_TX.timestamp,
      TEST_TX.data,
    );
  }

  TEST_TX.network = Network.DEVNET;
  TEST_TX.type = TransactionType.TRANSFER;
  TEST_TX.to = Buffer.from("06f7e63b7556c4602b1e258172eb2abf2831c89f", "hex");
  TEST_TX.value = Long.fromString("2");
  TEST_TX.fee = Long.fromString("5000000");
  TEST_TX.nonce = Long.fromString("1");
  TEST_TX.timestamp = Long.fromString("1520489540520");
  TEST_TX.data = Buffer.from("64617461", "hex");
  TEST_TX.hash = Buffer.from("fad1a99bdc9e40393d9e7a962e15b9a5d5415f85d8b27eea2197b2bccb50f6c5", "hex");
  TEST_TX.key = Key.importEncodedPrivateKey(Buffer.from("302e020100300506032b657004220420bd2f24b259aac4bfce3792c31d0f62a7f28b439c3e4feb97050efe5fe254f2af", "hex"));
  TEST_TX.serialized = Buffer.from("20fad1a99bdc9e40393d9e7a962e15b9a5d5415f85d8b27eea2197b2bccb50f6c53c02011406f7e63b7556c4602b1e258172eb2abf2831c89f000000000000000200000000004c4b40000000000000000100000162043d2ba80464617461603a2948cbf99a5d833176139c9a66279389e8e8c71eec242826922e07e3c92882929afb82ce3048ec21310d5fe295e674587cd0197da6250542fc839a546d1b0db72dc8ebc9f53d21837dc96483da08765ea11f25c1bd4c3cb49318c944d67b9b", "hex");

  it("constructs a semux transaction and its hash", () => {
    const tx = TEST_TX();
    Assert.strictEqual(tx.getNetworkId(), TEST_TX.network.getId());
    Assert.strictEqual(tx.getType().getCode(), TEST_TX.type.getCode());
    Assert.deepEqual(tx.getTo(), TEST_TX.to);
    Assert.ok(tx.getValue().eq(TEST_TX.value));
    Assert.ok(tx.getFee().eq(TEST_TX.fee));
    Assert.ok(tx.getNonce().eq(TEST_TX.nonce));
    Assert.ok(tx.getTimestamp().eq(TEST_TX.timestamp));
    Assert.deepEqual(tx.getData(), TEST_TX.data);
    Assert.deepEqual(tx.getHash(), TEST_TX.hash);
    Assert.strictEqual(tx.getSignature(), undefined);
  });

  it("validates data and signature", () => {
    const tx = TEST_TX().sign(TEST_TX.key);
    Assert.strictEqual(tx.validate(TEST_TX.network), null);
  });

  it("serializes in bytes", () => {
    const tx = TEST_TX().sign(TEST_TX.key);
    Assert.deepEqual(tx.toBytes(), TEST_TX.serialized);
  })

});