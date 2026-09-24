import type { DexEvent } from "../core/dex_event.js";
import type { EventTypeFilter } from "../core/event_filter.js";
export declare function parseLogOptimized(log: string, signature: string, slot: number, txIndex: number, blockTimeUs: number | undefined, grpcRecvUs: number, eventTypeFilter: EventTypeFilter | undefined, isCreatedBuy: boolean, recentBlockhash?: Uint8Array, programId?: string): DexEvent | null;
/** 单行日志统一解析；`txIndex` 与 Rust gRPC `parse_logs(..., tx_idx, ...)` / `info.index` 对齐。 */
export declare function parseLogUnified(log: string, signature: string, slot: number, blockTimeUs: number | undefined, txIndex?: number): DexEvent | null;
export declare function parseLogOptimizedWithProgramId(log: string, signature: string, slot: number, txIndex: number, blockTimeUs: number | undefined, grpcRecvUs: number, eventTypeFilter: EventTypeFilter | undefined, isCreatedBuy: boolean, recentBlockhash: Uint8Array | undefined, programId: string | undefined): DexEvent | null;
export declare function parseInvokeInfo(log: string): {
    programId: string;
    depth: number;
} | null;
export declare function parseProgramCompleteInfo(log: string): string | null;
