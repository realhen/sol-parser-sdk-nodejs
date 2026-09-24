import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
/** Decode Raydium AMM V4's official bincode `SwapBaseInLog` / `SwapBaseOutLog`. */
export declare function parseRayLogSwap(log: string, metadata: EventMetadata): DexEvent | null;
export declare function parseSwapBaseInFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseSwapBaseOutFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseDepositFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseWithdrawFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
/** Withdraw PnL 事件；discriminator `[0,0,0,0,0,0,0,7]` */
export declare function parseWithdrawPnlFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseInitialize2FromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
