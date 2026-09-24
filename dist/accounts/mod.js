import { eventTypeFilterShouldIncludeDexEvent } from "../core/event_filter.js";
import { ORCA_WHIRLPOOL_PROGRAM_ID, PUMP_FEES_PROGRAM_ID, PUMPFUN_PROGRAM_ID, PUMPSWAP_PROGRAM_ID, RAYDIUM_CLMM_PROGRAM_ID, RAYDIUM_CPMM_PROGRAM_ID, } from "../instr/program_ids.js";
import { parseNonceAccount, isNonceAccount } from "./nonce.js";
import { parseTokenAccount } from "./token.js";
import { parsePumpswapAccount } from "./pumpswap.js";
import { parsePumpfunAccount } from "./pumpfun.js";
import { parseOrcaWhirlpoolAccount, parseRaydiumClmmAccount, parseRaydiumCpmmAccount } from "./raydium_orca.js";
export { parseNonceAccount, isNonceAccount } from "./nonce.js";
export { parseTokenAccount } from "./token.js";
export { parsePumpfunGlobal, parsePumpfunBondingCurve, parsePumpfunFeeConfig, parsePumpfunSharingConfig, parsePumpfunGlobalVolumeAccumulator, parsePumpfunUserVolumeAccumulator, parsePumpfunAccount, isPumpfunGlobalAccount, isPumpfunBondingCurveAccount, isPumpfunFeeConfigAccount, isPumpfunSharingConfigAccount, isPumpfunGlobalVolumeAccumulatorAccount, isPumpfunUserVolumeAccumulatorAccount, } from "./pumpfun.js";
export { parsePumpswapGlobalConfig, parsePumpswapPool, parsePumpswapAccount, isGlobalConfigAccount, isPoolAccount, } from "./pumpswap.js";
export { parseRaydiumClmmAccount, parseRaydiumClmmAmmConfig, parseRaydiumClmmPoolState, parseRaydiumClmmTickArrayState, parseRaydiumCpmmAccount, parseRaydiumCpmmAmmConfig, parseRaydiumCpmmPoolState, parseOrcaWhirlpoolAccount, parseOrcaWhirlpool, parseOrcaPosition, parseOrcaTickArray, parseOrcaFeeTier, parseOrcaWhirlpoolsConfig, isRaydiumClmmAmmConfigAccount, isRaydiumClmmPoolStateAccount, isRaydiumClmmTickArrayStateAccount, isRaydiumCpmmAmmConfigAccount, isRaydiumCpmmPoolStateAccount, isOrcaWhirlpoolAccount, isOrcaPositionAccount, isOrcaTickArrayAccount, isOrcaFeeTierAccount, isOrcaWhirlpoolsConfigAccount, } from "./raydium_orca.js";
export { hasDiscriminator } from "./utils.js";
export { userWalletPubkeyForOnchainAccount } from "./wallet_resolve.js";
const ACCOUNT_EVENT_TYPES = [
    "TokenAccount",
    "TokenInfo",
    "NonceAccount",
    "AccountPumpFunGlobal",
    "AccountPumpFunBondingCurve",
    "AccountPumpFunFeeConfig",
    "AccountPumpFunSharingConfig",
    "AccountPumpFunGlobalVolumeAccumulator",
    "AccountPumpFunUserVolumeAccumulator",
    "AccountPumpSwapGlobalConfig",
    "AccountPumpSwapPool",
    "AccountRaydiumClmmAmmConfig",
    "AccountRaydiumClmmPoolState",
    "AccountRaydiumClmmTickArrayState",
    "AccountRaydiumCpmmAmmConfig",
    "AccountRaydiumCpmmPoolState",
    "AccountOrcaWhirlpool",
    "AccountOrcaPosition",
    "AccountOrcaTickArray",
    "AccountOrcaFeeTier",
    "AccountOrcaWhirlpoolsConfig",
];
function filterParsedEvent(ev, eventTypeFilter) {
    if (!ev || !eventTypeFilter)
        return ev;
    return eventTypeFilterShouldIncludeDexEvent(eventTypeFilter, ev) ? ev : null;
}
/**
 * Decodes supported account layouts from caller-supplied bytes and metadata.
 * @param account - Account bytes and owner received from a trusted RPC source.
 * @param metadata - Caller-owned context; account updates may omit transaction identity.
 * @param eventTypeFilter - Optional selection of decoded account event types.
 * @returns The supported decoded event, or null when no selected layout matches.
 * @remarks This function performs no network requests or freshness validation. Callers
 * must validate account ownership and select the correct subscription context.
 */
