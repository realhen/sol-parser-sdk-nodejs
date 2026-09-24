"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/accounts/mod.js
var mod_exports = {};
__export(mod_exports, {
  hasDiscriminator: () => hasDiscriminator,
  isGlobalConfigAccount: () => isGlobalConfigAccount,
  isNonceAccount: () => isNonceAccount,
  isOrcaFeeTierAccount: () => isOrcaFeeTierAccount,
  isOrcaPositionAccount: () => isOrcaPositionAccount,
  isOrcaTickArrayAccount: () => isOrcaTickArrayAccount,
  isOrcaWhirlpoolAccount: () => isOrcaWhirlpoolAccount,
  isOrcaWhirlpoolsConfigAccount: () => isOrcaWhirlpoolsConfigAccount,
  isPoolAccount: () => isPoolAccount,
  isPumpfunBondingCurveAccount: () => isPumpfunBondingCurveAccount,
  isPumpfunFeeConfigAccount: () => isPumpfunFeeConfigAccount,
  isPumpfunGlobalAccount: () => isPumpfunGlobalAccount,
  isPumpfunGlobalVolumeAccumulatorAccount: () => isPumpfunGlobalVolumeAccumulatorAccount,
  isPumpfunSharingConfigAccount: () => isPumpfunSharingConfigAccount,
  isPumpfunUserVolumeAccumulatorAccount: () => isPumpfunUserVolumeAccumulatorAccount,
  isRaydiumClmmAmmConfigAccount: () => isRaydiumClmmAmmConfigAccount,
  isRaydiumClmmPoolStateAccount: () => isRaydiumClmmPoolStateAccount,
  isRaydiumClmmTickArrayStateAccount: () => isRaydiumClmmTickArrayStateAccount,
  isRaydiumCpmmAmmConfigAccount: () => isRaydiumCpmmAmmConfigAccount,
  isRaydiumCpmmPoolStateAccount: () => isRaydiumCpmmPoolStateAccount,
  parseAccountUnified: () => parseAccountUnified,
  parseNonceAccount: () => parseNonceAccount,
  parseOrcaFeeTier: () => parseOrcaFeeTier,
  parseOrcaPosition: () => parseOrcaPosition,
  parseOrcaTickArray: () => parseOrcaTickArray,
  parseOrcaWhirlpool: () => parseOrcaWhirlpool,
  parseOrcaWhirlpoolAccount: () => parseOrcaWhirlpoolAccount,
  parseOrcaWhirlpoolsConfig: () => parseOrcaWhirlpoolsConfig,
  parsePumpfunAccount: () => parsePumpfunAccount,
  parsePumpfunBondingCurve: () => parsePumpfunBondingCurve,
  parsePumpfunFeeConfig: () => parsePumpfunFeeConfig,
  parsePumpfunGlobal: () => parsePumpfunGlobal,
  parsePumpfunGlobalVolumeAccumulator: () => parsePumpfunGlobalVolumeAccumulator,
  parsePumpfunSharingConfig: () => parsePumpfunSharingConfig,
  parsePumpfunUserVolumeAccumulator: () => parsePumpfunUserVolumeAccumulator,
  parsePumpswapAccount: () => parsePumpswapAccount,
  parsePumpswapGlobalConfig: () => parsePumpswapGlobalConfig,
  parsePumpswapPool: () => parsePumpswapPool,
  parseRaydiumClmmAccount: () => parseRaydiumClmmAccount,
  parseRaydiumClmmAmmConfig: () => parseRaydiumClmmAmmConfig,
  parseRaydiumClmmPoolState: () => parseRaydiumClmmPoolState,
  parseRaydiumClmmTickArrayState: () => parseRaydiumClmmTickArrayState,
  parseRaydiumCpmmAccount: () => parseRaydiumCpmmAccount,
  parseRaydiumCpmmAmmConfig: () => parseRaydiumCpmmAmmConfig,
  parseRaydiumCpmmPoolState: () => parseRaydiumCpmmPoolState,
  parseTokenAccount: () => parseTokenAccount,
  userWalletPubkeyForOnchainAccount: () => userWalletPubkeyForOnchainAccount
});
module.exports = __toCommonJS(mod_exports);

// dist/core/event_filter.js
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

// dist/instr/program_ids.js
var PUMPFUN_PROGRAM_ID = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P";
var PUMPSWAP_PROGRAM_ID = "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA";
var PUMPSWAP_FEES_PROGRAM_ID = "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ";
var PUMP_FEES_PROGRAM_ID = PUMPSWAP_FEES_PROGRAM_ID;
var RAYDIUM_CPMM_PROGRAM_ID = "CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C";
var RAYDIUM_CLMM_PROGRAM_ID = "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK";
var ORCA_WHIRLPOOL_PROGRAM_ID = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc";

// dist/accounts/utils.js
function hasDiscriminator(data, disc) {
  if (data.length < disc.length)
    return false;
  for (let i = 0; i < disc.length; i++) {
    if (data[i] !== disc[i])
      return false;
  }
  return true;
}

// dist/accounts/nonce.js
var import_bs58 = __toESM(require("bs58"), 1);
var NONCE_SIZE = 80;
var NONCE_DISC = Uint8Array.from([1, 0, 0, 0, 1, 0, 0, 0]);
function isNonceAccount(data) {
  return data.length >= 8 && hasDiscriminator(data, NONCE_DISC);
}
function parseNonceAccount(account, metadata) {
  const { data } = account;
  if (account.owner !== "11111111111111111111111111111111" || data.length !== NONCE_SIZE || !isNonceAccount(data))
    return null;
  const authority = import_bs58.default.encode(data.subarray(8, 40));
  const nonce = import_bs58.default.encode(data.subarray(40, 72));
  const ev = {
    metadata,
    pubkey: account.pubkey,
    executable: account.executable,
    lamports: account.lamports,
    owner: account.owner,
    rent_epoch: account.rent_epoch,
    nonce,
    authority
  };
  return { NonceAccount: ev };
}

// dist/util/binary.js
var import_bs582 = __toESM(require("bs58"), 1);
function readU8(u8, o) {
  if (o >= u8.length)
    return null;
  return u8[o];
}
function readU16LE(u8, o) {
  if (o + 2 > u8.length)
    return null;
  const v = new DataView(u8.buffer, u8.byteOffset + o, 2);
  return v.getUint16(0, true);
}
function readU32LE(u8, o) {
  if (o + 4 > u8.length)
    return null;
  const v = new DataView(u8.buffer, u8.byteOffset + o, 4);
  return v.getUint32(0, true);
}
function readU64LE(u8, o) {
  if (o + 8 > u8.length)
    return null;
  const v = new DataView(u8.buffer, u8.byteOffset + o, 8);
  return v.getBigUint64(0, true);
}
function readI64LE(u8, o) {
  if (o + 8 > u8.length)
    return null;
  const v = new DataView(u8.buffer, u8.byteOffset + o, 8);
  return v.getBigInt64(0, true);
}
function readU128LE(u8, o) {
  const lo = readU64LE(u8, o);
  const hi = readU64LE(u8, o + 8);
  if (lo === null || hi === null)
    return null;
  return lo | hi << 64n;
}
function readPubkey(u8, o) {
  if (o + 32 > u8.length)
    return null;
  return import_bs582.default.encode(u8.subarray(o, o + 32));
}

