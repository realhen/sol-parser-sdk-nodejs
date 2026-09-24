/** Meteora DLMM 结构化日志解析 */
import { type EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
export declare function parseDlmmFromDecoded(programData: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseDlmmEventFromData(discriminator: bigint, data: Uint8Array, metadata: EventMetadata): DexEvent | null;
/** 从整行日志解析 */
export declare function parseMeteoraDlmmLog(log: string, signature: string, slot: number, txIndex: number, blockTimeUs: number | undefined, grpcRecvUs: number): DexEvent | null;
