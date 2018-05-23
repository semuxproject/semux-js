import { Buffer } from "buffer";
import chai from 'chai';
import sleep from "es7-sleep";
import Long from "long";
import Key from "../Key";
import Network from "../Network";
import Transaction from "../Transaction";
import TransactionType from "../TransactionType";
import * as API from "./api";
import {PendingTransactionType} from "./api";
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
    basePath: "http://localhost:5171/v2.1.0"
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
    chai.assert.isTrue(response.success);
  })

  it("POST /transaction/raw", async () => {
    const data = Buffer.from("POST /transaction/raw", "utf-8");
    const tx = new Transaction(
      Network.DEVNET,
      TransactionType.TRANSFER,
      Buffer.from(DEV_ADDRESS, "hex"),
      Long.fromString("1234567890"),
      Long.fromString("5000000"),
      Long.fromNumber(0),
      Long.fromNumber(new Date().getTime()),
      data
    ).sign(DEV_KEY);

    const encodedTx = Buffer.from(tx.toBytes().buffer).toString("hex");
    const response = await api.broadcastRawTransaction(encodedTx);
    chai.assert.isTrue(response.success);

    await sleep(500);

    const responsePendingTxs = await api.getPendingTransactions();
    const pendingTxs: API.PendingTransactionType[] = [{
      "hash": `0x${Buffer.from(tx.getHash().buffer).toString('hex')}`,
      "type": PendingTransactionType.TypeEnum.TRANSFER,
      "from": `0x${DEV_ADDRESS}`,
      "to": `0x${DEV_ADDRESS}`,
      "value": "1234567890",
      "fee": "5000000",
      "nonce": "0",
      "timestamp": tx.getTimestamp().toString(),
      "data": `0x${Buffer.from(data.buffer).toString('hex')}`
    }];
    chai.assert.isTrue(responsePendingTxs.success);
    chai.assert.deepEqual(responsePendingTxs.result, pendingTxs);
  });

});