// dist/accounts/token.js
var TOKEN_PROGRAM = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
var TOKEN_2022 = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
var MINT_SIZE = 82;
var SUPPLY_OFF = 36;
var DECIMALS_OFF = 44;
var TOKEN_ACCOUNT_SIZE = 165;
var AMOUNT_OFF = 64;
function isTokenProgramOwner(owner) {
  return owner === TOKEN_PROGRAM || owner === TOKEN_2022;
}
function parseMintFast(account, metadata) {
  const { data } = account;
  if (data.length < MINT_SIZE)
    return null;
  const supply = readU64LE(data, SUPPLY_OFF);
  const decimals = data[DECIMALS_OFF] ?? 0;
  if (supply === null)
    return null;
  const ev = {
    metadata,
    pubkey: account.pubkey,
    executable: account.executable,
    lamports: account.lamports,
    owner: account.owner,
    rent_epoch: account.rent_epoch,
    supply,
    decimals
  };
  return { TokenInfo: ev };
}
function parseTokenFast(account, metadata) {
  const { data } = account;
  if (data.length !== TOKEN_ACCOUNT_SIZE)
    return null;
  const amount = readU64LE(data, AMOUNT_OFF);
  if (amount === null)
    return null;
  const ev = {
    metadata,
    pubkey: account.pubkey,
    executable: account.executable,
    lamports: account.lamports,
    owner: account.owner,
    rent_epoch: account.rent_epoch,
    amount,
    // 快速路径：将 `token_owner` 设为账户 owner（程序 ID）
    token_owner: account.owner
  };
  return { TokenAccount: ev };
}
function parseTokenWithExtensions(account, metadata) {
  const d = account.data;
  if (!isTokenProgramOwner(account.owner) || d.length <= TOKEN_ACCOUNT_SIZE)
    return null;
  const tokenOwner = readPubkey(d, 32);
  const amount = readU64LE(d, AMOUNT_OFF);
  if (tokenOwner === null || amount === null)
    return null;
  const ev = {
    metadata,
    pubkey: account.pubkey,
    executable: account.executable,
    lamports: account.lamports,
    owner: account.owner,
    rent_epoch: account.rent_epoch,
    amount,
    token_owner: tokenOwner
  };
  return { TokenAccount: ev };
}
function parseTokenAccount(account, metadata) {
  if (!isTokenProgramOwner(account.owner))
    return null;
  if (account.data.length <= 100) {
    const m = parseMintFast(account, metadata);
    if (m)
      return m;
  }
  const t = parseTokenFast(account, metadata);
  if (t)
    return t;
  const ext = parseTokenWithExtensions(account, metadata);
  if (ext)
    return ext;
  if (account.data.length >= MINT_SIZE) {
    const m = parseMintFast(account, metadata);
    if (m)
      return m;
  }
  return null;
}

// dist/accounts/pumpswap.js
var GLOBAL_DISC = Uint8Array.from([149, 8, 156, 202, 160, 252, 176, 217]);
var POOL_DISC = Uint8Array.from([241, 154, 109, 4, 17, 177, 109, 188]);
var GLOBAL_BODY = 634;
var POOL_LEGACY_BODY = 244;
var POOL_BOOST_BODY = 253;
var POOL_CREATOR_FEE_BODY = 262;
var POOL_BODY = 263;
function isGlobalConfigAccount(data) {
  return hasDiscriminator(data, GLOBAL_DISC);
}
function isPoolAccount(data) {
  return hasDiscriminator(data, POOL_DISC);
}
function parsePumpswapGlobalConfig(account, metadata) {
  if (account.data.length < 8 + GLOBAL_BODY)
    return null;
  if (!isGlobalConfigAccount(account.data))
    return null;
  const d = account.data.subarray(8);
  let o = 0;
  const admin = readPubkey(d, o);
  if (admin === null)
    return null;
  o += 32;
  const lp_fee_basis_points = readU64LE(d, o);
  if (lp_fee_basis_points === null)
    return null;
  o += 8;
  const protocol_fee_basis_points = readU64LE(d, o);
  if (protocol_fee_basis_points === null)
    return null;
  o += 8;
  const disable_flags = readU8(d, o);
  if (disable_flags === null)
    return null;
  o += 1;
  const protocol_fee_recipients = [];
  for (let i = 0; i < 8; i++) {
    const pk = readPubkey(d, o);
    if (pk === null)
      return null;
    protocol_fee_recipients.push(pk);
    o += 32;
  }
  const coin_creator_fee_basis_points = readU64LE(d, o);
  if (coin_creator_fee_basis_points === null)
    return null;
  o += 8;
  const admin_set_coin_creator_authority = readPubkey(d, o);
  if (admin_set_coin_creator_authority === null)
    return null;
  o += 32;
  const whitelist_pda = readPubkey(d, o);
  if (whitelist_pda === null)
    return null;
  o += 32;
  const reserved_fee_recipient = readPubkey(d, o);
  if (reserved_fee_recipient === null)
    return null;
  o += 32;
  const mayhem_b = readU8(d, o);
  if (mayhem_b === null)
    return null;
  const mayhem_mode_enabled = mayhem_b !== 0;
  o += 1;
  const reserved_fee_recipients = [];
  for (let i = 0; i < 7; i++) {
    const pk = readPubkey(d, o);
    if (pk === null)
      return null;
    reserved_fee_recipients.push(pk);
    o += 32;
  }
  const global_config = {
    admin,
    lp_fee_basis_points,
    protocol_fee_basis_points,
    disable_flags,
    protocol_fee_recipients,
    coin_creator_fee_basis_points,
    admin_set_coin_creator_authority,
    whitelist_pda,
    reserved_fee_recipient,
    mayhem_mode_enabled,
    reserved_fee_recipients
  };
  const ev = {
    metadata,
    pubkey: account.pubkey,
    executable: account.executable,
    lamports: account.lamports,
    owner: account.owner,
    rent_epoch: account.rent_epoch,
    global_config
  };
  return { PumpSwapGlobalConfigAccount: ev };
}
function parsePumpswapPool(account, metadata) {
  if (account.data.length < 8 + POOL_LEGACY_BODY)
    return null;
  const bodyLength = account.data.length - 8;
  if (bodyLength !== POOL_LEGACY_BODY && bodyLength !== POOL_BOOST_BODY && bodyLength !== POOL_CREATOR_FEE_BODY && bodyLength < POOL_BODY) {
    return null;
  }
  if (!isPoolAccount(account.data))
    return null;
  const d = account.data.subarray(8);
  let o = 0;
  const pool_bump = readU8(d, o);
  if (pool_bump === null)
    return null;
  o += 1;
  const index = readU16LE(d, o);
  if (index === null)
    return null;
  o += 2;
  const creator = readPubkey(d, o);
  if (creator === null)
    return null;
  o += 32;
  const base_mint = readPubkey(d, o);
  if (base_mint === null)
    return null;
  o += 32;
  const quote_mint = readPubkey(d, o);
  if (quote_mint === null)
    return null;
  o += 32;
  const lp_mint = readPubkey(d, o);
  if (lp_mint === null)
    return null;
  o += 32;
  const pool_base_token_account = readPubkey(d, o);
  if (pool_base_token_account === null)
    return null;
  o += 32;
  const pool_quote_token_account = readPubkey(d, o);
  if (pool_quote_token_account === null)
    return null;
  o += 32;
  const lp_supply = readU64LE(d, o);
  if (lp_supply === null)
    return null;
  o += 8;
  const coin_creator = readPubkey(d, o);
  if (coin_creator === null)
    return null;
  o += 32;
  const mayhem = readU8(d, o);
  if (mayhem === null)
    return null;
  o += 1;
  const cashback = readU8(d, o);
  if (cashback === null)
    return null;
  o += 1;
  let virtual_quote_reserves = 0n;
  if (d.length >= POOL_BOOST_BODY) {
    const virtual = readU128LE(d, o);
    if (virtual === null)
      return null;
    virtual_quote_reserves = BigInt.asIntN(128, virtual);
  }
  o += 16;
  const creator_fee_bps = readU64LE(d, o) ?? 0n;
  o += 8;
  const can_edit_creator_fee = (readU8(d, o) ?? 0) !== 0;
  o += 1;
  const is_holder_reward = (readU8(d, o) ?? 0) !== 0;
  const pool = {
    pool_bump,
    index,
    creator,
    base_mint,
    quote_mint,
    lp_mint,
    pool_base_token_account,
    pool_quote_token_account,
    lp_supply,
    coin_creator,
    is_mayhem_mode: mayhem !== 0,
    is_cashback_coin: cashback !== 0,
    virtual_quote_reserves,
    creator_fee_bps,
    can_edit_creator_fee,
    is_holder_reward
  };
  const ev = {
    metadata,
    pubkey: account.pubkey,
    executable: account.executable,
    lamports: account.lamports,
    owner: account.owner,
    rent_epoch: account.rent_epoch,
    pool
  };
  return { PumpSwapPoolAccount: ev };
}
function parsePumpswapAccount(account, metadata) {
  if (account.owner !== PUMPSWAP_PROGRAM_ID)
    return null;
  if (isGlobalConfigAccount(account.data))
    return parsePumpswapGlobalConfig(account, metadata);
  if (isPoolAccount(account.data))
    return parsePumpswapPool(account, metadata);
  return null;
}

