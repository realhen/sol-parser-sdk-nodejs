import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
/** Current Anchor `SwapEvent` payload (the 8-byte event discriminator is removed by the caller). */
export declare function parseSwapEventFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseSwapBaseInFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseSwapBaseOutFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseCreatePoolFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseDepositFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseWithdrawFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
