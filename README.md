# sol-parser-sdk browser fork

Browser-safe account and DEX log decoding for Solana WebSocket notifications. This fork publishes ESM, CommonJS, and TypeScript declarations, with no RPC, Yellowstone gRPC, ShredStream, signing, or credential handling. Consumers own subscriptions, reconnects, freshness checks, and owner/program validation.

```ts
import {
  parseAccountUnified,
  makeMetadata,
  parseLogsOnly,
} from "sol-parser-sdk";
import { Buffer } from "buffer";

// Account address and slot come from your accountSubscribe subscription mapping.
const event = parseAccountUnified(
  {
    pubkey: address,
    owner: notification.value.owner,
    executable: notification.value.executable,
    lamports: BigInt(notification.value.lamports),
    rent_epoch: BigInt(notification.value.rentEpoch),
    data: Buffer.from(notification.value.data[0], "base64"),
  },
  makeMetadata("", notification.context.slot, 0, undefined, Date.now() * 1000),
);

const trades = parseLogsOnly(logs, signature, slot, undefined);
```

The metadata `grpc_recv_us` field retains its upstream name; browser callers may supply local receive time in epoch microseconds. Account notifications do not supply a transaction signature or block time. Leave the signature empty and block time undefined rather than fabricating either. JavaScript RPC numeric fields may already have lost integer precision before conversion to `bigint`; use lossless JSON decoding if those balances matter.

## Scope

The root exports the account decoders, unified log parser, event types and filters, metadata helpers, JSON helpers, clock helpers, market arithmetic, and a `programIds` namespace. Subpaths are `./accounts`, `./core/unified_parser`, `./core/dex_event`, `./core/metadata`, `./core/event_filter`, `./instr/program_ids`, and `./util/market`. `./grpc/types` is a compatibility alias exposing only pure event filters and their types.

Account support is limited to the layouts implemented upstream: Pump.fun and PumpSwap accounts; Raydium CLMM and CPMM configuration/pool accounts (plus CLMM tick arrays); Orca Whirlpool, position, tick array, fee tier, and configuration; SPL token/mint and nonce accounts. This does not add Meteora, Raydium AMM v4, or LaunchLab pool account layouts. Unsupported or truncated layouts generally return `null`; decoder output is not proof of account authenticity or execution readiness. Logs and account updates are separate inputs, and log coverage does not imply account-layout coverage.

## Build and upstream tracking

Fork version: `0.5.15-browser.1`. Upstream base: [`0xfnzero/sol-parser-sdk-nodejs` at `dc40ffa41f382e6d284e314a9666a7aeb42b7c4a`](https://github.com/0xfnzero/sol-parser-sdk-nodejs/commit/dc40ffa41f382e6d284e314a9666a7aeb42b7c4a) (upstream package version `0.5.15`).

```sh
npm ci --ignore-scripts
npm run build
npm run format:check
```

`dist/` is committed so pinned GitHub-commit installs need no `prepare` script or build toolchain. Runtime dependencies are only `bs58` and `buffer`. Upstream transport source stays in the repository for comparison and future merges but is excluded from the compiled package. `src/browser.ts` is the build root; event filters were separated from gRPC types, and public-key encoding uses `bs58` directly.