// dist/accounts/pumpfun.js
var GLOBAL_DISC2 = Uint8Array.from([167, 232, 232, 177, 200, 108, 114, 127]);
var GLOBAL_BODY2 = 1037;
var BONDING_CURVE_DISC = Uint8Array.from([23, 183, 248, 55, 96, 216, 172, 96]);
var BONDING_CURVE_BODY = 107;
var BONDING_CURVE_CREATOR_FEE_BODY = 116;
var BONDING_CURVE_HOLDER_REWARD_BODY = 117;
var FEE_CONFIG_DISC = Uint8Array.from([143, 52, 146, 187, 219, 123, 76, 155]);
var GLOBAL_VOLUME_ACCUMULATOR_DISC = Uint8Array.from([202, 42, 246, 43, 142, 190, 30, 255]);
var SHARING_CONFIG_DISC = Uint8Array.from([216, 74, 9, 0, 56, 140, 93, 75]);
var USER_VOLUME_ACCUMULATOR_DISC = Uint8Array.from([86, 255, 112, 14, 102, 53, 154, 250]);
var MAX_FEE_TIERS = 64;
var MAX_SHAREHOLDERS = 64;
function isPumpfunGlobalAccount(data) {
  return hasDiscriminator(data, GLOBAL_DISC2);
}
function isPumpfunBondingCurveAccount(data) {
  return hasDiscriminator(data, BONDING_CURVE_DISC);
}
function isPumpfunFeeConfigAccount(data) {
  return hasDiscriminator(data, FEE_CONFIG_DISC);
}
function isPumpfunSharingConfigAccount(data) {
  return hasDiscriminator(data, SHARING_CONFIG_DISC);
}
function isPumpfunGlobalVolumeAccumulatorAccount(data) {
  return hasDiscriminator(data, GLOBAL_VOLUME_ACCUMULATOR_DISC);
}
function isPumpfunUserVolumeAccumulatorAccount(data) {
  return hasDiscriminator(data, USER_VOLUME_ACCUMULATOR_DISC);
}
function readPubkeyArray(data, offset, len) {
  const value = [];
  let o = offset;
  for (let i = 0; i < len; i++) {
    const pubkey = readPubkey(data, o);
    if (pubkey === null)
      return null;
    value.push(pubkey);
    o += 32;
  }
  return { value, next: o };
}
function readFees(data, offset) {
  const lp_fee_bps = readU64LE(data, offset);
  const protocol_fee_bps = readU64LE(data, offset + 8);
  const creator_fee_bps = readU64LE(data, offset + 16);
  if (lp_fee_bps === null || protocol_fee_bps === null || creator_fee_bps === null)
    return null;
  return { value: { lp_fee_bps, protocol_fee_bps, creator_fee_bps }, next: offset + 24 };
}
function readFeeTiers(data, offset) {
  const len = readU32LE(data, offset);
  if (len === null || len > MAX_FEE_TIERS)
    return null;
  let o = offset + 4;
  const value = [];
  for (let i = 0; i < len; i++) {
    const market_cap_lamports_threshold = readU128LE(data, o);
    if (market_cap_lamports_threshold === null)
      return null;
    o += 16;
    const fees = readFees(data, o);
    if (fees === null)
      return null;
    o = fees.next;
    value.push({ market_cap_lamports_threshold, fees: fees.value });
  }
  return { value, next: o };
}
function readShareholders(data, offset) {
  const len = readU32LE(data, offset);
  if (len === null || len > MAX_SHAREHOLDERS)
    return null;
  let o = offset + 4;
  const value = [];
  for (let i = 0; i < len; i++) {
    const address = readPubkey(data, o);
    if (address === null)
      return null;
    o += 32;
    const share_bps = readU16LE(data, o);
    if (share_bps === null)
      return null;
    o += 2;
    value.push({ address, share_bps });
  }
  return { value, next: o };
}
function parsePumpfunGlobal(account, metadata) {
  if (account.data.length < 8 + GLOBAL_BODY2)
    return null;
  if (!isPumpfunGlobalAccount(account.data))
    return null;
  const d = account.data.subarray(8);
  let o = 0;
  const initializedByte = readU8(d, o);
  if (initializedByte === null)
    return null;
  const initialized = initializedByte !== 0;
  o += 1;
  const authority = readPubkey(d, o);
  if (authority === null)
    return null;
  o += 32;
  const fee_recipient = readPubkey(d, o);
  if (fee_recipient === null)
    return null;
  o += 32;
  const initial_virtual_token_reserves = readU64LE(d, o);
  if (initial_virtual_token_reserves === null)
    return null;
  o += 8;
  const initial_virtual_sol_reserves = readU64LE(d, o);
  if (initial_virtual_sol_reserves === null)
    return null;
  o += 8;
  const initial_real_token_reserves = readU64LE(d, o);
  if (initial_real_token_reserves === null)
    return null;
  o += 8;
  const token_total_supply = readU64LE(d, o);
  if (token_total_supply === null)
    return null;
  o += 8;
  const fee_basis_points = readU64LE(d, o);
  if (fee_basis_points === null)
    return null;
  o += 8;
  const withdraw_authority = readPubkey(d, o);
  if (withdraw_authority === null)
    return null;
  o += 32;
  const enableMigrateByte = readU8(d, o);
  if (enableMigrateByte === null)
    return null;
  const enable_migrate = enableMigrateByte !== 0;
  o += 1;
  const pool_migration_fee = readU64LE(d, o);
  if (pool_migration_fee === null)
    return null;
  o += 8;
  const creator_fee_basis_points = readU64LE(d, o);
  if (creator_fee_basis_points === null)
    return null;
  o += 8;
  const feeRecipients = readPubkeyArray(d, o, 7);
  if (feeRecipients === null)
    return null;
  const fee_recipients = feeRecipients.value;
  o = feeRecipients.next;
  const set_creator_authority = readPubkey(d, o);
  if (set_creator_authority === null)
    return null;
  o += 32;
  const admin_set_creator_authority = readPubkey(d, o);
  if (admin_set_creator_authority === null)
    return null;
  o += 32;
  const createV2EnabledByte = readU8(d, o);
  if (createV2EnabledByte === null)
    return null;
  const create_v2_enabled = createV2EnabledByte !== 0;
  o += 1;
  const whitelist_pda = readPubkey(d, o);
  if (whitelist_pda === null)
    return null;
  o += 32;
  const reserved_fee_recipient = readPubkey(d, o);
  if (reserved_fee_recipient === null)
    return null;
  o += 32;
  const mayhemModeEnabledByte = readU8(d, o);
  if (mayhemModeEnabledByte === null)
    return null;
  const mayhem_mode_enabled = mayhemModeEnabledByte !== 0;
  o += 1;
  const reservedFeeRecipients = readPubkeyArray(d, o, 7);
  if (reservedFeeRecipients === null)
    return null;
  const reserved_fee_recipients = reservedFeeRecipients.value;
  o = reservedFeeRecipients.next;
  const cashbackEnabledByte = readU8(d, o);
  if (cashbackEnabledByte === null)
    return null;
  const is_cashback_enabled = cashbackEnabledByte !== 0;
  o += 1;
  const buybackFeeRecipients = readPubkeyArray(d, o, 8);
  if (buybackFeeRecipients === null)
    return null;
  const buyback_fee_recipients = buybackFeeRecipients.value;
  o = buybackFeeRecipients.next;
  const buyback_basis_points = readU64LE(d, o);
  if (buyback_basis_points === null)
    return null;
  o += 8;
  const initial_virtual_quote_reserves = readU64LE(d, o);
  if (initial_virtual_quote_reserves === null)
    return null;
  o += 8;
  const whitelistedQuoteMints = readPubkeyArray(d, o, 1);
  if (whitelistedQuoteMints === null)
    return null;
  const whitelisted_quote_mints = whitelistedQuoteMints.value;
  const global = {
    initialized,
    authority,
    fee_recipient,
    initial_virtual_token_reserves,
    initial_virtual_sol_reserves,
    initial_real_token_reserves,
    token_total_supply,
    fee_basis_points,
    withdraw_authority,
    enable_migrate,
    pool_migration_fee,
    creator_fee_basis_points,
    fee_recipients,
    set_creator_authority,
    admin_set_creator_authority,
    create_v2_enabled,
    whitelist_pda,
    reserved_fee_recipient,
    mayhem_mode_enabled,
    reserved_fee_recipients,
    is_cashback_enabled,
    buyback_fee_recipients,
    buyback_basis_points,
    initial_virtual_quote_reserves,
    whitelisted_quote_mints
  };
  const ev = { metadata, pubkey: account.pubkey, global };
  return { PumpFunGlobalAccount: ev };
}
function parsePumpfunBondingCurve(account, metadata) {
  if (account.data.length < 8 + BONDING_CURVE_BODY)
    return null;
  const bodyLength = account.data.length - 8;
  if (bodyLength !== BONDING_CURVE_BODY && bodyLength !== BONDING_CURVE_CREATOR_FEE_BODY && bodyLength < BONDING_CURVE_HOLDER_REWARD_BODY) {
    return null;
  }
  if (!isPumpfunBondingCurveAccount(account.data))
    return null;
  const d = account.data.subarray(8);
  let o = 0;
  const virtual_token_reserves = readU64LE(d, o);
  if (virtual_token_reserves === null)
    return null;
  o += 8;
  const virtual_quote_reserves = readU64LE(d, o);
  if (virtual_quote_reserves === null)
    return null;
  o += 8;
  const real_token_reserves = readU64LE(d, o);
  if (real_token_reserves === null)
    return null;
  o += 8;
  const real_quote_reserves = readU64LE(d, o);
  if (real_quote_reserves === null)
    return null;
  o += 8;
  const token_total_supply = readU64LE(d, o);
  if (token_total_supply === null)
    return null;
  o += 8;
  const completeByte = readU8(d, o);
  if (completeByte === null)
    return null;
  const complete = completeByte !== 0;
  o += 1;
  const creator = readPubkey(d, o);
  if (creator === null)
    return null;
  o += 32;
  const mayhemModeByte = readU8(d, o);
  if (mayhemModeByte === null)
    return null;
  const is_mayhem_mode = mayhemModeByte !== 0;
  o += 1;
  const cashbackCoinByte = readU8(d, o);
  if (cashbackCoinByte === null)
    return null;
  const is_cashback_coin = cashbackCoinByte !== 0;
  o += 1;
  const quote_mint = readPubkey(d, o);
  if (quote_mint === null)
    return null;
  o += 32;
  const creator_fee_bps = readU64LE(d, o) ?? 0n;
  o += 8;
  const can_edit_creator_fee = (readU8(d, o) ?? 0) !== 0;
  o += 1;
  const is_holder_reward = (readU8(d, o) ?? 0) !== 0;
  const bonding_curve = {
    virtual_token_reserves,
    virtual_quote_reserves,
    real_token_reserves,
    real_quote_reserves,
    token_total_supply,
    complete,
    creator,
    is_mayhem_mode,
    is_cashback_coin,
    quote_mint,
    creator_fee_bps,
    can_edit_creator_fee,
    is_holder_reward
  };
  const ev = {
    metadata,
    pubkey: account.pubkey,
    bonding_curve
  };
  return { PumpFunBondingCurveAccount: ev };
}
function parsePumpfunFeeConfig(account, metadata) {
  if (!isPumpfunFeeConfigAccount(account.data))
    return null;
  const d = account.data.subarray(8);
  let o = 0;
  const bump = readU8(d, o);
  if (bump === null)
    return null;
  o += 1;
  const admin = readPubkey(d, o);
  if (admin === null)
    return null;
  o += 32;
  const flatFees = readFees(d, o);
  if (flatFees === null)
    return null;
  o = flatFees.next;
  const feeTiers = readFeeTiers(d, o);
  if (feeTiers === null)
    return null;
  o = feeTiers.next;
  const stableFeeTiers = readFeeTiers(d, o);
  if (stableFeeTiers === null)
    return null;
  const fee_config = {
    bump,
    admin,
    flat_fees: flatFees.value,
    fee_tiers: feeTiers.value,
    stable_fee_tiers: stableFeeTiers.value
  };
  const ev = { metadata, pubkey: account.pubkey, fee_config };
  return { PumpFunFeeConfigAccount: ev };
}
function parsePumpfunSharingConfig(account, metadata) {
  if (!isPumpfunSharingConfigAccount(account.data))
    return null;
  const d = account.data.subarray(8);
  let o = 0;
  const bump = readU8(d, o);
  if (bump === null)
    return null;
  o += 1;
  const version = readU8(d, o);
  if (version === null)
    return null;
  o += 1;
  const statusByte = readU8(d, o);
  if (statusByte === null || statusByte > 1)
    return null;
  const status = statusByte === 0 ? "Paused" : "Active";
  o += 1;
  const mint = readPubkey(d, o);
  if (mint === null)
    return null;
  o += 32;
  const admin = readPubkey(d, o);
  if (admin === null)
    return null;
  o += 32;
  const adminRevokedByte = readU8(d, o);
  if (adminRevokedByte === null)
    return null;
  const admin_revoked = adminRevokedByte !== 0;
  o += 1;
  const shareholders = readShareholders(d, o);
  if (shareholders === null)
    return null;
  const sharing_config = {
    bump,
    version,
    status,
    mint,
    admin,
    admin_revoked,
    shareholders: shareholders.value
  };
  const ev = { metadata, pubkey: account.pubkey, sharing_config };
  return { PumpFunSharingConfigAccount: ev };
}
function parsePumpfunGlobalVolumeAccumulator(account, metadata) {
  if (!isPumpfunGlobalVolumeAccumulatorAccount(account.data))
    return null;
  const d = account.data.subarray(8);
  let o = 0;
  const start_time = readI64LE(d, o);
  if (start_time === null)
    return null;
  o += 8;
  const end_time = readI64LE(d, o);
  if (end_time === null)
    return null;
  o += 8;
  const seconds_in_a_day = readI64LE(d, o);
  if (seconds_in_a_day === null)
    return null;
  o += 8;
  const mint = readPubkey(d, o);
  if (mint === null)
    return null;
  o += 32;
  const total_token_supply = [];
  for (let i = 0; i < 30; i++) {
    const value = readU64LE(d, o);
    if (value === null)
      return null;
    o += 8;
    total_token_supply.push(value);
  }
  const sol_volumes = [];
  for (let i = 0; i < 30; i++) {
    const value = readU64LE(d, o);
    if (value === null)
      return null;
    o += 8;
    sol_volumes.push(value);
  }
  const global_volume_accumulator = {
    start_time,
    end_time,
    seconds_in_a_day,
    mint,
    total_token_supply,
    sol_volumes
  };
  const ev = {
    metadata,
    pubkey: account.pubkey,
    global_volume_accumulator
  };
  return { PumpFunGlobalVolumeAccumulatorAccount: ev };
}
function parsePumpfunUserVolumeAccumulator(account, metadata) {
  if (!isPumpfunUserVolumeAccumulatorAccount(account.data))
    return null;
  const d = account.data.subarray(8);
  let o = 0;
  const user = readPubkey(d, o);
  if (user === null)
    return null;
  o += 32;
  const needsClaimByte = readU8(d, o);
  if (needsClaimByte === null)
    return null;
  const needs_claim = needsClaimByte !== 0;
  o += 1;
  const total_unclaimed_tokens = readU64LE(d, o);
  if (total_unclaimed_tokens === null)
    return null;
  o += 8;
  const total_claimed_tokens = readU64LE(d, o);
  if (total_claimed_tokens === null)
    return null;
  o += 8;
  const current_sol_volume = readU64LE(d, o);
  if (current_sol_volume === null)
    return null;
  o += 8;
  const last_update_timestamp = readI64LE(d, o);
  if (last_update_timestamp === null)
    return null;
  o += 8;
  const hasTotalClaimedTokensByte = readU8(d, o);
  if (hasTotalClaimedTokensByte === null)
    return null;
  const has_total_claimed_tokens = hasTotalClaimedTokensByte !== 0;
  o += 1;
  const cashback_earned = readU64LE(d, o);
  if (cashback_earned === null)
    return null;
  o += 8;
  const total_cashback_claimed = readU64LE(d, o);
  if (total_cashback_claimed === null)
    return null;
  o += 8;
  const stable_cashback_earned = readU64LE(d, o);
  if (stable_cashback_earned === null)
    return null;
  o += 8;
  const total_stable_cashback_claimed = readU64LE(d, o);
  if (total_stable_cashback_claimed === null)
    return null;
  const user_volume_accumulator = {
    user,
    needs_claim,
    total_unclaimed_tokens,
    total_claimed_tokens,
    current_sol_volume,
    last_update_timestamp,
    has_total_claimed_tokens,
    cashback_earned,
    total_cashback_claimed,
    stable_cashback_earned,
    total_stable_cashback_claimed
  };
  const ev = {
    metadata,
    pubkey: account.pubkey,
    user_volume_accumulator
  };
  return { PumpFunUserVolumeAccumulatorAccount: ev };
}
function parsePumpfunAccount(account, metadata) {
  if (account.owner !== PUMPFUN_PROGRAM_ID && account.owner !== PUMP_FEES_PROGRAM_ID)
    return null;
  if (isPumpfunFeeConfigAccount(account.data))
    return parsePumpfunFeeConfig(account, metadata);
  if (isPumpfunSharingConfigAccount(account.data))
    return parsePumpfunSharingConfig(account, metadata);
  if (isPumpfunGlobalVolumeAccumulatorAccount(account.data)) {
    return parsePumpfunGlobalVolumeAccumulator(account, metadata);
  }
  if (isPumpfunUserVolumeAccumulatorAccount(account.data)) {
    return parsePumpfunUserVolumeAccumulator(account, metadata);
  }
  if (isPumpfunBondingCurveAccount(account.data))
    return parsePumpfunBondingCurve(account, metadata);
  if (isPumpfunGlobalAccount(account.data))
    return parsePumpfunGlobal(account, metadata);
  return null;
}

