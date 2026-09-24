import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
export declare function parseSwapFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseAddLiquidityFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseRemoveLiquidityFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseBootstrapLiquidityFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseSetPoolFeesFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parsePoolCreatedFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
