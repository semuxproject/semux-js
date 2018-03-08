const Network = require('./Network');
const TransactionType = require('./TransactionType');
const Transaction = require('./Transaction');
const Long = require('long');
const Assert = require('assert');

describe("Transaction", () => {
  it("constructs a semux transaction and its hash", () => {
    const tx = new Transaction(
      Network.DEVNET,
      TransactionType.TRANSFER,
      Buffer.from("06f7e63b7556c4602b1e258172eb2abf2831c89f", "hex"),
      Long.fromString("2"),
      Long.fromString("5000000"),
      Long.fromString("1"),
      Long.fromString("1520489540520"),
      Buffer.from("64617461", "hex"),
    );

    Assert.strictEqual(tx.getNetworkId(), Network.DEVNET.getId());
    Assert.strictEqual(tx.getType().getCode(), TransactionType.TRANSFER.getCode());
    Assert.deepEqual(tx.getTo(), Buffer.from("06f7e63b7556c4602b1e258172eb2abf2831c89f", "hex"));
    Assert.ok(tx.getValue().eq(Long.fromString("2")));
    Assert.ok(tx.getFee().eq(Long.fromString("5000000")));
    Assert.ok(tx.getNonce().eq(Long.fromString("1")));
    Assert.ok(tx.getTimestamp().eq(Long.fromString("1520489540520")));
    Assert.deepEqual(tx.getTo(), Buffer.from("06f7e63b7556c4602b1e258172eb2abf2831c89f", "hex"));
    Assert.deepEqual(tx.getHash(), Buffer.from("fad1a99bdc9e40393d9e7a962e15b9a5d5415f85d8b27eea2197b2bccb50f6c5", "hex"));
    Assert.strictEqual(tx.getSignature(), undefined);
  });
});