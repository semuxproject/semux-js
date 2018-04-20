import { Configuration } from "./configuration";
/**
 *
 * @export
 */
export declare const COLLECTION_FORMATS: {
    csv: string;
    ssv: string;
    tsv: string;
    pipes: string;
};
/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}
/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}
/**
 *
 * @export
 * @class BaseAPI
 */
export declare class BaseAPI {
    protected basePath: string;
    protected fetch: FetchAPI;
    protected configuration: Configuration;
    constructor(configuration?: Configuration, basePath?: string, fetch?: FetchAPI);
}
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export declare class RequiredError extends Error {
    field: string;
    name: "RequiredError";
    constructor(field: string, msg?: string);
}
/**
 *
 * @export
 * @interface AccountType
 */
export interface AccountType {
    /**
     *
     * @type {string}
     * @memberof AccountType
     */
    address?: string;
    /**
     *
     * @type {string}
     * @memberof AccountType
     */
    available?: string;
    /**
     *
     * @type {string}
     * @memberof AccountType
     */
    locked?: string;
    /**
     *
     * @type {string}
     * @memberof AccountType
     */
    nonce?: string;
    /**
     *
     * @type {number}
     * @memberof AccountType
     */
    transactionCount?: number;
}
/**
 *
 * @export
 * @interface ApiHandlerResponse
 */
