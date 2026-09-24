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
export function makeMetadata(signature, slot, txIndex, blockTimeUs, grpcRecvUs, recentBlockhash) {
    return {
        signature,
        slot,
        tx_index: txIndex,
        block_time_us: blockTimeUs ?? 0,
        grpc_recv_us: grpcRecvUs,
        recent_blockhash: recentBlockhash,
    };
}
