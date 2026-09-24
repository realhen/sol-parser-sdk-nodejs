/**
 * 与 Rust `sol-parser-sdk/src/grpc/program_ids.rs` 对齐的 DEX 程序 ID 与协议映射。
 */
import type { Protocol } from "./types.js";
import type { AccountFilter, TransactionFilter } from "./types.js";

import {
  PUMPFUN_PROGRAM_ID,
  PUMPSWAP_PROGRAM_ID,
  PUMPSWAP_FEES_PROGRAM_ID,
  PUMP_FEES_PROGRAM_ID,
  RAYDIUM_LAUNCHLAB_PROGRAM_ID,
  RAYDIUM_CPMM_PROGRAM_ID,
  RAYDIUM_CLMM_PROGRAM_ID,
  RAYDIUM_AMM_V4_PROGRAM_ID,
  ORCA_WHIRLPOOL_PROGRAM_ID,
  METEORA_POOLS_PROGRAM_ID,
  METEORA_DAMM_V2_PROGRAM_ID,
  METEORA_DLMM_PROGRAM_ID,
  METEORA_DBC_PROGRAM_ID,
} from "../instr/program_ids.js";
export * from "../instr/program_ids.js";

/** 与 Rust `PROTOCOL_PROGRAM_IDS` 一致（仅含 Rust 中存在的协议） */
export const PROTOCOL_PROGRAM_IDS: Record<Protocol, readonly string[]> = {
  PumpFun: [PUMPFUN_PROGRAM_ID],
  PumpSwap: [PUMPSWAP_PROGRAM_ID],
  PumpFees: [PUMP_FEES_PROGRAM_ID],
  RaydiumLaunchlab: [RAYDIUM_LAUNCHLAB_PROGRAM_ID],
  RaydiumCpmm: [RAYDIUM_CPMM_PROGRAM_ID],
  RaydiumClmm: [RAYDIUM_CLMM_PROGRAM_ID],
  RaydiumAmmV4: [RAYDIUM_AMM_V4_PROGRAM_ID],
  OrcaWhirlpool: [ORCA_WHIRLPOOL_PROGRAM_ID],
  MeteoraPools: [METEORA_POOLS_PROGRAM_ID],
  MeteoraDammV2: [METEORA_DAMM_V2_PROGRAM_ID],
  MeteoraDlmm: [METEORA_DLMM_PROGRAM_ID],
  MeteoraDbc: [METEORA_DBC_PROGRAM_ID],
};

/** 与 Rust `get_program_ids_for_protocols` 一致 */
export function getProgramIdsForProtocols(
  protocols: readonly Protocol[],
): string[] {
  const out: string[] = [];
  for (const p of protocols) {
    const ids = PROTOCOL_PROGRAM_IDS[p];
    if (ids) out.push(...ids);
  }
  return [...new Set(out)].sort();
}

/** 与 Rust `TransactionFilter::for_protocols` 一致 */
export function transactionFilterForProtocols(
  protocols: readonly Protocol[],
): TransactionFilter {
  return {
    account_include: getProgramIdsForProtocols(protocols),
    account_exclude: [],
    account_required: [],
  };
}

/**
 * Server-side transaction filter for one protocol restricted to known accounts.
 *
 * Yellowstone applies `account_include` as ANY and `account_required` as ALL,
 * so matching transactions must contain the protocol program and at least one
 * tracked mint, pool, or other account.
 */
export function transactionFilterForProtocolAccounts(
  protocol: Protocol,
  accounts: readonly string[],
): TransactionFilter {
  const trackedAccounts = [
    ...new Set(
      accounts
        .map((account) => account.trim())
        .filter((account) => account.length > 0),
    ),
  ].sort();
  if (trackedAccounts.length === 0) {
    throw new RangeError("At least one tracked account is required");
  }

  return {
    account_include: trackedAccounts,
    account_exclude: [],
    account_required: [...PROTOCOL_PROGRAM_IDS[protocol]],
  };
}

/** 与 Rust `AccountFilter::for_protocols` 一致 */
export function accountFilterForProtocols(
  protocols: readonly Protocol[],
): AccountFilter {
  return {
    account: [],
    owner: getProgramIdsForProtocols(protocols),
    filters: [],
  };
}
