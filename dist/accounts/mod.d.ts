import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
import type { AccountData } from "./types.js";
import type { EventTypeFilter } from "../core/event_filter.js";
export type { AccountData } from "./types.js";
export { parseNonceAccount, isNonceAccount } from "./nonce.js";
export { parseTokenAccount } from "./token.js";
export { parsePumpfunGlobal, parsePumpfunBondingCurve, parsePumpfunFeeConfig, parsePumpfunSharingConfig, parsePumpfunGlobalVolumeAccumulator, parsePumpfunUserVolumeAccumulator, parsePumpfunAccount, isPumpfunGlobalAccount, isPumpfunBondingCurveAccount, isPumpfunFeeConfigAccount, isPumpfunSharingConfigAccount, isPumpfunGlobalVolumeAccumulatorAccount, isPumpfunUserVolumeAccumulatorAccount, } from "./pumpfun.js";
export { parsePumpswapGlobalConfig, parsePumpswapPool, parsePumpswapAccount, isGlobalConfigAccount, isPoolAccount, } from "./pumpswap.js";
export { parseRaydiumClmmAccount, parseRaydiumClmmAmmConfig, parseRaydiumClmmPoolState, parseRaydiumClmmTickArrayState, parseRaydiumCpmmAccount, parseRaydiumCpmmAmmConfig, parseRaydiumCpmmPoolState, parseOrcaWhirlpoolAccount, parseOrcaWhirlpool, parseOrcaPosition, parseOrcaTickArray, parseOrcaFeeTier, parseOrcaWhirlpoolsConfig, isRaydiumClmmAmmConfigAccount, isRaydiumClmmPoolStateAccount, isRaydiumClmmTickArrayStateAccount, isRaydiumCpmmAmmConfigAccount, isRaydiumCpmmPoolStateAccount, isOrcaWhirlpoolAccount, isOrcaPositionAccount, isOrcaTickArrayAccount, isOrcaFeeTierAccount, isOrcaWhirlpoolsConfigAccount, } from "./raydium_orca.js";
export { hasDiscriminator } from "./utils.js";
export { userWalletPubkeyForOnchainAccount } from "./wallet_resolve.js";
/**
 * Decodes supported account layouts from caller-supplied bytes and metadata.
 * @param account - Account bytes and owner received from a trusted RPC source.
 * @param metadata - Caller-owned context; account updates may omit transaction identity.
 * @param eventTypeFilter - Optional selection of decoded account event types.
 * @returns The supported decoded event, or null when no selected layout matches.
 * @remarks This function performs no network requests or freshness validation. Callers
 * must validate account ownership and select the correct subscription context.
 */
export declare function parseAccountUnified(account: AccountData, metadata: EventMetadata, eventTypeFilter?: EventTypeFilter): DexEvent | null;
