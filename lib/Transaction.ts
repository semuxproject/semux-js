import Long from "long";
import Bytes from "./Bytes";
import Constants from "./Constants";
import Hash from "./Hash";
import Key from "./Key";
import Network from "./Network";
import Signature from "./Signature";
import SimpleDecoder from "./SimpleDecoder";
import SimpleEncoder from "./SimpleEncoder";
import TransactionType from "./TransactionType";

export default class Transaction {

  /**
   * @param {Uint8Array} bytes
   * @returns {Transaction}
   */
  public static fromBytes(bytes: Uint8Array): Transaction {
    const decoder = new SimpleDecoder(bytes, 0, bytes.length);
    const hash = decoder.readBytes();
    const tx = decodeTx(decoder.readBytes());
    const signature = Signature.fromBytes(decoder.readBytes());
    return new Transaction(
      Network.of(tx.getNetworkId()),
      tx.getType(),
      tx.getTo(),
      tx.getValue(),
      tx.getFee(),
      tx.getGas(),
      tx.getGasPrice(),
      tx.getNonce(),
      tx.getTimestamp(),
      tx.getData(),
      hash,
      signature,
    );
  }

  private readonly network: Network;
  private readonly type: TransactionType;
  private readonly to: Uint8Array;
  private readonly value: Long;
  private readonly fee: Long;
  private readonly gas: Long;
  private readonly gasPrice: Long;
  private readonly nonce: Long;
  private readonly timestamp: Long;
  private readonly data: Uint8Array;
  private readonly hash: Uint8Array;
  private signature: Signature | undefined;

  public constructor(
    network: Network,
    type: TransactionType,
    to: Uint8Array,
    value: Long,
    fee: Long,
    gas: Long,
    gasPrice: Long,
    nonce: Long,
    timestamp: Long,
    data: Uint8Array,
    hash?: Uint8Array,
    signature?: Signature,
  ) {
    this.network = network;
    this.type = type;
    this.to = to.slice();
    this.value = value;
    this.fee = fee;
    this.gas = gas;
    this.gasPrice = gasPrice;
    this.nonce = nonce;
    this.timestamp = timestamp;
    this.data = data.slice();
    this.hash = hash ? hash : hashTx(this);
    this.signature = signature;
  }

  public getNetworkId(): number {
    return this.network.getId();
  }

  public getNetwork(): Network {
    return this.network;
  }

  public getType(): TransactionType {
    return this.type;
  }

  public getTo(): Uint8Array {
    return this.to.slice();
  }

  public getValue(): Long {
    return this.value;
  }

  public getFee(): Long {
    return this.fee;
  }

  public getGas(): Long {
    return this.gas;
  }

  public getGasPrice(): Long {
    return this.gasPrice;
  }

  public getNonce(): Long {
    return this.nonce;
  }

  public getTimestamp(): Long {
    return this.timestamp;
  }

  public getData(): Uint8Array {
    return this.data.slice();
  }

  public getSignature(): Signature | undefined {
    return this.signature;
  }

  public getHash(): Uint8Array {
    return this.hash.slice();
  }

  public sign(key: Key): Transaction {
    this.signature = key.sign(this.getHash());
    return this;
  }

  public toBytes(): Uint8Array {
    const sig = this.getSignature();
    if (typeof sig === "undefined") {
      throw new Error("A transaction must be signed before serialization.");
    }

    const encoder = new SimpleEncoder();
    encoder.writeBytes(this.getHash());
    encoder.writeBytes(encodeTx(this));
    encoder.writeBytes(sig.toBytes());
    return encoder.toBytes();
  }

  /**
   * Validate this transaction.
   * Return an {Error} object if the validation fails, null otherwise.
   */
  public validate(network: Network): Error | null {
    const hash = this.getHash();
    if (hash.length !== Hash.HASH_LEN) {
      return new Error("Invalid hash");
    }

    if (this.getNetworkId() !== network.getId()) {
      return new Error("Invalid networkId");
    }

    const to = this.getTo();
    if (to.length !== Key.ADDRESS_LEN) {
      return new Error("Invalid to");
    }

    if (!Long.isLong(this.getValue()) || this.getValue().lt(0)) {
      return new Error("Invalid value");
    }

    if (!Long.isLong(this.getFee()) || this.getFee().lt(0)) {
      return new Error("Invalid fee");
    }

    if (!Long.isLong(this.getNonce()) || this.getNonce().lt(0)) {
      return new Error("Invalid nonce");
    }

    if (!Long.isLong(this.getTimestamp()) || this.getTimestamp().lt(0)) {
      return new Error("Invalid timestamp");
    }

    if (!Bytes.equal(hashTx(this), hash)) {
      return new Error("Invalid hash");
    }

    const sig = this.getSignature();
    if (typeof sig !== "object" || !Key.verify(hash, sig)) {
      return new Error("Invalid signature");
    }

    if (
      !this.getType().equals(TransactionType.COINBASE) &&
      Bytes.equal(sig.getAddress(), Constants.COINBASE_KEY.toAddressBytes())
    ) {
      return new Error("Invalid signature");
    }

    return null;
  }
}

function encodeTx(tx: Transaction): Uint8Array {
  const encoder = new SimpleEncoder();
  encoder.writeByte(tx.getNetworkId());
  encoder.writeByte(tx.getType().getCode());
  encoder.writeBytes(tx.getTo());
  encoder.writeLong(tx.getValue());
  encoder.writeLong(tx.getFee());
  encoder.writeLong(tx.getNonce());
  encoder.writeLong(tx.getTimestamp());
  encoder.writeBytes(tx.getData());

  const isVM = tx.getType() === TransactionType.CALL || tx.getType() === TransactionType.CREATE;
  if (isVM) {
    encoder.writeLong(tx.getGas());
    encoder.writeLong(tx.getGasPrice());
  }
  return encoder.toBytes();
}

function decodeTx(bytes: Uint8Array): Transaction {
  const decoder = new SimpleDecoder(bytes, 0, bytes.length);
  const network = Network.of(decoder.readByte());
  const type = TransactionType.of(decoder.readByte());
  const to = decoder.readBytes();
  const value = decoder.readLong();
  const fee = decoder.readLong();
  const nonce = decoder.readLong();
  const timestamp = decoder.readLong();
  const data = decoder.readBytes();

  const isVM = type === TransactionType.CALL || type === TransactionType.CREATE;
  const gas = isVM ? decoder.readLong() : Long.fromString("0");
  const gasPrice = isVM ? decoder.readLong() : Long.fromString("0");
  return new Transaction(
    network,
    type,
    to,
    value,
    fee,
    gas,
    gasPrice,
    nonce,
    timestamp,
    data,
  );
}

function hashTx(tx: Transaction): Uint8Array {
  return Hash.h256(encodeTx(tx));
}