export interface ApiHandlerResponse {
    /**
     *
     * @type {boolean}
     * @memberof ApiHandlerResponse
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof ApiHandlerResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface BlockType
 */
export interface BlockType {
    /**
     *
     * @type {string}
     * @memberof BlockType
     */
    hash?: string;
    /**
     *
     * @type {string}
     * @memberof BlockType
     */
    number?: string;
    /**
     *
     * @type {number}
     * @memberof BlockType
     */
    view?: number;
    /**
     *
     * @type {string}
     * @memberof BlockType
     */
    coinbase?: string;
    /**
     *
     * @type {string}
     * @memberof BlockType
     */
    parentHash?: string;
    /**
     *
     * @type {string}
     * @memberof BlockType
     */
    timestamp?: string;
    /**
     *
     * @type {string}
     * @memberof BlockType
     */
    date?: string;
    /**
     *
     * @type {string}
     * @memberof BlockType
     */
    transactionsRoot?: string;
    /**
     *
     * @type {string}
     * @memberof BlockType
     */
    resultsRoot?: string;
    /**
     *
     * @type {string}
     * @memberof BlockType
     */
    stateRoot?: string;
    /**
     *
     * @type {string}
     * @memberof BlockType
     */
    data?: string;
    /**
     *
     * @type {Array&lt;TransactionType&gt;}
     * @memberof BlockType
     */
    transactions?: Array<TransactionType>;
}
/**
 *
 * @export
 * @interface DelegateType
 */
export interface DelegateType {
    /**
     *
     * @type {string}
     * @memberof DelegateType
     */
    address?: string;
    /**
     *
     * @type {string}
     * @memberof DelegateType
     */
    name?: string;
    /**
     *
     * @type {string}
     * @memberof DelegateType
     */
    registeredAt?: string;
    /**
     *
     * @type {string}
     * @memberof DelegateType
     */
    votes?: string;
    /**
     *
     * @type {string}
     * @memberof DelegateType
     */
    blocksForged?: string;
    /**
     *
     * @type {string}
     * @memberof DelegateType
     */
    turnsHit?: string;
    /**
     *
     * @type {string}
     * @memberof DelegateType
     */
    turnsMissed?: string;
}
/**
 *
 * @export
 * @interface InfoType
 */
export interface InfoType {
    /**
     *
     * @type {string}
     * @memberof InfoType
     */
    clientId?: string;
    /**
     *
     * @type {string}
     * @memberof InfoType
     */
    coinbase?: string;
    /**
     *
     * @type {string}
     * @memberof InfoType
     */
    latestBlockNumber?: string;
    /**
     *
     * @type {string}
     * @memberof InfoType
     */
    latestBlockHash?: string;
    /**
     *
     * @type {number}
     * @memberof InfoType
     */
    activePeers?: number;
    /**
     *
     * @type {number}
     * @memberof InfoType
     */
    pendingTransactions?: number;
}
/**
 *
 * @export
 * @interface PeerType
 */
export interface PeerType {
    /**
     *
     * @type {string}
     * @memberof PeerType
     */
    ip?: string;
    /**
     *
     * @type {number}
     * @memberof PeerType
     */
    port?: number;
    /**
     *
     * @type {number}
     * @memberof PeerType
     */
    networkVersion?: number;
    /**
     *
     * @type {string}
     * @memberof PeerType
     */
    clientId?: string;
    /**
     *
     * @type {string}
     * @memberof PeerType
     */
    peerId?: string;
    /**
     *
     * @type {string}
     * @memberof PeerType
     */
    latestBlockNumber?: string;
    /**
     *
     * @type {string}
     * @memberof PeerType
     */
    latency?: string;
    /**
     *
     * @type {Array&lt;string&gt;}
     * @memberof PeerType
     */
    capabilities?: Array<string>;
}
/**
 *
 * @export
 * @interface TransactionLimitsType
 */
export interface TransactionLimitsType {
    /**
     *
     * @type {number}
     * @memberof TransactionLimitsType
     */
    maxTransactionDataSize?: number;
    /**
     *
     * @type {string}
     * @memberof TransactionLimitsType
     */
    minTransactionFee?: string;
    /**
     *
     * @type {string}
     * @memberof TransactionLimitsType
     */
    minDelegateBurnAmount?: string;
}
/**
 *
 * @export
 * @interface TransactionType
 */
export interface TransactionType {
    /**
     *
     * @type {string}
     * @memberof TransactionType
     */
    blockNumber?: string;
    /**
     *
     * @type {string}
     * @memberof TransactionType
     */
    hash?: string;
    /**
     *
     * @type {string}
     * @memberof TransactionType
     */
    type?: string;
    /**
     *
     * @type {string}
     * @memberof TransactionType
     */
    from?: string;
    /**
     *
     * @type {string}
     * @memberof TransactionType
     */
    to?: string;
    /**
     *
     * @type {string}
     * @memberof TransactionType
     */
    value?: string;
    /**
     *
     * @type {string}
     * @memberof TransactionType
     */
    fee?: string;
    /**
     *
     * @type {string}
     * @memberof TransactionType
     */
    nonce?: string;
    /**
     *
     * @type {string}
     * @memberof TransactionType
     */
    timestamp?: string;
    /**
     *
     * @type {string}
     * @memberof TransactionType
     */
    data?: string;
}
/**
 *
 * @export
 * @interface AddNodeResponse
 */
export interface AddNodeResponse extends ApiHandlerResponse {
}
/**
 *
 * @export
 * @interface ComposeRawTransactionResponse
 */
export interface ComposeRawTransactionResponse extends ApiHandlerResponse {
    /**
     *
     * @type {string}
     * @memberof ComposeRawTransactionResponse
     */
    result?: string;
}
/**
 *
 * @export
 * @interface CreateAccountResponse
 */
export interface CreateAccountResponse extends ApiHandlerResponse {
    /**
     *
     * @type {string}
     * @memberof CreateAccountResponse
     */
    result?: string;
}
/**
 *
 * @export
 * @interface DoTransactionResponse
 */
export interface DoTransactionResponse extends ApiHandlerResponse {
    /**
     *
     * @type {string}
     * @memberof DoTransactionResponse
     */
    result?: string;
}
/**
 *
 * @export
 * @interface GetAccountResponse
 */
export interface GetAccountResponse extends ApiHandlerResponse {
    /**
     *
     * @type {AccountType}
     * @memberof GetAccountResponse
     */
    result?: AccountType;
}
/**
 *
 * @export
 * @interface GetAccountTransactionsResponse
 */
export interface GetAccountTransactionsResponse extends ApiHandlerResponse {
    /**
     *
     * @type {Array&lt;TransactionType&gt;}
     * @memberof GetAccountTransactionsResponse
     */
    result?: Array<TransactionType>;
}
/**
 *
 * @export
 * @interface GetBlockResponse
 */
export interface GetBlockResponse extends ApiHandlerResponse {
    /**
     *
     * @type {BlockType}
     * @memberof GetBlockResponse
     */
    result?: BlockType;
}
/**
 *
 * @export
 * @interface GetDelegateResponse
 */
export interface GetDelegateResponse extends ApiHandlerResponse {
    /**
     *
     * @type {DelegateType}
     * @memberof GetDelegateResponse
     */
    result?: DelegateType;
}
/**
 *
 * @export
 * @interface GetDelegatesResponse
 */
export interface GetDelegatesResponse extends ApiHandlerResponse {
    /**
     *
     * @type {Array&lt;DelegateType&gt;}
     * @memberof GetDelegatesResponse
     */
    result?: Array<DelegateType>;
}
/**
 *
 * @export
 * @interface GetInfoResponse
 */
export interface GetInfoResponse extends ApiHandlerResponse {
    /**
     *
     * @type {InfoType}
     * @memberof GetInfoResponse
     */
    result?: InfoType;
}
/**
 *
 * @export
 * @interface GetLatestBlockNumberResponse
 */
export interface GetLatestBlockNumberResponse extends ApiHandlerResponse {
    /**
     *
     * @type {string}
     * @memberof GetLatestBlockNumberResponse
     */
    result?: string;
}
/**
 *
 * @export
 * @interface GetLatestBlockResponse
 */
export interface GetLatestBlockResponse extends ApiHandlerResponse {
    /**
     *
     * @type {BlockType}
     * @memberof GetLatestBlockResponse
     */
    result?: BlockType;
}
/**
 *
 * @export
 * @interface GetPeersResponse
 */
export interface GetPeersResponse extends ApiHandlerResponse {
    /**
     *
     * @type {Array&lt;PeerType&gt;}
     * @memberof GetPeersResponse
     */
    result?: Array<PeerType>;
}
/**
 *
 * @export
 * @interface GetPendingTransactionsResponse
 */
export interface GetPendingTransactionsResponse extends ApiHandlerResponse {
    /**
     *
     * @type {Array&lt;TransactionType&gt;}
     * @memberof GetPendingTransactionsResponse
     */
    result?: Array<TransactionType>;
}
/**
 *
 * @export
 * @interface GetRootResponse
 */
export interface GetRootResponse extends ApiHandlerResponse {
}
/**
 *
 * @export
 * @interface GetTransactionLimitsResponse
 */
export interface GetTransactionLimitsResponse extends ApiHandlerResponse {
    /**
     *
     * @type {TransactionLimitsType}
     * @memberof GetTransactionLimitsResponse
     */
    result?: TransactionLimitsType;
}
/**
 *
 * @export
 * @interface GetTransactionResponse
 */
export interface GetTransactionResponse extends ApiHandlerResponse {
    /**
     *
     * @type {TransactionType}
     * @memberof GetTransactionResponse
     */
    result?: TransactionType;
}
/**
 *
 * @export
 * @interface GetValidatorsResponse
 */
export interface GetValidatorsResponse extends ApiHandlerResponse {
    /**
     *
     * @type {Array&lt;string&gt;}
     * @memberof GetValidatorsResponse
     */
    result?: Array<string>;
}
/**
 *
 * @export
 * @interface GetVoteResponse
 */
export interface GetVoteResponse extends ApiHandlerResponse {
    /**
     *
     * @type {string}
     * @memberof GetVoteResponse
     */
    result?: string;
}
/**
 *
 * @export
 * @interface GetVotesResponse
 */
export interface GetVotesResponse extends ApiHandlerResponse {
    /**
     *
     * @type {{ [key: string]: string; }}
     * @memberof GetVotesResponse
     */
    result?: {
        [key: string]: string;
    };
}
/**
 *
 * @export
 * @interface ListAccountsResponse
 */
export interface ListAccountsResponse extends ApiHandlerResponse {
    /**
     *
     * @type {Array&lt;string&gt;}
     * @memberof ListAccountsResponse
     */
    result?: Array<string>;
}
/**
 *
 * @export
 * @interface SendTransactionResponse
 */
export interface SendTransactionResponse extends ApiHandlerResponse {
}
/**
 *
 * @export
 * @interface SignMessageResponse
 */
export interface SignMessageResponse extends ApiHandlerResponse {
    /**
     *
     * @type {string}
     * @memberof SignMessageResponse
     */
    result?: string;
}
/**
 *
 * @export
 * @interface SignRawTransactionResponse
 */
export interface SignRawTransactionResponse extends ApiHandlerResponse {
    /**
     *
     * @type {string}
     * @memberof SignRawTransactionResponse
     */
    result?: string;
}
/**
 *
 * @export
 * @interface VerifyMessageResponse
 */
export interface VerifyMessageResponse extends ApiHandlerResponse {
    /**
     *
     * @type {boolean}
     * @memberof VerifyMessageResponse
     */
    validSignature?: boolean;
}
/**
 * SemuxApi - fetch parameter creator
 * @export
 */
export declare const SemuxApiFetchParamCreator: (configuration?: Configuration) => {
    addNode(node: string, options?: any): FetchArgs;
    addToBlacklist(ip: string, options?: any): FetchArgs;
    addToWhitelist(ip: string, options?: any): FetchArgs;
    broadcastRawTransaction(raw: string, options?: any): FetchArgs;
    composeRawTransaction(network: string, type: string, fee: string, nonce: string, to?: string, value?: string, timestamp?: string, data?: string, options?: any): FetchArgs;
    createAccount(name?: string, options?: any): FetchArgs;
    getAccount(address: string, options?: any): FetchArgs;
    getAccountTransactions(address: string, from: string, to: string, options?: any): FetchArgs;
    getBlockByHash(hash: string, options?: any): FetchArgs;
    getBlockByNumber(number: string, options?: any): FetchArgs;
    getDelegate(address: string, options?: any): FetchArgs;
    getDelegates(options?: any): FetchArgs;
    getInfo(options?: any): FetchArgs;
    getLatestBlock(options?: any): FetchArgs;
    getLatestBlockNumber(options?: any): FetchArgs;
    getPeers(options?: any): FetchArgs;
    getPendingTransactions(options?: any): FetchArgs;
    getRoot(options?: any): FetchArgs;
    getTransaction(hash: string, options?: any): FetchArgs;
    getTransactionLimits(type: string, options?: any): FetchArgs;
    getValidators(options?: any): FetchArgs;
    getVote(delegate: string, voter: string, options?: any): FetchArgs;
    getVotes(delegate: string, options?: any): FetchArgs;
    listAccounts(options?: any): FetchArgs;
    registerDelegate(from: string, fee: string, data: string, options?: any): FetchArgs;
    signMessage(address: string, message: string, options?: any): FetchArgs;
    signRawTransaction(raw: string, address: string, options?: any): FetchArgs;
    transfer(from: string, to: string, value: string, fee: string, data: string, options?: any): FetchArgs;
    unvote(from: string, to: string, value: string, fee: string, options?: any): FetchArgs;
    verifyMessage(address: string, message: string, signature: string, options?: any): FetchArgs;
    vote(from: string, to: string, value: string, fee: string, options?: any): FetchArgs;
};
/**
 * SemuxApi - functional programming interface
 * @export
 */
export declare const SemuxApiFp: (configuration?: Configuration) => {
    addNode(node: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AddNodeResponse>;
    addToBlacklist(ip: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiHandlerResponse>;
    addToWhitelist(ip: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiHandlerResponse>;
    broadcastRawTransaction(raw: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SendTransactionResponse>;
    composeRawTransaction(network: string, type: string, fee: string, nonce: string, to?: string, value?: string, timestamp?: string, data?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ComposeRawTransactionResponse>;
    createAccount(name?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CreateAccountResponse>;
    getAccount(address: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetAccountResponse>;
    getAccountTransactions(address: string, from: string, to: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetAccountTransactionsResponse>;
    getBlockByHash(hash: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetBlockResponse>;
    getBlockByNumber(number: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetBlockResponse>;
    getDelegate(address: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetDelegateResponse>;
    getDelegates(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetDelegatesResponse>;
    getInfo(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetInfoResponse>;
    getLatestBlock(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetLatestBlockResponse>;
    getLatestBlockNumber(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetLatestBlockNumberResponse>;
    getPeers(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetPeersResponse>;
    getPendingTransactions(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetPendingTransactionsResponse>;
    getRoot(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetRootResponse>;
    getTransaction(hash: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetTransactionResponse>;
    getTransactionLimits(type: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetTransactionLimitsResponse>;
    getValidators(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetValidatorsResponse>;
    getVote(delegate: string, voter: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetVoteResponse>;
    getVotes(delegate: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetVotesResponse>;
    listAccounts(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ListAccountsResponse>;
    registerDelegate(from: string, fee: string, data: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DoTransactionResponse>;
    signMessage(address: string, message: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SignMessageResponse>;
    signRawTransaction(raw: string, address: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SignRawTransactionResponse>;
    transfer(from: string, to: string, value: string, fee: string, data: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DoTransactionResponse>;
    unvote(from: string, to: string, value: string, fee: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DoTransactionResponse>;
    verifyMessage(address: string, message: string, signature: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<VerifyMessageResponse>;
    vote(from: string, to: string, value: string, fee: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DoTransactionResponse>;
};
/**
 * SemuxApi - factory interface
 * @export
 */
export declare const SemuxApiFactory: (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) => {
    addNode(node: string, options?: any): Promise<AddNodeResponse>;
    addToBlacklist(ip: string, options?: any): Promise<ApiHandlerResponse>;
    addToWhitelist(ip: string, options?: any): Promise<ApiHandlerResponse>;
    broadcastRawTransaction(raw: string, options?: any): Promise<SendTransactionResponse>;
    composeRawTransaction(network: string, type: string, fee: string, nonce: string, to?: string, value?: string, timestamp?: string, data?: string, options?: any): Promise<ComposeRawTransactionResponse>;
    createAccount(name?: string, options?: any): Promise<CreateAccountResponse>;
    getAccount(address: string, options?: any): Promise<GetAccountResponse>;
    getAccountTransactions(address: string, from: string, to: string, options?: any): Promise<GetAccountTransactionsResponse>;
    getBlockByHash(hash: string, options?: any): Promise<GetBlockResponse>;
    getBlockByNumber(number: string, options?: any): Promise<GetBlockResponse>;
    getDelegate(address: string, options?: any): Promise<GetDelegateResponse>;
    getDelegates(options?: any): Promise<GetDelegatesResponse>;
    getInfo(options?: any): Promise<GetInfoResponse>;
    getLatestBlock(options?: any): Promise<GetLatestBlockResponse>;
    getLatestBlockNumber(options?: any): Promise<GetLatestBlockNumberResponse>;
    getPeers(options?: any): Promise<GetPeersResponse>;
    getPendingTransactions(options?: any): Promise<GetPendingTransactionsResponse>;
    getRoot(options?: any): Promise<GetRootResponse>;
    getTransaction(hash: string, options?: any): Promise<GetTransactionResponse>;
    getTransactionLimits(type: string, options?: any): Promise<GetTransactionLimitsResponse>;
    getValidators(options?: any): Promise<GetValidatorsResponse>;
    getVote(delegate: string, voter: string, options?: any): Promise<GetVoteResponse>;
    getVotes(delegate: string, options?: any): Promise<GetVotesResponse>;
    listAccounts(options?: any): Promise<ListAccountsResponse>;
    registerDelegate(from: string, fee: string, data: string, options?: any): Promise<DoTransactionResponse>;
    signMessage(address: string, message: string, options?: any): Promise<SignMessageResponse>;
    signRawTransaction(raw: string, address: string, options?: any): Promise<SignRawTransactionResponse>;
    transfer(from: string, to: string, value: string, fee: string, data: string, options?: any): Promise<DoTransactionResponse>;
    unvote(from: string, to: string, value: string, fee: string, options?: any): Promise<DoTransactionResponse>;
    verifyMessage(address: string, message: string, signature: string, options?: any): Promise<VerifyMessageResponse>;
    vote(from: string, to: string, value: string, fee: string, options?: any): Promise<DoTransactionResponse>;
};
/**
 * SemuxApi - object-oriented interface
 * @export
 * @class SemuxApi
 * @extends {BaseAPI}
 */
export declare class SemuxApi extends BaseAPI {
    /**
     * Adds a node to node manager.
     * @summary Add node
     * @param {} node Name of the node in host:port format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    addNode(node: string, options?: any): Promise<AddNodeResponse>;
    /**
     * Adds an IP address to blacklist.
     * @summary Add to blacklist
     * @param {} ip IP address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    addToBlacklist(ip: string, options?: any): Promise<ApiHandlerResponse>;
    /**
     * Adds an IP address to whitelist.
     * @summary Add to whitelist
     * @param {} ip IP address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    addToWhitelist(ip: string, options?: any): Promise<ApiHandlerResponse>;
    /**
     * Broadcasts a raw transaction to the network.
     * @summary Broadcast a raw transaction
     * @param {} raw Raw transaction
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    broadcastRawTransaction(raw: string, options?: any): Promise<SendTransactionResponse>;
    /**
     * Compose an unsigned raw transaction then return its hexadecimal encoded string. An unsigned raw transaction can be signed using /sign-raw-transaction API.
     * @summary Compose an unsigned raw transaction
     * @param {} network Network name
     * @param {} type Transaction type
     * @param {} fee Transaction fee in nano
     * @param {} nonce Transaction nonce
     * @param {} [to] Recipient&#39;s address
     * @param {} [value] Transaction value in nano
     * @param {} [timestamp] Transaction timestamp in milliseconds. Default to current time.
     * @param {} [data] Hexadecimal encoded transaction data.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    composeRawTransaction(network: string, type: string, fee: string, nonce: string, to?: string, value?: string, timestamp?: string, data?: string, options?: any): Promise<ComposeRawTransactionResponse>;
    /**
     * Creates a new account.
     * @summary Create account
     * @param {} [name] Assigned alias to the created account.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    createAccount(name?: string, options?: any): Promise<CreateAccountResponse>;
    /**
     * Returns an account.
     * @summary Get account
     * @param {} address Address of account
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getAccount(address: string, options?: any): Promise<GetAccountResponse>;
    /**
     * Returns transactions from/to an account.
     * @summary Get account transactions
     * @param {} address Address of account
     * @param {} from Starting range of transactions
     * @param {} to Ending range of transactions
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getAccountTransactions(address: string, from: string, to: string, options?: any): Promise<GetAccountTransactionsResponse>;
    /**
     * Returns a block by block hash.
     * @summary Get block by hash
     * @param {} hash Hash of block
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getBlockByHash(hash: string, options?: any): Promise<GetBlockResponse>;
    /**
     * Returns a block by block number.
     * @summary Get block by number
     * @param {} number Number of block
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getBlockByNumber(number: string, options?: any): Promise<GetBlockResponse>;
    /**
     * Returns a delegate.
     * @summary Get a delegate
     * @param {} address Delegate address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getDelegate(address: string, options?: any): Promise<GetDelegateResponse>;
    /**
     * Returns a list of delegates.
     * @summary Get all delegates
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getDelegates(options?: any): Promise<GetDelegatesResponse>;
    /**
     * Returns kernel info.
     * @summary Get info
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getInfo(options?: any): Promise<GetInfoResponse>;
    /**
     * Returns the latest block.
     * @summary Get latest block
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getLatestBlock(options?: any): Promise<GetLatestBlockResponse>;
    /**
     * Returns the number of the latest block.
     * @summary Get latest block number
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getLatestBlockNumber(options?: any): Promise<GetLatestBlockNumberResponse>;
    /**
     * Returns connected peers.
     * @summary Get peers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getPeers(options?: any): Promise<GetPeersResponse>;
    /**
     * Returns all the pending transactions.
     * @summary Get pending transactions
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getPendingTransactions(options?: any): Promise<GetPendingTransactionsResponse>;
    /**
     *
     * @summary Get root
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getRoot(options?: any): Promise<GetRootResponse>;
    /**
     * Returns a transactions if exists.
     * @summary Get transaction
     * @param {} hash Transaction hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getTransaction(hash: string, options?: any): Promise<GetTransactionResponse>;
    /**
     * Get minimum fee and maximum size.
     * @summary Get transaction limits
     * @param {} type Type of transaction
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getTransactionLimits(type: string, options?: any): Promise<GetTransactionLimitsResponse>;
    /**
     * Returns a list of validators.
     * @summary Get validators
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getValidators(options?: any): Promise<GetValidatorsResponse>;
    /**
     * Returns the vote from a voter to a delegate.
     * @summary Get vote
     * @param {} delegate Delegate address
     * @param {} voter Voter address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getVote(delegate: string, voter: string, options?: any): Promise<GetVoteResponse>;
    /**
     * Returns all the votes to a delegate
     * @summary Get votes
     * @param {} delegate Delegate address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    getVotes(delegate: string, options?: any): Promise<GetVotesResponse>;
    /**
     * Returns accounts in the wallet.
     * @summary List accounts
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    listAccounts(options?: any): Promise<ListAccountsResponse>;
    /**
     * Registers as a delegate
     * @summary Register delegate
     * @param {} from Registering address
     * @param {} fee Transaction fee
     * @param {} data Delegate name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    registerDelegate(from: string, fee: string, data: string, options?: any): Promise<DoTransactionResponse>;
    /**
     * Sign a message.
     * @summary Sign a message
     * @param {} address Signing address
     * @param {} message Message to sign
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    signMessage(address: string, message: string, options?: any): Promise<SignMessageResponse>;
    /**
     * Sign an unsigned raw transaction then return its hexadecimal encoded string. An unsigned raw transaction can be created using /compose-raw-transaction API.
     * @summary Sign an unsigned raw transaction
     * @param {} raw Unsigned raw transaction encoded in hexadecimal string.
     * @param {} address Signer&#39;s address. This address must exist in the wallet.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    signRawTransaction(raw: string, address: string, options?: any): Promise<SignRawTransactionResponse>;
    /**
     * Transfers coins to another address.
     * @summary Transfer coins
     * @param {} from Sending address
     * @param {} to Receiving address
     * @param {} value Amount of SEM to transfer
     * @param {} fee Transaction fee
     * @param {} data Transaction data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    transfer(from: string, to: string, value: string, fee: string, data: string, options?: any): Promise<DoTransactionResponse>;
    /**
     * Unvotes for a delegate.
     * @summary Unvote
     * @param {} from Voting address
     * @param {} to Delegate address
     * @param {} value Vote amount
     * @param {} fee Transaction fee
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    unvote(from: string, to: string, value: string, fee: string, options?: any): Promise<DoTransactionResponse>;
    /**
     * Verify a signed message.
     * @summary Verify a message
     * @param {} address Address
     * @param {} message Message
     * @param {} signature Signature to verify
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    verifyMessage(address: string, message: string, signature: string, options?: any): Promise<VerifyMessageResponse>;
    /**
     * Votes for a delegate.
     * @summary Vote
     * @param {} from Voting address
     * @param {} to Delegate address
     * @param {} value Vote amount
     * @param {} fee Transaction fee
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SemuxApi
     */
    vote(from: string, to: string, value: string, fee: string, options?: any): Promise<DoTransactionResponse>;
}
