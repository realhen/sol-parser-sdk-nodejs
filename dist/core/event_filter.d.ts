import type { DexEvent } from "./dex_event.js";
/** 事件类型过滤标签 */
export type EventType = "BlockMeta" | "RaydiumLaunchlabTrade" | "RaydiumLaunchlabPoolCreate" | "RaydiumLaunchlabMigrateAmm" | "PumpFunTrade" | "PumpFunBuy" | "PumpFunSell" | "PumpFunBuyExactSolIn" | "PumpFunCreate" | "PumpFunCreateV2" | "PumpFunComplete" | "PumpFunMigrate" | "PumpFeesCreateFeeSharingConfig" | "PumpFeesInitializeFeeConfig" | "PumpFeesResetFeeSharingConfig" | "PumpFeesRevokeFeeSharingAuthority" | "PumpFeesTransferFeeSharingAuthority" | "PumpFeesUpdateAdmin" | "PumpFeesUpdateFeeConfig" | "PumpFeesUpdateFeeShares" | "PumpFeesUpsertFeeTiers" | "PumpFunMigrateBondingCurveCreator" | "PumpSwapTrade" | "PumpSwapBuy" | "PumpSwapSell" | "PumpSwapCreatePool" | "PumpSwapLiquidityAdded" | "PumpSwapLiquidityRemoved" | "RaydiumCpmmSwap" | "RaydiumCpmmDeposit" | "RaydiumCpmmWithdraw" | "RaydiumCpmmInitialize" | "RaydiumClmmSwap" | "RaydiumClmmCreatePool" | "RaydiumClmmOpenPosition" | "RaydiumClmmClosePosition" | "RaydiumClmmIncreaseLiquidity" | "RaydiumClmmDecreaseLiquidity" | "RaydiumClmmLiquidityChange" | "RaydiumClmmConfigChange" | "RaydiumClmmCreatePersonalPosition" | "RaydiumClmmLiquidityCalculate" | "RaydiumClmmOpenLimitOrder" | "RaydiumClmmIncreaseLimitOrder" | "RaydiumClmmDecreaseLimitOrder" | "RaydiumClmmSettleLimitOrder" | "RaydiumClmmUpdateRewardInfos" | "RaydiumClmmOpenPositionWithTokenExtNft" | "RaydiumClmmCollectFee" | "RaydiumAmmV4Swap" | "RaydiumAmmV4Deposit" | "RaydiumAmmV4Withdraw" | "RaydiumAmmV4Initialize2" | "RaydiumAmmV4WithdrawPnl" | "OrcaWhirlpoolSwap" | "OrcaWhirlpoolLiquidityIncreased" | "OrcaWhirlpoolLiquidityDecreased" | "OrcaWhirlpoolPoolInitialized" | "MeteoraPoolsSwap" | "MeteoraPoolsAddLiquidity" | "MeteoraPoolsRemoveLiquidity" | "MeteoraPoolsBootstrapLiquidity" | "MeteoraPoolsPoolCreated" | "MeteoraPoolsSetPoolFees" | "MeteoraDammV2Swap" | "MeteoraDammV2AddLiquidity" | "MeteoraDammV2RemoveLiquidity" | "MeteoraDammV2InitializePool" | "MeteoraDammV2CreatePosition" | "MeteoraDammV2ClosePosition" | "MeteoraDammV2UpdateDelegatePermission" | "MeteoraDammV2WithdrawDeadLiquidityReward" | "MeteoraDammV2CreateConfig" | "MeteoraDammV2CreateDynamicConfig" | "MeteoraDbcSwap" | "MeteoraDbcInitializePool" | "MeteoraDbcCurveComplete" | "MeteoraDlmmSwap" | "MeteoraDlmmAddLiquidity" | "MeteoraDlmmRemoveLiquidity" | "MeteoraDlmmInitializePool" | "MeteoraDlmmInitializeBinArray" | "MeteoraDlmmCreatePosition" | "MeteoraDlmmClosePosition" | "MeteoraDlmmClaimFee" | "TokenAccount" | "TokenInfo" | "NonceAccount" | "AccountPumpFunGlobal" | "AccountPumpFunBondingCurve" | "AccountPumpFunFeeConfig" | "AccountPumpFunSharingConfig" | "AccountPumpFunGlobalVolumeAccumulator" | "AccountPumpFunUserVolumeAccumulator" | "AccountPumpSwapGlobalConfig" | "AccountPumpSwapPool" | "AccountRaydiumClmmAmmConfig" | "AccountRaydiumClmmPoolState" | "AccountRaydiumClmmTickArrayState" | "AccountRaydiumCpmmAmmConfig" | "AccountRaydiumCpmmPoolState" | "AccountOrcaWhirlpool" | "AccountOrcaPosition" | "AccountOrcaTickArray" | "AccountOrcaFeeTier" | "AccountOrcaWhirlpoolsConfig";
/** 与 Rust `grpc::EventType`（由 `StreamingEventType` 导出）一致 */
export type StreamingEventType = EventType;
/** 所有事件类型列表 */
export declare const ALL_EVENT_TYPES: EventType[];
export declare function eventTypeFromDexEvent(event: DexEvent): EventType | null;
export declare function eventTypeFilterShouldIncludeDexEvent(filter: EventTypeFilter, event: DexEvent): boolean;
export declare function eventTypeFilterNormalizeDexEvent(filter: EventTypeFilter, event: DexEvent): DexEvent;
export interface EventTypeFilter {
    include_only?: EventType[];
    exclude_types?: EventType[];
    shouldInclude(eventType: EventType): boolean;
}
export declare function eventTypeFilterIncludeOnly(types: EventType[]): EventTypeFilter;
export declare function eventTypeFilterExclude(types: EventType[]): EventTypeFilter;
/** 过滤器是否包含 PumpFun 相关类型 */
export declare function eventTypeFilterIncludesPumpfun(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 Pump Fees (`pfeeUx...`) 相关类型 */
export declare function eventTypeFilterIncludesPumpFees(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 PumpSwap 相关类型 */
export declare function eventTypeFilterIncludesPumpswap(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 Meteora DAMM V2 相关类型 */
export declare function eventTypeFilterIncludesMeteoraDammV2(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 Meteora DBC 相关类型 */
export declare function eventTypeFilterIncludesMeteoraDbc(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 Meteora Pools 相关类型 */
export declare function eventTypeFilterIncludesMeteoraPools(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 Meteora DLMM 相关类型 */
export declare function eventTypeFilterIncludesMeteoraDlmm(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 Raydium CLMM 相关类型 */
export declare function eventTypeFilterIncludesRaydiumClmm(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 Raydium CPMM 相关类型 */
export declare function eventTypeFilterIncludesRaydiumCpmm(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 Raydium AMM V4 相关类型 */
export declare function eventTypeFilterIncludesRaydiumAmmV4(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 Orca Whirlpool 相关类型 */
export declare function eventTypeFilterIncludesOrcaWhirlpool(filter: EventTypeFilter): boolean;
/** 过滤器是否包含 Raydium LaunchLab 相关类型（与 Rust `includes_raydium_launchlab` 集合一致） */
export declare function eventTypeFilterIncludesRaydiumLaunchlab(filter: EventTypeFilter): boolean;
/**
 * `parseInstructionUnified` 前置白名单：仅当 `include_only` 与下列指令相关类型有交集时才解析指令。
 * 若白名单中不含下列任一类型，则整条指令解析入口返回 null。
 */
export declare function eventTypeFilterAllowsInstructionParsing(includeOnly: EventType[]): boolean;
