import Assert from "assert";
import { Buffer } from "buffer";
import Key from "./Key";
import Long from "long";
import Network from "./Network";
import TransactionType from "./TransactionType";
import Transaction from "./Transaction";

describe("Transaction", () => {
  function TEST_TX() {
    return new Transaction(
      TEST_V.network,
      TEST_V.type,
      TEST_V.to,
      TEST_V.value,
      TEST_V.fee,
      TEST_V.nonce,
      TEST_V.timestamp,
      TEST_V.data,
    );
  }

  const TEST_V : any = {};
  TEST_V.network = Network.DEVNET;
  TEST_V.type = TransactionType.TRANSFER;
  TEST_V.to = Buffer.from("06f7e63b7556c4602b1e258172eb2abf2831c89f", "hex");
  TEST_V.value = Long.fromString("2");
  TEST_V.fee = Long.fromString("5000000");
  TEST_V.nonce = Long.fromString("1");
  TEST_V.timestamp = Long.fromString("1520489540520");
  TEST_V.data = Buffer.from("64617461", "hex");
  TEST_V.hash = Buffer.from("fad1a99bdc9e40393d9e7a962e15b9a5d5415f85d8b27eea2197b2bccb50f6c5", "hex");
  TEST_V.key = Key.importEncodedPrivateKey(Buffer.from("302e020100300506032b657004220420bd2f24b259aac4bfce3792c31d0f62a7f28b439c3e4feb97050efe5fe254f2af", "hex"));
  TEST_V.serialized = Buffer.from("20fad1a99bdc9e40393d9e7a962e15b9a5d5415f85d8b27eea2197b2bccb50f6c53c02011406f7e63b7556c4602b1e258172eb2abf2831c89f000000000000000200000000004c4b40000000000000000100000162043d2ba80464617461603a2948cbf99a5d833176139c9a66279389e8e8c71eec242826922e07e3c92882929afb82ce3048ec21310d5fe295e674587cd0197da6250542fc839a546d1b0db72dc8ebc9f53d21837dc96483da08765ea11f25c1bd4c3cb49318c944d67b9b", "hex");
  TEST_V.signature = Buffer.from("3a2948cbf99a5d833176139c9a66279389e8e8c71eec242826922e07e3c92882929afb82ce3048ec21310d5fe295e674587cd0197da6250542fc839a546d1b0db72dc8ebc9f53d21837dc96483da08765ea11f25c1bd4c3cb49318c944d67b9b", "hex");

  function assertTestTx(tx : Transaction) {
    Assert.strictEqual(tx.getNetworkId(), TEST_V.network.getId());
    Assert.strictEqual(tx.getType().getCode(), TEST_V.type.getCode());
    Assert.deepEqual(tx.getTo(), TEST_V.to);
    Assert.ok(tx.getValue().eq(TEST_V.value));
    Assert.ok(tx.getFee().eq(TEST_V.fee));
    Assert.ok(tx.getNonce().eq(TEST_V.nonce));
    Assert.ok(tx.getTimestamp().eq(TEST_V.timestamp));
    Assert.deepEqual(tx.getData(), TEST_V.data);
    Assert.deepEqual(tx.getHash(), TEST_V.hash);
  }

  it("constructs a semux transaction and its hash", () => {
    const tx = TEST_TX();
    assertTestTx(tx);
    Assert.strictEqual(tx.getSignature(), undefined);
  });

  it("validates data and signature", () => {
    const tx = TEST_TX().sign(TEST_V.key);
    Assert.strictEqual(tx.validate(TEST_V.network), null);
  });

  it("serializes in bytes", () => {
    const tx = TEST_TX().sign(TEST_V.key);
    Assert.deepEqual(tx.toBytes(), TEST_V.serialized);
  });

  it("de-serializes a serialized transaction", () => {
    const tx = Transaction.fromBytes(TEST_V.serialized);
    assertTestTx(tx);
    Assert.deepEqual(tx.getSignature().getPublicKey(), TEST_V.key.getPublicKey());
    Assert.deepEqual(tx.getSignature().toBytes(), TEST_V.signature);
  });
});
