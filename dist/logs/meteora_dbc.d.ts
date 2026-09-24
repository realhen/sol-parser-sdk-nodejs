import type { DexEvent } from "../core/dex_event.js";
import type { EventMetadata } from "../core/metadata.js";
export declare const METEORA_DBC_DISC: {
    readonly SWAP: bigint;
    readonly INITIALIZE_POOL: bigint;
    readonly CURVE_COMPLETE: bigint;
};
export declare function parseMeteoraDbcSwapFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseMeteoraDbcInitializePoolFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseMeteoraDbcCurveCompleteFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseMeteoraDbcFromDiscriminator(discriminator: bigint, data: Uint8Array, metadata: EventMetadata): DexEvent | null;
