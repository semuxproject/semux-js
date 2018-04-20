import { Buffer } from "buffer";
import chai from 'chai';
import Long from "long";
import Key from "../Key";
import Network from "../Network";
import Transaction from "../Transaction";
import TransactionType from "../TransactionType";
import * as API from "./api";
import {Configuration} from "./configuration";

const DEV_KEY = Key.importEncodedPrivateKey(Buffer.from(
  "302e020100300506032b657004220420acbd5f2cb2b6053f704376d12df99f2aa163d267a755c7f1d9fe55d2a2dc5405",
  "hex"
));
const DEV_ADDRESS = "23a6049381fd2cfb0661d9de206613b83d53d7df";

describe("Semux API Test", () => {

  const config = new Configuration({
    username: "user",
    password: "pass",
    basePath: "http://localhost:5171/v2.0.0"
  });

  const api = new API.SemuxApi(config);

  it("GET /info", async () => {
    const response = await api.getInfo({ mode: 'cors', credentials: 'include' });
    chai.assert.isTrue(response.success)
  });

  it("PUT /whitelist", async () => {
    const response = await api.addToWhitelist("1.2.3.4");
    chai.assert.isTrue(response.success)
  });

  it("GET /accounts", async () => {
    const response = await api.listAccounts();
    chai.assert.isTrue(response.success)
    chai.assert.deepEqual(response.result, [
      "0x2df87e6d8bc749574af35a65cf8d4a69844495ed",
      `0x${DEV_ADDRESS}`
    ]);
  });

  it("GET /account", async() => {
    const response = await api.getAccount(DEV_ADDRESS);
  })

  it("POST /transaction/raw", async () => {
    const tx = new Transaction(
      Network.DEVNET,
      TransactionType.TRANSFER,
      Buffer.from(DEV_ADDRESS, "hex"),
      Long.fromString("1234567890"),
      Long.fromString("5000000"),
      Long.fromNumber(0),
      Long.fromNumber(1524202700244),
      Buffer.from("POST /transaction/raw", "utf-8")
    );

    tx.sign(DEV_KEY);

    const response = await api.broadcastRawTransaction(Buffer.from(tx.toBytes().buffer).toString("hex"));

    chai.assert.isTrue(response.success);

    const responsePendingTxs = await api.getPendingTransactions();
    const pendingTxs : API.TransactionType[] = [{
      "blockNumber": "null",
      "hash": "0x96d4b9a2689254583daa66f83eb39b0cb75d8d0d5e66cb4c0a87cc08e3f1e549",
      "type": "TRANSFER",
      "from": `0x${DEV_ADDRESS}`,
      "to": `0x${DEV_ADDRESS}`,
      "value": "1234567890",
      "fee": "5000000",
      "nonce": "0",
      "timestamp": "1524202700244",
      "data": "0x504f5354202f7472616e73616374696f6e2f726177"
    }];
    chai.assert.isTrue(responsePendingTxs.success);
    chai.assert.deepEqual(responsePendingTxs.result, pendingTxs);
  });

});