export function parseAccountUnified(account, metadata, eventTypeFilter) {
    if (account.data.length === 0)
        return null;
    if (eventTypeFilter?.include_only) {
        const shouldParse = eventTypeFilter.include_only.some((t) => ACCOUNT_EVENT_TYPES.includes(t));
        if (!shouldParse)
            return null;
    }
    if (account.owner === PUMPSWAP_PROGRAM_ID) {
        if (!eventTypeFilter ||
            eventTypeFilter.shouldInclude("AccountPumpSwapGlobalConfig") ||
            eventTypeFilter.shouldInclude("AccountPumpSwapPool")) {
            const ev = parsePumpswapAccount(account, metadata);
            if (ev)
                return filterParsedEvent(ev, eventTypeFilter);
        }
        return null;
    }
    if (account.owner === PUMPFUN_PROGRAM_ID || account.owner === PUMP_FEES_PROGRAM_ID) {
        if (!eventTypeFilter ||
            eventTypeFilter.shouldInclude("AccountPumpFunGlobal") ||
            eventTypeFilter.shouldInclude("AccountPumpFunBondingCurve") ||
            eventTypeFilter.shouldInclude("AccountPumpFunFeeConfig") ||
            eventTypeFilter.shouldInclude("AccountPumpFunSharingConfig") ||
            eventTypeFilter.shouldInclude("AccountPumpFunGlobalVolumeAccumulator") ||
            eventTypeFilter.shouldInclude("AccountPumpFunUserVolumeAccumulator")) {
            const ev = parsePumpfunAccount(account, metadata);
            if (ev)
                return filterParsedEvent(ev, eventTypeFilter);
        }
        return null;
    }
    if (account.owner === RAYDIUM_CLMM_PROGRAM_ID) {
        if (!eventTypeFilter ||
            eventTypeFilter.shouldInclude("AccountRaydiumClmmAmmConfig") ||
            eventTypeFilter.shouldInclude("AccountRaydiumClmmPoolState") ||
            eventTypeFilter.shouldInclude("AccountRaydiumClmmTickArrayState")) {
            const ev = parseRaydiumClmmAccount(account, metadata);
            if (ev)
                return filterParsedEvent(ev, eventTypeFilter);
        }
        return null;
    }
    if (account.owner === RAYDIUM_CPMM_PROGRAM_ID) {
        if (!eventTypeFilter ||
            eventTypeFilter.shouldInclude("AccountRaydiumCpmmAmmConfig") ||
            eventTypeFilter.shouldInclude("AccountRaydiumCpmmPoolState")) {
            const ev = parseRaydiumCpmmAccount(account, metadata);
            if (ev)
                return filterParsedEvent(ev, eventTypeFilter);
        }
        return null;
    }
    if (account.owner === ORCA_WHIRLPOOL_PROGRAM_ID) {
        if (!eventTypeFilter ||
            eventTypeFilter.shouldInclude("AccountOrcaWhirlpool") ||
            eventTypeFilter.shouldInclude("AccountOrcaPosition") ||
            eventTypeFilter.shouldInclude("AccountOrcaTickArray") ||
            eventTypeFilter.shouldInclude("AccountOrcaFeeTier") ||
            eventTypeFilter.shouldInclude("AccountOrcaWhirlpoolsConfig")) {
            const ev = parseOrcaWhirlpoolAccount(account, metadata);
            if (ev)
                return filterParsedEvent(ev, eventTypeFilter);
        }
        return null;
    }
    if (isNonceAccount(account.data)) {
        if (eventTypeFilter && !eventTypeFilter.shouldInclude("NonceAccount"))
            return null;
        return parseNonceAccount(account, metadata);
    }
    if (eventTypeFilter &&
        !eventTypeFilter.shouldInclude("TokenAccount") &&
        !eventTypeFilter.shouldInclude("TokenInfo")) {
        return null;
    }
    return filterParsedEvent(parseTokenAccount(account, metadata), eventTypeFilter);
}
