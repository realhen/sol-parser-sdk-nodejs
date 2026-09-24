import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
import type { AccountData } from "./types.js";
export declare function isPumpfunGlobalAccount(data: Uint8Array): boolean;
export declare function isPumpfunBondingCurveAccount(data: Uint8Array): boolean;
export declare function isPumpfunFeeConfigAccount(data: Uint8Array): boolean;
export declare function isPumpfunSharingConfigAccount(data: Uint8Array): boolean;
export declare function isPumpfunGlobalVolumeAccumulatorAccount(data: Uint8Array): boolean;
export declare function isPumpfunUserVolumeAccumulatorAccount(data: Uint8Array): boolean;
export declare function parsePumpfunGlobal(account: AccountData, metadata: EventMetadata): DexEvent | null;
/**
 * Decodes a bonding curve at a complete historical or current field boundary.
 * @param account - Account bytes, including the eight-byte Anchor discriminator.
 * @param metadata - Caller-provided notification context.
 * @returns The decoded curve, or null for a wrong discriminator or partial field.
 * @remarks Fields absent from historical layouts default to zero/false and the
 * all-zero public key. This decoder does not validate the account owner; use
 * parseAccountUnified or validate ownership before calling it directly.
 */
export declare function parsePumpfunBondingCurve(account: AccountData, metadata: EventMetadata): DexEvent | null;
export declare function parsePumpfunFeeConfig(account: AccountData, metadata: EventMetadata): DexEvent | null;
export declare function parsePumpfunSharingConfig(account: AccountData, metadata: EventMetadata): DexEvent | null;
export declare function parsePumpfunGlobalVolumeAccumulator(account: AccountData, metadata: EventMetadata): DexEvent | null;
export declare function parsePumpfunUserVolumeAccumulator(account: AccountData, metadata: EventMetadata): DexEvent | null;
export declare function parsePumpfunAccount(account: AccountData, metadata: EventMetadata): DexEvent | null;
