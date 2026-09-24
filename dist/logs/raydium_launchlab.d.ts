/** Raydium LaunchLab 日志解析 */
import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
export declare const RAYDIUM_LAUNCHLAB_DISC: {
    TRADE: bigint;
    POOL_CREATE: bigint;
};
export declare function parseRaydiumLaunchlabTradeFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseRaydiumLaunchlabPoolCreateFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseRaydiumLaunchlabFromDiscriminator(discriminator: bigint, data: Uint8Array, metadata: EventMetadata): DexEvent | null;