// dist/accounts/raydium_orca.js
var import_bs583 = __toESM(require("bs58"), 1);
var CLMM_AMM_CONFIG_DISC = Uint8Array.from([218, 244, 33, 104, 203, 203, 43, 111]);
var CLMM_POOL_STATE_DISC = Uint8Array.from([247, 237, 227, 245, 215, 195, 222, 70]);
var CLMM_TICK_ARRAY_STATE_DISC = Uint8Array.from([192, 155, 85, 205, 49, 249, 129, 42]);
var CLMM_AMM_CONFIG_BODY = 109;
var CLMM_POOL_STATE_BODY = 1536;
var CLMM_TICK_ARRAY_STATE_BODY = 10232;
var CLMM_TICK_ARRAY_LEN = 60;
var CPMM_AMM_CONFIG_DISC = CLMM_AMM_CONFIG_DISC;
var CPMM_POOL_STATE_DISC = CLMM_POOL_STATE_DISC;
var CPMM_AMM_CONFIG_BODY = 228;
var CPMM_POOL_STATE_BODY = 629;
var ORCA_WHIRLPOOL_DISC = Uint8Array.from([63, 149, 209, 12, 225, 128, 99, 9]);
var ORCA_POSITION_DISC = Uint8Array.from([170, 188, 143, 228, 122, 64, 247, 208]);
var ORCA_TICK_ARRAY_DISC = Uint8Array.from([69, 97, 189, 190, 110, 7, 66, 187]);
var ORCA_FEE_TIER_DISC = Uint8Array.from([56, 75, 159, 76, 142, 68, 190, 105]);
var ORCA_WHIRLPOOLS_CONFIG_DISC = Uint8Array.from([157, 20, 49, 224, 217, 87, 193, 254]);
var ORCA_WHIRLPOOL_BODY = 645;
var ORCA_POSITION_BODY = 208;
var ORCA_TICK_ARRAY_BODY = 9980;
var ORCA_FEE_TIER_BODY = 36;
var ORCA_WHIRLPOOLS_CONFIG_BODY = 98;
var ORCA_TICK_ARRAY_LEN = 88;
var U128_SIGN_BIT = 1n << 127n;
var U128_MOD = 1n << 128n;
var Reader = class {
  data;
  offset = 0;
  view;
  constructor(data) {
    this.data = data;
    this.view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  }
  require(size) {
    if (this.offset + size > this.data.length) {
      throw new RangeError("account data is truncated");
    }
    const start = this.offset;
    this.offset += size;
    return start;
  }
  u8() {
    return this.view.getUint8(this.require(1));
  }
  bool() {
    return this.u8() !== 0;
  }
  u16() {
    return this.view.getUint16(this.require(2), true);
  }
  u32() {
    return this.view.getUint32(this.require(4), true);
  }
  i32() {
    return this.view.getInt32(this.require(4), true);
  }
  u64() {
    return this.view.getBigUint64(this.require(8), true);
  }
  u128() {
    const lo = this.u64();
    const hi = this.u64();
    return lo | hi << 64n;
  }
  i128() {
    const value = this.u128();
    return value >= U128_SIGN_BIT ? value - U128_MOD : value;
  }
  pubkey() {
    const start = this.require(32);
    return import_bs583.default.encode(this.data.subarray(start, start + 32));
  }
  bytes(len) {
    const start = this.require(len);
    return Array.from(this.data.subarray(start, start + len));
  }
};
function readArray(len, read) {
  const out = new Array(len);
  for (let i = 0; i < len; i++)
    out[i] = read();
  return out;
}
function parseBody(data, parse) {
  try {
    return parse(new Reader(data));
  } catch {
    return null;
  }
}
function bodyAfterDiscriminator(account, disc, bodySize) {
  if (account.data.length < 8 + bodySize || !hasDiscriminator(account.data, disc))
    return null;
  return account.data.subarray(8);
}
function isRaydiumClmmAmmConfigAccount(data) {
  return hasDiscriminator(data, CLMM_AMM_CONFIG_DISC);
}
function isRaydiumClmmPoolStateAccount(data) {
  return hasDiscriminator(data, CLMM_POOL_STATE_DISC);
}
function isRaydiumClmmTickArrayStateAccount(data) {
  return hasDiscriminator(data, CLMM_TICK_ARRAY_STATE_DISC);
}
function isRaydiumCpmmAmmConfigAccount(data) {
  return hasDiscriminator(data, CPMM_AMM_CONFIG_DISC);
}
function isRaydiumCpmmPoolStateAccount(data) {
  return hasDiscriminator(data, CPMM_POOL_STATE_DISC);
}
function isOrcaWhirlpoolAccount(data) {
  return hasDiscriminator(data, ORCA_WHIRLPOOL_DISC);
}
function isOrcaPositionAccount(data) {
  return hasDiscriminator(data, ORCA_POSITION_DISC);
}
function isOrcaTickArrayAccount(data) {
  return hasDiscriminator(data, ORCA_TICK_ARRAY_DISC);
}
function isOrcaFeeTierAccount(data) {
  return hasDiscriminator(data, ORCA_FEE_TIER_DISC);
}
function isOrcaWhirlpoolsConfigAccount(data) {
  return hasDiscriminator(data, ORCA_WHIRLPOOLS_CONFIG_DISC);
}
function parseRaydiumClmmAccount(account, metadata) {
  if (account.owner !== RAYDIUM_CLMM_PROGRAM_ID)
    return null;
  return parseRaydiumClmmAmmConfig(account, metadata) ?? parseRaydiumClmmPoolState(account, metadata) ?? parseRaydiumClmmTickArrayState(account, metadata);
}
function parseRaydiumCpmmAccount(account, metadata) {
  if (account.owner !== RAYDIUM_CPMM_PROGRAM_ID)
    return null;
  return parseRaydiumCpmmAmmConfig(account, metadata) ?? parseRaydiumCpmmPoolState(account, metadata);
}
function parseOrcaWhirlpoolAccount(account, metadata) {
  if (account.owner !== ORCA_WHIRLPOOL_PROGRAM_ID)
    return null;
  return parseOrcaWhirlpool(account, metadata) ?? parseOrcaPosition(account, metadata) ?? parseOrcaTickArray(account, metadata) ?? parseOrcaFeeTier(account, metadata) ?? parseOrcaWhirlpoolsConfig(account, metadata);
}
function parseRaydiumClmmAmmConfig(account, metadata) {
  const body = bodyAfterDiscriminator(account, CLMM_AMM_CONFIG_DISC, CLMM_AMM_CONFIG_BODY);
  if (!body)
    return null;
  const amm_config = parseBody(body, (r) => ({
    bump: r.u8(),
    index: r.u16(),
    owner: r.pubkey(),
    protocol_fee_rate: r.u32(),
    trade_fee_rate: r.u32(),
    tick_spacing: r.u16(),
    fund_fee_rate: r.u32(),
    padding_u32: r.u32(),
    fund_owner: r.pubkey(),
    padding: readArray(3, () => r.u64())
  }));
  return amm_config ? { RaydiumClmmAmmConfigAccount: { metadata, pubkey: account.pubkey, amm_config } } : null;
}
function parseRaydiumClmmPoolState(account, metadata) {
  const body = bodyAfterDiscriminator(account, CLMM_POOL_STATE_DISC, CLMM_POOL_STATE_BODY);
  if (!body)
    return null;
  const pool_state = parseBody(body, (r) => ({
    bump: [r.u8()],
    amm_config: r.pubkey(),
    owner: r.pubkey(),
    token_mint_0: r.pubkey(),
    token_mint_1: r.pubkey(),
    token_vault_0: r.pubkey(),
    token_vault_1: r.pubkey(),
    observation_key: r.pubkey(),
    mint_decimals_0: r.u8(),
    mint_decimals_1: r.u8(),
    tick_spacing: r.u16(),
    liquidity: r.u128(),
    sqrt_price_x64: r.u128(),
    tick_current: r.i32(),
    padding3: r.u16(),
    padding4: r.u16(),
    fee_growth_global_0_x64: r.u128(),
    fee_growth_global_1_x64: r.u128(),
    protocol_fees_token_0: r.u64(),
    protocol_fees_token_1: r.u64(),
    padding5: readArray(4, () => r.u128()),
    status: r.u8(),
    fee_on: r.u8(),
    padding: r.bytes(6),
    reward_infos: readArray(3, () => readClmmRewardInfo(r)),
    tick_array_bitmap: readArray(16, () => r.u64()),
    padding6: readArray(4, () => r.u64()),
    fund_fees_token_0: r.u64(),
    fund_fees_token_1: r.u64(),
    open_time: r.u64(),
    recent_epoch: r.u64(),
    dynamic_fee_info: readClmmDynamicFeeInfo(r),
    padding1: readArray(14, () => r.u64()),
    padding2: readArray(32, () => r.u64())
  }));
  return pool_state ? { RaydiumClmmPoolStateAccount: { metadata, pubkey: account.pubkey, pool_state } } : null;
}
function parseRaydiumClmmTickArrayState(account, metadata) {
  const body = bodyAfterDiscriminator(account, CLMM_TICK_ARRAY_STATE_DISC, CLMM_TICK_ARRAY_STATE_BODY);
  if (!body)
    return null;
  const tick_array_state = parseBody(body, (r) => ({
    pool_id: r.pubkey(),
    start_tick_index: r.i32(),
    ticks: readArray(CLMM_TICK_ARRAY_LEN, () => readClmmTick(r)),
    initialized_tick_count: r.u8(),
    recent_epoch: r.u64(),
    padding: r.bytes(107)
  }));
  return tick_array_state ? { RaydiumClmmTickArrayStateAccount: { metadata, pubkey: account.pubkey, tick_array_state } } : null;
}
function readClmmRewardInfo(r) {
  return {
    reward_state: r.u8(),
    open_time: r.u64(),
    end_time: r.u64(),
    last_update_time: r.u64(),
    emissions_per_second_x64: r.u128(),
    reward_total_emitted: r.u64(),
    reward_claimed: r.u64(),
    token_mint: r.pubkey(),
    token_vault: r.pubkey(),
    authority: r.pubkey(),
    reward_growth_global_x64: r.u128()
  };
}
function readClmmDynamicFeeInfo(r) {
  return {
    filter_period: r.u16(),
    decay_period: r.u16(),
    reduction_factor: r.u16(),
    dynamic_fee_control: r.u32(),
    max_volatility_accumulator: r.u32(),
    tick_spacing_index_reference: r.i32(),
    volatility_reference: r.u32(),
    volatility_accumulator: r.u32(),
    last_update_timestamp: r.u64(),
    padding: r.bytes(46)
  };
}
function readClmmTick(r) {
  return {
    tick: r.i32(),
    liquidity_net: r.i128(),
    liquidity_gross: r.u128(),
    fee_growth_outside_0_x64: r.u128(),
    fee_growth_outside_1_x64: r.u128(),
    reward_growths_outside_x64: readArray(3, () => r.u128()),
    order_phase: r.u64(),
    orders_amount: r.u64(),
    part_filled_orders_remaining: r.u64(),
    unfilled_ratio_x64: r.u128(),
    padding: readArray(3, () => r.u32())
  };
}
function parseRaydiumCpmmAmmConfig(account, metadata) {
  const body = bodyAfterDiscriminator(account, CPMM_AMM_CONFIG_DISC, CPMM_AMM_CONFIG_BODY);
  if (!body)
    return null;
  const amm_config = parseBody(body, (r) => ({
    bump: r.u8(),
    disable_create_pool: r.bool(),
    index: r.u16(),
    trade_fee_rate: r.u64(),
    protocol_fee_rate: r.u64(),
    fund_fee_rate: r.u64(),
    create_pool_fee: r.u64(),
    protocol_owner: r.pubkey(),
    fund_owner: r.pubkey(),
    creator_fee_rate: r.u64(),
    padding: readArray(15, () => r.u64())
  }));
  return amm_config ? { RaydiumCpmmAmmConfigAccount: { metadata, pubkey: account.pubkey, amm_config } } : null;
}
function parseRaydiumCpmmPoolState(account, metadata) {
  const body = bodyAfterDiscriminator(account, CPMM_POOL_STATE_DISC, CPMM_POOL_STATE_BODY);
  if (!body)
    return null;
  const pool_state = parseBody(body, (r) => ({
    amm_config: r.pubkey(),
    pool_creator: r.pubkey(),
    token_0_vault: r.pubkey(),
    token_1_vault: r.pubkey(),
    lp_mint: r.pubkey(),
    token_0_mint: r.pubkey(),
    token_1_mint: r.pubkey(),
    token_0_program: r.pubkey(),
    token_1_program: r.pubkey(),
    observation_key: r.pubkey(),
    auth_bump: r.u8(),
    status: r.u8(),
    lp_mint_decimals: r.u8(),
    mint_0_decimals: r.u8(),
    mint_1_decimals: r.u8(),
    lp_supply: r.u64(),
    protocol_fees_token_0: r.u64(),
    protocol_fees_token_1: r.u64(),
    fund_fees_token_0: r.u64(),
    fund_fees_token_1: r.u64(),
    open_time: r.u64(),
    recent_epoch: r.u64(),
    creator_fee_on: r.u8(),
    enable_creator_fee: r.bool(),
    padding1: r.bytes(6),
    creator_fees_token_0: r.u64(),
    creator_fees_token_1: r.u64(),
    padding: readArray(28, () => r.u64())
  }));
  return pool_state ? { RaydiumCpmmPoolStateAccount: { metadata, pubkey: account.pubkey, pool_state } } : null;
}
function parseOrcaWhirlpool(account, metadata) {
  const body = bodyAfterDiscriminator(account, ORCA_WHIRLPOOL_DISC, ORCA_WHIRLPOOL_BODY);
  if (!body)
    return null;
  const whirlpool = parseBody(body, (r) => ({
    whirlpools_config: r.pubkey(),
    whirlpool_bump: r.u8(),
    tick_spacing: r.u16(),
    tick_spacing_seed: r.bytes(2),
    fee_rate: r.u16(),
    protocol_fee_rate: r.u16(),
    liquidity: r.u128(),
    sqrt_price: r.u128(),
    tick_current_index: r.i32(),
    protocol_fee_owed_a: r.u64(),
    protocol_fee_owed_b: r.u64(),
    token_mint_a: r.pubkey(),
    token_vault_a: r.pubkey(),
    fee_growth_global_a: r.u128(),
    token_mint_b: r.pubkey(),
    token_vault_b: r.pubkey(),
    fee_growth_global_b: r.u128(),
    reward_last_updated_timestamp: r.u64(),
    reward_infos: readArray(3, () => readOrcaWhirlpoolRewardInfo(r))
  }));
  return whirlpool ? { OrcaWhirlpoolAccount: { metadata, pubkey: account.pubkey, whirlpool } } : null;
}
function parseOrcaPosition(account, metadata) {
  const body = bodyAfterDiscriminator(account, ORCA_POSITION_DISC, ORCA_POSITION_BODY);
  if (!body)
    return null;
  const position = parseBody(body, (r) => ({
    whirlpool: r.pubkey(),
    position_mint: r.pubkey(),
    liquidity: r.u128(),
    tick_lower_index: r.i32(),
    tick_upper_index: r.i32(),
    fee_growth_checkpoint_a: r.u128(),
    fee_owed_a: r.u64(),
    fee_growth_checkpoint_b: r.u128(),
    fee_owed_b: r.u64(),
    reward_infos: readArray(3, () => readOrcaPositionRewardInfo(r))
  }));
  return position ? { OrcaPositionAccount: { metadata, pubkey: account.pubkey, position } } : null;
}
function parseOrcaTickArray(account, metadata) {
  const body = bodyAfterDiscriminator(account, ORCA_TICK_ARRAY_DISC, ORCA_TICK_ARRAY_BODY);
  if (!body)
    return null;
  const tick_array = parseBody(body, (r) => ({
    start_tick_index: r.i32(),
    ticks: readArray(ORCA_TICK_ARRAY_LEN, () => readOrcaTick(r)),
    whirlpool: r.pubkey()
  }));
  return tick_array ? { OrcaTickArrayAccount: { metadata, pubkey: account.pubkey, tick_array } } : null;
}
function parseOrcaFeeTier(account, metadata) {
  const body = bodyAfterDiscriminator(account, ORCA_FEE_TIER_DISC, ORCA_FEE_TIER_BODY);
  if (!body)
    return null;
  const fee_tier = parseBody(body, (r) => ({
    whirlpools_config: r.pubkey(),
    tick_spacing: r.u16(),
    default_fee_rate: r.u16()
  }));
  return fee_tier ? { OrcaFeeTierAccount: { metadata, pubkey: account.pubkey, fee_tier } } : null;
}
function parseOrcaWhirlpoolsConfig(account, metadata) {
  const body = bodyAfterDiscriminator(account, ORCA_WHIRLPOOLS_CONFIG_DISC, ORCA_WHIRLPOOLS_CONFIG_BODY);
  if (!body)
    return null;
  const config = parseBody(body, (r) => ({
    fee_authority: r.pubkey(),
    collect_protocol_fees_authority: r.pubkey(),
    reward_emissions_super_authority: r.pubkey(),
    default_protocol_fee_rate: r.u16()
  }));
  return config ? { OrcaWhirlpoolsConfigAccount: { metadata, pubkey: account.pubkey, config } } : null;
}
function readOrcaWhirlpoolRewardInfo(r) {
  return {
    mint: r.pubkey(),
    vault: r.pubkey(),
    authority: r.pubkey(),
    emissions_per_second_x64: r.u128(),
    growth_global_x64: r.u128()
  };
}
function readOrcaPositionRewardInfo(r) {
  return {
    growth_inside_checkpoint: r.u128(),
    amount_owed: r.u64()
  };
}
function readOrcaTick(r) {
  return {
    initialized: r.bool(),
    liquidity_net: r.i128(),
    liquidity_gross: r.u128(),
    fee_growth_outside_a: r.u128(),
    fee_growth_outside_b: r.u128(),
    reward_growths_outside: readArray(3, () => r.u128())
  };
}

