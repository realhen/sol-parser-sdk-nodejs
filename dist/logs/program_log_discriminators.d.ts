/**
 * Anchor `emit!` / program data 日志的前 8 字节 discriminator（小端 u64）。
 * 本仓库内唯一权威列表；变更须同步 `scripts/program-log-discriminators.json` 并运行 `npm run verify:discriminators`。
 */
export declare function u64leDiscriminator(bytes: readonly [number, number, number, number, number, number, number, number]): bigint;
/** PumpSwap（pAMMBay）program data 事件 */
export declare const PUMPSWAP_DISC: {
    readonly BUY: bigint;
    readonly SELL: bigint;
    readonly CREATE_POOL: bigint;
    readonly ADD_LIQUIDITY: bigint;
    readonly REMOVE_LIQUIDITY: bigint;
};
/**
 * `parseLogOptimized` 使用的全部分支 discriminator（含 PumpSwap 引用上表）。
 */
export declare const PROGRAM_LOG_DISC: {
    readonly PUMPFUN_CREATE: bigint;
    readonly PUMPFUN_TRADE: bigint;
    readonly PUMPFUN_MIGRATE: bigint;
    readonly PUMPFUN_MIGRATE_BONDING_CURVE_CREATOR: bigint;
    readonly PUMP_FEES_CREATE_FEE_SHARING_CONFIG: bigint;
    readonly PUMP_FEES_INITIALIZE_FEE_CONFIG: bigint;
    readonly PUMP_FEES_RESET_FEE_SHARING_CONFIG: bigint;
    readonly PUMP_FEES_REVOKE_FEE_SHARING_AUTHORITY: bigint;
    readonly PUMP_FEES_TRANSFER_FEE_SHARING_AUTHORITY: bigint;
    readonly PUMP_FEES_UPDATE_ADMIN: bigint;
    readonly PUMP_FEES_UPDATE_FEE_CONFIG: bigint;
    readonly PUMP_FEES_UPDATE_FEE_SHARES: bigint;
    readonly PUMP_FEES_UPSERT_FEE_TIERS: bigint;
    readonly PUMPSWAP_BUY: bigint;
    readonly PUMPSWAP_SELL: bigint;
    readonly PUMPSWAP_CREATE_POOL: bigint;
    readonly PUMPSWAP_ADD_LIQUIDITY: bigint;
    readonly PUMPSWAP_REMOVE_LIQUIDITY: bigint;
    readonly RAYDIUM_CLMM_SWAP: bigint;
    readonly RAYDIUM_CLMM_INCREASE_LIQUIDITY: bigint;
    readonly RAYDIUM_CLMM_DECREASE_LIQUIDITY: bigint;
    readonly RAYDIUM_CLMM_LIQUIDITY_CHANGE: bigint;
    readonly RAYDIUM_CLMM_CONFIG_CHANGE: bigint;
    readonly RAYDIUM_CLMM_CREATE_PERSONAL_POSITION: bigint;
    readonly RAYDIUM_CLMM_LIQUIDITY_CALCULATE: bigint;
    readonly RAYDIUM_CLMM_OPEN_LIMIT_ORDER: bigint;
    readonly RAYDIUM_CLMM_INCREASE_LIMIT_ORDER: bigint;
    readonly RAYDIUM_CLMM_DECREASE_LIMIT_ORDER: bigint;
    readonly RAYDIUM_CLMM_SETTLE_LIMIT_ORDER: bigint;
    readonly RAYDIUM_CLMM_UPDATE_REWARD_INFOS: bigint;
    readonly RAYDIUM_CLMM_CREATE_POOL: bigint;
    readonly RAYDIUM_CLMM_COLLECT_PERSONAL_FEE: bigint;
    readonly RAYDIUM_CLMM_COLLECT_PROTOCOL_FEE: bigint;
    readonly RAYDIUM_CPMM_SWAP_EVENT: bigint;
    readonly RAYDIUM_CPMM_SWAP_BASE_IN: bigint;
    readonly RAYDIUM_CPMM_SWAP_BASE_OUT: bigint;
    readonly RAYDIUM_CPMM_CREATE_POOL: bigint;
    readonly RAYDIUM_CPMM_DEPOSIT: bigint;
    readonly RAYDIUM_CPMM_WITHDRAW: bigint;
    readonly RAYDIUM_AMM_SWAP_BASE_IN: bigint;
    readonly RAYDIUM_AMM_SWAP_BASE_OUT: bigint;
    readonly RAYDIUM_AMM_DEPOSIT: bigint;
    readonly RAYDIUM_AMM_WITHDRAW: bigint;
    readonly RAYDIUM_AMM_INITIALIZE2: bigint;
    readonly RAYDIUM_AMM_WITHDRAW_PNL: bigint;
    readonly ORCA_TRADED: bigint;
    readonly ORCA_LIQUIDITY_INCREASED: bigint;
    readonly ORCA_LIQUIDITY_DECREASED: bigint;
    readonly ORCA_POOL_INITIALIZED: bigint;
    readonly METEORA_AMM_SWAP: bigint;
    readonly METEORA_AMM_ADD_LIQUIDITY: bigint;
    readonly METEORA_AMM_REMOVE_LIQUIDITY: bigint;
    readonly METEORA_AMM_BOOTSTRAP_LIQUIDITY: bigint;
    readonly METEORA_AMM_POOL_CREATED: bigint;
    readonly METEORA_AMM_SET_POOL_FEES: bigint;
    readonly METEORA_DAMM_SWAP: bigint;
    readonly METEORA_DAMM_SWAP2: bigint;
    readonly METEORA_DAMM_ADD_LIQUIDITY: bigint;
    readonly METEORA_DAMM_REMOVE_LIQUIDITY: bigint;
    readonly METEORA_DAMM_LIQUIDITY_CHANGE: bigint;
    readonly METEORA_DAMM_INITIALIZE_POOL: bigint;
    readonly METEORA_DAMM_CREATE_POSITION: bigint;
    readonly METEORA_DAMM_CLOSE_POSITION: bigint;
    readonly METEORA_DAMM_UPDATE_DELEGATE_PERMISSION: bigint;
    readonly METEORA_DAMM_WITHDRAW_DEAD_LIQUIDITY_REWARD: bigint;
    readonly METEORA_DAMM_CREATE_CONFIG: bigint;
    readonly METEORA_DAMM_CREATE_DYNAMIC_CONFIG: bigint;
};
export type ProgramLogDiscriminatorKey = keyof typeof PROGRAM_LOG_DISC;
