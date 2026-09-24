import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent, PumpFeesFeeTier, PumpFeesFees, PumpFeesShareholder } from "../core/dex_event.js";
export declare function readFeesAt(data: Uint8Array, offset: number): {
    value: PumpFeesFees;
    next: number;
} | null;
export declare function readShareholdersVec(data: Uint8Array, offset: number): {
    value: PumpFeesShareholder[];
    next: number;
} | null;
export declare function readFeeTiersVec(data: Uint8Array, offset: number): {
    value: PumpFeesFeeTier[];
    next: number;
} | null;
export declare function parseCreateFeeSharingConfigFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseInitializeFeeConfigFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseResetFeeSharingConfigFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseRevokeFeeSharingAuthorityFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseTransferFeeSharingAuthorityFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseUpdateAdminFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseUpdateFeeConfigFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseUpdateFeeSharesFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
export declare function parseUpsertFeeTiersFromData(data: Uint8Array, metadata: EventMetadata): DexEvent | null;
