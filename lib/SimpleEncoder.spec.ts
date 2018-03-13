import { Buffer } from "buffer";
import chai from "chai";
import Long from "long";
import SimpleEncoder from "./SimpleEncoder";

describe("SimpleEncoder", () => {

  it("encodes a boolean", () => {
    const encoder = new SimpleEncoder();
    encoder.writeBoolean(true);
    chai.assert.deepEqual(encoder.toBytes(), Uint8Array.of(1));
    encoder.writeBoolean(false);
    chai.assert.deepEqual(encoder.toBytes(), Uint8Array.of(1, 0));
  });

  it("encodes a byte", () => {
    const encoder = new SimpleEncoder();
    for (let i = -128; i <= 127; i++) {
      encoder.writeByte(i);
    }
    chai.assert.deepEqual(encoder.toBytes(), Buffer.from("808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f", "hex"));
  });

  it("encodes a 16-bit integer", () => {
    const tests = {
      "0000": 0,
      "258e": 9614,
      "7fff": 32767,
      "8000": -32768,
      "a66d": -22931,
    };

    for (const bytes in tests) {
      const encoder = new SimpleEncoder();
      encoder.writeShort(tests[bytes]);
      chai.assert.deepEqual(encoder.toBytes(), Buffer.from(bytes, "hex"));
      chai.assert.strictEqual(encoder.toBytes().length, 2);
    }
  });

  it("encodes a 32-bit integer", () => {
    const tests = {
      "00000000": 0,
      "7fffffff": 2147483647,
      "80000000": -2147483648,
      "4c29385f": 1277769823,
      "b15c848c": -1319336820,
    };

    for (const bytes in tests) {
      const encoder = new SimpleEncoder();
      encoder.writeInt(tests[bytes]);
      chai.assert.deepEqual(encoder.toBytes(), Buffer.from(bytes, "hex"));
      chai.assert.strictEqual(encoder.toBytes().length, 4);
    }
  });

  it("encodes a 64-bit integer", () => {
    const tests = {
      "0000000000000000": Long.fromString("0", false, 10),
      "7fffffffffffffff": Long.fromString("9223372036854775807", false, 10),
      "8000000000000000": Long.fromString("-9223372036854775808", false, 10),
      "161b065167181c00": Long.fromString("1592873839897353216", false, 10),
      "b5ff50cb88001000": Long.fromString("-5332454598693089280", false, 10),
    };

    for (const hex in tests) {
      const encoder = new SimpleEncoder();
      encoder.writeLong(tests[hex]);
      chai.assert.deepEqual(encoder.toBytes(), Buffer.from(hex, "hex"));
      chai.assert.strictEqual(encoder.toBytes().length, 8);
    }
  });

  it("encodes a byte array", () => {
    const tests = {
      "00": [],
      "10999bd0a27aea7e6db940ba126d8ccf46": [-103, -101, -48, -94, 122, -22, 126, 109, -71, 64, -70, 18, 109, -116, -49, 70],
    };

    for (const hex in tests) {
      const encoder = new SimpleEncoder();
      encoder.writeBytes(new Uint8Array(tests[hex]));
      chai.assert.deepEqual(encoder.toBytes(), Buffer.from(hex, "hex"));
    }
  });

  it("encodes a string", () => {
    const TEST_STRING = "😀😁😂😃😄😅😆😉😢";
    const TEST_STRING_HEX = "24f09f9880f09f9881f09f9882f09f9883f09f9884f09f9885f09f9886f09f9889f09f98a2";

    const encoder = new SimpleEncoder();
    encoder.writeString(TEST_STRING);
    chai.assert.deepEqual(encoder.toBytes(), Buffer.from(TEST_STRING_HEX, "hex"));
  });

  it("encoded a multi-typed data structure", () => {
    const BYTES_TX = Buffer.from("017f7fff7fffffff7fffffffffffffff1478c1470c829951a7a65b4f3f7043d40ec38319f10474657374008080008000000080000000000000000000", "hex");

    const e = new SimpleEncoder();
    e.writeBoolean(true);
    e.writeByte(127);
    e.writeShort(32767);
    e.writeInt(2147483647);
    e.writeLong(Long.fromString("0x7fffffffffffffff", false, 16));
    e.writeBytes(Buffer.from("78c1470c829951a7a65b4f3f7043d40ec38319f1", "hex"));
    e.writeString("test");
    e.writeBoolean(false);
    e.writeByte(-128);
    e.writeShort(-32768);
    e.writeInt(-2147483648);
    e.writeLong(Long.fromString("0x8000000000000000", false, 16));
    e.writeBytes(new Uint8Array(0));
    e.writeString("");

    chai.assert.deepEqual(e.toBytes(), BYTES_TX);
  });

  it("encodes sizes of byte arrays", () => {
    const SIZES = new Int32Array([0x00, 0x7F, 0x80, 0x2000, 0x3FFF, 0x4000, 0x1FFFFF, 0x200000, 0x08000000, 0x0fffffff]);
    const SIZES_ENCODED = Buffer.from("007F8100C000FF7F818000FFFF7F81808000C0808000FFFFFF7F", "hex");

    const encoder = new SimpleEncoder();
    for (let i : number = 0;i < SIZES.length;i++) {
      encoder.writeSize(SIZES[i]);
    }

    chai.assert.deepEqual(encoder.toBytes(), SIZES_ENCODED);
  });

});
