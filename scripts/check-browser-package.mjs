import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { runInNewContext } from "node:vm";

const consumer = mkdtempSync(resolve(".browser-package-check-"));
try {
  const packed = JSON.parse(execFileSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", consumer], {
    encoding: "utf8",
    env: { ...process.env, npm_config_cache: resolve(consumer, "cache") },
  }))[0];
  const installed = resolve(consumer, "node_modules/sol-parser-sdk");
  mkdirSync(installed, { recursive: true });
  execFileSync("tar", ["-xzf", resolve(consumer, packed.filename), "-C", installed, "--strip-components=1"]);

  const require = createRequire(resolve(consumer, "consumer.cjs"));
  const commonjs = require("sol-parser-sdk/browser");
  const esm = await import(pathToFileURL(resolve(installed, "browser/index.mjs")).href);
  const nodeEntry = require("sol-parser-sdk");
  const legacyAccounts = require("sol-parser-sdk/dist/accounts/mod");
  assert.equal(typeof nodeEntry.parseAccountUnified, "function");
  assert.equal(typeof legacyAccounts.rpcResolveUserWalletPubkey, "function");

  const metadata = { signature: "fixture", slot: 123, tx_index: 0, block_time_us: 0, grpc_recv_us: 1 };
  const data = new Uint8Array(125);
  data.set([23, 183, 248, 55, 96, 216, 172, 96]);
  new DataView(data.buffer).setBigUint64(8, 123n, true);
  data.fill(7, 49, 81);
  const account = {
    pubkey: "curve", executable: false, lamports: 0n, rent_epoch: 0n,
    owner: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P", data,
  };
  const trade = new Uint8Array(8 + 225);
  trade.set([189, 219, 127, 211, 78, 230, 97, 238]);
  trade.fill(7, 8, 40);
  new DataView(trade.buffer).setBigUint64(40, 456n, true);
  trade[56] = 1;
  const logs = [`Program data: ${Buffer.from(trade).toString("base64")}`];
  const expectedKey = require("bs58").default.encode(new Uint8Array(32).fill(7));

  function checkDecoding(sdk) {
    assert.equal("rpcResolveUserWalletPubkey" in sdk, false);
    const curve = sdk.parseAccountUnified(account, metadata).PumpFunBondingCurveAccount.bonding_curve;
    assert.equal(curve.virtual_token_reserves, 123n);
    assert.equal(curve.creator, expectedKey);
    const events = sdk.parseLogsOnly(logs, "fixture", 123, undefined);
    assert.equal(events.length, 1);
    assert.equal(events[0].PumpFunTrade.mint, expectedKey);
    assert.equal(events[0].PumpFunTrade.sol_amount, 456n);
  }

  const nativeBuffer = globalThis.Buffer;
  try {
    globalThis.Buffer = undefined;
    checkDecoding(commonjs);
    checkDecoding(esm);
  } finally {
    globalThis.Buffer = nativeBuffer;
  }
  const sandboxModule = { exports: {} };
  runInNewContext(readFileSync(resolve(installed, "browser/index.cjs"), "utf8"), {
    module: sandboxModule, exports: sandboxModule.exports,
    Uint8Array, DataView, TextDecoder, TextEncoder,
  });
  checkDecoding(sandboxModule.exports);

  for (const [extension, specifier] of [["mts", "sol-parser-sdk/browser/index.mjs"], ["cts", "sol-parser-sdk/browser"]]) {
    writeFileSync(resolve(consumer, `consumer.${extension}`), `
import { parseAccountUnified, makeMetadata, type AccountData, type DexEvent } from "${specifier}";
const account: AccountData = { pubkey: "curve", owner: "owner", data: new Uint8Array(), executable: false, lamports: 0n, rent_epoch: 0n };
const event: DexEvent | null = parseAccountUnified(account, makeMetadata("", 0, 0, undefined, 0));
void event;
`);
  }
  execFileSync(process.execPath, ["node_modules/typescript/bin/tsc", "--noEmit", "--strict", "--skipLibCheck", "--target", "ES2022", "--module", "NodeNext", "--moduleResolution", "NodeNext", resolve(consumer, "consumer.mts"), resolve(consumer, "consumer.cts")], {
    stdio: "inherit",
  });
  console.log("Packed ESM/CommonJS account and log fixtures, browser sandbox, Node compatibility, and NodeNext types passed.");
} finally {
  rmSync(consumer, { recursive: true, force: true });
}
