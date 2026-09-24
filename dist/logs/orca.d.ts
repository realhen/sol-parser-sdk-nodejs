import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
export declare function parseTradedFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseLiquidityIncreasedFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseLiquidityDecreasedFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parsePoolInitializedFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
