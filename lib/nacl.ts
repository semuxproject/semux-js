// FIXME: replace this dirty hack to support both browser & node
import nacl from "tweetnacl";

let crypto = typeof window !== 'undefined' ? (window["crypto"] || window["msCrypto"]) : null;
if (crypto && crypto.getRandomValues) {
  // Browsers.
  const QUOTA = 65536;
  nacl.setPRNG((x, n) => {
    let v = new Uint8Array(n);
    for (let i = 0; i < n; i += QUOTA) {
      crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
    }
    for (let i = 0; i < n; i++) { x[i] = v[i]; }
    v = new Uint8Array(0);
  });
} else if (require('detect-node')) {
  // Node.js.
  crypto = eval("require('crypto')");
  if (crypto && crypto.randomBytes) {
    nacl.setPRNG((x, n) => {
      let v = crypto.randomBytes(n);
      for (let i = 0; i < n; i++) { x[i] = v[i]; }
      v = new Uint8Array(0);
    });
  }
}

export default nacl;