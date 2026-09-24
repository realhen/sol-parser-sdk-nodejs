import type { SubscribeRequestFilterAccountsFilter } from "@triton-one/yellowstone-grpc";

/** gRPC 订阅顺序模式 */
export type OrderMode = "Unordered" | "Ordered" | "StreamingOrdered" | "MicroBatch";

/** 与 Rust `grpc::types::Protocol` 一致 */
export type Protocol =
  | "PumpFun"
  | "PumpSwap"
  | "PumpFees"
  | "RaydiumLaunchlab"
  | "RaydiumCpmm"
  | "RaydiumClmm"
  | "RaydiumAmmV4"
  | "OrcaWhirlpool"
  | "MeteoraPools"
  | "MeteoraDammV2"
  | "MeteoraDlmm"
  | "MeteoraDbc";

// ─── gRPC 流式更新类型 ────────────────────────────────────────────────────────

export type SlotStatus =
  | "Processed"
  | "Confirmed"
  | "Finalized"
  | "FirstShredReceived"
  | "Completed"
  | "CreatedBank"
  | "Dead";

export interface SubscribeUpdateAccountInfo {
  pubkey: Uint8Array;
  lamports: string | bigint;
  owner: Uint8Array;
  executable: boolean;
  rentEpoch: string | bigint;
  data: Uint8Array;
  writeVersion: string | bigint;
  txnSignature?: Uint8Array;
}

export interface SubscribeUpdateAccount {
  slot: string | bigint;
  isStartup: boolean;
  account?: SubscribeUpdateAccountInfo;
}

export interface SubscribeUpdateSlot {
  slot: string | bigint;
  parent?: string | bigint;
  status: SlotStatus;
  deadError?: string;
}

export interface SubscribeUpdateTransactionInfo {
  signature: Uint8Array;
  isVote: boolean;
  /** 原始 proto Transaction 对象 */
  transactionRaw?: unknown;
  /** 原始 proto TransactionStatusMeta 对象（含 logMessages） */
  metaRaw?: {
    logMessages?: string[];
    logMessagesNone?: boolean;
    err?: unknown;
    preBalances?: string[];
    postBalances?: string[];
    [key: string]: unknown;
  };
  index: string | bigint;
}

export interface SubscribeUpdateTransaction {
  slot: string | bigint;
  transaction?: SubscribeUpdateTransactionInfo;
}

export interface SubscribeUpdateBlock {
  slot: string | bigint;
  blockhash: string;
  parentSlot: string | bigint;
  parentBlockhash: string;
  executedTransactionCount: string | bigint;
}

export interface SubscribeUpdateBlockMeta {
  slot: string | bigint;
  blockhash: string;
  parentSlot: string | bigint;
  parentBlockhash: string;
  executedTransactionCount: string | bigint;
}

export interface SubscribeUpdatePing {}
export interface SubscribeUpdatePong {
  id: number;
}

export interface SubscribeUpdate {
  filters: string[];
  account?: SubscribeUpdateAccount;
  slot?: SubscribeUpdateSlot;
  transaction?: SubscribeUpdateTransaction;
  block?: SubscribeUpdateBlock;
  blockMeta?: SubscribeUpdateBlockMeta;
  ping?: SubscribeUpdatePing;
  pong?: SubscribeUpdatePong;
  /** Yellowstone SubscribeUpdate.created_at, Unix timestamp in microseconds. */
  createdAtUs?: number;
}

export interface SubscribeCallbacks {
  onUpdate?: (update: SubscribeUpdate) => void;
  onError?: (err: Error) => void;
  onEnd?: () => void;
  /**
   * 是否在流断开后自动重连（指数退避，与 Rust `subscribe_dex_events` 一致）。
   * 默认 `true`。为 `false` 时保持单次连接的旧行为。
   */
  autoReconnect?: boolean;
}

export interface ClientConfig {
  enable_metrics: boolean;
  connection_timeout_ms: number;
  request_timeout_ms: number;
  enable_tls: boolean;
  max_retries: number;
  retry_delay_ms: number;
  max_concurrent_streams: number;
  keep_alive_interval_ms: number;
  keep_alive_timeout_ms: number;
  buffer_size: number;
  /** Node gRPC HTTP/2 receive window. Larger values reduce stalls on bursty streams. */
  flow_control_window_bytes?: number;
  order_mode: OrderMode;
  order_timeout_ms: number;
  micro_batch_us: number;
}

