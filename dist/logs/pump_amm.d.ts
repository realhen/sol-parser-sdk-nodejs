import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
import { PUMPSWAP_DISC } from "./program_log_discriminators.js";
export { PUMPSWAP_DISC };
export declare function parseBuyFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseSellFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseCreatePoolFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseAddLiquidityFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseRemoveLiquidityFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
