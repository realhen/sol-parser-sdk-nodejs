import type { DexEvent } from "./dex_event.js";
import type { EventTypeFilter } from "../core/event_filter.js";
import { nowUs } from "./clock.js";
export type EventListener = {
    onDexEvent: (event: DexEvent) => void;
};
export type StreamingEventListener = {
    onDexEventStreaming: (event: DexEvent) => void;
};
/** 从交易解析事件；当前主路径为日志解析 */
export declare function parseTransactionEvents(_instructionData: Uint8Array, _accounts: string[], logs: string[], signature: string, slot: number, _txIndex: number, blockTimeUs: number | undefined, _programId: string): DexEvent[];
export declare function parseLogsOnly(logs: string[], signature: string, slot: number, blockTimeUs: number | undefined, txIndex?: number): DexEvent[];
export declare function parseTransactionWithListener(instructionData: Uint8Array, accounts: string[], logs: string[], signature: string, slot: number, txIndex: number, blockTimeUs: number | undefined, programId: string, listener: EventListener): void;
export declare function parseTransactionEventsStreaming(_instructionData: Uint8Array, _accounts: string[], logs: string[], signature: string, slot: number, _txIndex: number, blockTimeUs: number | undefined, _programId: string, callback: (event: DexEvent) => void): void;
export declare function parseLogsStreaming(logs: string[], signature: string, slot: number, blockTimeUs: number | undefined, callback: (event: DexEvent) => void, txIndex?: number): void;
export declare function parseTransactionWithStreamingListener(instructionData: Uint8Array, accounts: string[], logs: string[], signature: string, slot: number, txIndex: number, blockTimeUs: number | undefined, programId: string, listener: StreamingEventListener): void;
/** 带完整 gRPC 元数据字段的日志解析 */
export declare function parseLog(log: string, signature: string, slot: number, txIndex: number, blockTimeUs: number | undefined, grpcRecvUs: number, eventTypeFilter: EventTypeFilter | undefined, isCreatedBuy: boolean, recentBlockhash?: Uint8Array): DexEvent | null;
export { nowUs };
