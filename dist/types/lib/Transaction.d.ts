import Long from "long";
import Key from "./Key";
import Network from "./Network";
import Signature from "./Signature";
import TransactionType from "./TransactionType";
export default class Transaction {
    /**
     * @param {Uint8Array} bytes
     * @returns {Transaction}
     */
    static fromBytes(bytes: Uint8Array): Transaction;
    private readonly network;
    private readonly type;
    private readonly to;
    private readonly value;
    private readonly fee;
    private readonly gas;
    private readonly gasPrice;
    private readonly nonce;
    private readonly timestamp;
    private readonly data;
    private readonly hash;
    private signature;
    constructor(network: Network, type: TransactionType, to: Uint8Array, value: Long, fee: Long, gas: Long, gasPrice: Long, nonce: Long, timestamp: Long, data: Uint8Array, hash?: Uint8Array, signature?: Signature);
    getNetworkId(): number;
    getNetwork(): Network;
    getType(): TransactionType;
    getTo(): Uint8Array;
    getValue(): Long;
    getFee(): Long;
    getGas(): Long;
    getGasPrice(): Long;
    getNonce(): Long;
    getTimestamp(): Long;
    getData(): Uint8Array;
    getSignature(): Signature | undefined;
    getHash(): Uint8Array;
    sign(key: Key): Transaction;
    toBytes(): Uint8Array;
    /**
     * Validate this transaction.
     * Return an {Error} object if the validation fails, null otherwise.
     */
    validate(network: Network): Error | null;
}
