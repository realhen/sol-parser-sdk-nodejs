import { describe, expect, it } from "vitest";
import { parsePumpswapPool } from "./pumpswap.js";
import type { AccountData } from "./types.js";

const POOL_DISC = [241, 154, 109, 4, 17, 177, 109, 188];
const metadata = { signature: "sig", slot: 1, tx_index: 0, block_time_us: 0, grpc_recv_us: 1 };

function poolAccount(
  bodyLength: number,
  virtualQuoteReserves?: bigint,
  creatorFeeBps?: bigint
): AccountData {
  const data = new Uint8Array(8 + bodyLength);
  data.set(POOL_DISC);
  if (virtualQuoteReserves !== undefined) {
    const value = BigInt.asUintN(128, virtualQuoteReserves);
    const view = new DataView(data.buffer, data.byteOffset + 8 + 237, 16);
    view.setBigUint64(0, value & ((1n << 64n) - 1n), true);
    view.setBigUint64(8, value >> 64n, true);
  }
  if (creatorFeeBps !== undefined) {
    const view = new DataView(data.buffer);
    view.setBigUint64(8 + 253, creatorFeeBps, true);
    data[8 + 261] = 1;
    data[8 + 262] = 1;
  }
  return {
    pubkey: "pool",
    executable: false,
    lamports: 0n,
    owner: "owner",
    rent_epoch: 0n,
    data,
  };
}

describe("PumpSwap pool account parser", () => {
  it("defaults legacy virtual reserves and reads the current signed i128 field", () => {
    const legacy = parsePumpswapPool(poolAccount(244), metadata);
    expect((legacy as any).PumpSwapPoolAccount.pool.virtual_quote_reserves).toBe(0n);

    const boost = parsePumpswapPool(poolAccount(253, -987_654_321n), metadata);
    expect((boost as any).PumpSwapPoolAccount.pool.virtual_quote_reserves).toBe(-987_654_321n);
    expect((boost as any).PumpSwapPoolAccount.pool.creator_fee_bps).toBe(0n);

    const current = parsePumpswapPool(poolAccount(263, -987_654_321n, 250n), metadata);
    const pool = (current as any).PumpSwapPoolAccount.pool;
    expect(pool.virtual_quote_reserves).toBe(-987_654_321n);
    expect(pool.creator_fee_bps).toBe(250n);
    expect(pool.can_edit_creator_fee).toBe(true);
    expect(pool.is_holder_reward).toBe(true);
  });

  it("rejects a partial upgraded account layout", () => {
    for (let bodyLength = 245; bodyLength < 253; bodyLength++) {
      expect(parsePumpswapPool(poolAccount(bodyLength), metadata)).toBeNull();
    }
    for (let bodyLength = 254; bodyLength < 261; bodyLength++) {
      expect(parsePumpswapPool(poolAccount(bodyLength), metadata)).toBeNull();
    }
    expect(parsePumpswapPool(poolAccount(262, -1n), metadata)).not.toBeNull();
  });
});


describe("historical PumpSwap pools", () => {
  it("accepts complete field boundaries and rejects every partial field", () => {
    const boundaries = [203, 235, 236, 237, 244, 253, 261, 262, 263];
    for (let bodyLength = 0; bodyLength <= 263; bodyLength++) {
      const event = parsePumpswapPool(poolAccount(bodyLength), metadata);
      expect(event !== null, `body ${bodyLength}`).toBe(boundaries.includes(bodyLength));
      if (event && "PumpSwapPoolAccount" in event) {
        expect(event.PumpSwapPoolAccount.pool.creator_fee_bps).toBe(0n);
        expect(event.PumpSwapPoolAccount.pool.is_holder_reward).toBe(false);
      }
    }
  });

  it("rejects a partial virtual reserve disguised as legacy allocation padding", () => {
    const account = poolAccount(244);
    account.data[8 + 237] = 1;
    expect(parsePumpswapPool(account, metadata)).toBeNull();
  });

  it("retains fields present in the shorter serialized pool", () => {
    const full = poolAccount(263, -987n, 250n);
    const event = parsePumpswapPool({ ...full, data: full.data.slice(0, 8 + 261) }, metadata);
    expect(event && "PumpSwapPoolAccount" in event).toBe(true);
    if (!event || !("PumpSwapPoolAccount" in event)) throw new Error("Missing pool");
    expect(event.PumpSwapPoolAccount.pool.virtual_quote_reserves).toBe(-987n);
    expect(event.PumpSwapPoolAccount.pool.creator_fee_bps).toBe(250n);
    expect(event.PumpSwapPoolAccount.pool.can_edit_creator_fee).toBe(false);
  });
});
