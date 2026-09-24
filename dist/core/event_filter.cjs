"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/core/event_filter.js
var event_filter_exports = {};
__export(event_filter_exports, {
  ALL_EVENT_TYPES: () => ALL_EVENT_TYPES,
  eventTypeFilterAllowsInstructionParsing: () => eventTypeFilterAllowsInstructionParsing,
  eventTypeFilterExclude: () => eventTypeFilterExclude,
  eventTypeFilterIncludeOnly: () => eventTypeFilterIncludeOnly,
  eventTypeFilterIncludesMeteoraDammV2: () => eventTypeFilterIncludesMeteoraDammV2,
  eventTypeFilterIncludesMeteoraDbc: () => eventTypeFilterIncludesMeteoraDbc,
  eventTypeFilterIncludesMeteoraDlmm: () => eventTypeFilterIncludesMeteoraDlmm,
  eventTypeFilterIncludesMeteoraPools: () => eventTypeFilterIncludesMeteoraPools,
  eventTypeFilterIncludesOrcaWhirlpool: () => eventTypeFilterIncludesOrcaWhirlpool,
  eventTypeFilterIncludesPumpFees: () => eventTypeFilterIncludesPumpFees,
  eventTypeFilterIncludesPumpfun: () => eventTypeFilterIncludesPumpfun,
  eventTypeFilterIncludesPumpswap: () => eventTypeFilterIncludesPumpswap,
  eventTypeFilterIncludesRaydiumAmmV4: () => eventTypeFilterIncludesRaydiumAmmV4,
  eventTypeFilterIncludesRaydiumClmm: () => eventTypeFilterIncludesRaydiumClmm,
  eventTypeFilterIncludesRaydiumCpmm: () => eventTypeFilterIncludesRaydiumCpmm,
  eventTypeFilterIncludesRaydiumLaunchlab: () => eventTypeFilterIncludesRaydiumLaunchlab,
  eventTypeFilterNormalizeDexEvent: () => eventTypeFilterNormalizeDexEvent,
  eventTypeFilterShouldIncludeDexEvent: () => eventTypeFilterShouldIncludeDexEvent,
  eventTypeFromDexEvent: () => eventTypeFromDexEvent
});
module.exports = __toCommonJS(event_filter_exports);
var ALL_EVENT_TYPES = [
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
  "AccountOrcaWhirlpoolsConfig"
];
var ALL_EVENT_TYPE_SET = new Set(ALL_EVENT_TYPES);
var PUMPFUN_BUY_FAMILY = [
  "PumpFunBuy",
  "PumpFunBuyExactSolIn"
];
var PUMPFUN_TRADE_FAMILY = [
  "PumpFunBuy",
  "PumpFunSell",
  "PumpFunBuyExactSolIn"
];
var PUMPFUN_CREATE_FAMILY = [
  "PumpFunCreate",
  "PumpFunCreateV2"
];
var PUMP_FEES_EVENT_TYPES = [
  "PumpFeesCreateFeeSharingConfig",
  "PumpFeesInitializeFeeConfig",
  "PumpFeesResetFeeSharingConfig",
  "PumpFeesRevokeFeeSharingAuthority",
  "PumpFeesTransferFeeSharingAuthority",
  "PumpFeesUpdateAdmin",
  "PumpFeesUpdateFeeConfig",
  "PumpFeesUpdateFeeShares",
  "PumpFeesUpsertFeeTiers"
];
var PUMPFUN_FILTER_TYPES = [
  "PumpFunTrade",
  "PumpFunBuy",
  "PumpFunSell",
  "PumpFunBuyExactSolIn",
  "PumpFunCreate",
  "PumpFunCreateV2",
  "PumpFunComplete",
  "PumpFunMigrate",
  "PumpFunMigrateBondingCurveCreator"
];
var PUMPSWAP_FILTER_TYPES = [
  "PumpSwapTrade",
  "PumpSwapBuy",
  "PumpSwapSell",
  "PumpSwapCreatePool",
  "PumpSwapLiquidityAdded",
  "PumpSwapLiquidityRemoved"
];
var METEORA_DAMM_V2_FILTER_TYPES = [
  "MeteoraDammV2Swap",
  "MeteoraDammV2AddLiquidity",
  "MeteoraDammV2RemoveLiquidity",
  "MeteoraDammV2CreatePosition",
  "MeteoraDammV2InitializePool",
  "MeteoraDammV2ClosePosition",
  "MeteoraDammV2UpdateDelegatePermission",
  "MeteoraDammV2WithdrawDeadLiquidityReward",
  "MeteoraDammV2CreateConfig",
  "MeteoraDammV2CreateDynamicConfig"
];
var METEORA_DBC_FILTER_TYPES = [
  "MeteoraDbcSwap",
  "MeteoraDbcInitializePool",
  "MeteoraDbcCurveComplete"
];
var METEORA_POOLS_FILTER_TYPES = [
  "MeteoraPoolsSwap",
  "MeteoraPoolsAddLiquidity",
  "MeteoraPoolsRemoveLiquidity",
  "MeteoraPoolsBootstrapLiquidity",
  "MeteoraPoolsPoolCreated",
  "MeteoraPoolsSetPoolFees"
];
var METEORA_DLMM_FILTER_TYPES = [
  "MeteoraDlmmSwap",
  "MeteoraDlmmAddLiquidity",
  "MeteoraDlmmRemoveLiquidity",
  "MeteoraDlmmInitializePool",
  "MeteoraDlmmInitializeBinArray",
  "MeteoraDlmmCreatePosition",
  "MeteoraDlmmClosePosition",
  "MeteoraDlmmClaimFee"
];
var RAYDIUM_CLMM_FILTER_TYPES = [
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
  "RaydiumClmmCollectFee"
];
var RAYDIUM_CPMM_FILTER_TYPES = [
  "RaydiumCpmmSwap",
  "RaydiumCpmmDeposit",
  "RaydiumCpmmWithdraw",
  "RaydiumCpmmInitialize"
];
var RAYDIUM_AMM_V4_FILTER_TYPES = [
  "RaydiumAmmV4Swap",
  "RaydiumAmmV4Deposit",
  "RaydiumAmmV4Withdraw",
  "RaydiumAmmV4WithdrawPnl",
  "RaydiumAmmV4Initialize2"
];
var ORCA_WHIRLPOOL_FILTER_TYPES = [
  "OrcaWhirlpoolSwap",
  "OrcaWhirlpoolLiquidityIncreased",
  "OrcaWhirlpoolLiquidityDecreased",
  "OrcaWhirlpoolPoolInitialized"
];
var RAYDIUM_LAUNCHLAB_FILTER_TYPES = [
  "RaydiumLaunchlabTrade",
  "RaydiumLaunchlabPoolCreate",
  "RaydiumLaunchlabMigrateAmm"
];
var INSTRUCTION_EVENT_TYPES = [
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
  ...RAYDIUM_LAUNCHLAB_FILTER_TYPES
];
var INSTRUCTION_EVENT_TYPE_SET = new Set(INSTRUCTION_EVENT_TYPES);
var DEX_EVENT_TYPE_BY_VARIANT = {
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
  OrcaWhirlpoolsConfigAccount: "AccountOrcaWhirlpoolsConfig"
};
function eventTypeFromDexEvent(event) {
  const variant = Object.keys(event)[0];
  if (!variant || variant === "Error")
    return null;
  const mapped = DEX_EVENT_TYPE_BY_VARIANT[variant];
  if (mapped)
    return mapped;
  return ALL_EVENT_TYPE_SET.has(variant) ? variant : null;
}
function eventTypeFilterShouldIncludeDexEvent(filter, event) {
  const eventType = eventTypeFromDexEvent(event);
  return eventType === null || filter.shouldInclude(eventType);
}
function eventTypeFilterNormalizeDexEvent(filter, event) {
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
function eventTypeFilterIncludeOnly(types) {
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
    }
  };
}
function eventTypeFilterExclude(types) {
  const exclude_types = types;
  return {
    exclude_types,
    shouldInclude(eventType) {
      if (exclude_types.includes(eventType))
        return false;
      if (isPumpfunTradeConcrete(eventType) && exclude_types.includes("PumpFunTrade")) {
        return false;
      }
      if (isPumpfunBuyFamily(eventType) && eventTypesIntersect(exclude_types, PUMPFUN_BUY_FAMILY)) {
        return false;
      }
      if (isPumpfunCreateFamily(eventType) && eventTypesIntersect(exclude_types, PUMPFUN_CREATE_FAMILY)) {
        return false;
      }
      if (isPumpswapTradeConcrete(eventType) && exclude_types.includes("PumpSwapTrade")) {
        return false;
      }
      return true;
    }
  };
}
function eventTypesIntersect(types, candidates) {
  return types.some((t) => candidates.includes(t));
}
function isPumpfunTradeConcrete(eventType) {
  return eventType === "PumpFunBuy" || eventType === "PumpFunSell" || eventType === "PumpFunBuyExactSolIn";
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
function eventTypeFilterIncludesPumpfun(filter) {
  return eventTypeFilterIncludesAny(filter, PUMPFUN_FILTER_TYPES);
}
function eventTypeFilterIncludesPumpFees(filter) {
  return eventTypeFilterIncludesAny(filter, PUMP_FEES_EVENT_TYPES);
}
function eventTypeFilterIncludesPumpswap(filter) {
  return eventTypeFilterIncludesAny(filter, PUMPSWAP_FILTER_TYPES);
}
function eventTypeFilterIncludesMeteoraDammV2(filter) {
  return eventTypeFilterIncludesAny(filter, METEORA_DAMM_V2_FILTER_TYPES);
}
function eventTypeFilterIncludesMeteoraDbc(filter) {
  return eventTypeFilterIncludesAny(filter, METEORA_DBC_FILTER_TYPES);
}
function eventTypeFilterIncludesMeteoraPools(filter) {
  return eventTypeFilterIncludesAny(filter, METEORA_POOLS_FILTER_TYPES);
}
function eventTypeFilterIncludesMeteoraDlmm(filter) {
  return eventTypeFilterIncludesAny(filter, METEORA_DLMM_FILTER_TYPES);
}
function eventTypeFilterIncludesRaydiumClmm(filter) {
  return eventTypeFilterIncludesAny(filter, RAYDIUM_CLMM_FILTER_TYPES);
}
function eventTypeFilterIncludesRaydiumCpmm(filter) {
  return eventTypeFilterIncludesAny(filter, RAYDIUM_CPMM_FILTER_TYPES);
}
function eventTypeFilterIncludesRaydiumAmmV4(filter) {
  return eventTypeFilterIncludesAny(filter, RAYDIUM_AMM_V4_FILTER_TYPES);
}
function eventTypeFilterIncludesOrcaWhirlpool(filter) {
  return eventTypeFilterIncludesAny(filter, ORCA_WHIRLPOOL_FILTER_TYPES);
}
function eventTypeFilterIncludesRaydiumLaunchlab(filter) {
  return eventTypeFilterIncludesAny(filter, RAYDIUM_LAUNCHLAB_FILTER_TYPES);
}
function eventTypeFilterAllowsInstructionParsing(includeOnly) {
  return includeOnly.some((t) => INSTRUCTION_EVENT_TYPE_SET.has(t));
}
