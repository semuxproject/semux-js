export default class TransactionType {
    static readonly COINBASE: TransactionType;
    static readonly TRANSFER: TransactionType;
    static readonly DELEGATE: TransactionType;
    static readonly VOTE: TransactionType;
    static readonly UNVOTE: TransactionType;
    static readonly CREATE: TransactionType;
    static readonly CALL: TransactionType;
    static of(code: number): TransactionType;
    private code;
    constructor(code: number);
    getCode(): number;
    equals(type: TransactionType): boolean;
}
