import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
export declare function parsePumpFunLogDecoded(programData: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseTradeFromData(data: Uint8Array, metadata: EventMetadata, isCreatedBuy: boolean): DexEvent | null;
export declare function parseCreateFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseMigrateFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseMigrateBondingCurveCreatorFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
/** u64 discriminator little-endian */
export declare function pumpDiscriminators(): {
    CREATE: bigint;
    TRADE: bigint;
    MIGRATE: bigint;
    MIGRATE_BONDING_CURVE_CREATOR: bigint;
};
