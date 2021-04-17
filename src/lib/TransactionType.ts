export default class TransactionType {
  public static get COINBASE(): TransactionType { return new TransactionType(0x00); }

  public static get TRANSFER(): TransactionType { return new TransactionType(0x01); }

  public static get DELEGATE(): TransactionType { return new TransactionType(0x02); }

  public static get VOTE(): TransactionType { return new TransactionType(0x03); }

  public static get UNVOTE(): TransactionType { return new TransactionType(0x04); }

  public static get CREATE(): TransactionType { return new TransactionType(0x05); }

  public static get CALL(): TransactionType { return new TransactionType(0x06); }

  public static of(code: number): TransactionType {
    switch (code) {
      case 0x00:
        return TransactionType.COINBASE;
      case 0x01:
        return TransactionType.TRANSFER;
      case 0x02:
        return TransactionType.DELEGATE;
      case 0x03:
        return TransactionType.VOTE;
      case 0x04:
        return TransactionType.UNVOTE;
      case 0x05:
        return TransactionType.CREATE;
      case 0x06:
        return TransactionType.CALL;
      default:
        throw new Error("Unsupported transaction type");
    }
  }

  private code: number;

  public constructor(code: number) {
    this.code = code;
  }

  public getCode(): number {
    return this.code;
  }

  public equals(type: TransactionType): boolean {
    return this.getCode() === type.getCode();
  }
}
