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
     * @type {number}
     * @memberof AccountType
     */
    available?: number;
    /**
     *
     * @type {number}
     * @memberof AccountType
     */
    locked?: number;
    /**
     *
     * @type {number}
     * @memberof AccountType
     */
    nonce?: number;
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
 * @interface AddNodeResponse
 */
export interface AddNodeResponse {
    /**
     *
     * @type {boolean}
     * @memberof AddNodeResponse
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof AddNodeResponse
     */
    message?: string;
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
     * @type {number}
     * @memberof BlockType
     */
    number?: number;
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
     * @type {number}
     * @memberof BlockType
     */
    timestamp?: number;
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
 * @interface CreateAccountResponse
 */
export interface CreateAccountResponse {
    /**
     *
     * @type {boolean}
     * @memberof CreateAccountResponse
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof CreateAccountResponse
     */
    result?: string;
    /**
     *
     * @type {string}
     * @memberof CreateAccountResponse
     */
    message?: string;
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
     * @type {number}
     * @memberof DelegateType
     */
    registeredAt?: number;
    /**
     *
     * @type {number}
     * @memberof DelegateType
     */
    votes?: number;
    /**
     *
     * @type {number}
     * @memberof DelegateType
     */
    blocksForged?: number;
    /**
     *
     * @type {number}
     * @memberof DelegateType
     */
    turnsHit?: number;
    /**
     *
     * @type {number}
     * @memberof DelegateType
     */
    turnsMissed?: number;
}
/**
 *
 * @export
 * @interface DoTransactionResponse
 */
export interface DoTransactionResponse {
    /**
     *
     * @type {boolean}
     * @memberof DoTransactionResponse
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof DoTransactionResponse
     */
    message?: string;
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
export interface GetAccountResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetAccountResponse
     */
    success: boolean;
    /**
     *
     * @type {AccountType}
     * @memberof GetAccountResponse
     */
    result?: AccountType;
    /**
     *
     * @type {string}
     * @memberof GetAccountResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetAccountTransactionsResponse
 */
export interface GetAccountTransactionsResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetAccountTransactionsResponse
     */
    success: boolean;
    /**
     *
     * @type {Array&lt;TransactionType&gt;}
     * @memberof GetAccountTransactionsResponse
     */
    result?: Array<TransactionType>;
    /**
     *
     * @type {string}
     * @memberof GetAccountTransactionsResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetBlockResponse
 */
export interface GetBlockResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetBlockResponse
     */
    success: boolean;
    /**
     *
     * @type {BlockType}
     * @memberof GetBlockResponse
     */
    result?: BlockType;
    /**
     *
     * @type {string}
     * @memberof GetBlockResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetDelegateResponse
 */
export interface GetDelegateResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetDelegateResponse
     */
    success: boolean;
    /**
     *
     * @type {DelegateType}
     * @memberof GetDelegateResponse
     */
    result?: DelegateType;
    /**
     *
     * @type {string}
     * @memberof GetDelegateResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetDelegatesResponse
 */
export interface GetDelegatesResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetDelegatesResponse
     */
    success: boolean;
    /**
     *
     * @type {Array&lt;DelegateType&gt;}
     * @memberof GetDelegatesResponse
     */
    result?: Array<DelegateType>;
    /**
     *
     * @type {string}
     * @memberof GetDelegatesResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetInfoResponse
 */
export interface GetInfoResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetInfoResponse
     */
    success: boolean;
    /**
     *
     * @type {InfoType}
     * @memberof GetInfoResponse
     */
    result?: InfoType;
    /**
     *
     * @type {string}
     * @memberof GetInfoResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetLatestBlockNumberResponse
 */
export interface GetLatestBlockNumberResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetLatestBlockNumberResponse
     */
    success: boolean;
    /**
     *
     * @type {number}
     * @memberof GetLatestBlockNumberResponse
     */
    result?: number;
    /**
     *
     * @type {string}
     * @memberof GetLatestBlockNumberResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetLatestBlockResponse
 */
export interface GetLatestBlockResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetLatestBlockResponse
     */
    success: boolean;
    /**
     *
     * @type {BlockType}
     * @memberof GetLatestBlockResponse
     */
    result?: BlockType;
    /**
     *
     * @type {string}
     * @memberof GetLatestBlockResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetPeersResponse
 */
export interface GetPeersResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetPeersResponse
     */
    success: boolean;
    /**
     *
     * @type {Array&lt;PeerType&gt;}
     * @memberof GetPeersResponse
     */
    result?: Array<PeerType>;
    /**
     *
     * @type {string}
     * @memberof GetPeersResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetPendingTransactionsResponse
 */
export interface GetPendingTransactionsResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetPendingTransactionsResponse
     */
    success: boolean;
    /**
     *
     * @type {Array&lt;TransactionType&gt;}
     * @memberof GetPendingTransactionsResponse
     */
    result?: Array<TransactionType>;
    /**
     *
     * @type {string}
     * @memberof GetPendingTransactionsResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetTransactionLimitsResponse
 */
export interface GetTransactionLimitsResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetTransactionLimitsResponse
     */
    success: boolean;
    /**
     *
     * @type {TransactionLimitsType}
     * @memberof GetTransactionLimitsResponse
     */
    result?: TransactionLimitsType;
    /**
     *
     * @type {string}
     * @memberof GetTransactionLimitsResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetTransactionResponse
 */
export interface GetTransactionResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetTransactionResponse
     */
    success: boolean;
    /**
     *
     * @type {TransactionType}
     * @memberof GetTransactionResponse
     */
    result?: TransactionType;
    /**
     *
     * @type {string}
     * @memberof GetTransactionResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetValidatorsResponse
 */
export interface GetValidatorsResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetValidatorsResponse
     */
    success: boolean;
    /**
     *
     * @type {Array&lt;string&gt;}
     * @memberof GetValidatorsResponse
     */
    result?: Array<string>;
    /**
     *
     * @type {string}
     * @memberof GetValidatorsResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetVoteResponse
 */
export interface GetVoteResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetVoteResponse
     */
    success: boolean;
    /**
     *
     * @type {number}
     * @memberof GetVoteResponse
     */
    result?: number;
    /**
     *
     * @type {string}
     * @memberof GetVoteResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface GetVotesResponse
 */
export interface GetVotesResponse {
    /**
     *
     * @type {boolean}
     * @memberof GetVotesResponse
     */
    success: boolean;
    /**
     *
     * @type {{ [key: string]: number; }}
     * @memberof GetVotesResponse
     */
    result?: {
        [key: string]: number;
    };
    /**
     *
     * @type {string}
     * @memberof GetVotesResponse
     */
    message?: string;
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
     * @type {number}
     * @memberof InfoType
     */
    latestBlockNumber?: number;
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
 * @interface ListAccountsResponse
 */
export interface ListAccountsResponse {
    /**
     *
     * @type {boolean}
     * @memberof ListAccountsResponse
     */
    success: boolean;
    /**
     *
     * @type {Array&lt;string&gt;}
     * @memberof ListAccountsResponse
     */
    result?: Array<string>;
    /**
     *
     * @type {string}
     * @memberof ListAccountsResponse
     */
    message?: string;
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
     * @type {number}
     * @memberof PeerType
     */
    latestBlockNumber?: number;
    /**
     *
     * @type {number}
     * @memberof PeerType
     */
    latency?: number;
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
 * @interface SendTransactionResponse
 */
export interface SendTransactionResponse {
    /**
     *
     * @type {boolean}
     * @memberof SendTransactionResponse
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof SendTransactionResponse
     */
    message?: string;
}
/**
 *
 * @export
 * @interface SignMessageResponse
 */
export interface SignMessageResponse {
    /**
     *
     * @type {boolean}
     * @memberof SignMessageResponse
     */
    success: boolean;
    /**
     *
     * @type {string}
     * @memberof SignMessageResponse
     */
    result?: string;
    /**
     *
     * @type {string}
     * @memberof SignMessageResponse
     */
    message?: string;
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
     * @type {number}
     * @memberof TransactionLimitsType
     */
    minTransactionFee?: number;
    /**
     *
     * @type {number}
     * @memberof TransactionLimitsType
     */
    minDelegateBurnAmount?: number;
}
/**
 *
 * @export
 * @interface TransactionType
 */
export interface TransactionType {
    /**
     *
     * @type {number}
     * @memberof TransactionType
     */
    blockNumber?: number;
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
     * @type {number}
     * @memberof TransactionType
     */
    value?: number;
    /**
     *
     * @type {number}
     * @memberof TransactionType
     */
    fee?: number;
    /**
     *
     * @type {number}
     * @memberof TransactionType
     */
    nonce?: number;
    /**
     *
     * @type {number}
     * @memberof TransactionType
     */
    timestamp?: number;
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
 * @interface VerifyMessageResponse
 */
export interface VerifyMessageResponse {
    /**
     *
     * @type {boolean}
     * @memberof VerifyMessageResponse
     */
    success: boolean;
    /**
     *
     * @type {boolean}
     * @memberof VerifyMessageResponse
     */
    result?: boolean;
    /**
     *
     * @type {string}
     * @memberof VerifyMessageResponse
     */
    message?: string;
}
/**
 * DefaultApi - fetch parameter creator
 * @export
 */
export declare const DefaultApiFetchParamCreator: (configuration?: Configuration) => {
    addNode(node: string, options?: any): FetchArgs;
    addToBlacklist(ip: string, options?: any): FetchArgs;
    addToWhitelist(ip: string, options?: any): FetchArgs;
    createAccount(name?: string, options?: any): FetchArgs;
    getAccount(address: string, options?: any): FetchArgs;
    getAccountTransactions(address: string, from: string, to: string, options?: any): FetchArgs;
    getBlock(number: number, options?: any): FetchArgs;
    getDelegate(address: string, options?: any): FetchArgs;
    getDelegates(options?: any): FetchArgs;
    getInfo(options?: any): FetchArgs;
    getLatestBlock(options?: any): FetchArgs;
    getLatestBlockNumber(options?: any): FetchArgs;
    getPeers(options?: any): FetchArgs;
    getPendingTransactions(options?: any): FetchArgs;
    getTransaction(hash: string, options?: any): FetchArgs;
    getTransactionLimits(type: string, options?: any): FetchArgs;
    getValidators(options?: any): FetchArgs;
    getVote(delegate: string, voter: string, options?: any): FetchArgs;
    getVotes(delegate: string, options?: any): FetchArgs;
    listAccounts(options?: any): FetchArgs;
    registerDelegate(from: string, fee: string, data: string, options?: any): FetchArgs;
    sendTransaction(raw: string, options?: any): FetchArgs;
    signMessage(address: string, message: string, options?: any): FetchArgs;
    transfer(value: string, from: string, to: string, fee: string, data: string, options?: any): FetchArgs;
    unvote(from: string, to: string, value: string, fee: string, options?: any): FetchArgs;
    verifyMessage(address: string, message: string, signature: string, options?: any): FetchArgs;
    vote(from: string, to: string, value: string, fee: string, options?: any): FetchArgs;
};
/**
 * DefaultApi - functional programming interface
 * @export
 */
export declare const DefaultApiFp: (configuration?: Configuration) => {
    addNode(node: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AddNodeResponse>;
    addToBlacklist(ip: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiHandlerResponse>;
    addToWhitelist(ip: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ApiHandlerResponse>;
    createAccount(name?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CreateAccountResponse>;
    getAccount(address: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetAccountResponse>;
    getAccountTransactions(address: string, from: string, to: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetAccountTransactionsResponse>;
    getBlock(number: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetBlockResponse>;
    getDelegate(address: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetDelegateResponse>;
    getDelegates(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetDelegatesResponse>;
    getInfo(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetInfoResponse>;
    getLatestBlock(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetLatestBlockResponse>;
    getLatestBlockNumber(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetLatestBlockNumberResponse>;
    getPeers(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetPeersResponse>;
    getPendingTransactions(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetPendingTransactionsResponse>;
    getTransaction(hash: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetTransactionResponse>;
    getTransactionLimits(type: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetTransactionLimitsResponse>;
    getValidators(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetValidatorsResponse>;
    getVote(delegate: string, voter: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetVoteResponse>;
    getVotes(delegate: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetVotesResponse>;
    listAccounts(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ListAccountsResponse>;
    registerDelegate(from: string, fee: string, data: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DoTransactionResponse>;
    sendTransaction(raw: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SendTransactionResponse>;
    signMessage(address: string, message: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SignMessageResponse>;
    transfer(value: string, from: string, to: string, fee: string, data: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DoTransactionResponse>;
    unvote(from: string, to: string, value: string, fee: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DoTransactionResponse>;
    verifyMessage(address: string, message: string, signature: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<VerifyMessageResponse>;
    vote(from: string, to: string, value: string, fee: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DoTransactionResponse>;
};
/**
 * DefaultApi - factory interface
 * @export
 */
export declare const DefaultApiFactory: (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) => {
    addNode(node: string, options?: any): Promise<AddNodeResponse>;
    addToBlacklist(ip: string, options?: any): Promise<ApiHandlerResponse>;
    addToWhitelist(ip: string, options?: any): Promise<ApiHandlerResponse>;
    createAccount(name?: string, options?: any): Promise<CreateAccountResponse>;
    getAccount(address: string, options?: any): Promise<GetAccountResponse>;
    getAccountTransactions(address: string, from: string, to: string, options?: any): Promise<GetAccountTransactionsResponse>;
    getBlock(number: number, options?: any): Promise<GetBlockResponse>;
    getDelegate(address: string, options?: any): Promise<GetDelegateResponse>;
    getDelegates(options?: any): Promise<GetDelegatesResponse>;
    getInfo(options?: any): Promise<GetInfoResponse>;
    getLatestBlock(options?: any): Promise<GetLatestBlockResponse>;
    getLatestBlockNumber(options?: any): Promise<GetLatestBlockNumberResponse>;
    getPeers(options?: any): Promise<GetPeersResponse>;
    getPendingTransactions(options?: any): Promise<GetPendingTransactionsResponse>;
    getTransaction(hash: string, options?: any): Promise<GetTransactionResponse>;
    getTransactionLimits(type: string, options?: any): Promise<GetTransactionLimitsResponse>;
    getValidators(options?: any): Promise<GetValidatorsResponse>;
    getVote(delegate: string, voter: string, options?: any): Promise<GetVoteResponse>;
    getVotes(delegate: string, options?: any): Promise<GetVotesResponse>;
    listAccounts(options?: any): Promise<ListAccountsResponse>;
    registerDelegate(from: string, fee: string, data: string, options?: any): Promise<DoTransactionResponse>;
    sendTransaction(raw: string, options?: any): Promise<SendTransactionResponse>;
    signMessage(address: string, message: string, options?: any): Promise<SignMessageResponse>;
    transfer(value: string, from: string, to: string, fee: string, data: string, options?: any): Promise<DoTransactionResponse>;
    unvote(from: string, to: string, value: string, fee: string, options?: any): Promise<DoTransactionResponse>;
    verifyMessage(address: string, message: string, signature: string, options?: any): Promise<VerifyMessageResponse>;
    vote(from: string, to: string, value: string, fee: string, options?: any): Promise<DoTransactionResponse>;
};
/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export declare class DefaultApi extends BaseAPI {
    /**
     * Adds a node to node manager.
     * @summary Add node
     * @param {} node Name of the node in host:port format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    addNode(node: string, options?: any): Promise<AddNodeResponse>;
    /**
     * Adds an IP address to blacklist.
     * @summary Add to blacklist
     * @param {} ip IP address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    addToBlacklist(ip: string, options?: any): Promise<ApiHandlerResponse>;
    /**
     * Adds an IP address to whitelist.
     * @summary Add to whitelist
     * @param {} ip IP address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    addToWhitelist(ip: string, options?: any): Promise<ApiHandlerResponse>;
    /**
     * Creates a new account.
     * @summary Create account
     * @param {} [name] Assigned alias to the created account.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    createAccount(name?: string, options?: any): Promise<CreateAccountResponse>;
    /**
     * Returns an account.
     * @summary Get account
     * @param {} address Address of account
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
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
     * @memberof DefaultApi
     */
    getAccountTransactions(address: string, from: string, to: string, options?: any): Promise<GetAccountTransactionsResponse>;
    /**
     * Returns a block.
     * @summary Get block
     * @param {} number Block number
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getBlock(number: number, options?: any): Promise<GetBlockResponse>;
    /**
     * Returns a delegate.
     * @summary Get a delegate
     * @param {} address Delegate address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getDelegate(address: string, options?: any): Promise<GetDelegateResponse>;
    /**
     * Returns a list of delegates.
     * @summary Get all delegates
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getDelegates(options?: any): Promise<GetDelegatesResponse>;
    /**
     * Returns kernel info.
     * @summary Get info
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getInfo(options?: any): Promise<GetInfoResponse>;
    /**
     * Returns the latest block.
     * @summary Get latest block
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getLatestBlock(options?: any): Promise<GetLatestBlockResponse>;
    /**
     * Returns the number of the latest block.
     * @summary Get latest block number
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getLatestBlockNumber(options?: any): Promise<GetLatestBlockNumberResponse>;
    /**
     * Returns connected peers.
     * @summary Get peers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getPeers(options?: any): Promise<GetPeersResponse>;
    /**
     * Returns all the pending transactions.
     * @summary Get pending transactions
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getPendingTransactions(options?: any): Promise<GetPendingTransactionsResponse>;
    /**
     * Returns a transactions if exists.
     * @summary Get transaction
     * @param {} hash Transaction hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getTransaction(hash: string, options?: any): Promise<GetTransactionResponse>;
    /**
     * Get minimum fee and maximum size.
     * @summary Get transaction limits
     * @param {} type Type of transaction
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getTransactionLimits(type: string, options?: any): Promise<GetTransactionLimitsResponse>;
    /**
     * Returns a list of validators.
     * @summary Get validators
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getValidators(options?: any): Promise<GetValidatorsResponse>;
    /**
     * Returns the vote from a voter to a delegate.
     * @summary Get vote
     * @param {} delegate Delegate address
     * @param {} voter Voter address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getVote(delegate: string, voter: string, options?: any): Promise<GetVoteResponse>;
    /**
     * Returns all the votes to a delegate
     * @summary Get votes
     * @param {} delegate Delegate address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getVotes(delegate: string, options?: any): Promise<GetVotesResponse>;
    /**
     * Returns accounts in the wallet.
     * @summary List accounts
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
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
     * @memberof DefaultApi
     */
    registerDelegate(from: string, fee: string, data: string, options?: any): Promise<DoTransactionResponse>;
    /**
     * Broadcasts a raw transaction to the network.
     * @summary Send a raw transaction
     * @param {} raw Raw transaction
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    sendTransaction(raw: string, options?: any): Promise<SendTransactionResponse>;
    /**
     * Sign a message.
     * @summary Sign a message
     * @param {} address Signing address
     * @param {} message Message to sign
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    signMessage(address: string, message: string, options?: any): Promise<SignMessageResponse>;
    /**
     * Transfers coins to another address.
     * @summary Transfer coins
     * @param {} value Amount of SEM to transfer
     * @param {} from Sending address
     * @param {} to Receiving address
     * @param {} fee Transaction fee
     * @param {} data Transaction data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    transfer(value: string, from: string, to: string, fee: string, data: string, options?: any): Promise<DoTransactionResponse>;
    /**
     * Unvotes for a delegate.
     * @summary Unvote
     * @param {} from Voting address
     * @param {} to Delegate address
     * @param {} value Vote amount
     * @param {} fee Transaction fee
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
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
     * @memberof DefaultApi
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
     * @memberof DefaultApi
     */
    vote(from: string, to: string, value: string, fee: string, options?: any): Promise<DoTransactionResponse>;
}
