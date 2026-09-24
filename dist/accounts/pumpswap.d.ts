import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
import type { AccountData } from "./types.js";
export declare function isGlobalConfigAccount(data: Uint8Array): boolean;
export declare function isPoolAccount(data: Uint8Array): boolean;
export declare function parsePumpswapGlobalConfig(account: AccountData, metadata: EventMetadata): DexEvent | null;
/**
 * Decodes a pool at a complete historical or current field boundary.
 * @param account - Account bytes, including the eight-byte Anchor discriminator.
 * @param metadata - Caller-provided notification context.
 * @returns The decoded pool, or null for a wrong discriminator or partial field.
 * @remarks Missing historical fields default to zero/false and the all-zero
 * public key. The legacy 252-byte allocation is accepted only with zero padding
 * after the cashback flag. This decoder does not validate the account owner;
 * use parseAccountUnified or validate ownership before calling it directly.
 */
export declare function parsePumpswapPool(account: AccountData, metadata: EventMetadata): DexEvent | null;
export declare function parsePumpswapAccount(account: AccountData, metadata: EventMetadata): DexEvent | null;
