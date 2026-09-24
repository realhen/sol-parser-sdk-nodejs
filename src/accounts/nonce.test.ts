import bs58 from "bs58";
import { describe, expect, it } from "vitest";
import { parseNonceAccount } from "./nonce.js";
import { parseAccountUnified } from "./mod.js";
import type { AccountData } from "./types.js";

const metadata = { signature: "", slot: 1, tx_index: 0, block_time_us: 0, grpc_recv_us: 1 };

function nonceAccount(): AccountData {
  const data = new Uint8Array(80);
  data.set([1, 0, 0, 0, 1, 0, 0, 0]);
  data.fill(7, 8, 40);
  data.fill(9, 40, 72);
  return { pubkey: "nonce", executable: false, lamports: 1n,
    owner: "11111111111111111111111111111111", rent_epoch: 0n, data };
}

describe("nonce account validation", () => {
  it("decodes the authority and nonce for an initialized System Program account", () => {
    const account = nonceAccount();
    const event = parseNonceAccount(account, metadata);
    expect(event).toEqual({ NonceAccount: {
      metadata, pubkey: account.pubkey, executable: false, lamports: 1n,
      owner: account.owner, rent_epoch: 0n,
      authority: bs58.encode(new Uint8Array(32).fill(7)),
      nonce: bs58.encode(new Uint8Array(32).fill(9)),
    }});
    expect(parseAccountUnified(account, metadata)).toEqual(event);
  });

  it("rejects other owners in direct and unified decoding", () => {
    const account = { ...nonceAccount(), owner: "unrelated-program" };
    expect(parseNonceAccount(account, metadata)).toBeNull();
    expect(parseAccountUnified(account, metadata)).toBeNull();
  });

  it("rejects unsupported versions, uninitialized states, and incomplete data", () => {
    for (const index of [0, 4]) {
      const account = nonceAccount();
      account.data[index] = 0;
      expect(parseNonceAccount(account, metadata)).toBeNull();
    }
    for (const length of [0, 8, 79, 81]) {
      const account = nonceAccount();
      const data = new Uint8Array(length);
      data.set(account.data.slice(0, length));
      expect(parseNonceAccount({ ...account, data }, metadata)).toBeNull();
    }
  });
});
