import { type EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
/**
 * Mainnet upgrade that replaced `trading_fee/partner_fee` in `EvtSwap2` with
 * `claiming_fee/compounding_fee` without changing discriminator or size.
 */
export declare const COMPOUNDING_FEE_LAYOUT_ACTIVATION_SLOT = 406048752;
/** Aligns with Rust `parse_swap2_from_data` (full 180-byte EvtSwap2 layout). */
export declare function parseSwap2FromData(data: Uint8Array, meta: EventMetadata): DexEvent | null;
export declare function parseAddLiquidityFromData(data: Uint8Array, meta: EventMetadata): DexEvent | null;
export declare function parseRemoveLiquidityFromData(data: Uint8Array, meta: EventMetadata): DexEvent | null;
/** Parse current `EvtLiquidityChange`; `change_type` 0 = add, 1 = remove. */
export declare function parseLiquidityChangeFromData(data: Uint8Array, meta: EventMetadata): DexEvent | null;
export declare function parseUpdateDelegatePermissionFromData(data: Uint8Array, meta: EventMetadata): DexEvent | null;
export declare function parseWithdrawDeadLiquidityRewardFromData(data: Uint8Array, meta: EventMetadata): DexEvent | null;
export declare function parseCreateConfigFromData(data: Uint8Array, meta: EventMetadata): DexEvent | null;
export declare function parseCreateDynamicConfigFromData(data: Uint8Array, meta: EventMetadata): DexEvent | null;
/**
 * Meteora DAMM Program data 入口；与 Rust `logs/meteora_damm.rs` 一致。
 */
export declare function parseMeteoraDammLog(log: string, signature: string, slot: number, txIndex: number, blockTimeUs: number | undefined, grpcRecvUs: number): DexEvent | null;
