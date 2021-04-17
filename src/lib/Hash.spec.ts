import { Buffer } from "buffer";
import chai from "chai";
import Hash from "./Hash";

describe("Hash", () => {
  const msg = "test";
  const msgBlake2b = "928b20366943e2afd11ebc0eae2e53a93bf177a4fcf35bcc64d503704e65e202";
  const msgH160 = "86e8402b7615f07a2acb2ef1f4a54d323bbede77";

  it("h256('') = '0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8'", () => {
    const hash = Hash.h256(new Uint8Array(0));
    chai.assert.strictEqual(
      Buffer.from(hash.buffer).toString("hex"),
      "0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8",
    );
  });

  it("h256('test') = '928b20366943e2afd11ebc0eae2e53a93bf177a4fcf35bcc64d503704e65e202'", () => {
    const hash = Hash.h256(Buffer.from(msg));
    chai.assert.strictEqual(Buffer.from(hash.buffer).toString("hex"), msgBlake2b);
  });

  it("h160('test') = '86e8402b7615f07a2acb2ef1f4a54d323bbede77'", () => {
    const hash = Hash.h160(Buffer.from(msg, "UTF-8"));
    chai.assert.strictEqual(Buffer.from(hash.buffer).toString("hex"), msgH160);
  });
});