// dist/accounts/wallet_resolve.js
var TOKEN_PROGRAM2 = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
var TOKEN_20222 = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
var SYSTEM = "11111111111111111111111111111111";
var SPL_TOKEN_ACCOUNT_LEN = 165;
function isTokenProgramOwner2(owner) {
  return owner === TOKEN_PROGRAM2 || owner === TOKEN_20222;
}
function userWalletPubkeyForOnchainAccount(address, owner, data, executable) {
  if (executable)
    return null;
  if (owner === SYSTEM) {
    return data.length === 0 ? address : null;
  }
  if (isTokenProgramOwner2(owner) && data.length === SPL_TOKEN_ACCOUNT_LEN) {
    return readPubkey(data, 32);
  }
  return null;
}

// dist/accounts/mod.js
var ACCOUNT_EVENT_TYPES = [
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
function filterParsedEvent(ev, eventTypeFilter) {
  if (!ev || !eventTypeFilter)
    return ev;
  return eventTypeFilterShouldIncludeDexEvent(eventTypeFilter, ev) ? ev : null;
}
function parseAccountUnified(account, metadata, eventTypeFilter) {
  if (account.data.length === 0)
    return null;
  if (eventTypeFilter?.include_only) {
    const shouldParse = eventTypeFilter.include_only.some((t) => ACCOUNT_EVENT_TYPES.includes(t));
    if (!shouldParse)
      return null;
  }
  if (account.owner === PUMPSWAP_PROGRAM_ID) {
    if (!eventTypeFilter || eventTypeFilter.shouldInclude("AccountPumpSwapGlobalConfig") || eventTypeFilter.shouldInclude("AccountPumpSwapPool")) {
      const ev = parsePumpswapAccount(account, metadata);
      if (ev)
        return filterParsedEvent(ev, eventTypeFilter);
    }
    return null;
  }
  if (account.owner === PUMPFUN_PROGRAM_ID || account.owner === PUMP_FEES_PROGRAM_ID) {
    if (!eventTypeFilter || eventTypeFilter.shouldInclude("AccountPumpFunGlobal") || eventTypeFilter.shouldInclude("AccountPumpFunBondingCurve") || eventTypeFilter.shouldInclude("AccountPumpFunFeeConfig") || eventTypeFilter.shouldInclude("AccountPumpFunSharingConfig") || eventTypeFilter.shouldInclude("AccountPumpFunGlobalVolumeAccumulator") || eventTypeFilter.shouldInclude("AccountPumpFunUserVolumeAccumulator")) {
      const ev = parsePumpfunAccount(account, metadata);
      if (ev)
        return filterParsedEvent(ev, eventTypeFilter);
    }
    return null;
  }
  if (account.owner === RAYDIUM_CLMM_PROGRAM_ID) {
    if (!eventTypeFilter || eventTypeFilter.shouldInclude("AccountRaydiumClmmAmmConfig") || eventTypeFilter.shouldInclude("AccountRaydiumClmmPoolState") || eventTypeFilter.shouldInclude("AccountRaydiumClmmTickArrayState")) {
      const ev = parseRaydiumClmmAccount(account, metadata);
      if (ev)
        return filterParsedEvent(ev, eventTypeFilter);
    }
    return null;
  }
  if (account.owner === RAYDIUM_CPMM_PROGRAM_ID) {
    if (!eventTypeFilter || eventTypeFilter.shouldInclude("AccountRaydiumCpmmAmmConfig") || eventTypeFilter.shouldInclude("AccountRaydiumCpmmPoolState")) {
      const ev = parseRaydiumCpmmAccount(account, metadata);
      if (ev)
        return filterParsedEvent(ev, eventTypeFilter);
    }
    return null;
  }
  if (account.owner === ORCA_WHIRLPOOL_PROGRAM_ID) {
    if (!eventTypeFilter || eventTypeFilter.shouldInclude("AccountOrcaWhirlpool") || eventTypeFilter.shouldInclude("AccountOrcaPosition") || eventTypeFilter.shouldInclude("AccountOrcaTickArray") || eventTypeFilter.shouldInclude("AccountOrcaFeeTier") || eventTypeFilter.shouldInclude("AccountOrcaWhirlpoolsConfig")) {
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
  if (eventTypeFilter && !eventTypeFilter.shouldInclude("TokenAccount") && !eventTypeFilter.shouldInclude("TokenInfo")) {
    return null;
  }
  return filterParsedEvent(parseTokenAccount(account, metadata), eventTypeFilter);
}