/** 与 Rust `grpc::config` 中 `StreamingConfig` 别名一致，并包含可选 Node gRPC 参数。 */
export type StreamingConfig = ClientConfig;

export function defaultClientConfig(): ClientConfig {
  return {
    enable_metrics: false,
    connection_timeout_ms: 8000,
    request_timeout_ms: 15000,
    enable_tls: true,
    max_retries: 3,
    retry_delay_ms: 1000,
    max_concurrent_streams: 100,
    keep_alive_interval_ms: 30000,
    keep_alive_timeout_ms: 5000,
    buffer_size: 8192,
    flow_control_window_bytes: 1024 * 1024,
    order_mode: "Unordered",
    order_timeout_ms: 100,
    micro_batch_us: 100,
  };
}

/** Rust `ClientConfig::low_latency` 的 Node 调优版本，使用更小的 JS 对象队列。 */
export function lowLatencyClientConfig(): ClientConfig {
  return {
    enable_metrics: false,
    connection_timeout_ms: 5000,
    request_timeout_ms: 10_000,
    enable_tls: true,
    max_retries: 1,
    retry_delay_ms: 100,
    max_concurrent_streams: 200,
    keep_alive_interval_ms: 10_000,
    keep_alive_timeout_ms: 2000,
    buffer_size: 16384,
    flow_control_window_bytes: 16 * 1024 * 1024,
    order_mode: "Unordered",
    order_timeout_ms: 50,
    micro_batch_us: 50,
  };
}

/** Rust `ClientConfig::high_throughput` 的 Node 调优版本，使用更小的 JS 对象队列。 */
export function highThroughputClientConfig(): ClientConfig {
  return {
    enable_metrics: true,
    connection_timeout_ms: 10_000,
    request_timeout_ms: 30_000,
    enable_tls: true,
    max_retries: 5,
    retry_delay_ms: 2000,
    max_concurrent_streams: 500,
    keep_alive_interval_ms: 60_000,
    keep_alive_timeout_ms: 10_000,
    buffer_size: 32768,
    flow_control_window_bytes: 16 * 1024 * 1024,
    order_mode: "Unordered",
    order_timeout_ms: 200,
    micro_batch_us: 200,
  };
}

export interface TransactionFilter {
  account_include: string[];
  account_exclude: string[];
  account_required: string[];
}

export function newTransactionFilter(): TransactionFilter {
  return { account_include: [], account_exclude: [], account_required: [] };
}

/** 与 Rust `TransactionFilter::from_program_ids` 一致 */
export function transactionFilterFromProgramIds(programIds: string[]): TransactionFilter {
  return {
    account_include: [...programIds],
    account_exclude: [],
    account_required: [],
  };
}

/** 与 Rust `grpc::AccountFilter` 一致（Yellowstone 账户订阅） */
export interface AccountFilter {
  account: string[];
  owner: string[];
  filters: SubscribeRequestFilterAccountsFilter[];
}

/** 与 Rust `grpc::types::AccountFilterMemcmp` / `AccountFilterData` 一致（文档与扩展用） */
export interface AccountFilterMemcmp {
  offset: number;
  bytes: Uint8Array;
}

export interface AccountFilterData {
  memcmp?: AccountFilterMemcmp;
  datasize?: number;
}

export function newAccountFilter(): AccountFilter {
  return { account: [], owner: [], filters: [] };
}

/** 与 Rust `grpc::types::SlotFilter` 一致 */
export interface SlotFilter {
  min_slot?: number;
  max_slot?: number;
}

export function newSlotFilter(): SlotFilter {
  return {};
}

export function slotFilterMinSlot(filter: SlotFilter, slot: number): SlotFilter {
  return { ...filter, min_slot: slot };
}

export function slotFilterMaxSlot(filter: SlotFilter, slot: number): SlotFilter {
  return { ...filter, max_slot: slot };
}

/** 与 Rust `AccountFilter::from_program_owners` 一致 */
export function accountFilterFromProgramOwners(programIds: string[]): AccountFilter {
  return { account: [], owner: [...programIds], filters: [] };
}

/**
 * 构造 memcmp 账户过滤器（与 Rust `account_filter_memcmp` 一致）。
 * ATA 常在 offset 0 放 mint；PumpSwap 池子等常在 offset 32。
 */
export function accountFilterMemcmp(
  offset: number,
  bytes: Uint8Array
): SubscribeRequestFilterAccountsFilter {
  return {
    memcmp: {
      offset: String(offset),
      bytes,
    },
  };
}

export * from "../core/event_filter.js";
