const Assert = require('assert');
const SimpleEncoder = require('./SimpleEncoder');
const _ = require('lodash');
const Long = require('long');

describe("SimpleEncoder", () => {

  it("encodes a boolean", () => {
    const encoder = new SimpleEncoder();
    encoder.writeBoolean(true);
    Assert.deepEqual(encoder.toBytes(), Uint8Array.of(1));
    encoder.writeBoolean(false);
    Assert.deepEqual(encoder.toBytes(), Uint8Array.of(1, 0));
  });

  it("encodes a byte", () => {
    const encoder = new SimpleEncoder();
    for (let i = -128;i <= 127;i++) {
      encoder.writeByte(i);
    }
    Assert.deepEqual(encoder.toBytes(), new Uint8Array(_.range(-128, 128, 1)));
  });

  it("encodes a 32-bit integer", () => {
    const tests = {
      "00000000": 0,
      "7fffffff": 2147483647,
      "80000000": -2147483648,
      "4c29385f": 1277769823,
      "b15c848c": -1319336820
    };

    for (let bytes in tests) {
      const encoder = new SimpleEncoder();
      encoder.writeInt(tests[bytes]);
      Assert.deepEqual(encoder.toBytes(), Buffer.from(bytes, "hex"));
      Assert.equal(encoder.toBytes().length, 4);
    }
  });

  it("encodes a 64-bit integer", () => {
    const tests = {
      "0000000000000000": Long.fromString("0", false, 10),
      "7fffffffffffffff": Long.fromString("9223372036854775807", false, 10),
      "8000000000000000": Long.fromString("-9223372036854775808", false, 10),
      "161b065167181c00": Long.fromString("1592873839897353216", false, 10),
      "b5ff50cb88001000": Long.fromString("-5332454598693089280", false, 10)
    };

    for (let hex in tests) {
      const encoder = new SimpleEncoder();
      encoder.writeLong(tests[hex]);
      Assert.deepEqual(encoder.toBytes(), Buffer.from(hex, "hex"));
      Assert.equal(encoder.toBytes().length, 8);
    }
  });

  it("encodes a byte array", () => {
    const tests = {
      "00": [],
      "10999bd0a27aea7e6db940ba126d8ccf46": [-103, -101, -48, -94, 122, -22, 126, 109, -71, 64, -70, 18, 109, -116, -49, 70],
    };

    for (let hex in tests) {
      const encoder = new SimpleEncoder();
      encoder.writeBytes(new Uint8Array(tests[hex]));
      Assert.deepEqual(encoder.toBytes(), Buffer.from(hex, "hex"));
    }
  });

  it("encodes a string", () => {
    const TEST_STRING = "😀😁😂😃😄😅😆😉😢";
    const TEST_STRING_HEX = "24f09f9880f09f9881f09f9882f09f9883f09f9884f09f9885f09f9886f09f9889f09f98a2";

    const encoder = new SimpleEncoder()
    encoder.writeString(TEST_STRING);
    Assert.deepEqual(encoder.toBytes(), Buffer.from(TEST_STRING_HEX, "hex"));
  });

});