import { Buffer } from "buffer";
import chai from "chai";
import Long from "long";
import SimpleDecoder from "./SimpleDecoder";

describe("SimpleDecoder", () => {

  it("decodes a multi-typed data structure encoded by SimpleEncoder", () => {
    const BYTES = Buffer.from("017f7fff7fffffff7fffffffffffffff1478c1470c829951a7a65b4f3f7043d40ec38319f10474657374008080008000000080000000000000000000", "hex");
    const d = new SimpleDecoder(BYTES, 0, BYTES.length);
    chai.assert.strictEqual(d.readBoolean(), true);
    chai.assert.strictEqual(d.readByte(), 127);
    chai.assert.strictEqual(d.readShort(), 32767);
    chai.assert.strictEqual(d.readInt(), 2147483647);
    chai.assert.isOk(d.readLong().eq(Long.fromString("0x7fffffffffffffff", false, 16)));
    chai.assert.deepEqual(d.readBytes(), new Uint8Array(Buffer.from("78c1470c829951a7a65b4f3f7043d40ec38319f1", "hex")));
    chai.assert.strictEqual(d.readString(), "test");
    chai.assert.strictEqual(d.readBoolean(), false);
    chai.assert.strictEqual(d.readByte(), -128);
    chai.assert.strictEqual(d.readShort(), -32768);
    chai.assert.strictEqual(d.readInt(), -2147483648);
    chai.assert.isOk(d.readLong().eq(Long.fromString("0x8000000000000000", false, 16)));
    chai.assert.deepEqual(d.readBytes(), new Uint8Array(0));
    chai.assert.strictEqual(d.readString(), "");
    chai.assert.throws(() => d.readByte());
  });

  it("decodes sizes of byte arrays", () => {
    const SIZES = new Int32Array([0x00, 0x7F, 0x80, 0x2000, 0x3FFF, 0x4000, 0x1FFFFF, 0x200000, 0x08000000, 0x0fffffff]);
    const BYTES_SIZES = Buffer.from("007F8100C000FF7F818000FFFF7F81808000C0808000FFFFFF7F", "hex");

    const decoder = new SimpleDecoder(BYTES_SIZES, 0, BYTES_SIZES.length);
    for (let i : number = 0;i < SIZES.length;i++) {
      chai.assert.deepEqual(decoder.readSize(), SIZES[i]);
    }
    chai.assert.strictEqual(decoder.getReadIndex(), BYTES_SIZES.length);
  });
});
