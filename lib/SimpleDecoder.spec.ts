import SimpleDecoder from "./SimpleDecoder";
import { Buffer } from "buffer";
import Assert from "assert";
import Long from "long";

describe("SimpleDecoder", () => {

  it("decodes a multi-typed data structure encoded by SimpleEncoder", () => {
    const BYTES = Buffer.from("017f7fff7fffffff7fffffffffffffff1478c1470c829951a7a65b4f3f7043d40ec38319f10474657374008080008000000080000000000000000000", "hex");
    const d = new SimpleDecoder(BYTES, 0, BYTES.length);
    Assert.strictEqual(d.readBoolean(), true);
    Assert.strictEqual(d.readByte(), 127);
    Assert.strictEqual(d.readShort(), 32767);
    Assert.strictEqual(d.readInt(), 2147483647);
    Assert.ok(d.readLong().eq(Long.fromString("0x7fffffffffffffff", false, 16)));
    Assert.deepEqual(d.readBytes(), new Uint8Array(Buffer.from("78c1470c829951a7a65b4f3f7043d40ec38319f1", "hex")));
    Assert.strictEqual(d.readString(), "test");
    Assert.strictEqual(d.readBoolean(), false);
    Assert.strictEqual(d.readByte(), -128);
    Assert.strictEqual(d.readShort(), -32768);
    Assert.strictEqual(d.readInt(), -2147483648);
    Assert.ok(d.readLong().eq(Long.fromString("0x8000000000000000", false, 16)));
    Assert.deepEqual(d.readBytes(), new Uint8Array(0));
    Assert.strictEqual(d.readString(), "");
    Assert.throws(() => d.readByte());
  });

  it("decodes sizes of byte arrays", () => {
    const SIZES = new Int32Array([0x00, 0x7F, 0x80, 0x2000, 0x3FFF, 0x4000, 0x1FFFFF, 0x200000, 0x08000000, 0x0fffffff]);
    const BYTES_SIZES = Buffer.from("007F8100C000FF7F818000FFFF7F81808000C0808000FFFFFF7F", "hex");

    const decoder = new SimpleDecoder(BYTES_SIZES, 0, BYTES_SIZES.length);
    for (let i : number = 0;i < SIZES.length;i++) {
      Assert.deepEqual(decoder.readSize(), SIZES[i]);
    }
    Assert.strictEqual(decoder.getReadIndex(), BYTES_SIZES.length);
  });
});
