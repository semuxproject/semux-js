import { Buffer } from "buffer";
import chai from 'chai';
import sleep from "es7-sleep";
import Long from "long";
import Key from "../Key";
import Network from "../Network";
import Transaction from "../Transaction";
import TransactionType from "../TransactionType";
import * as API from "./api";
import { Configuration } from "./configuration";
import { BlockchainApi } from "../..";

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

  const nodeApi = new API.NodeApi(config);
  const accountApi = new API.AccountApi(config);
  const walletApi = new API.WalletApi(config);
  const toolApi = new API.ToolApi(config);
  const blockchainApi = new API.BlockchainApi(config);
  let contractHash = '';

  it("GET /info", async () => {
    const response = await nodeApi.getInfo({ mode: 'cors', credentials: 'include' });
    chai.assert.isTrue(response.success)
  });

  it("PUT /whitelist", async () => {
    const response = await nodeApi.addToWhitelist("1.2.3.4");
    chai.assert.isTrue(response.success)
  });

  it("GET /accounts", async () => {
    const response = await walletApi.getAccounts();
    chai.assert.isTrue(response.success)
    chai.assert.isArray(response.result)
  });

  it("GET /account", async() => {
    const response = await accountApi.getAccount(DEV_ADDRESS);
    chai.assert.isTrue(response.success);
  })

  it("GET /broadcast-raw-transaction transfer", async () => {
    const data = Buffer.from("GET /broadcast-raw-transaction", "utf-8");
    const { result } = await accountApi.getAccount(DEV_ADDRESS);
    const nonce = result.nonce
    const tx = new Transaction(
      Network.DEVNET,
      TransactionType.TRANSFER,
      Buffer.from(DEV_ADDRESS, "hex"),
      Long.fromString("123"),
      Long.fromString("5000000"),
      Long.fromString("0"),
      Long.fromString("0"),
      Long.fromNumber(Number(nonce)), 
      Long.fromNumber(new Date().getTime()),
      data
    ).sign(DEV_KEY);

    const encodedTx = Buffer.from(tx.toBytes().buffer).toString("hex");
    const response = await toolApi.broadcastRawTransaction(encodedTx);
    chai.assert.isTrue(response.success);

    await sleep(500);

    const responsePendingTxs = await nodeApi.getPendingTransactions();
    const pendingTxs: API.TransactionType[] = [{
      "hash": `0x${Buffer.from(tx.getHash().buffer).toString('hex')}`,
      "type": API.TransactionType.TypeEnum.TRANSFER,
      "from": `0x${DEV_ADDRESS}`,
      "to": `0x${DEV_ADDRESS}`,
      "value": "123",
      "fee": "5000000",
      "gas": "0",
      "gasPrice": "0",
      "nonce": nonce,
      "timestamp": tx.getTimestamp().toString(),
      "data": `0x${Buffer.from(data.buffer).toString('hex')}`
    }];
    chai.assert.isTrue(responsePendingTxs.success);
    chai.assert.deepEqual(responsePendingTxs.result, pendingTxs);
  });

  it("GET /broadcast-raw-transaction create", async () => {
    const data = Buffer.from("608060405234801561001057600080fd5b5060df8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60aa565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a72305820e2b18033a6504bd07fafeb0aabf24f581bcce9542faa6f36b4637e97d5b2de450029", "hex");                 
    const { result } = await accountApi.getAccount(DEV_ADDRESS);
    const nonce = Number(result.nonce) + result.pendingTransactionCount

    const tx = new Transaction(
      Network.DEVNET,
      TransactionType.CREATE,
      Buffer.from('0x00','hex'),
      Long.fromString("0"),
      Long.fromString("0"),
      Long.fromString("700000"),
      Long.fromString("100"),
      Long.fromNumber(Number(nonce)), 
      Long.fromNumber(new Date().getTime()),
      data
    ).sign(DEV_KEY);
    const encodedTx = Buffer.from(tx.toBytes().buffer).toString("hex");
    const response = await toolApi.broadcastRawTransaction(encodedTx);
    chai.assert.isTrue(response.success);
    contractHash = response.result;
    await sleep(20000);
    
  })

  it("GET /broadcast-raw-transaction call", async () => {
    const data = Buffer.from("0x60fe47b1000000000000000000000000000000000000000000000000000000000000000a", "hex");
    const { result } = await accountApi.getAccount(DEV_ADDRESS);
    const contractData = await blockchainApi.getTransactionResult(contractHash);
    const to = contractData.result.contractAddress;
    const nonce = Number(result.nonce) + result.pendingTransactionCount;
    const tx = new Transaction(
      Network.DEVNET,
      TransactionType.CALL,
      Buffer.from(to.slice(2),'hex'),
      Long.fromString("0"),
      Long.fromString("0"),
      Long.fromString("100000"),
      Long.fromString("100"),
      Long.fromNumber(nonce), 
      Long.fromNumber(new Date().getTime()),
      data
    ).sign(DEV_KEY);

    const encodedTx = Buffer.from(tx.toBytes().buffer).toString("hex");
    const response = await toolApi.broadcastRawTransaction(encodedTx);
    chai.assert.isTrue(response.success);
    await sleep(500);
  })
});
