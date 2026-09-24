import type { DexEvent } from "./dex_event.js";

/** 事件类型过滤标签 */
export type EventType =
  // Block
  | "BlockMeta"
  // RaydiumLaunchlab
  | "RaydiumLaunchlabTrade"
  | "RaydiumLaunchlabPoolCreate"
  | "RaydiumLaunchlabMigrateAmm"
  // PumpFun
  | "PumpFunTrade"
  | "PumpFunBuy"
  | "PumpFunSell"
  | "PumpFunBuyExactSolIn"
  | "PumpFunCreate"
  | "PumpFunCreateV2"
  | "PumpFunComplete"
  | "PumpFunMigrate"
  | "PumpFeesCreateFeeSharingConfig"
  | "PumpFeesInitializeFeeConfig"
  | "PumpFeesResetFeeSharingConfig"
  | "PumpFeesRevokeFeeSharingAuthority"
  | "PumpFeesTransferFeeSharingAuthority"
  | "PumpFeesUpdateAdmin"
  | "PumpFeesUpdateFeeConfig"
  | "PumpFeesUpdateFeeShares"
  | "PumpFeesUpsertFeeTiers"
  | "PumpFunMigrateBondingCurveCreator"
  // PumpSwap
  | "PumpSwapTrade"
  | "PumpSwapBuy"
  | "PumpSwapSell"
  | "PumpSwapCreatePool"
  | "PumpSwapLiquidityAdded"
  | "PumpSwapLiquidityRemoved"
  // Raydium CPMM
  | "RaydiumCpmmSwap"
  | "RaydiumCpmmDeposit"
  | "RaydiumCpmmWithdraw"
  | "RaydiumCpmmInitialize"
  // Raydium CLMM
  | "RaydiumClmmSwap"
  | "RaydiumClmmCreatePool"
  | "RaydiumClmmOpenPosition"
  | "RaydiumClmmClosePosition"
  | "RaydiumClmmIncreaseLiquidity"
  | "RaydiumClmmDecreaseLiquidity"
  | "RaydiumClmmLiquidityChange"
  | "RaydiumClmmConfigChange"
  | "RaydiumClmmCreatePersonalPosition"
  | "RaydiumClmmLiquidityCalculate"
  | "RaydiumClmmOpenLimitOrder"
  | "RaydiumClmmIncreaseLimitOrder"
  | "RaydiumClmmDecreaseLimitOrder"
  | "RaydiumClmmSettleLimitOrder"
  | "RaydiumClmmUpdateRewardInfos"
  | "RaydiumClmmOpenPositionWithTokenExtNft"
  | "RaydiumClmmCollectFee"
  // Raydium AMM V4
  | "RaydiumAmmV4Swap"
  | "RaydiumAmmV4Deposit"
  | "RaydiumAmmV4Withdraw"
  | "RaydiumAmmV4Initialize2"
  | "RaydiumAmmV4WithdrawPnl"
  // Orca Whirlpool
  | "OrcaWhirlpoolSwap"
  | "OrcaWhirlpoolLiquidityIncreased"
  | "OrcaWhirlpoolLiquidityDecreased"
  | "OrcaWhirlpoolPoolInitialized"
  // Meteora Pools
  | "MeteoraPoolsSwap"
  | "MeteoraPoolsAddLiquidity"
  | "MeteoraPoolsRemoveLiquidity"
  | "MeteoraPoolsBootstrapLiquidity"
  | "MeteoraPoolsPoolCreated"
  | "MeteoraPoolsSetPoolFees"
  // Meteora DAMM V2
  | "MeteoraDammV2Swap"
  | "MeteoraDammV2AddLiquidity"
  | "MeteoraDammV2RemoveLiquidity"
  | "MeteoraDammV2InitializePool"
  | "MeteoraDammV2CreatePosition"
  | "MeteoraDammV2ClosePosition"
  | "MeteoraDammV2UpdateDelegatePermission"
  | "MeteoraDammV2WithdrawDeadLiquidityReward"
  | "MeteoraDammV2CreateConfig"
  | "MeteoraDammV2CreateDynamicConfig"
  // Meteora DBC
  | "MeteoraDbcSwap"
  | "MeteoraDbcInitializePool"
  | "MeteoraDbcCurveComplete"
  // Meteora DLMM
  | "MeteoraDlmmSwap"
  | "MeteoraDlmmAddLiquidity"
  | "MeteoraDlmmRemoveLiquidity"
  | "MeteoraDlmmInitializePool"
  | "MeteoraDlmmInitializeBinArray"
  | "MeteoraDlmmCreatePosition"
  | "MeteoraDlmmClosePosition"
  | "MeteoraDlmmClaimFee"
  // Account types
  | "TokenAccount"
  | "TokenInfo"
  | "NonceAccount"
  | "AccountPumpFunGlobal"
  | "AccountPumpFunBondingCurve"
  | "AccountPumpFunFeeConfig"
  | "AccountPumpFunSharingConfig"
  | "AccountPumpFunGlobalVolumeAccumulator"
  | "AccountPumpFunUserVolumeAccumulator"
  | "AccountPumpSwapGlobalConfig"
  | "AccountPumpSwapPool"
  | "AccountRaydiumClmmAmmConfig"
  | "AccountRaydiumClmmPoolState"
  | "AccountRaydiumClmmTickArrayState"
  | "AccountRaydiumCpmmAmmConfig"
  | "AccountRaydiumCpmmPoolState"
  | "AccountOrcaWhirlpool"
  | "AccountOrcaPosition"
  | "AccountOrcaTickArray"
  | "AccountOrcaFeeTier"
  | "AccountOrcaWhirlpoolsConfig";

