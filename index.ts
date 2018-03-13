// shims
import "core-js/shim";
if (!global['XMLHttpRequest']) {
  global['XMLHttpRequest'] = require("xmlhttprequest").XMLHttpRequest;
}

// import lib
import {Configuration, DefaultApi} from "./lib/api";
import Bytes from "./lib/Bytes";
import Cast from "./lib/Cast";
import Constants from "./lib/Constants";
import Hash from "./lib/Hash";
import Key from "./lib/Key";
import KeyCodec from "./lib/KeyCodec";
import Network from "./lib/Network";
import Signature from "./lib/Signature";
import SimpleDecoder from "./lib/SimpleDecoder";
import SimpleEncoder from "./lib/SimpleEncoder";
import Transaction from "./lib/Transaction";
import TransactionType from "./lib/TransactionType";

// export Semux object
const Semux = {
  Api: DefaultApi,
  ApiConfiguration: Configuration,
  Bytes,
  Cast,
  Constants,
  Hash,
  Key,
  KeyCodec,
  Network,
  Signature,
  SimpleDecoder,
  SimpleEncoder,
  Transaction,
  TransactionType,
};

export default Semux;