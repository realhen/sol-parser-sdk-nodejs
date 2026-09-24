/** 事件元数据（signature 为 Base58 字符串） */
export interface EventMetadata {
    signature: string;
    slot: number;
    /** gRPC：与 Yellowstone `SubscribeUpdateTransactionInfo.index` 一致（Rust `info.index`）。Shred 等其它路径含义见各实现说明。 */
    tx_index: number;
    block_time_us: number;
    grpc_recv_us: number;
    /** Time waiting in the local pre-parser queue, measured with a monotonic clock. */
    local_queue_latency_us?: number;
    /** Pure local adapter + parser duration. No network or RPC calls are included. */
    parse_duration_us?: number;
    /** Start of the local gRPC data callback through parser completion. No RPC calls are included. */
    local_processing_latency_us?: number;
    /** Yellowstone update creation through the local gRPC data callback; includes provider and transport delay. */
    source_to_grpc_latency_us?: number;
    recent_blockhash?: string;
}
/**
 * Creates parser context without fetching transaction or block information.
 * @param signature - Base58 transaction signature, or an empty string for account updates.
 * @param slot - Slot reported by the source notification.
 * @param txIndex - Transaction index when available; use zero when unknown.
 * @param blockTimeUs - Block time in epoch microseconds, or undefined when unavailable.
 * @param grpcRecvUs - Local receive time in epoch microseconds; the name is retained for compatibility.
 * @param recentBlockhash - Optional source-provided blockhash.
 * @returns Metadata with unavailable block time represented as zero.
 */
export declare function makeMetadata(signature: string, slot: number, txIndex: number, blockTimeUs: number | undefined, grpcRecvUs: number, recentBlockhash?: string): EventMetadata;