/** 与 Rust `grpc::EventType`（由 `StreamingEventType` 导出）一致 */
export type StreamingEventType = EventType;

/** 所有事件类型列表 */
export const ALL_EVENT_TYPES: EventType[] = [
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

const ALL_EVENT_TYPE_SET = new Set<string>(ALL_EVENT_TYPES);
const PUMPFUN_BUY_FAMILY: readonly EventType[] = [
  "PumpFunBuy",
  "PumpFunBuyExactSolIn",
];
const PUMPFUN_TRADE_FAMILY: readonly EventType[] = [
  "PumpFunBuy",
  "PumpFunSell",
  "PumpFunBuyExactSolIn",
];
const PUMPFUN_CREATE_FAMILY: readonly EventType[] = [
  "PumpFunCreate",
  "PumpFunCreateV2",
];
const PUMPSWAP_TRADE_FAMILY: readonly EventType[] = [
  "PumpSwapBuy",
  "PumpSwapSell",
];
const PUMP_FEES_EVENT_TYPES: readonly EventType[] = [
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
const PUMPFUN_FILTER_TYPES: readonly EventType[] = [
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
const PUMPSWAP_FILTER_TYPES: readonly EventType[] = [
  "PumpSwapTrade",
  "PumpSwapBuy",
  "PumpSwapSell",
  "PumpSwapCreatePool",
  "PumpSwapLiquidityAdded",
  "PumpSwapLiquidityRemoved",
];
const METEORA_DAMM_V2_FILTER_TYPES: readonly EventType[] = [
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
const METEORA_DBC_FILTER_TYPES: readonly EventType[] = [
  "MeteoraDbcSwap",
  "MeteoraDbcInitializePool",
  "MeteoraDbcCurveComplete",
];
const METEORA_POOLS_FILTER_TYPES: readonly EventType[] = [
  "MeteoraPoolsSwap",
  "MeteoraPoolsAddLiquidity",
  "MeteoraPoolsRemoveLiquidity",
  "MeteoraPoolsBootstrapLiquidity",
  "MeteoraPoolsPoolCreated",
  "MeteoraPoolsSetPoolFees",
];
const METEORA_DLMM_FILTER_TYPES: readonly EventType[] = [
  "MeteoraDlmmSwap",
  "MeteoraDlmmAddLiquidity",
  "MeteoraDlmmRemoveLiquidity",
  "MeteoraDlmmInitializePool",
  "MeteoraDlmmInitializeBinArray",
  "MeteoraDlmmCreatePosition",
  "MeteoraDlmmClosePosition",
  "MeteoraDlmmClaimFee",
];
const RAYDIUM_CLMM_FILTER_TYPES: readonly EventType[] = [
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
const RAYDIUM_CPMM_FILTER_TYPES: readonly EventType[] = [
  "RaydiumCpmmSwap",
  "RaydiumCpmmDeposit",
  "RaydiumCpmmWithdraw",
  "RaydiumCpmmInitialize",
];
const RAYDIUM_AMM_V4_FILTER_TYPES: readonly EventType[] = [
  "RaydiumAmmV4Swap",
  "RaydiumAmmV4Deposit",
  "RaydiumAmmV4Withdraw",
  "RaydiumAmmV4WithdrawPnl",
  "RaydiumAmmV4Initialize2",
];
const ORCA_WHIRLPOOL_FILTER_TYPES: readonly EventType[] = [
  "OrcaWhirlpoolSwap",
  "OrcaWhirlpoolLiquidityIncreased",
  "OrcaWhirlpoolLiquidityDecreased",
  "OrcaWhirlpoolPoolInitialized",
];
const RAYDIUM_LAUNCHLAB_FILTER_TYPES: readonly EventType[] = [
  "RaydiumLaunchlabTrade",
  "RaydiumLaunchlabPoolCreate",
  "RaydiumLaunchlabMigrateAmm",
];
const INSTRUCTION_EVENT_TYPES: readonly EventType[] = [
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
const INSTRUCTION_EVENT_TYPE_SET = new Set<EventType>(INSTRUCTION_EVENT_TYPES);

const DEX_EVENT_TYPE_BY_VARIANT: Partial<Record<string, EventType>> = {
  PumpFunGlobalAccount: "AccountPumpFunGlobal",
  PumpFunBondingCurveAccount: "AccountPumpFunBondingCurve",
  PumpFunFeeConfigAccount: "AccountPumpFunFeeConfig",
  PumpFunSharingConfigAccount: "AccountPumpFunSharingConfig",
  PumpFunGlobalVolumeAccumulatorAccount:
    "AccountPumpFunGlobalVolumeAccumulator",
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

export function eventTypeFromDexEvent(event: DexEvent): EventType | null {
  const variant = Object.keys(event)[0];
  if (!variant || variant === "Error") return null;
  const mapped = DEX_EVENT_TYPE_BY_VARIANT[variant];
  if (mapped) return mapped;
  return ALL_EVENT_TYPE_SET.has(variant) ? (variant as EventType) : null;
}

export function eventTypeFilterShouldIncludeDexEvent(
  filter: EventTypeFilter,
  event: DexEvent,
): boolean {
  const eventType = eventTypeFromDexEvent(event);
  return eventType === null || filter.shouldInclude(eventType);
}

export function eventTypeFilterNormalizeDexEvent(
  filter: EventTypeFilter,
  event: DexEvent,
): DexEvent {
  const includeOnly = filter.include_only;
  if (!includeOnly || !includeOnly.includes("PumpFunTrade")) return event;

  const hasSpecificTradeFilter = includeOnly.some((t) =>
    isPumpfunTradeConcrete(t),
  );
  if (hasSpecificTradeFilter) return event;

  if ("PumpFunBuy" in event) return { PumpFunTrade: event.PumpFunBuy };
  if ("PumpFunSell" in event) return { PumpFunTrade: event.PumpFunSell };
  if ("PumpFunBuyExactSolIn" in event)
    return { PumpFunTrade: event.PumpFunBuyExactSolIn };
  return event;
}

export interface EventTypeFilter {
  include_only?: EventType[];
  exclude_types?: EventType[];
  shouldInclude(eventType: EventType): boolean;
}

export function eventTypeFilterIncludeOnly(
  types: EventType[],
): EventTypeFilter {
  const include_only = types;
  return {
    include_only,
    shouldInclude(eventType: EventType): boolean {
      if (include_only.includes(eventType)) return true;
      if (eventType === "PumpFunTrade") {
        return eventTypesIntersect(include_only, PUMPFUN_TRADE_FAMILY);
      }
      if (isPumpfunTradeConcrete(eventType)) {
        if (include_only.includes("PumpFunTrade")) return true;
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

export function eventTypeFilterExclude(types: EventType[]): EventTypeFilter {
  const exclude_types = types;
  return {
    exclude_types,
    shouldInclude(eventType: EventType): boolean {
      if (exclude_types.includes(eventType)) return false;
      if (
        isPumpfunTradeConcrete(eventType) &&
        exclude_types.includes("PumpFunTrade")
      ) {
        return false;
      }
      if (
        isPumpfunBuyFamily(eventType) &&
        eventTypesIntersect(exclude_types, PUMPFUN_BUY_FAMILY)
      ) {
        return false;
      }
      if (
        isPumpfunCreateFamily(eventType) &&
        eventTypesIntersect(exclude_types, PUMPFUN_CREATE_FAMILY)
      ) {
        return false;
      }
      if (
        isPumpswapTradeConcrete(eventType) &&
        exclude_types.includes("PumpSwapTrade")
      ) {
        return false;
      }
      return true;
    },
  };
}

function eventTypesIntersect(
  types: readonly EventType[],
  candidates: readonly EventType[],
): boolean {
  return types.some((t) => candidates.includes(t));
}

function isPumpfunTradeConcrete(eventType: EventType): boolean {
  return (
    eventType === "PumpFunBuy" ||
    eventType === "PumpFunSell" ||
    eventType === "PumpFunBuyExactSolIn"
  );
}

function isPumpfunBuyFamily(eventType: EventType): boolean {
  return eventType === "PumpFunBuy" || eventType === "PumpFunBuyExactSolIn";
}

function isPumpfunCreateFamily(eventType: EventType): boolean {
  return eventType === "PumpFunCreate" || eventType === "PumpFunCreateV2";
}

function isPumpswapTradeConcrete(eventType: EventType): boolean {
  return eventType === "PumpSwapBuy" || eventType === "PumpSwapSell";
}

function eventTypeFilterIncludesAny(
  filter: EventTypeFilter,
  types: readonly EventType[],
): boolean {
  if (filter.include_only) {
    return eventTypesIntersect(filter.include_only, types);
  }
  if (filter.exclude_types) {
    return types.some((t) => filter.shouldInclude(t));
  }
  return types.some((t) => filter.shouldInclude(t));
}

/** 过滤器是否包含 PumpFun 相关类型 */
export function eventTypeFilterIncludesPumpfun(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, PUMPFUN_FILTER_TYPES);
}

/** 过滤器是否包含 Pump Fees (`pfeeUx...`) 相关类型 */
export function eventTypeFilterIncludesPumpFees(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, PUMP_FEES_EVENT_TYPES);
}

/** 过滤器是否包含 PumpSwap 相关类型 */
export function eventTypeFilterIncludesPumpswap(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, PUMPSWAP_FILTER_TYPES);
}

/** 过滤器是否包含 Meteora DAMM V2 相关类型 */
export function eventTypeFilterIncludesMeteoraDammV2(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, METEORA_DAMM_V2_FILTER_TYPES);
}

/** 过滤器是否包含 Meteora DBC 相关类型 */
export function eventTypeFilterIncludesMeteoraDbc(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, METEORA_DBC_FILTER_TYPES);
}

/** 过滤器是否包含 Meteora Pools 相关类型 */
export function eventTypeFilterIncludesMeteoraPools(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, METEORA_POOLS_FILTER_TYPES);
}

/** 过滤器是否包含 Meteora DLMM 相关类型 */
export function eventTypeFilterIncludesMeteoraDlmm(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, METEORA_DLMM_FILTER_TYPES);
}

/** 过滤器是否包含 Raydium CLMM 相关类型 */
export function eventTypeFilterIncludesRaydiumClmm(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, RAYDIUM_CLMM_FILTER_TYPES);
}

/** 过滤器是否包含 Raydium CPMM 相关类型 */
export function eventTypeFilterIncludesRaydiumCpmm(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, RAYDIUM_CPMM_FILTER_TYPES);
}

/** 过滤器是否包含 Raydium AMM V4 相关类型 */
export function eventTypeFilterIncludesRaydiumAmmV4(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, RAYDIUM_AMM_V4_FILTER_TYPES);
}

/** 过滤器是否包含 Orca Whirlpool 相关类型 */
export function eventTypeFilterIncludesOrcaWhirlpool(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, ORCA_WHIRLPOOL_FILTER_TYPES);
}

/** 过滤器是否包含 Raydium LaunchLab 相关类型（与 Rust `includes_raydium_launchlab` 集合一致） */
export function eventTypeFilterIncludesRaydiumLaunchlab(
  filter: EventTypeFilter,
): boolean {
  return eventTypeFilterIncludesAny(filter, RAYDIUM_LAUNCHLAB_FILTER_TYPES);
}

/**
 * `parseInstructionUnified` 前置白名单：仅当 `include_only` 与下列指令相关类型有交集时才解析指令。
 * 若白名单中不含下列任一类型，则整条指令解析入口返回 null。
 */
export function eventTypeFilterAllowsInstructionParsing(
  includeOnly: EventType[],
): boolean {
  return includeOnly.some((t) => INSTRUCTION_EVENT_TYPE_SET.has(t));
}
