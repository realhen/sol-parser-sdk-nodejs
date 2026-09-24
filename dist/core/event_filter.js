/** 所有事件类型列表 */
export const ALL_EVENT_TYPES = [
    // Block
    "BlockMeta",
    // RaydiumLaunchlab
    "RaydiumLaunchlabTrade",
    "RaydiumLaunchlabPoolCreate",
    "RaydiumLaunchlabMigrateAmm",
    // PumpFun
    "PumpFunTrade",
    "PumpFunBuy",
    "PumpFunSell",
    "PumpFunBuyExactSolIn",
    "PumpFunCreate",
    "PumpFunCreateV2",
    "PumpFunComplete",
    "PumpFunMigrate",
    "PumpFeesCreateFeeSharingConfig",
    "PumpFeesInitializeFeeConfig",
    "PumpFeesResetFeeSharingConfig",
    "PumpFeesRevokeFeeSharingAuthority",
    "PumpFeesTransferFeeSharingAuthority",
    "PumpFeesUpdateAdmin",
    "PumpFeesUpdateFeeConfig",
    "PumpFeesUpdateFeeShares",
    "PumpFeesUpsertFeeTiers",
    "PumpFunMigrateBondingCurveCreator",
    // PumpSwap
    "PumpSwapTrade",
    "PumpSwapBuy",
    "PumpSwapSell",
    "PumpSwapCreatePool",
    "PumpSwapLiquidityAdded",
    "PumpSwapLiquidityRemoved",
    // Raydium CPMM
    "RaydiumCpmmSwap",
    "RaydiumCpmmDeposit",
    "RaydiumCpmmWithdraw",
    "RaydiumCpmmInitialize",
    // Raydium CLMM
    "RaydiumClmmSwap",
    "RaydiumClmmCreatePool",
    "RaydiumClmmOpenPosition",
    "RaydiumClmmClosePosition",
    "RaydiumClmmIncreaseLiquidity",
    "RaydiumClmmDecreaseLiquidity",
    "RaydiumClmmLiquidityChange",
    "RaydiumClmmConfigChange",
    "RaydiumClmmCreatePersonalPosition",
    "RaydiumClmmLiquidityCalculate",
    "RaydiumClmmOpenLimitOrder",
    "RaydiumClmmIncreaseLimitOrder",
    "RaydiumClmmDecreaseLimitOrder",
    "RaydiumClmmSettleLimitOrder",
    "RaydiumClmmUpdateRewardInfos",
    "RaydiumClmmOpenPositionWithTokenExtNft",
    "RaydiumClmmCollectFee",
    // Raydium AMM V4
    "RaydiumAmmV4Swap",
    "RaydiumAmmV4Deposit",
    "RaydiumAmmV4Withdraw",
    "RaydiumAmmV4Initialize2",
    "RaydiumAmmV4WithdrawPnl",
    // Orca Whirlpool
    "OrcaWhirlpoolSwap",
    "OrcaWhirlpoolLiquidityIncreased",
    "OrcaWhirlpoolLiquidityDecreased",
    "OrcaWhirlpoolPoolInitialized",
    // Meteora Pools
    "MeteoraPoolsSwap",
    "MeteoraPoolsAddLiquidity",
    "MeteoraPoolsRemoveLiquidity",
    "MeteoraPoolsBootstrapLiquidity",
    "MeteoraPoolsPoolCreated",
    "MeteoraPoolsSetPoolFees",
    // Meteora DAMM V2
    "MeteoraDammV2Swap",
    "MeteoraDammV2AddLiquidity",
    "MeteoraDammV2RemoveLiquidity",
    "MeteoraDammV2InitializePool",
    "MeteoraDammV2CreatePosition",
    "MeteoraDammV2ClosePosition",
    "MeteoraDammV2UpdateDelegatePermission",
    "MeteoraDammV2WithdrawDeadLiquidityReward",
    "MeteoraDammV2CreateConfig",
    "MeteoraDammV2CreateDynamicConfig",
    // Meteora DBC
    "MeteoraDbcSwap",
    "MeteoraDbcInitializePool",
    "MeteoraDbcCurveComplete",
    // Meteora DLMM
    "MeteoraDlmmSwap",
    "MeteoraDlmmAddLiquidity",
    "MeteoraDlmmRemoveLiquidity",
    "MeteoraDlmmInitializePool",
    "MeteoraDlmmInitializeBinArray",
    "MeteoraDlmmCreatePosition",
    "MeteoraDlmmClosePosition",
    "MeteoraDlmmClaimFee",
    // Account types
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
const ALL_EVENT_TYPE_SET = new Set(ALL_EVENT_TYPES);
const PUMPFUN_BUY_FAMILY = [
    "PumpFunBuy",
    "PumpFunBuyExactSolIn",
];
const PUMPFUN_TRADE_FAMILY = [
    "PumpFunBuy",
    "PumpFunSell",
    "PumpFunBuyExactSolIn",
];
const PUMPFUN_CREATE_FAMILY = [
    "PumpFunCreate",
    "PumpFunCreateV2",
];
const PUMPSWAP_TRADE_FAMILY = [
    "PumpSwapBuy",
    "PumpSwapSell",
];
const PUMP_FEES_EVENT_TYPES = [
    "PumpFeesCreateFeeSharingConfig",
    "PumpFeesInitializeFeeConfig",
    "PumpFeesResetFeeSharingConfig",
    "PumpFeesRevokeFeeSharingAuthority",
    "PumpFeesTransferFeeSharingAuthority",
    "PumpFeesUpdateAdmin",
    "PumpFeesUpdateFeeConfig",
    "PumpFeesUpdateFeeShares",
    "PumpFeesUpsertFeeTiers",
];
const PUMPFUN_FILTER_TYPES = [
    "PumpFunTrade",
    "PumpFunBuy",
    "PumpFunSell",
    "PumpFunBuyExactSolIn",
    "PumpFunCreate",
    "PumpFunCreateV2",
    "PumpFunComplete",
    "PumpFunMigrate",
    "PumpFunMigrateBondingCurveCreator",
];
const PUMPSWAP_FILTER_TYPES = [
    "PumpSwapTrade",
    "PumpSwapBuy",
    "PumpSwapSell",
    "PumpSwapCreatePool",
    "PumpSwapLiquidityAdded",
    "PumpSwapLiquidityRemoved",
];
const METEORA_DAMM_V2_FILTER_TYPES = [
    "MeteoraDammV2Swap",
    "MeteoraDammV2AddLiquidity",
    "MeteoraDammV2RemoveLiquidity",
    "MeteoraDammV2CreatePosition",
    "MeteoraDammV2InitializePool",
    "MeteoraDammV2ClosePosition",
    "MeteoraDammV2UpdateDelegatePermission",
    "MeteoraDammV2WithdrawDeadLiquidityReward",
    "MeteoraDammV2CreateConfig",
    "MeteoraDammV2CreateDynamicConfig",
];
const METEORA_DBC_FILTER_TYPES = [
    "MeteoraDbcSwap",
    "MeteoraDbcInitializePool",
    "MeteoraDbcCurveComplete",
];
const METEORA_POOLS_FILTER_TYPES = [
    "MeteoraPoolsSwap",
    "MeteoraPoolsAddLiquidity",
    "MeteoraPoolsRemoveLiquidity",
    "MeteoraPoolsBootstrapLiquidity",
    "MeteoraPoolsPoolCreated",
    "MeteoraPoolsSetPoolFees",
];
const METEORA_DLMM_FILTER_TYPES = [
    "MeteoraDlmmSwap",
    "MeteoraDlmmAddLiquidity",
    "MeteoraDlmmRemoveLiquidity",
    "MeteoraDlmmInitializePool",
    "MeteoraDlmmInitializeBinArray",
    "MeteoraDlmmCreatePosition",
    "MeteoraDlmmClosePosition",
    "MeteoraDlmmClaimFee",
];
const RAYDIUM_CLMM_FILTER_TYPES = [
    "RaydiumClmmSwap",
    "RaydiumClmmIncreaseLiquidity",
    "RaydiumClmmDecreaseLiquidity",
    "RaydiumClmmLiquidityChange",
    "RaydiumClmmConfigChange",
    "RaydiumClmmCreatePersonalPosition",
    "RaydiumClmmLiquidityCalculate",
    "RaydiumClmmOpenLimitOrder",
    "RaydiumClmmIncreaseLimitOrder",
    "RaydiumClmmDecreaseLimitOrder",
    "RaydiumClmmSettleLimitOrder",
    "RaydiumClmmUpdateRewardInfos",
    "RaydiumClmmCreatePool",
    "RaydiumClmmOpenPosition",
    "RaydiumClmmOpenPositionWithTokenExtNft",
    "RaydiumClmmClosePosition",
    "RaydiumClmmCollectFee",
];
const RAYDIUM_CPMM_FILTER_TYPES = [
    "RaydiumCpmmSwap",
    "RaydiumCpmmDeposit",
    "RaydiumCpmmWithdraw",
    "RaydiumCpmmInitialize",
];
const RAYDIUM_AMM_V4_FILTER_TYPES = [
    "RaydiumAmmV4Swap",
    "RaydiumAmmV4Deposit",
    "RaydiumAmmV4Withdraw",
    "RaydiumAmmV4WithdrawPnl",
    "RaydiumAmmV4Initialize2",
];
const ORCA_WHIRLPOOL_FILTER_TYPES = [
    "OrcaWhirlpoolSwap",
    "OrcaWhirlpoolLiquidityIncreased",
    "OrcaWhirlpoolLiquidityDecreased",
    "OrcaWhirlpoolPoolInitialized",
];
const RAYDIUM_LAUNCHLAB_FILTER_TYPES = [
    "RaydiumLaunchlabTrade",
    "RaydiumLaunchlabPoolCreate",
    "RaydiumLaunchlabMigrateAmm",
];
const INSTRUCTION_EVENT_TYPES = [
    ...PUMPFUN_FILTER_TYPES,
    ...PUMP_FEES_EVENT_TYPES,
    ...PUMPSWAP_FILTER_TYPES,
    ...METEORA_DAMM_V2_FILTER_TYPES,
    ...METEORA_POOLS_FILTER_TYPES,
    ...METEORA_DLMM_FILTER_TYPES,
    ...RAYDIUM_CLMM_FILTER_TYPES,
    ...RAYDIUM_CPMM_FILTER_TYPES,
    ...RAYDIUM_AMM_V4_FILTER_TYPES,
    ...ORCA_WHIRLPOOL_FILTER_TYPES,
    ...RAYDIUM_LAUNCHLAB_FILTER_TYPES,
];
const INSTRUCTION_EVENT_TYPE_SET = new Set(INSTRUCTION_EVENT_TYPES);
const DEX_EVENT_TYPE_BY_VARIANT = {
    PumpFunGlobalAccount: "AccountPumpFunGlobal",
    PumpFunBondingCurveAccount: "AccountPumpFunBondingCurve",
    PumpFunFeeConfigAccount: "AccountPumpFunFeeConfig",
    PumpFunSharingConfigAccount: "AccountPumpFunSharingConfig",
    PumpFunGlobalVolumeAccumulatorAccount: "AccountPumpFunGlobalVolumeAccumulator",
    PumpFunUserVolumeAccumulatorAccount: "AccountPumpFunUserVolumeAccumulator",
    PumpSwapGlobalConfigAccount: "AccountPumpSwapGlobalConfig",
    PumpSwapPoolAccount: "AccountPumpSwapPool",
    RaydiumClmmAmmConfigAccount: "AccountRaydiumClmmAmmConfig",
    RaydiumClmmPoolStateAccount: "AccountRaydiumClmmPoolState",
    RaydiumClmmTickArrayStateAccount: "AccountRaydiumClmmTickArrayState",
    RaydiumCpmmAmmConfigAccount: "AccountRaydiumCpmmAmmConfig",
    RaydiumCpmmPoolStateAccount: "AccountRaydiumCpmmPoolState",
    OrcaWhirlpoolAccount: "AccountOrcaWhirlpool",
    OrcaPositionAccount: "AccountOrcaPosition",
    OrcaTickArrayAccount: "AccountOrcaTickArray",
    OrcaFeeTierAccount: "AccountOrcaFeeTier",
    OrcaWhirlpoolsConfigAccount: "AccountOrcaWhirlpoolsConfig",
};
export function eventTypeFromDexEvent(event) {
    const variant = Object.keys(event)[0];
    if (!variant || variant === "Error")
        return null;
    const mapped = DEX_EVENT_TYPE_BY_VARIANT[variant];
    if (mapped)
        return mapped;
    return ALL_EVENT_TYPE_SET.has(variant) ? variant : null;
}
export function eventTypeFilterShouldIncludeDexEvent(filter, event) {
    const eventType = eventTypeFromDexEvent(event);
    return eventType === null || filter.shouldInclude(eventType);
}
export function eventTypeFilterNormalizeDexEvent(filter, event) {
    const includeOnly = filter.include_only;
    if (!includeOnly || !includeOnly.includes("PumpFunTrade"))
        return event;
    const hasSpecificTradeFilter = includeOnly.some((t) => isPumpfunTradeConcrete(t));
    if (hasSpecificTradeFilter)
        return event;
    if ("PumpFunBuy" in event)
        return { PumpFunTrade: event.PumpFunBuy };
    if ("PumpFunSell" in event)
        return { PumpFunTrade: event.PumpFunSell };
    if ("PumpFunBuyExactSolIn" in event)
        return { PumpFunTrade: event.PumpFunBuyExactSolIn };
    return event;
}
export function eventTypeFilterIncludeOnly(types) {
    const include_only = types;
    return {
        include_only,
        shouldInclude(eventType) {
            if (include_only.includes(eventType))
                return true;
            if (eventType === "PumpFunTrade") {
                return eventTypesIntersect(include_only, PUMPFUN_TRADE_FAMILY);
            }
            if (isPumpfunTradeConcrete(eventType)) {
                if (include_only.includes("PumpFunTrade"))
                    return true;
                if (isPumpfunBuyFamily(eventType)) {
                    return eventTypesIntersect(include_only, PUMPFUN_BUY_FAMILY);
                }
                return false;
            }
            if (isPumpfunCreateFamily(eventType)) {
                return eventTypesIntersect(include_only, PUMPFUN_CREATE_FAMILY);
            }
            if (isPumpswapTradeConcrete(eventType)) {
                return include_only.includes("PumpSwapTrade");
            }
            return false;
        },
    };
}
export function eventTypeFilterExclude(types) {
    const exclude_types = types;
    return {
        exclude_types,
        shouldInclude(eventType) {
            if (exclude_types.includes(eventType))
                return false;
            if (isPumpfunTradeConcrete(eventType) &&
                exclude_types.includes("PumpFunTrade")) {
                return false;
            }
            if (isPumpfunBuyFamily(eventType) &&
                eventTypesIntersect(exclude_types, PUMPFUN_BUY_FAMILY)) {
                return false;
            }
            if (isPumpfunCreateFamily(eventType) &&
                eventTypesIntersect(exclude_types, PUMPFUN_CREATE_FAMILY)) {
                return false;
            }
            if (isPumpswapTradeConcrete(eventType) &&
                exclude_types.includes("PumpSwapTrade")) {
                return false;
            }
            return true;
        },
    };
}
function eventTypesIntersect(types, candidates) {
    return types.some((t) => candidates.includes(t));
}
function isPumpfunTradeConcrete(eventType) {
    return (eventType === "PumpFunBuy" ||
        eventType === "PumpFunSell" ||
        eventType === "PumpFunBuyExactSolIn");
}
function isPumpfunBuyFamily(eventType) {
    return eventType === "PumpFunBuy" || eventType === "PumpFunBuyExactSolIn";
}
function isPumpfunCreateFamily(eventType) {
    return eventType === "PumpFunCreate" || eventType === "PumpFunCreateV2";
}
function isPumpswapTradeConcrete(eventType) {
    return eventType === "PumpSwapBuy" || eventType === "PumpSwapSell";
}
function eventTypeFilterIncludesAny(filter, types) {
    if (filter.include_only) {
        return eventTypesIntersect(filter.include_only, types);
    }
    if (filter.exclude_types) {
        return types.some((t) => filter.shouldInclude(t));
    }
    return types.some((t) => filter.shouldInclude(t));
}
/** 过滤器是否包含 PumpFun 相关类型 */
export function eventTypeFilterIncludesPumpfun(filter) {
    return eventTypeFilterIncludesAny(filter, PUMPFUN_FILTER_TYPES);
}
/** 过滤器是否包含 Pump Fees (`pfeeUx...`) 相关类型 */
export function eventTypeFilterIncludesPumpFees(filter) {
    return eventTypeFilterIncludesAny(filter, PUMP_FEES_EVENT_TYPES);
}
/** 过滤器是否包含 PumpSwap 相关类型 */
export function eventTypeFilterIncludesPumpswap(filter) {
    return eventTypeFilterIncludesAny(filter, PUMPSWAP_FILTER_TYPES);
}
/** 过滤器是否包含 Meteora DAMM V2 相关类型 */
export function eventTypeFilterIncludesMeteoraDammV2(filter) {
    return eventTypeFilterIncludesAny(filter, METEORA_DAMM_V2_FILTER_TYPES);
}
/** 过滤器是否包含 Meteora DBC 相关类型 */
export function eventTypeFilterIncludesMeteoraDbc(filter) {
    return eventTypeFilterIncludesAny(filter, METEORA_DBC_FILTER_TYPES);
}
/** 过滤器是否包含 Meteora Pools 相关类型 */
export function eventTypeFilterIncludesMeteoraPools(filter) {
    return eventTypeFilterIncludesAny(filter, METEORA_POOLS_FILTER_TYPES);
}
/** 过滤器是否包含 Meteora DLMM 相关类型 */
export function eventTypeFilterIncludesMeteoraDlmm(filter) {
    return eventTypeFilterIncludesAny(filter, METEORA_DLMM_FILTER_TYPES);
}
/** 过滤器是否包含 Raydium CLMM 相关类型 */
export function eventTypeFilterIncludesRaydiumClmm(filter) {
    return eventTypeFilterIncludesAny(filter, RAYDIUM_CLMM_FILTER_TYPES);
}
/** 过滤器是否包含 Raydium CPMM 相关类型 */
export function eventTypeFilterIncludesRaydiumCpmm(filter) {
    return eventTypeFilterIncludesAny(filter, RAYDIUM_CPMM_FILTER_TYPES);
}
/** 过滤器是否包含 Raydium AMM V4 相关类型 */
export function eventTypeFilterIncludesRaydiumAmmV4(filter) {
    return eventTypeFilterIncludesAny(filter, RAYDIUM_AMM_V4_FILTER_TYPES);
}
/** 过滤器是否包含 Orca Whirlpool 相关类型 */
export function eventTypeFilterIncludesOrcaWhirlpool(filter) {
    return eventTypeFilterIncludesAny(filter, ORCA_WHIRLPOOL_FILTER_TYPES);
}
/** 过滤器是否包含 Raydium LaunchLab 相关类型（与 Rust `includes_raydium_launchlab` 集合一致） */
export function eventTypeFilterIncludesRaydiumLaunchlab(filter) {
    return eventTypeFilterIncludesAny(filter, RAYDIUM_LAUNCHLAB_FILTER_TYPES);
}
/**
 * `parseInstructionUnified` 前置白名单：仅当 `include_only` 与下列指令相关类型有交集时才解析指令。
 * 若白名单中不含下列任一类型，则整条指令解析入口返回 null。
 */
export function eventTypeFilterAllowsInstructionParsing(includeOnly) {
    return includeOnly.some((t) => INSTRUCTION_EVENT_TYPE_SET.has(t));
}
