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

// dist/core/unified_parser.js
var unified_parser_exports = {};
__export(unified_parser_exports, {
  nowUs: () => nowUs,
  parseLog: () => parseLog,
  parseLogsOnly: () => parseLogsOnly,
  parseLogsStreaming: () => parseLogsStreaming,
  parseTransactionEvents: () => parseTransactionEvents,
  parseTransactionEventsStreaming: () => parseTransactionEventsStreaming,
  parseTransactionWithListener: () => parseTransactionWithListener,
  parseTransactionWithStreamingListener: () => parseTransactionWithStreamingListener
});
module.exports = __toCommonJS(unified_parser_exports);

// dist/core/dex_event.js
var ZERO = "11111111111111111111111111111111";
function defaultPubkey() {
  return ZERO;
}

// dist/core/pumpfun_fee_enrich.js
var PUMPFUN_SOL_QUOTE_MINT = "So11111111111111111111111111111111111111111";
function pumpfunTradeEvent(ev) {
  if ("PumpFunTrade" in ev)
    return ev.PumpFunTrade;
  if ("PumpFunBuy" in ev)
    return ev.PumpFunBuy;
  if ("PumpFunSell" in ev)
    return ev.PumpFunSell;
  if ("PumpFunBuyExactSolIn" in ev)
    return ev.PumpFunBuyExactSolIn;
  return null;
}
function isUnknownOrSolPlaceholder(v) {
  return !v || v === defaultPubkey() || v === PUMPFUN_SOL_QUOTE_MINT;
}
function pumpfunCreateFlags(ev) {
  let c = null;
  if ("PumpFunCreate" in ev)
    c = ev.PumpFunCreate;
  if ("PumpFunCreateV2" in ev)
    c = ev.PumpFunCreateV2;
  if (!c || !c.mint || c.mint === defaultPubkey())
    return null;
  return [c.mint, c.is_cashback_enabled, c.is_mayhem_mode];
}
function fillString(dst, key, value) {
  const zero = defaultPubkey();
  if ((!dst[key] || dst[key] === zero) && value && value !== zero) {
    dst[key] = value;
  }
}
function fillBigint(dst, key, value) {
  if (dst[key] === 0n && value !== 0n) {
    dst[key] = value;
  }
}
function enrichCreateV2FromCreateEvents(events) {
  const zero = defaultPubkey();
  const creates = /* @__PURE__ */ new Map();
  for (const ev of events) {
    if (!("PumpFunCreate" in ev))
      continue;
    const c = ev.PumpFunCreate;
    if (c.mint && c.mint !== zero && !creates.has(c.mint)) {
      creates.set(c.mint, c);
    }
  }
  if (creates.size === 0)
    return;
  for (const ev of events) {
    if (!("PumpFunCreateV2" in ev))
      continue;
    const c2 = ev.PumpFunCreateV2;
    const c = creates.get(c2.mint);
    if (!c)
      continue;
    fillString(c2, "name", c.name);
    fillString(c2, "symbol", c.symbol);
    fillString(c2, "uri", c.uri);
    fillString(c2, "bonding_curve", c.bonding_curve);
    fillString(c2, "user", c.user);
    fillString(c2, "creator", c.creator);
    fillString(c2, "token_program", c.token_program);
    fillString(c2, "quote_mint", c.quote_mint);
    fillString(c2, "quote_vault", c.quote_vault);
    fillString(c2, "quote_token_program", c.quote_token_program);
    fillBigint(c2, "timestamp", c.timestamp);
    fillBigint(c2, "virtual_token_reserves", c.virtual_token_reserves);
    fillBigint(c2, "virtual_sol_reserves", c.virtual_sol_reserves);
    fillBigint(c2, "real_token_reserves", c.real_token_reserves);
    fillBigint(c2, "token_total_supply", c.token_total_supply);
    fillBigint(c2, "virtual_quote_reserves", c.virtual_quote_reserves);
    c2.is_mayhem_mode ||= c.is_mayhem_mode;
    c2.is_cashback_enabled ||= c.is_cashback_enabled;
  }
}
function enrichCreateV2ObservedFeeRecipient(events) {
  const zero = defaultPubkey();
  const mintToFee = /* @__PURE__ */ new Map();
  for (const ev of events) {
    const t = pumpfunTradeEvent(ev);
    if (!t || !t.mint || t.mint === zero || !t.fee_recipient || t.fee_recipient === zero) {
      continue;
    }
    const buyLike = "PumpFunTrade" in ev && t.is_buy || "PumpFunBuy" in ev || "PumpFunBuyExactSolIn" in ev;
    if (buyLike && !mintToFee.has(t.mint)) {
      mintToFee.set(t.mint, t.fee_recipient);
    }
  }
  if (mintToFee.size === 0)
    return;
  for (const ev of events) {
    if (!("PumpFunCreateV2" in ev))
      continue;
    const c = ev.PumpFunCreateV2;
    if (!c.observed_fee_recipient || c.observed_fee_recipient === zero) {
      c.observed_fee_recipient = mintToFee.get(c.mint) ?? c.observed_fee_recipient;
    }
  }
}
function enrichCreateQuoteMintFromTrades(events) {
  const zero = defaultPubkey();
  const mintToQuote = /* @__PURE__ */ new Map();
  for (const ev of events) {
    const t = pumpfunTradeEvent(ev);
    if (!t?.mint || t.mint === zero || !t.quote_mint || isUnknownOrSolPlaceholder(t.quote_mint)) {
      continue;
    }
    if (!mintToQuote.has(t.mint))
      mintToQuote.set(t.mint, t.quote_mint);
  }
  if (mintToQuote.size === 0)
    return;
  for (const ev of events) {
    const c = "PumpFunCreate" in ev ? ev.PumpFunCreate : "PumpFunCreateV2" in ev ? ev.PumpFunCreateV2 : null;
    if (!c || !isUnknownOrSolPlaceholder(c.quote_mint))
      continue;
    c.quote_mint = mintToQuote.get(c.mint) ?? c.quote_mint;
  }
}
function enrichPumpfunTradesFromCreateInstructions(events) {
  const flags = /* @__PURE__ */ new Map();
  for (const ev of events) {
    const f = pumpfunCreateFlags(ev);
    if (f && !flags.has(f[0]))
      flags.set(f[0], [f[1], f[2]]);
  }
  if (flags.size === 0)
    return;
  for (const ev of events) {
    const t = pumpfunTradeEvent(ev);
    if (!t || !t.mint || t.mint === defaultPubkey())
      continue;
    const f = flags.get(t.mint);
    if (!f)
      continue;
    const [cashbackEnabled, mayhemMode] = f;
    t.is_cashback_coin ||= cashbackEnabled;
    t.mayhem_mode ||= mayhemMode;
    if (cashbackEnabled)
      t.track_volume = true;
  }
}
function enrichPumpfunSameTxPostMerge(events) {
  enrichCreateV2FromCreateEvents(events);
  enrichCreateV2ObservedFeeRecipient(events);
  enrichCreateQuoteMintFromTrades(events);
  enrichPumpfunTradesFromCreateInstructions(events);
}

// dist/core/metadata.js
function makeMetadata(signature, slot, txIndex, blockTimeUs, grpcRecvUs, recentBlockhash) {
  return {
    signature,
    slot,
    tx_index: txIndex,
    block_time_us: blockTimeUs ?? 0,
    grpc_recv_us: grpcRecvUs,
    recent_blockhash: recentBlockhash
  };
}

// dist/logs/program_data.js
var import_buffer = require("buffer");
var PREFIX = "Program data: ";
function decodeProgramDataLine(log) {
  const idx = log.indexOf(PREFIX);
  if (idx < 0)
    return null;
  const trimmed = log.slice(idx + PREFIX.length).trim();
  try {
    const b = import_buffer.Buffer.from(trimmed, "base64");
    if (b.length < 8)
      return null;
    return new Uint8Array(b);
  } catch {
    return null;
  }
}

// dist/core/clock.js
function nowUs() {
  return Math.floor(Date.now() * 1e3);
}

// node_modules/base-x/src/esm/index.js
function base(ALPHABET2) {
  if (ALPHABET2.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  const BASE_MAP = new Uint8Array(256);
  for (let j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (let i = 0; i < ALPHABET2.length; i++) {
    const x = ALPHABET2.charAt(i);
    const xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  const BASE = ALPHABET2.length;
  const LEADER = ALPHABET2.charAt(0);
  const FACTOR = Math.log(BASE) / Math.log(256);
  const iFACTOR = Math.log(256) / Math.log(BASE);
  function encode(source) {
    if (source instanceof Uint8Array) {
    } else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    let zeroes = 0;
    let length = 0;
    let pbegin = 0;
    const pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    const size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    const b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      let carry = source[pbegin];
      let i = 0;
      for (let it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length = i;
      pbegin++;
    }
    let it2 = size - length;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    let str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET2.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    let psz = 0;
    let zeroes = 0;
    let length = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    const size = (source.length - psz) * FACTOR + 1 >>> 0;
    const b256 = new Uint8Array(size);
    while (psz < source.length) {
      const charCode = source.charCodeAt(psz);
      if (charCode > 255) {
        return;
      }
      let carry = BASE_MAP[charCode];
      if (carry === 255) {
        return;
      }
      let i = 0;
      for (let it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length = i;
      psz++;
    }
    let it4 = size - length;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    const vch = new Uint8Array(zeroes + (size - it4));
    let j = zeroes;
    while (it4 !== size) {
      vch[j++] = b256[it4++];
    }
    return vch;
  }
  function decode(string) {
    const buffer = decodeUnsafe(string);
    if (buffer) {
      return buffer;
    }
    throw new Error("Non-base" + BASE + " character");
  }
  return {
    encode,
    decodeUnsafe,
    decode
  };
}
var esm_default = base;

// node_modules/bs58/src/esm/index.js
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var esm_default2 = esm_default(ALPHABET);

// dist/util/binary.js
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
function readI32LE(u8, o) {
  if (o + 4 > u8.length)
    return null;
  const v = new DataView(u8.buffer, u8.byteOffset + o, 4);
  return v.getInt32(0, true);
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
function readBool(u8, o) {
  const b = readU8(u8, o);
  if (b === null)
    return null;
  return b === 1;
}
function readPubkey(u8, o) {
  if (o + 32 > u8.length)
    return null;
  return esm_default2.encode(u8.subarray(o, o + 32));
}
function readBorshString(u8, o) {
  const len = readU32LE(u8, o);
  if (len === null || o + 4 + len > u8.length)
    return null;
  const bytes = u8.subarray(o + 4, o + 4 + len);
  try {
    return { s: new TextDecoder().decode(bytes), next: o + 4 + len };
  } catch {
    return null;
  }
}
function readDiscriminatorU64(u8) {
  return readU64LE(u8, 0);
}

// dist/logs/pump.js
function disc(bytes) {
  const u8 = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++)
    u8[i] = bytes[i];
  return readDiscriminatorU64(u8);
}
var DISC_CREATE = disc([27, 114, 169, 77, 222, 235, 99, 118]);
var DISC_TRADE = disc([189, 219, 127, 211, 78, 230, 97, 238]);
var DISC_MIGRATE = disc([189, 233, 93, 185, 92, 148, 234, 148]);
var DISC_MIGRATE_BONDING_CURVE_CREATOR = disc([155, 167, 104, 220, 213, 108, 243, 3]);
var PUMPFUN_SOL_QUOTE_MINT2 = "So11111111111111111111111111111111111111111";
function normalizePumpfunIxName(ixName) {
  if (ixName === "buy_v2")
    return "buy";
  if (ixName === "sell_v2")
    return "sell";
  if (ixName === "buy_exact_quote_in_v2")
    return "buy_exact_quote_in";
  return ixName;
}
function bnU64(v) {
  return v ?? 0n;
}
function bnI64(v) {
  return v ?? 0n;
}
function readOptionalU64(data, offset) {
  if (offset.value + 8 > data.length)
    return 0n;
  const value = bnU64(readU64LE(data, offset.value));
  offset.value += 8;
  return value;
}
function readOptionalPubkey(data, offset) {
  if (offset.value + 32 > data.length)
    return defaultPubkey();
  const value = readPubkey(data, offset.value) ?? defaultPubkey();
  offset.value += 32;
  return value;
}
function normalizePumpfunQuoteMint(quoteMint) {
  return quoteMint === defaultPubkey() ? PUMPFUN_SOL_QUOTE_MINT2 : quoteMint;
}
function readTradeShareholders(data, offset) {
  if (offset.value + 4 > data.length)
    return [];
  const n = readU32LE(data, offset.value);
  if (n === null || n > 64)
    return null;
  offset.value += 4;
  if (offset.value + n * 34 > data.length)
    return null;
  const out = [];
  for (let i = 0; i < n; i++) {
    const address = readPubkey(data, offset.value);
    if (!address)
      return null;
    offset.value += 32;
    const share_bps = readU16LE(data, offset.value);
    if (share_bps === null)
      return null;
    offset.value += 2;
    out.push({ address, share_bps });
  }
  return out;
}
function parseTradeFromData(data, metadata, isCreatedBuy) {
  if (data.length < 32 + 8 + 8 + 1 + 32 + 8 * 5 + 32 + 8 + 8 + 32 + 8 + 8)
    return null;
  let o = 0;
  const mint = readPubkey(data, o);
  if (!mint)
    return null;
  o += 32;
  const sol_amount = bnU64(readU64LE(data, o));
  o += 8;
  const token_amount = bnU64(readU64LE(data, o));
  o += 8;
  const is_buy = readBool(data, o);
  if (is_buy === null)
    return null;
  o += 1;
  const user = readPubkey(data, o);
  if (!user)
    return null;
  o += 32;
  const timestamp = bnI64(readI64LE(data, o));
  o += 8;
  const virtual_sol_reserves = bnU64(readU64LE(data, o));
  o += 8;
  const virtual_token_reserves = bnU64(readU64LE(data, o));
  o += 8;
  const real_sol_reserves = bnU64(readU64LE(data, o));
  o += 8;
  const real_token_reserves = bnU64(readU64LE(data, o));
  o += 8;
  const fee_recipient = readPubkey(data, o);
  if (!fee_recipient)
    return null;
  o += 32;
  const fee_basis_points = bnU64(readU64LE(data, o));
  o += 8;
  const fee = bnU64(readU64LE(data, o));
  o += 8;
  const creator = readPubkey(data, o);
  if (!creator)
    return null;
  o += 32;
  const creator_fee_basis_points = bnU64(readU64LE(data, o));
  o += 8;
  const creator_fee = bnU64(readU64LE(data, o));
  o += 8;
  const track_volume = readBool(data, o) ?? false;
  o += 1;
  const total_unclaimed_tokens = o + 8 <= data.length ? bnU64(readU64LE(data, o)) : 0n;
  o += 8;
  const total_claimed_tokens = o + 8 <= data.length ? bnU64(readU64LE(data, o)) : 0n;
  o += 8;
  const current_sol_volume = o + 8 <= data.length ? bnU64(readU64LE(data, o)) : 0n;
  o += 8;
  const last_update_timestamp = o + 8 <= data.length ? bnI64(readI64LE(data, o)) : 0n;
  o += 8;
  let ix_name = "";
  if (o + 4 <= data.length) {
    const rs = readBorshString(data, o);
    if (rs) {
      ix_name = rs.s;
      o = rs.next;
    }
  }
  ix_name = normalizePumpfunIxName(ix_name);
  const mayhem_mode = readBool(data, o) ?? false;
  o += 1;
  const cashback_fee_basis_points = o + 8 <= data.length ? bnU64(readU64LE(data, o)) : 0n;
  o += 8;
  const cashback = o + 8 <= data.length ? bnU64(readU64LE(data, o)) : 0n;
  o += 8;
  const tail = { value: o };
  const buyback_fee_basis_points = readOptionalU64(data, tail);
  const buyback_fee = readOptionalU64(data, tail);
  const shareholders = readTradeShareholders(data, tail);
  if (shareholders === null)
    return null;
  const quote_mint = normalizePumpfunQuoteMint(readOptionalPubkey(data, tail));
  const quote_amount = readOptionalU64(data, tail);
  const virtual_quote_reserves = readOptionalU64(data, tail);
  const real_quote_reserves = readOptionalU64(data, tail);
  const holder_rewards_bps = readOptionalU64(data, tail);
  const holder_rewards = readOptionalU64(data, tail);
  const trade = {
    metadata,
    mint,
    sol_amount,
    token_amount,
    is_buy,
    is_created_buy: isCreatedBuy,
    user,
    timestamp,
    virtual_sol_reserves,
    virtual_token_reserves,
    real_sol_reserves,
    real_token_reserves,
    fee_recipient,
    fee_basis_points,
    fee,
    creator,
    creator_fee_basis_points,
    creator_fee,
    track_volume,
    total_unclaimed_tokens,
    total_claimed_tokens,
    current_sol_volume,
    last_update_timestamp,
    ix_name,
    mayhem_mode,
    cashback_fee_basis_points,
    cashback,
    buyback_fee_basis_points,
    buyback_fee,
    shareholders,
    quote_mint,
    quote_amount,
    virtual_quote_reserves,
    real_quote_reserves,
    holder_rewards_bps,
    holder_rewards,
    is_cashback_coin: cashback_fee_basis_points > 0n,
    bonding_curve: defaultPubkey(),
    associated_bonding_curve: defaultPubkey(),
    token_program: defaultPubkey(),
    creator_vault: defaultPubkey()
  };
  if (ix_name === "buy")
    return { PumpFunBuy: trade };
  if (ix_name === "sell")
    return { PumpFunSell: trade };
  if (ix_name === "buy_exact_sol_in") {
    return { PumpFunBuyExactSolIn: trade };
  }
  if (ix_name === "buy_exact_quote_in")
    return { PumpFunBuy: trade };
  return { PumpFunTrade: trade };
}
function parseCreateFromData(data, metadata) {
  let o = 0;
  const n1 = readBorshString(data, o);
  if (!n1)
    return null;
  o = n1.next;
  const n2 = readBorshString(data, o);
  if (!n2)
    return null;
  o = n2.next;
  const n3 = readBorshString(data, o);
  if (!n3)
    return null;
  o = n3.next;
  if (data.length < o + 32 * 4 + 8 * 5 + 32 + 1)
    return null;
  const mint = readPubkey(data, o);
  if (!mint)
    return null;
  o += 32;
  const bonding_curve = readPubkey(data, o);
  if (!bonding_curve)
    return null;
  o += 32;
  const user = readPubkey(data, o);
  if (!user)
    return null;
  o += 32;
  const creator = readPubkey(data, o);
  if (!creator)
    return null;
  o += 32;
  const timestamp = bnI64(readI64LE(data, o));
  o += 8;
  const virtual_token_reserves = bnU64(readU64LE(data, o));
  o += 8;
  const virtual_sol_reserves = bnU64(readU64LE(data, o));
  o += 8;
  const real_token_reserves = bnU64(readU64LE(data, o));
  o += 8;
  const token_total_supply = bnU64(readU64LE(data, o));
  o += 8;
  const token_program = o + 32 <= data.length ? readPubkey(data, o) : defaultPubkey();
  o += 32;
  const is_mayhem_mode = readBool(data, o) ?? false;
  o += 1;
  const is_cashback_enabled = readBool(data, o) ?? false;
  o += 1;
  const quote_mint = normalizePumpfunQuoteMint(o + 32 <= data.length ? readPubkey(data, o) : defaultPubkey());
  o += 32;
  const virtual_quote_reserves = o + 8 <= data.length ? bnU64(readU64LE(data, o)) : 0n;
  o += 8;
  const creator_fee_bps = o + 8 <= data.length ? bnU64(readU64LE(data, o)) : 0n;
  o += 8;
  const is_holder_reward = readBool(data, o) ?? false;
  const ev = {
    metadata,
    name: n1.s,
    symbol: n2.s,
    uri: n3.s,
    mint,
    bonding_curve,
    user,
    creator,
    timestamp,
    virtual_token_reserves,
    virtual_sol_reserves,
    real_token_reserves,
    token_total_supply,
    token_program,
    is_mayhem_mode,
    is_cashback_enabled,
    quote_mint,
    quote_vault: defaultPubkey(),
    quote_token_program: defaultPubkey(),
    virtual_quote_reserves,
    creator_fee_bps,
    is_holder_reward,
    ix_name: "create"
  };
  return { PumpFunCreate: ev };
}
function parseMigrateFromData(data, metadata) {
  if (data.length < 32 + 32 + 8 + 8 + 8 + 32 + 8 + 32)
    return null;
  let o = 0;
  const user = readPubkey(data, o);
  o += 32;
  const mint = readPubkey(data, o);
  o += 32;
  const mint_amount = bnU64(readU64LE(data, o));
  o += 8;
  const sol_amount = bnU64(readU64LE(data, o));
  o += 8;
  const pool_migration_fee = bnU64(readU64LE(data, o));
  o += 8;
  const bonding_curve = readPubkey(data, o);
  o += 32;
  const timestamp = bnI64(readI64LE(data, o));
  o += 8;
  const pool = readPubkey(data, o);
  const ev = {
    metadata,
    user,
    mint,
    mint_amount,
    sol_amount,
    pool_migration_fee,
    bonding_curve,
    timestamp,
    pool
  };
  return { PumpFunMigrate: ev };
}
function parseMigrateBondingCurveCreatorFromData(data, metadata) {
  if (data.length < 8 + 32 * 5)
    return null;
  let o = 0;
  const timestamp = bnI64(readI64LE(data, o));
  o += 8;
  const mint = readPubkey(data, o);
  if (!mint)
    return null;
  o += 32;
  const bonding_curve = readPubkey(data, o);
  if (!bonding_curve)
    return null;
  o += 32;
  const sharing_config = readPubkey(data, o);
  if (!sharing_config)
    return null;
  o += 32;
  const old_creator = readPubkey(data, o);
  if (!old_creator)
    return null;
  o += 32;
  const new_creator = readPubkey(data, o);
  if (!new_creator)
    return null;
  const ev = {
    metadata,
    timestamp,
    mint,
    bonding_curve,
    sharing_config,
    old_creator,
    new_creator
  };
  return { PumpFunMigrateBondingCurveCreator: ev };
}

// dist/logs/program_log_discriminators.js
function u64leDiscriminator(bytes) {
  const u8 = new Uint8Array(8);
  for (let i = 0; i < 8; i++)
    u8[i] = bytes[i];
  return new DataView(u8.buffer).getBigUint64(0, true);
}
var PUMPSWAP_DISC = {
  BUY: u64leDiscriminator([103, 244, 82, 31, 44, 245, 119, 119]),
  SELL: u64leDiscriminator([62, 47, 55, 10, 165, 3, 220, 42]),
  CREATE_POOL: u64leDiscriminator([177, 49, 12, 210, 160, 118, 167, 116]),
  ADD_LIQUIDITY: u64leDiscriminator([120, 248, 61, 83, 31, 142, 107, 144]),
  REMOVE_LIQUIDITY: u64leDiscriminator([22, 9, 133, 26, 160, 44, 71, 192])
};
var PROGRAM_LOG_DISC = {
  PUMPFUN_CREATE: u64leDiscriminator([27, 114, 169, 77, 222, 235, 99, 118]),
  PUMPFUN_TRADE: u64leDiscriminator([189, 219, 127, 211, 78, 230, 97, 238]),
  PUMPFUN_MIGRATE: u64leDiscriminator([189, 233, 93, 185, 92, 148, 234, 148]),
  PUMPFUN_MIGRATE_BONDING_CURVE_CREATOR: u64leDiscriminator([155, 167, 104, 220, 213, 108, 243, 3]),
  PUMP_FEES_CREATE_FEE_SHARING_CONFIG: u64leDiscriminator([133, 105, 170, 200, 184, 116, 251, 88]),
  PUMP_FEES_INITIALIZE_FEE_CONFIG: u64leDiscriminator([89, 138, 244, 230, 10, 56, 226, 126]),
  PUMP_FEES_RESET_FEE_SHARING_CONFIG: u64leDiscriminator([203, 204, 151, 226, 120, 55, 214, 243]),
  PUMP_FEES_REVOKE_FEE_SHARING_AUTHORITY: u64leDiscriminator([114, 23, 101, 60, 14, 190, 153, 62]),
  PUMP_FEES_TRANSFER_FEE_SHARING_AUTHORITY: u64leDiscriminator([124, 143, 198, 245, 77, 184, 8, 236]),
  PUMP_FEES_UPDATE_ADMIN: u64leDiscriminator([225, 152, 171, 87, 246, 63, 66, 234]),
  PUMP_FEES_UPDATE_FEE_CONFIG: u64leDiscriminator([90, 23, 65, 35, 62, 244, 188, 208]),
  PUMP_FEES_UPDATE_FEE_SHARES: u64leDiscriminator([21, 186, 196, 184, 91, 228, 225, 203]),
  PUMP_FEES_UPSERT_FEE_TIERS: u64leDiscriminator([171, 89, 169, 187, 122, 186, 33, 204]),
  PUMPSWAP_BUY: PUMPSWAP_DISC.BUY,
  PUMPSWAP_SELL: PUMPSWAP_DISC.SELL,
  PUMPSWAP_CREATE_POOL: PUMPSWAP_DISC.CREATE_POOL,
  PUMPSWAP_ADD_LIQUIDITY: PUMPSWAP_DISC.ADD_LIQUIDITY,
  PUMPSWAP_REMOVE_LIQUIDITY: PUMPSWAP_DISC.REMOVE_LIQUIDITY,
  RAYDIUM_CLMM_SWAP: u64leDiscriminator([64, 198, 205, 232, 38, 8, 113, 226]),
  RAYDIUM_CLMM_INCREASE_LIQUIDITY: u64leDiscriminator([49, 79, 105, 212, 32, 34, 30, 84]),
  RAYDIUM_CLMM_DECREASE_LIQUIDITY: u64leDiscriminator([58, 222, 86, 58, 68, 50, 85, 56]),
  RAYDIUM_CLMM_LIQUIDITY_CHANGE: u64leDiscriminator([126, 240, 175, 206, 158, 88, 153, 107]),
  RAYDIUM_CLMM_CONFIG_CHANGE: u64leDiscriminator([247, 189, 7, 119, 106, 112, 95, 151]),
  RAYDIUM_CLMM_CREATE_PERSONAL_POSITION: u64leDiscriminator([100, 30, 87, 249, 196, 223, 154, 206]),
  RAYDIUM_CLMM_LIQUIDITY_CALCULATE: u64leDiscriminator([237, 112, 148, 230, 57, 84, 180, 162]),
  RAYDIUM_CLMM_OPEN_LIMIT_ORDER: u64leDiscriminator([106, 24, 71, 85, 57, 169, 158, 216]),
  RAYDIUM_CLMM_INCREASE_LIMIT_ORDER: u64leDiscriminator([11, 120, 13, 204, 199, 87, 19, 200]),
  RAYDIUM_CLMM_DECREASE_LIMIT_ORDER: u64leDiscriminator([70, 48, 40, 221, 219, 237, 212, 163]),
  RAYDIUM_CLMM_SETTLE_LIMIT_ORDER: u64leDiscriminator([88, 119, 77, 164, 125, 124, 10, 194]),
  RAYDIUM_CLMM_UPDATE_REWARD_INFOS: u64leDiscriminator([109, 127, 186, 78, 114, 65, 37, 236]),
  RAYDIUM_CLMM_CREATE_POOL: u64leDiscriminator([25, 94, 75, 47, 112, 99, 53, 63]),
  RAYDIUM_CLMM_COLLECT_PERSONAL_FEE: u64leDiscriminator([166, 174, 105, 192, 81, 161, 83, 105]),
  RAYDIUM_CLMM_COLLECT_PROTOCOL_FEE: u64leDiscriminator([206, 87, 17, 79, 45, 41, 213, 61]),
  // Anchor event: `event:SwapEvent` (shared with CLMM; program context disambiguates it).
  RAYDIUM_CPMM_SWAP_EVENT: u64leDiscriminator([64, 198, 205, 232, 38, 8, 113, 226]),
  RAYDIUM_CPMM_SWAP_BASE_IN: u64leDiscriminator([143, 190, 90, 218, 196, 30, 51, 222]),
  RAYDIUM_CPMM_SWAP_BASE_OUT: u64leDiscriminator([55, 217, 98, 86, 163, 74, 180, 173]),
  RAYDIUM_CPMM_CREATE_POOL: u64leDiscriminator([233, 146, 209, 142, 207, 104, 64, 188]),
  RAYDIUM_CPMM_DEPOSIT: u64leDiscriminator([242, 35, 198, 137, 82, 225, 242, 182]),
  RAYDIUM_CPMM_WITHDRAW: u64leDiscriminator([183, 18, 70, 156, 148, 109, 161, 34]),
  RAYDIUM_AMM_SWAP_BASE_IN: u64leDiscriminator([0, 0, 0, 0, 0, 0, 0, 9]),
  RAYDIUM_AMM_SWAP_BASE_OUT: u64leDiscriminator([0, 0, 0, 0, 0, 0, 0, 11]),
  RAYDIUM_AMM_DEPOSIT: u64leDiscriminator([0, 0, 0, 0, 0, 0, 0, 3]),
  RAYDIUM_AMM_WITHDRAW: u64leDiscriminator([0, 0, 0, 0, 0, 0, 0, 4]),
  RAYDIUM_AMM_INITIALIZE2: u64leDiscriminator([0, 0, 0, 0, 0, 0, 0, 1]),
  RAYDIUM_AMM_WITHDRAW_PNL: u64leDiscriminator([0, 0, 0, 0, 0, 0, 0, 7]),
  ORCA_TRADED: u64leDiscriminator([225, 202, 73, 175, 147, 43, 160, 150]),
  ORCA_LIQUIDITY_INCREASED: u64leDiscriminator([30, 7, 144, 181, 102, 254, 155, 161]),
  ORCA_LIQUIDITY_DECREASED: u64leDiscriminator([166, 1, 36, 71, 112, 202, 181, 171]),
  ORCA_POOL_INITIALIZED: u64leDiscriminator([100, 118, 173, 87, 12, 198, 254, 229]),
  METEORA_AMM_SWAP: u64leDiscriminator([81, 108, 227, 190, 205, 208, 10, 196]),
  METEORA_AMM_ADD_LIQUIDITY: u64leDiscriminator([31, 94, 125, 90, 227, 52, 61, 186]),
  METEORA_AMM_REMOVE_LIQUIDITY: u64leDiscriminator([116, 244, 97, 232, 103, 31, 152, 58]),
  METEORA_AMM_BOOTSTRAP_LIQUIDITY: u64leDiscriminator([121, 127, 38, 136, 92, 55, 14, 247]),
  METEORA_AMM_POOL_CREATED: u64leDiscriminator([202, 44, 41, 88, 104, 220, 157, 82]),
  METEORA_AMM_SET_POOL_FEES: u64leDiscriminator([245, 26, 198, 164, 88, 18, 75, 9]),
  METEORA_DAMM_SWAP: u64leDiscriminator([27, 60, 21, 213, 138, 170, 187, 147]),
  METEORA_DAMM_SWAP2: u64leDiscriminator([189, 66, 51, 168, 38, 80, 117, 153]),
  METEORA_DAMM_ADD_LIQUIDITY: u64leDiscriminator([175, 242, 8, 157, 30, 247, 185, 169]),
  METEORA_DAMM_REMOVE_LIQUIDITY: u64leDiscriminator([87, 46, 88, 98, 175, 96, 34, 91]),
  METEORA_DAMM_LIQUIDITY_CHANGE: u64leDiscriminator([197, 171, 78, 127, 224, 211, 87, 13]),
  METEORA_DAMM_INITIALIZE_POOL: u64leDiscriminator([228, 50, 246, 85, 203, 66, 134, 37]),
  METEORA_DAMM_CREATE_POSITION: u64leDiscriminator([156, 15, 119, 198, 29, 181, 221, 55]),
  METEORA_DAMM_CLOSE_POSITION: u64leDiscriminator([20, 145, 144, 68, 143, 142, 214, 178]),
  METEORA_DAMM_UPDATE_DELEGATE_PERMISSION: u64leDiscriminator([66, 188, 75, 151, 150, 232, 87, 93]),
  METEORA_DAMM_WITHDRAW_DEAD_LIQUIDITY_REWARD: u64leDiscriminator([228, 66, 150, 195, 42, 62, 163, 13]),
  METEORA_DAMM_CREATE_CONFIG: u64leDiscriminator([131, 207, 180, 174, 180, 73, 165, 54]),
  METEORA_DAMM_CREATE_DYNAMIC_CONFIG: u64leDiscriminator([231, 197, 13, 164, 248, 213, 133, 152])
};

// dist/logs/pump_amm.js
function bn64(v) {
  return v ?? 0n;
}
function bnI642(v) {
  return v ?? 0n;
}
var ZP = defaultPubkey();
function emptyTradeTail() {
  return {
    cashback_fee_basis_points: 0n,
    cashback: 0n,
    buyback_fee_basis_points: 0n,
    buyback_fee: 0n,
    virtual_quote_reserves: 0n,
    can_boost: false,
    base_supply: 0n,
    holder_rewards_bps: 0n,
    holder_rewards: 0n
  };
}
function parseTradeTail(data) {
  const tail = emptyTradeTail();
  if (data.length === 0)
    return tail;
  if (data.length < 16)
    return null;
  tail.cashback_fee_basis_points = bn64(readU64LE(data, 0));
  tail.cashback = bn64(readU64LE(data, 8));
  if (data.length === 16)
    return tail;
  if (data.length < 32)
    return null;
  tail.buyback_fee_basis_points = bn64(readU64LE(data, 16));
  tail.buyback_fee = bn64(readU64LE(data, 24));
  if (data.length === 32)
    return tail;
  if (data.length < 57)
    return null;
  const virtual = readU128LE(data, 32);
  if (virtual === null)
    return null;
  tail.virtual_quote_reserves = BigInt.asIntN(128, virtual);
  const canBoost = readU8(data, 48);
  if (canBoost !== 0 && canBoost !== 1)
    return null;
  tail.can_boost = canBoost === 1;
  tail.base_supply = bn64(readU64LE(data, 49));
  if (data.length !== 57 && data.length < 73)
    return null;
  if (data.length >= 73) {
    tail.holder_rewards_bps = bn64(readU64LE(data, 57));
    tail.holder_rewards = bn64(readU64LE(data, 65));
  }
  return tail;
}
function readStrictBorshString(data, offset) {
  const len = readU32LE(data, offset);
  if (len === null || offset + 4 + len > data.length)
    return null;
  try {
    const value = new TextDecoder("utf-8", { fatal: true }).decode(data.subarray(offset + 4, offset + 4 + len));
    return { value, next: offset + 4 + len };
  } catch {
    return null;
  }
}
function parseBuyFromData(data, metadata) {
  const LEGACY_LEN = 16 * 8 + 7 * 32 + 1 + 4 * 8;
  const MIN_REQUIRED_LEN = LEGACY_LEN + 8 + 4;
  if (data.length !== LEGACY_LEN && data.length < MIN_REQUIRED_LEN)
    return null;
  if (data[352] !== 0 && data[352] !== 1)
    return null;
  let o = 0;
  const timestamp = bnI642(readI64LE(data, o));
  o += 8;
  const base_amount_out = bn64(readU64LE(data, o));
  o += 8;
  const max_quote_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const user_base_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const user_quote_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const pool_base_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const pool_quote_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const quote_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const lp_fee_basis_points = bn64(readU64LE(data, o));
  o += 8;
  const lp_fee = bn64(readU64LE(data, o));
  o += 8;
  const protocol_fee_basis_points = bn64(readU64LE(data, o));
  o += 8;
  const protocol_fee = bn64(readU64LE(data, o));
  o += 8;
  const quote_amount_in_with_lp_fee = bn64(readU64LE(data, o));
  o += 8;
  const user_quote_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const pool = readPubkey(data, o);
  o += 32;
  const user = readPubkey(data, o);
  o += 32;
  const user_base_token_account = readPubkey(data, o);
  o += 32;
  const user_quote_token_account = readPubkey(data, o);
  o += 32;
  const protocol_fee_recipient = readPubkey(data, o);
  o += 32;
  const protocol_fee_recipient_token_account = readPubkey(data, o);
  o += 32;
  const coin_creator = readPubkey(data, o);
  o += 32;
  const coin_creator_fee_basis_points = bn64(readU64LE(data, o));
  o += 8;
  const coin_creator_fee = bn64(readU64LE(data, o));
  o += 8;
  const track_volume = data[o] === 1;
  o += 1;
  const total_unclaimed_tokens = bn64(readU64LE(data, o));
  o += 8;
  const total_claimed_tokens = bn64(readU64LE(data, o));
  o += 8;
  const current_sol_volume = bn64(readU64LE(data, o));
  o += 8;
  const last_update_timestamp = bnI642(readI64LE(data, o));
  o += 8;
  let min_base_amount_out = 0n;
  let ix_name = "";
  let tail = emptyTradeTail();
  if (data.length !== LEGACY_LEN) {
    min_base_amount_out = bn64(readU64LE(data, o));
    o += 8;
    const name = readStrictBorshString(data, o);
    if (name === null)
      return null;
    ix_name = name.value;
    o = name.next;
    const parsedTail = parseTradeTail(data.subarray(o));
    if (parsedTail === null)
      return null;
    tail = parsedTail;
  }
  const ev = {
    metadata,
    timestamp,
    base_amount_out,
    max_quote_amount_in,
    user_base_token_reserves,
    user_quote_token_reserves,
    pool_base_token_reserves,
    pool_quote_token_reserves,
    quote_amount_in,
    lp_fee_basis_points,
    lp_fee,
    protocol_fee_basis_points,
    protocol_fee,
    quote_amount_in_with_lp_fee,
    user_quote_amount_in,
    pool,
    user,
    user_base_token_account,
    user_quote_token_account,
    protocol_fee_recipient,
    protocol_fee_recipient_token_account,
    coin_creator,
    coin_creator_fee_basis_points,
    coin_creator_fee,
    track_volume,
    total_unclaimed_tokens,
    total_claimed_tokens,
    current_sol_volume,
    last_update_timestamp,
    min_base_amount_out,
    ix_name,
    cashback_fee_basis_points: tail.cashback_fee_basis_points,
    cashback: tail.cashback,
    buyback_fee_basis_points: tail.buyback_fee_basis_points,
    buyback_fee: tail.buyback_fee,
    virtual_quote_reserves: tail.virtual_quote_reserves,
    can_boost: tail.can_boost,
    base_supply: tail.base_supply,
    holder_rewards_bps: tail.holder_rewards_bps,
    holder_rewards: tail.holder_rewards,
    is_pump_pool: false,
    base_mint: ZP,
    quote_mint: ZP,
    pool_base_token_account: ZP,
    pool_quote_token_account: ZP,
    coin_creator_vault_ata: ZP,
    coin_creator_vault_authority: ZP,
    base_token_program: ZP,
    quote_token_program: ZP
  };
  return { PumpSwapBuy: ev };
}
function parseSellFromData(data, metadata) {
  const REQUIRED = 14 * 8 + 7 * 32 + 2 * 8;
  if (data.length < REQUIRED)
    return null;
  const tail = parseTradeTail(data.subarray(REQUIRED));
  if (tail === null)
    return null;
  let o = 0;
  const timestamp = bnI642(readI64LE(data, o));
  o += 8;
  const base_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const min_quote_amount_out = bn64(readU64LE(data, o));
  o += 8;
  const user_base_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const user_quote_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const pool_base_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const pool_quote_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const quote_amount_out = bn64(readU64LE(data, o));
  o += 8;
  const lp_fee_basis_points = bn64(readU64LE(data, o));
  o += 8;
  const lp_fee = bn64(readU64LE(data, o));
  o += 8;
  const protocol_fee_basis_points = bn64(readU64LE(data, o));
  o += 8;
  const protocol_fee = bn64(readU64LE(data, o));
  o += 8;
  const quote_amount_out_without_lp_fee = bn64(readU64LE(data, o));
  o += 8;
  const user_quote_amount_out = bn64(readU64LE(data, o));
  o += 8;
  const pool = readPubkey(data, o);
  o += 32;
  const user = readPubkey(data, o);
  o += 32;
  const user_base_token_account = readPubkey(data, o);
  o += 32;
  const user_quote_token_account = readPubkey(data, o);
  o += 32;
  const protocol_fee_recipient = readPubkey(data, o);
  o += 32;
  const protocol_fee_recipient_token_account = readPubkey(data, o);
  o += 32;
  const coin_creator = readPubkey(data, o);
  o += 32;
  const coin_creator_fee_basis_points = bn64(readU64LE(data, o));
  o += 8;
  const coin_creator_fee = bn64(readU64LE(data, o));
  o += 8;
  const ev = {
    metadata,
    timestamp,
    base_amount_in,
    min_quote_amount_out,
    user_base_token_reserves,
    user_quote_token_reserves,
    pool_base_token_reserves,
    pool_quote_token_reserves,
    quote_amount_out,
    lp_fee_basis_points,
    lp_fee,
    protocol_fee_basis_points,
    protocol_fee,
    quote_amount_out_without_lp_fee,
    user_quote_amount_out,
    pool,
    user,
    user_base_token_account,
    user_quote_token_account,
    protocol_fee_recipient,
    protocol_fee_recipient_token_account,
    coin_creator,
    coin_creator_fee_basis_points,
    coin_creator_fee,
    cashback_fee_basis_points: tail.cashback_fee_basis_points,
    cashback: tail.cashback,
    buyback_fee_basis_points: tail.buyback_fee_basis_points,
    buyback_fee: tail.buyback_fee,
    virtual_quote_reserves: tail.virtual_quote_reserves,
    can_boost: tail.can_boost,
    base_supply: tail.base_supply,
    holder_rewards_bps: tail.holder_rewards_bps,
    holder_rewards: tail.holder_rewards,
    is_pump_pool: false,
    base_mint: ZP,
    quote_mint: ZP,
    pool_base_token_account: ZP,
    pool_quote_token_account: ZP,
    coin_creator_vault_ata: ZP,
    coin_creator_vault_authority: ZP,
    base_token_program: ZP,
    quote_token_program: ZP
  };
  return { PumpSwapSell: ev };
}
function parseCreatePoolFromData(data, metadata) {
  const REQUIRED = 326;
  if (data.length < REQUIRED)
    return null;
  if (data.length !== REQUIRED && data.length < 335)
    return null;
  let o = 0;
  const timestamp = bnI642(readI64LE(data, o));
  o += 8;
  const index = readU16LE(data, o);
  o += 2;
  const creator = readPubkey(data, o);
  o += 32;
  const base_mint = readPubkey(data, o);
  o += 32;
  const quote_mint = readPubkey(data, o);
  o += 32;
  const base_mint_decimals = readU8(data, o);
  o += 1;
  const quote_mint_decimals = readU8(data, o);
  o += 1;
  const base_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const quote_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const pool_base_amount = bn64(readU64LE(data, o));
  o += 8;
  const pool_quote_amount = bn64(readU64LE(data, o));
  o += 8;
  const minimum_liquidity = bn64(readU64LE(data, o));
  o += 8;
  const initial_liquidity = bn64(readU64LE(data, o));
  o += 8;
  const lp_token_amount_out = bn64(readU64LE(data, o));
  o += 8;
  const pool_bump = readU8(data, o);
  o += 1;
  const pool = readPubkey(data, o);
  o += 32;
  const lp_mint = readPubkey(data, o);
  o += 32;
  const user_base_token_account = readPubkey(data, o);
  o += 32;
  const user_quote_token_account = readPubkey(data, o);
  o += 32;
  const coin_creator = readPubkey(data, o);
  o += 32;
  const is_mayhem_mode = data.length > 325 && readBool(data, 325) === true;
  const creator_fee_bps = data.length >= 334 ? bn64(readU64LE(data, 326)) : 0n;
  const can_edit_creator_fee = data.length > 334 && readBool(data, 334) === true;
  const is_holder_reward = data.length > 335 && readBool(data, 335) === true;
  const ev = {
    metadata,
    timestamp,
    index,
    creator,
    base_mint,
    quote_mint,
    base_mint_decimals,
    quote_mint_decimals,
    base_amount_in,
    quote_amount_in,
    pool_base_amount,
    pool_quote_amount,
    minimum_liquidity,
    initial_liquidity,
    lp_token_amount_out,
    pool_bump,
    pool,
    lp_mint,
    user_base_token_account,
    user_quote_token_account,
    coin_creator,
    is_mayhem_mode,
    is_cashback_coin: false,
    creator_fee_bps,
    can_edit_creator_fee,
    is_holder_reward
  };
  return { PumpSwapCreatePool: ev };
}
function parseAddLiquidityFromData(data, metadata) {
  const REQUIRED = 10 * 8 + 5 * 32;
  if (data.length < REQUIRED)
    return null;
  let o = 0;
  const timestamp = bnI642(readI64LE(data, o));
  o += 8;
  const lp_token_amount_out = bn64(readU64LE(data, o));
  o += 8;
  const max_base_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const max_quote_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const user_base_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const user_quote_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const pool_base_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const pool_quote_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const base_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const quote_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const lp_mint_supply = bn64(readU64LE(data, o));
  o += 8;
  const pool = readPubkey(data, o);
  o += 32;
  const user = readPubkey(data, o);
  o += 32;
  const user_base_token_account = readPubkey(data, o);
  o += 32;
  const user_quote_token_account = readPubkey(data, o);
  o += 32;
  const user_pool_token_account = readPubkey(data, o);
  const ev = {
    metadata,
    timestamp,
    lp_token_amount_out,
    max_base_amount_in,
    max_quote_amount_in,
    user_base_token_reserves,
    user_quote_token_reserves,
    pool_base_token_reserves,
    pool_quote_token_reserves,
    base_amount_in,
    quote_amount_in,
    lp_mint_supply,
    pool,
    user,
    user_base_token_account,
    user_quote_token_account,
    user_pool_token_account
  };
  return { PumpSwapLiquidityAdded: ev };
}
function parseRemoveLiquidityFromData(data, metadata) {
  const REQUIRED = 10 * 8 + 5 * 32;
  if (data.length < REQUIRED)
    return null;
  let o = 0;
  const timestamp = bnI642(readI64LE(data, o));
  o += 8;
  const lp_token_amount_in = bn64(readU64LE(data, o));
  o += 8;
  const min_base_amount_out = bn64(readU64LE(data, o));
  o += 8;
  const min_quote_amount_out = bn64(readU64LE(data, o));
  o += 8;
  const user_base_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const user_quote_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const pool_base_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const pool_quote_token_reserves = bn64(readU64LE(data, o));
  o += 8;
  const base_amount_out = bn64(readU64LE(data, o));
  o += 8;
  const quote_amount_out = bn64(readU64LE(data, o));
  o += 8;
  const lp_mint_supply = bn64(readU64LE(data, o));
  o += 8;
  const pool = readPubkey(data, o);
  o += 32;
  const user = readPubkey(data, o);
  o += 32;
  const user_base_token_account = readPubkey(data, o);
  o += 32;
  const user_quote_token_account = readPubkey(data, o);
  o += 32;
  const user_pool_token_account = readPubkey(data, o);
  const ev = {
    metadata,
    timestamp,
    lp_token_amount_in,
    min_base_amount_out,
    min_quote_amount_out,
    user_base_token_reserves,
    user_quote_token_reserves,
    pool_base_token_reserves,
    pool_quote_token_reserves,
    base_amount_out,
    quote_amount_out,
    lp_mint_supply,
    pool,
    user,
    user_base_token_account,
    user_quote_token_account,
    user_pool_token_account
  };
  return { PumpSwapLiquidityRemoved: ev };
}

// dist/logs/pump_fees.js
var MAX_SHAREHOLDERS = 64;
var MAX_FEE_TIERS = 64;
function bnI643(v) {
  return v ?? 0n;
}
function bnU642(v) {
  return v ?? 0n;
}
function readFeesAt(data, offset) {
  if (offset + 24 > data.length)
    return null;
  const lp_fee_bps = bnU642(readU64LE(data, offset));
  offset += 8;
  const protocol_fee_bps = bnU642(readU64LE(data, offset));
  offset += 8;
  const creator_fee_bps = bnU642(readU64LE(data, offset));
  offset += 8;
  return { value: { lp_fee_bps, protocol_fee_bps, creator_fee_bps }, next: offset };
}
function readShareholdersVec(data, offset) {
  const n = readU32LE(data, offset);
  if (n === null || n > MAX_SHAREHOLDERS)
    return null;
  offset += 4;
  const value = [];
  for (let i = 0; i < n; i++) {
    const address = readPubkey(data, offset);
    if (!address)
      return null;
    offset += 32;
    const share_bps = readU16LE(data, offset);
    if (share_bps === null)
      return null;
    offset += 2;
    value.push({ address, share_bps });
  }
  return { value, next: offset };
}
function readFeeTiersVec(data, offset) {
  const n = readU32LE(data, offset);
  if (n === null || n > MAX_FEE_TIERS)
    return null;
  offset += 4;
  const value = [];
  for (let i = 0; i < n; i++) {
    const market_cap_lamports_threshold = readU128LE(data, offset);
    if (market_cap_lamports_threshold === null)
      return null;
    offset += 16;
    const fees = readFeesAt(data, offset);
    if (!fees)
      return null;
    offset = fees.next;
    value.push({ market_cap_lamports_threshold, fees: fees.value });
  }
  return { value, next: offset };
}
function readOptionPubkeyAt(data, offset) {
  const tag = readU8(data, offset);
  if (tag === null)
    return null;
  offset += 1;
  if (tag === 0)
    return { value: void 0, next: offset };
  if (tag !== 1)
    return null;
  const value = readPubkey(data, offset);
  if (!value)
    return null;
  return { value, next: offset + 32 };
}
function readConfigStatusAt(data, offset) {
  const tag = readU8(data, offset);
  if (tag === null)
    return null;
  if (tag === 0)
    return { value: "Paused", next: offset + 1 };
  if (tag === 1)
    return { value: "Active", next: offset + 1 };
  return null;
}
function parseCreateFeeSharingConfigFromData(data, metadata) {
  let o = 0;
  const timestamp = bnI643(readI64LE(data, o));
  if (o + 8 > data.length)
    return null;
  o += 8;
  const mint = readPubkey(data, o);
  if (!mint)
    return null;
  o += 32;
  const bonding_curve = readPubkey(data, o);
  if (!bonding_curve)
    return null;
  o += 32;
  const pool = readOptionPubkeyAt(data, o);
  if (!pool)
    return null;
  o = pool.next;
  const sharing_config = readPubkey(data, o);
  if (!sharing_config)
    return null;
  o += 32;
  const admin = readPubkey(data, o);
  if (!admin)
    return null;
  o += 32;
  const initial_shareholders = readShareholdersVec(data, o);
  if (!initial_shareholders)
    return null;
  o = initial_shareholders.next;
  const status = readConfigStatusAt(data, o);
  if (!status)
    return null;
  o = status.next;
  if (o !== data.length)
    return null;
  return {
    PumpFeesCreateFeeSharingConfig: {
      metadata,
      timestamp,
      mint,
      bonding_curve,
      pool: pool.value,
      sharing_config,
      admin,
      initial_shareholders: initial_shareholders.value,
      status: status.value
    }
  };
}
function parseInitializeFeeConfigFromData(data, metadata) {
  if (data.length !== 8 + 32 + 32)
    return null;
  let o = 0;
  const timestamp = bnI643(readI64LE(data, o));
  o += 8;
  const admin = readPubkey(data, o);
  if (!admin)
    return null;
  o += 32;
  const fee_config = readPubkey(data, o);
  if (!fee_config)
    return null;
  return { PumpFeesInitializeFeeConfig: { metadata, timestamp, admin, fee_config } };
}
function parseResetFeeSharingConfigFromData(data, metadata) {
  let o = 0;
  const timestamp = bnI643(readI64LE(data, o));
  if (o + 8 > data.length)
    return null;
  o += 8;
  const mint = readPubkey(data, o);
  if (!mint)
    return null;
  o += 32;
  const sharing_config = readPubkey(data, o);
  if (!sharing_config)
    return null;
  o += 32;
  const old_admin = readPubkey(data, o);
  if (!old_admin)
    return null;
  o += 32;
  const old_shareholders = readShareholdersVec(data, o);
  if (!old_shareholders)
    return null;
  o = old_shareholders.next;
  const new_admin = readPubkey(data, o);
  if (!new_admin)
    return null;
  o += 32;
  const new_shareholders = readShareholdersVec(data, o);
  if (!new_shareholders)
    return null;
  o = new_shareholders.next;
  if (o !== data.length)
    return null;
  return {
    PumpFeesResetFeeSharingConfig: {
      metadata,
      timestamp,
      mint,
      sharing_config,
      old_admin,
      old_shareholders: old_shareholders.value,
      new_admin,
      new_shareholders: new_shareholders.value
    }
  };
}
function parseRevokeFeeSharingAuthorityFromData(data, metadata) {
  if (data.length !== 8 + 32 + 32 + 32)
    return null;
  let o = 0;
  const timestamp = bnI643(readI64LE(data, o));
  o += 8;
  const mint = readPubkey(data, o);
  if (!mint)
    return null;
  o += 32;
  const sharing_config = readPubkey(data, o);
  if (!sharing_config)
    return null;
  o += 32;
  const admin = readPubkey(data, o);
  if (!admin)
    return null;
  return { PumpFeesRevokeFeeSharingAuthority: { metadata, timestamp, mint, sharing_config, admin } };
}
function parseTransferFeeSharingAuthorityFromData(data, metadata) {
  if (data.length !== 8 + 32 + 32 + 32 + 32)
    return null;
  let o = 0;
  const timestamp = bnI643(readI64LE(data, o));
  o += 8;
  const mint = readPubkey(data, o);
  if (!mint)
    return null;
  o += 32;
  const sharing_config = readPubkey(data, o);
  if (!sharing_config)
    return null;
  o += 32;
  const old_admin = readPubkey(data, o);
  if (!old_admin)
    return null;
  o += 32;
  const new_admin = readPubkey(data, o);
  if (!new_admin)
    return null;
  return {
    PumpFeesTransferFeeSharingAuthority: { metadata, timestamp, mint, sharing_config, old_admin, new_admin }
  };
}
function parseUpdateAdminFromData(data, metadata) {
  if (data.length !== 8 + 32 + 32)
    return null;
  let o = 0;
  const timestamp = bnI643(readI64LE(data, o));
  o += 8;
  const old_admin = readPubkey(data, o);
  if (!old_admin)
    return null;
  o += 32;
  const new_admin = readPubkey(data, o);
  if (!new_admin)
    return null;
  return { PumpFeesUpdateAdmin: { metadata, timestamp, old_admin, new_admin } };
}
function parseUpdateFeeConfigFromData(data, metadata) {
  let o = 0;
  const timestamp = bnI643(readI64LE(data, o));
  if (o + 8 > data.length)
    return null;
  o += 8;
  const admin = readPubkey(data, o);
  if (!admin)
    return null;
  o += 32;
  const fee_config = readPubkey(data, o);
  if (!fee_config)
    return null;
  o += 32;
  const fee_tiers = readFeeTiersVec(data, o);
  if (!fee_tiers)
    return null;
  o = fee_tiers.next;
  const flat_fees = readFeesAt(data, o);
  if (!flat_fees)
    return null;
  o = flat_fees.next;
  if (o !== data.length)
    return null;
  return {
    PumpFeesUpdateFeeConfig: {
      metadata,
      timestamp,
      admin,
      fee_config,
      fee_tiers: fee_tiers.value,
      flat_fees: flat_fees.value
    }
  };
}
function parseUpdateFeeSharesFromData(data, metadata) {
  let o = 0;
  const timestamp = bnI643(readI64LE(data, o));
  if (o + 8 > data.length)
    return null;
  o += 8;
  const mint = readPubkey(data, o);
  if (!mint)
    return null;
  o += 32;
  const sharing_config = readPubkey(data, o);
  if (!sharing_config)
    return null;
  o += 32;
  const admin = readPubkey(data, o);
  if (!admin)
    return null;
  o += 32;
  const new_shareholders = readShareholdersVec(data, o);
  if (!new_shareholders)
    return null;
  o = new_shareholders.next;
  if (o !== data.length)
    return null;
  return {
    PumpFeesUpdateFeeShares: {
      metadata,
      timestamp,
      mint,
      sharing_config,
      admin,
      bonding_curve: defaultPubkey(),
      pump_creator_vault: defaultPubkey(),
      new_shareholders: new_shareholders.value
    }
  };
}
function parseUpsertFeeTiersFromData(data, metadata) {
  let o = 0;
  const timestamp = bnI643(readI64LE(data, o));
  if (o + 8 > data.length)
    return null;
  o += 8;
  const admin = readPubkey(data, o);
  if (!admin)
    return null;
  o += 32;
  const fee_config = readPubkey(data, o);
  if (!fee_config)
    return null;
  o += 32;
  const fee_tiers = readFeeTiersVec(data, o);
  if (!fee_tiers)
    return null;
  o = fee_tiers.next;
  const offset = readU8(data, o);
  if (offset === null)
    return null;
  o += 1;
  if (o !== data.length)
    return null;
  return { PumpFeesUpsertFeeTiers: { metadata, timestamp, admin, fee_config, fee_tiers: fee_tiers.value, offset } };
}

// dist/logs/raydium_clmm.js
function bn642(v) {
  return v ?? 0n;
}
function parseSwapFromData(data, metadata) {
  let o = 0;
  const pool_state = readPubkey(data, o);
  if (!pool_state)
    return null;
  o += 32;
  const sender = readPubkey(data, o);
  if (!sender)
    return null;
  o += 32;
  const token_account_0 = readPubkey(data, o);
  if (!token_account_0)
    return null;
  o += 32;
  const token_account_1 = readPubkey(data, o);
  if (!token_account_1)
    return null;
  o += 32;
  const amount_0 = readU64LE(data, o);
  if (amount_0 === null)
    return null;
  o += 8;
  const transfer_fee_0 = readU64LE(data, o);
  if (transfer_fee_0 === null)
    return null;
  o += 8;
  const amount_1 = readU64LE(data, o);
  if (amount_1 === null)
    return null;
  o += 8;
  const transfer_fee_1 = readU64LE(data, o);
  if (transfer_fee_1 === null)
    return null;
  o += 8;
  const zero_for_one = readBool(data, o);
  if (zero_for_one === null)
    return null;
  o += 1;
  const sqrt_price_x64 = readU128LE(data, o);
  if (sqrt_price_x64 === null)
    return null;
  o += 16;
  const liquidity = readU128LE(data, o);
  if (liquidity === null)
    return null;
  o += 16;
  const tick = readI32LE(data, o);
  if (tick === null)
    return null;
  const ev = {
    metadata,
    pool_state,
    token_account_0,
    token_account_1,
    amount_0,
    amount_1,
    zero_for_one,
    sqrt_price_x64,
    liquidity,
    sender,
    transfer_fee_0,
    transfer_fee_1,
    tick
  };
  return { RaydiumClmmSwap: ev };
}
function parseIncreaseLiquidityFromData(data, metadata) {
  let o = 0;
  const position_nft_mint = readPubkey(data, o);
  if (!position_nft_mint)
    return null;
  o += 32;
  const liquidity = readU128LE(data, o);
  if (liquidity === null)
    return null;
  o += 16;
  const amount_0 = readU64LE(data, o);
  if (amount_0 === null)
    return null;
  o += 8;
  const amount_1 = readU64LE(data, o);
  if (amount_1 === null)
    return null;
  o += 8;
  const amount_0_transfer_fee = readU64LE(data, o);
  if (amount_0_transfer_fee === null)
    return null;
  o += 8;
  const amount_1_transfer_fee = readU64LE(data, o);
  if (amount_1_transfer_fee === null)
    return null;
  const ev = {
    metadata,
    pool: defaultPubkey(),
    position_nft_mint,
    user: defaultPubkey(),
    liquidity,
    amount_0,
    amount_1,
    amount_0_transfer_fee,
    amount_1_transfer_fee,
    amount0_max: 0n,
    amount1_max: 0n
  };
  return { RaydiumClmmIncreaseLiquidity: ev };
}
function parseDecreaseLiquidityFromData(data, metadata) {
  let o = 0;
  const position_nft_mint = readPubkey(data, o);
  if (!position_nft_mint)
    return null;
  o += 32;
  const liquidity = readU128LE(data, o);
  if (liquidity === null)
    return null;
  o += 16;
  const decrease_amount_0 = readU64LE(data, o);
  if (decrease_amount_0 === null)
    return null;
  o += 8;
  const decrease_amount_1 = readU64LE(data, o);
  if (decrease_amount_1 === null)
    return null;
  o += 8;
  const fee_amount_0 = readU64LE(data, o);
  if (fee_amount_0 === null)
    return null;
  o += 8;
  const fee_amount_1 = readU64LE(data, o);
  if (fee_amount_1 === null)
    return null;
  o += 8;
  const reward_amount_0 = readU64LE(data, o);
  if (reward_amount_0 === null)
    return null;
  o += 8;
  const reward_amount_1 = readU64LE(data, o);
  if (reward_amount_1 === null)
    return null;
  o += 8;
  const reward_amount_2 = readU64LE(data, o);
  if (reward_amount_2 === null)
    return null;
  o += 8;
  const transfer_fee_0 = readU64LE(data, o);
  if (transfer_fee_0 === null)
    return null;
  o += 8;
  const transfer_fee_1 = readU64LE(data, o);
  if (transfer_fee_1 === null)
    return null;
  const ev = {
    metadata,
    pool: defaultPubkey(),
    position_nft_mint,
    user: defaultPubkey(),
    liquidity,
    decrease_amount_0,
    decrease_amount_1,
    fee_amount_0,
    fee_amount_1,
    reward_amounts: [reward_amount_0, reward_amount_1, reward_amount_2],
    transfer_fee_0,
    transfer_fee_1,
    amount0_min: 0n,
    amount1_min: 0n
  };
  return { RaydiumClmmDecreaseLiquidity: ev };
}
function parseCreatePoolFromData2(data, metadata) {
  let o = 0;
  const token_0_mint = readPubkey(data, o);
  if (!token_0_mint)
    return null;
  o += 32;
  const token_1_mint = readPubkey(data, o);
  if (!token_1_mint)
    return null;
  o += 32;
  const tick_spacing = readU16LE(data, o);
  if (tick_spacing === null)
    return null;
  o += 2;
  const pool = readPubkey(data, o);
  if (!pool)
    return null;
  o += 32;
  const sqrt_price_x64 = readU128LE(data, o);
  if (sqrt_price_x64 === null)
    return null;
  o += 16;
  const tick = readI32LE(data, o);
  if (tick === null)
    return null;
  o += 4;
  const token_vault_0 = readPubkey(data, o);
  if (!token_vault_0)
    return null;
  o += 32;
  const token_vault_1 = readPubkey(data, o);
  if (!token_vault_1)
    return null;
  const ev = {
    metadata,
    pool,
    token_0_mint,
    token_1_mint,
    tick_spacing,
    fee_rate: 0,
    creator: defaultPubkey(),
    sqrt_price_x64,
    tick,
    token_vault_0,
    token_vault_1,
    open_time: 0n
  };
  return { RaydiumClmmCreatePool: ev };
}
function parseCollectPersonalFeeFromData(data, metadata) {
  let o = 0;
  const position_nft_mint = readPubkey(data, o);
  if (!position_nft_mint)
    return null;
  o += 32;
  const recipient_token_account_0 = readPubkey(data, o);
  if (!recipient_token_account_0)
    return null;
  o += 32;
  const recipient_token_account_1 = readPubkey(data, o);
  if (!recipient_token_account_1)
    return null;
  o += 32;
  const amount_0 = bn642(readU64LE(data, o));
  o += 8;
  const amount_1 = bn642(readU64LE(data, o));
  const ev = {
    metadata,
    pool_state: defaultPubkey(),
    position_nft_mint,
    recipient_token_account_0,
    recipient_token_account_1,
    amount_0,
    amount_1
  };
  return { RaydiumClmmCollectFee: ev };
}
function parseCollectProtocolFeeFromData(data, metadata) {
  let o = 0;
  const pool_state = readPubkey(data, o);
  if (!pool_state)
    return null;
  o += 32;
  const recipient_token_account_0 = readPubkey(data, o);
  if (!recipient_token_account_0)
    return null;
  o += 32;
  const recipient_token_account_1 = readPubkey(data, o);
  if (!recipient_token_account_1)
    return null;
  o += 32;
  const amount_0 = bn642(readU64LE(data, o));
  o += 8;
  const amount_1 = bn642(readU64LE(data, o));
  const ev = {
    metadata,
    pool_state,
    position_nft_mint: defaultPubkey(),
    recipient_token_account_0,
    recipient_token_account_1,
    amount_0,
    amount_1
  };
  return { RaydiumClmmCollectFee: ev };
}
function parseLiquidityChangeFromData(data, metadata) {
  let o = 0;
  const pool_state = readPubkey(data, o);
  if (!pool_state)
    return null;
  o += 32;
  const tick = readI32LE(data, o);
  if (tick === null)
    return null;
  o += 4;
  const tick_lower = readI32LE(data, o);
  if (tick_lower === null)
    return null;
  o += 4;
  const tick_upper = readI32LE(data, o);
  if (tick_upper === null)
    return null;
  o += 4;
  const liquidity_before = readU128LE(data, o);
  if (liquidity_before === null)
    return null;
  o += 16;
  const liquidity_after = readU128LE(data, o);
  if (liquidity_after === null)
    return null;
  const ev = {
    metadata,
    pool_state,
    tick,
    tick_lower,
    tick_upper,
    liquidity_before,
    liquidity_after
  };
  return { RaydiumClmmLiquidityChange: ev };
}
function parseConfigChangeFromData(data, metadata) {
  let o = 0;
  const index = readU16LE(data, o);
  if (index === null)
    return null;
  o += 2;
  const owner = readPubkey(data, o);
  if (!owner)
    return null;
  o += 32;
  const protocol_fee_rate = readU32LE(data, o);
  if (protocol_fee_rate === null)
    return null;
  o += 4;
  const trade_fee_rate = readU32LE(data, o);
  if (trade_fee_rate === null)
    return null;
  o += 4;
  const tick_spacing = readU16LE(data, o);
  if (tick_spacing === null)
    return null;
  o += 2;
  const fund_fee_rate = readU32LE(data, o);
  if (fund_fee_rate === null)
    return null;
  o += 4;
  const fund_owner = readPubkey(data, o);
  if (!fund_owner)
    return null;
  const ev = {
    metadata,
    index,
    owner,
    protocol_fee_rate,
    trade_fee_rate,
    tick_spacing,
    fund_fee_rate,
    fund_owner
  };
  return { RaydiumClmmConfigChange: ev };
}
function parseCreatePersonalPositionFromData(data, metadata) {
  let o = 0;
  const pool_state = readPubkey(data, o);
  if (!pool_state)
    return null;
  o += 32;
  const minter = readPubkey(data, o);
  if (!minter)
    return null;
  o += 32;
  const nft_owner = readPubkey(data, o);
  if (!nft_owner)
    return null;
  o += 32;
  const tick_lower_index = readI32LE(data, o);
  if (tick_lower_index === null)
    return null;
  o += 4;
  const tick_upper_index = readI32LE(data, o);
  if (tick_upper_index === null)
    return null;
  o += 4;
  const liquidity = readU128LE(data, o);
  if (liquidity === null)
    return null;
  o += 16;
  const deposit_amount_0 = bn642(readU64LE(data, o));
  o += 8;
  const deposit_amount_1 = bn642(readU64LE(data, o));
  o += 8;
  const deposit_amount_0_transfer_fee = bn642(readU64LE(data, o));
  o += 8;
  const deposit_amount_1_transfer_fee = readU64LE(data, o);
  if (deposit_amount_1_transfer_fee === null)
    return null;
  const ev = {
    metadata,
    pool_state,
    minter,
    nft_owner,
    tick_lower_index,
    tick_upper_index,
    liquidity,
    deposit_amount_0,
    deposit_amount_1,
    deposit_amount_0_transfer_fee,
    deposit_amount_1_transfer_fee
  };
  return { RaydiumClmmCreatePersonalPosition: ev };
}
function parseLiquidityCalculateFromData(data, metadata) {
  let o = 0;
  const pool_liquidity = readU128LE(data, o);
  if (pool_liquidity === null)
    return null;
  o += 16;
  const pool_sqrt_price_x64 = readU128LE(data, o);
  if (pool_sqrt_price_x64 === null)
    return null;
  o += 16;
  const pool_tick = readI32LE(data, o);
  if (pool_tick === null)
    return null;
  o += 4;
  const calc_amount_0 = bn642(readU64LE(data, o));
  o += 8;
  const calc_amount_1 = bn642(readU64LE(data, o));
  o += 8;
  const trade_fee_owed_0 = bn642(readU64LE(data, o));
  o += 8;
  const trade_fee_owed_1 = bn642(readU64LE(data, o));
  o += 8;
  const transfer_fee_0 = bn642(readU64LE(data, o));
  o += 8;
  const transfer_fee_1 = readU64LE(data, o);
  if (transfer_fee_1 === null)
    return null;
  const ev = {
    metadata,
    pool_liquidity,
    pool_sqrt_price_x64,
    pool_tick,
    calc_amount_0,
    calc_amount_1,
    trade_fee_owed_0,
    trade_fee_owed_1,
    transfer_fee_0,
    transfer_fee_1
  };
  return { RaydiumClmmLiquidityCalculate: ev };
}
function parseOpenLimitOrderFromData(data, metadata) {
  let o = 0;
  const pool_id = readPubkey(data, o);
  if (!pool_id)
    return null;
  o += 32;
  const limit_order = readPubkey(data, o);
  if (!limit_order)
    return null;
  o += 32;
  const zero_for_one = readBool(data, o);
  if (zero_for_one === null)
    return null;
  o += 1;
  const tick_index = readI32LE(data, o);
  if (tick_index === null)
    return null;
  o += 4;
  const total_amount = bn642(readU64LE(data, o));
  o += 8;
  const transfer_fee = readU64LE(data, o);
  if (transfer_fee === null)
    return null;
  const ev = {
    metadata,
    pool_id,
    limit_order,
    zero_for_one,
    tick_index,
    total_amount,
    transfer_fee
  };
  return { RaydiumClmmOpenLimitOrder: ev };
}
function parseIncreaseLimitOrderFromData(data, metadata) {
  let o = 0;
  const pool_id = readPubkey(data, o);
  if (!pool_id)
    return null;
  o += 32;
  const limit_order = readPubkey(data, o);
  if (!limit_order)
    return null;
  o += 32;
  const zero_for_one = readBool(data, o);
  if (zero_for_one === null)
    return null;
  o += 1;
  const tick_index = readI32LE(data, o);
  if (tick_index === null)
    return null;
  o += 4;
  const total_amount = bn642(readU64LE(data, o));
  o += 8;
  const increased_amount = bn642(readU64LE(data, o));
  o += 8;
  const transfer_fee = readU64LE(data, o);
  if (transfer_fee === null)
    return null;
  const ev = {
    metadata,
    pool_id,
    limit_order,
    zero_for_one,
    tick_index,
    total_amount,
    increased_amount,
    transfer_fee
  };
  return { RaydiumClmmIncreaseLimitOrder: ev };
}
function parseDecreaseLimitOrderFromData(data, metadata) {
  let o = 0;
  const pool_id = readPubkey(data, o);
  if (!pool_id)
    return null;
  o += 32;
  const limit_order = readPubkey(data, o);
  if (!limit_order)
    return null;
  o += 32;
  const zero_for_one = readBool(data, o);
  if (zero_for_one === null)
    return null;
  o += 1;
  const tick_index = readI32LE(data, o);
  if (tick_index === null)
    return null;
  o += 4;
  const total_amount = bn642(readU64LE(data, o));
  o += 8;
  const filled_amount = bn642(readU64LE(data, o));
  o += 8;
  const settled_output_amount = bn642(readU64LE(data, o));
  o += 8;
  const decreased_amount = readU64LE(data, o);
  if (decreased_amount === null)
    return null;
  const ev = {
    metadata,
    pool_id,
    limit_order,
    zero_for_one,
    tick_index,
    total_amount,
    filled_amount,
    settled_output_amount,
    decreased_amount
  };
  return { RaydiumClmmDecreaseLimitOrder: ev };
}
function parseSettleLimitOrderFromData(data, metadata) {
  let o = 0;
  const pool_id = readPubkey(data, o);
  if (!pool_id)
    return null;
  o += 32;
  const limit_order = readPubkey(data, o);
  if (!limit_order)
    return null;
  o += 32;
  const zero_for_one = readBool(data, o);
  if (zero_for_one === null)
    return null;
  o += 1;
  const tick_index = readI32LE(data, o);
  if (tick_index === null)
    return null;
  o += 4;
  const total_amount = bn642(readU64LE(data, o));
  o += 8;
  const filled_amount = bn642(readU64LE(data, o));
  o += 8;
  const settled_amount_out = readU64LE(data, o);
  if (settled_amount_out === null)
    return null;
  const ev = {
    metadata,
    pool_id,
    limit_order,
    zero_for_one,
    tick_index,
    total_amount,
    filled_amount,
    settled_amount_out
  };
  return { RaydiumClmmSettleLimitOrder: ev };
}
function parseUpdateRewardInfosFromData(data, metadata) {
  const r0 = readU128LE(data, 0);
  const r1 = readU128LE(data, 16);
  const r2 = readU128LE(data, 32);
  if (r0 === null || r1 === null || r2 === null)
    return null;
  const ev = {
    metadata,
    reward_growth_global_x64: [r0, r1, r2]
  };
  return { RaydiumClmmUpdateRewardInfos: ev };
}

// dist/logs/raydium_cpmm.js
function bn643(v) {
  return v ?? 0n;
}
function parseSwapEventFromData(data, metadata) {
  if (data.length < 32 + 6 * 8 + 1)
    return null;
  let o = 0;
  const pool_id = readPubkey(data, o);
  if (!pool_id)
    return null;
  o += 32;
  const input_vault_before = readU64LE(data, o);
  o += 8;
  const output_vault_before = readU64LE(data, o);
  o += 8;
  const input_amount = readU64LE(data, o);
  o += 8;
  const output_amount = readU64LE(data, o);
  o += 8;
  const input_transfer_fee = readU64LE(data, o);
  o += 8;
  const output_transfer_fee = readU64LE(data, o);
  o += 8;
  const base_input = readBool(data, o);
  if (input_vault_before == null || output_vault_before == null || input_amount == null || output_amount == null || input_transfer_fee == null || output_transfer_fee == null || base_input == null)
    return null;
  const ev = {
    metadata,
    pool_id,
    input_vault_before,
    output_vault_before,
    input_amount,
    output_amount,
    input_transfer_fee,
    output_transfer_fee,
    base_input
  };
  return { RaydiumCpmmSwap: ev };
}
function parseSwapBaseInFromData(data, metadata) {
  let o = 0;
  const pool_state = readPubkey(data, o);
  o += 32;
  o += 32;
  const amount_in = bn643(readU64LE(data, o));
  o += 8;
  o += 8;
  const amount_out = bn643(readU64LE(data, o));
  o += 8;
  const is_base_input = readBool(data, o);
  const ev = {
    metadata,
    pool_id: pool_state,
    input_vault_before: 0n,
    output_vault_before: 0n,
    input_amount: amount_in,
    output_amount: amount_out,
    input_transfer_fee: 0n,
    output_transfer_fee: 0n,
    base_input: is_base_input
  };
  return { RaydiumCpmmSwap: ev };
}
function parseSwapBaseOutFromData(data, metadata) {
  let o = 0;
  const pool_state = readPubkey(data, o);
  o += 32;
  o += 32;
  o += 8;
  const amount_out = bn643(readU64LE(data, o));
  o += 8;
  const amount_in = bn643(readU64LE(data, o));
  o += 8;
  const is_base_output = readBool(data, o);
  const ev = {
    metadata,
    pool_id: pool_state,
    input_vault_before: 0n,
    output_vault_before: 0n,
    input_amount: amount_in,
    output_amount: amount_out,
    input_transfer_fee: 0n,
    output_transfer_fee: 0n,
    base_input: !is_base_output
  };
  return { RaydiumCpmmSwap: ev };
}
function parseCreatePoolFromData3(data, metadata) {
  let o = 0;
  const pool_state = readPubkey(data, o);
  o += 32;
  o += 32;
  o += 32;
  const creator = readPubkey(data, o);
  o += 32;
  const initial_amount_0 = bn643(readU64LE(data, o));
  o += 8;
  const initial_amount_1 = bn643(readU64LE(data, o));
  const ev = {
    metadata,
    pool: pool_state,
    creator,
    init_amount0: initial_amount_0,
    init_amount1: initial_amount_1
  };
  return { RaydiumCpmmInitialize: ev };
}
function parseDepositFromData(data, metadata) {
  let o = 0;
  const pool_state = readPubkey(data, o);
  o += 32;
  const user = readPubkey(data, o);
  o += 32;
  const lp_token_amount = bn643(readU64LE(data, o));
  o += 8;
  const token_0_amount = bn643(readU64LE(data, o));
  o += 8;
  const token_1_amount = bn643(readU64LE(data, o));
  const ev = {
    metadata,
    pool: pool_state,
    user,
    lp_token_amount,
    token0_amount: token_0_amount,
    token1_amount: token_1_amount
  };
  return { RaydiumCpmmDeposit: ev };
}
function parseWithdrawFromData(data, metadata) {
  let o = 0;
  const pool_state = readPubkey(data, o);
  o += 32;
  const user = readPubkey(data, o);
  o += 32;
  const lp_token_amount = bn643(readU64LE(data, o));
  o += 8;
  const token_0_amount = bn643(readU64LE(data, o));
  o += 8;
  const token_1_amount = bn643(readU64LE(data, o));
  const ev = {
    metadata,
    pool: pool_state,
    user,
    lp_token_amount,
    token0_amount: token_0_amount,
    token1_amount: token_1_amount
  };
  return { RaydiumCpmmWithdraw: ev };
}

// dist/logs/raydium_amm.js
var import_buffer2 = require("buffer");
function bn644(v) {
  return v ?? 0n;
}
function emptySwap(metadata, amm, user) {
  return {
    metadata,
    amount_in: 0n,
    minimum_amount_out: 0n,
    max_amount_in: 0n,
    amount_out: 0n,
    token_program: defaultPubkey(),
    amm,
    amm_authority: defaultPubkey(),
    amm_open_orders: defaultPubkey(),
    pool_coin_token_account: defaultPubkey(),
    pool_pc_token_account: defaultPubkey(),
    serum_program: defaultPubkey(),
    serum_market: defaultPubkey(),
    serum_bids: defaultPubkey(),
    serum_asks: defaultPubkey(),
    serum_event_queue: defaultPubkey(),
    serum_coin_vault_account: defaultPubkey(),
    serum_pc_vault_account: defaultPubkey(),
    serum_vault_signer: defaultPubkey(),
    user_source_token_account: defaultPubkey(),
    user_destination_token_account: defaultPubkey(),
    user_source_owner: user
  };
}
var RAY_LOG_PREFIX = "Program log: ray_log: ";
function parseRayLogSwap(log, metadata) {
  const prefix = log.indexOf(RAY_LOG_PREFIX);
  if (prefix < 0)
    return null;
  const encoded = log.slice(prefix + RAY_LOG_PREFIX.length).trim();
  let data;
  try {
    data = import_buffer2.Buffer.from(encoded, "base64");
  } catch {
    return null;
  }
  if (data.length !== 57 || data[0] !== 3 && data[0] !== 4)
    return null;
  const input = readU64LE(data, 1);
  const output = readU64LE(data, 9);
  const actual = readU64LE(data, 49);
  if (input == null || output == null || actual == null)
    return null;
  const ev = emptySwap(metadata, defaultPubkey(), defaultPubkey());
  if (data[0] === 3) {
    ev.amount_in = input;
    ev.minimum_amount_out = output;
    ev.amount_out = actual;
  } else {
    ev.max_amount_in = input;
    ev.amount_out = output;
    ev.amount_in = actual;
  }
  return { RaydiumAmmV4Swap: ev };
}
function parseSwapBaseInFromData2(data, metadata) {
  let o = 0;
  const amm = readPubkey(data, o);
  if (!amm)
    return null;
  o += 32;
  const user = readPubkey(data, o);
  if (!user)
    return null;
  o += 32;
  const amount_in = bn644(readU64LE(data, o));
  o += 8;
  const minimum_amount_out = bn644(readU64LE(data, o));
  const ev = emptySwap(metadata, amm, user);
  ev.amount_in = amount_in;
  ev.minimum_amount_out = minimum_amount_out;
  return { RaydiumAmmV4Swap: ev };
}
function parseSwapBaseOutFromData2(data, metadata) {
  let o = 0;
  const amm = readPubkey(data, o);
  if (!amm)
    return null;
  o += 32;
  const user = readPubkey(data, o);
  if (!user)
    return null;
  o += 32;
  const max_amount_in = bn644(readU64LE(data, o));
  o += 8;
  const amount_out = bn644(readU64LE(data, o));
  const ev = emptySwap(metadata, amm, user);
  ev.max_amount_in = max_amount_in;
  ev.amount_out = amount_out;
  return { RaydiumAmmV4Swap: ev };
}
function parseDepositFromData2(data, metadata) {
  let o = 0;
  const amm = readPubkey(data, o);
  o += 32;
  const user = readPubkey(data, o);
  o += 32;
  const max_coin_amount = bn644(readU64LE(data, o));
  o += 8;
  const max_pc_amount = bn644(readU64LE(data, o));
  o += 8;
  const base_side = bn644(readU64LE(data, o));
  const ev = {
    metadata,
    max_coin_amount,
    max_pc_amount,
    base_side,
    token_program: defaultPubkey(),
    amm,
    amm_authority: defaultPubkey(),
    amm_open_orders: defaultPubkey(),
    amm_target_orders: defaultPubkey(),
    lp_mint_address: defaultPubkey(),
    pool_coin_token_account: defaultPubkey(),
    pool_pc_token_account: defaultPubkey(),
    serum_market: defaultPubkey(),
    user_coin_token_account: defaultPubkey(),
    user_pc_token_account: defaultPubkey(),
    user_lp_token_account: defaultPubkey(),
    user_owner: user,
    serum_event_queue: defaultPubkey()
  };
  return { RaydiumAmmV4Deposit: ev };
}
function parseWithdrawFromData2(data, metadata) {
  let o = 0;
  const amm = readPubkey(data, o);
  o += 32;
  const user = readPubkey(data, o);
  o += 32;
  const amount = bn644(readU64LE(data, o));
  const ev = {
    metadata,
    amount,
    token_program: defaultPubkey(),
    amm,
    amm_authority: defaultPubkey(),
    amm_open_orders: defaultPubkey(),
    amm_target_orders: defaultPubkey(),
    lp_mint_address: defaultPubkey(),
    pool_coin_token_account: defaultPubkey(),
    pool_pc_token_account: defaultPubkey(),
    pool_withdraw_queue: defaultPubkey(),
    pool_temp_lp_token_account: defaultPubkey(),
    serum_program: defaultPubkey(),
    serum_market: defaultPubkey(),
    serum_coin_vault_account: defaultPubkey(),
    serum_pc_vault_account: defaultPubkey(),
    serum_vault_signer: defaultPubkey(),
    user_lp_token_account: defaultPubkey(),
    user_coin_token_account: defaultPubkey(),
    user_pc_token_account: defaultPubkey(),
    user_owner: user,
    serum_event_queue: defaultPubkey(),
    serum_bids: defaultPubkey(),
    serum_asks: defaultPubkey()
  };
  return { RaydiumAmmV4Withdraw: ev };
}
function parseWithdrawPnlFromData(data, metadata) {
  let o = 0;
  const amm = readPubkey(data, o);
  if (!amm)
    return null;
  o += 32;
  const pnl_owner = readPubkey(data, o);
  if (!pnl_owner)
    return null;
  const z = defaultPubkey();
  const ev = {
    metadata,
    token_program: z,
    amm,
    amm_config: z,
    amm_authority: z,
    amm_open_orders: z,
    pool_coin_token_account: z,
    pool_pc_token_account: z,
    coin_pnl_token_account: z,
    pc_pnl_token_account: z,
    pnl_owner,
    amm_target_orders: z,
    serum_program: z,
    serum_market: z,
    serum_event_queue: z,
    serum_coin_vault_account: z,
    serum_pc_vault_account: z,
    serum_vault_signer: z
  };
  return { RaydiumAmmV4WithdrawPnl: ev };
}
function parseInitialize2FromData(data, metadata) {
  let o = 0;
  const amm = readPubkey(data, o);
  if (!amm)
    return null;
  o += 32;
  const user = readPubkey(data, o);
  if (!user)
    return null;
  o += 32;
  const nonce = readU8(data, o);
  o += 1;
  const open_time = bn644(readU64LE(data, o));
  o += 8;
  const init_pc_amount = bn644(readU64LE(data, o));
  o += 8;
  const init_coin_amount = bn644(readU64LE(data, o));
  const z = defaultPubkey();
  const ev = {
    metadata,
    nonce,
    open_time,
    init_pc_amount,
    init_coin_amount,
    token_program: z,
    spl_associated_token_account: z,
    system_program: z,
    rent: z,
    amm,
    amm_authority: z,
    amm_open_orders: z,
    lp_mint: z,
    coin_mint: z,
    pc_mint: z,
    pool_coin_token_account: z,
    pool_pc_token_account: z,
    pool_withdraw_queue: z,
    amm_target_orders: z,
    pool_temp_lp: z,
    serum_program: z,
    serum_market: z,
    user_wallet: user,
    user_token_coin: z,
    user_token_pc: z,
    user_lp_token_account: z
  };
  return { RaydiumAmmV4Initialize2: ev };
}

// dist/logs/orca.js
function bn645(v) {
  return v ?? 0n;
}
function parseTradedFromData(data, metadata) {
  let o = 0;
  const whirlpool = readPubkey(data, o);
  o += 32;
  const a_to_b = readBool(data, o);
  o += 1;
  const pre_sqrt_price = readU128LE(data, o);
  o += 16;
  const post_sqrt_price = readU128LE(data, o);
  o += 16;
  const input_amount = bn645(readU64LE(data, o));
  o += 8;
  const output_amount = bn645(readU64LE(data, o));
  o += 8;
  const input_transfer_fee = bn645(readU64LE(data, o));
  o += 8;
  const output_transfer_fee = bn645(readU64LE(data, o));
  o += 8;
  const lp_fee = bn645(readU64LE(data, o));
  o += 8;
  const protocol_fee = bn645(readU64LE(data, o));
  const ev = {
    metadata,
    whirlpool,
    a_to_b,
    pre_sqrt_price,
    post_sqrt_price,
    input_amount,
    output_amount,
    input_transfer_fee,
    output_transfer_fee,
    lp_fee,
    protocol_fee
  };
  return { OrcaWhirlpoolSwap: ev };
}
function parseLiquidityIncreasedFromData(data, metadata) {
  let o = 0;
  const whirlpool = readPubkey(data, o);
  o += 32;
  const position = readPubkey(data, o);
  o += 32;
  const tick_lower_index = readI32LE(data, o);
  o += 4;
  const tick_upper_index = readI32LE(data, o);
  o += 4;
  const liquidity = readU128LE(data, o);
  o += 16;
  const token_a_amount = bn645(readU64LE(data, o));
  o += 8;
  const token_b_amount = bn645(readU64LE(data, o));
  o += 8;
  const token_a_transfer_fee = bn645(readU64LE(data, o));
  o += 8;
  const token_b_transfer_fee = bn645(readU64LE(data, o));
  const ev = {
    metadata,
    whirlpool,
    position,
    tick_lower_index,
    tick_upper_index,
    liquidity,
    token_a_amount,
    token_b_amount,
    token_a_transfer_fee,
    token_b_transfer_fee
  };
  return { OrcaWhirlpoolLiquidityIncreased: ev };
}
function parseLiquidityDecreasedFromData(data, metadata) {
  let o = 0;
  const whirlpool = readPubkey(data, o);
  o += 32;
  const position = readPubkey(data, o);
  o += 32;
  const tick_lower_index = readI32LE(data, o);
  o += 4;
  const tick_upper_index = readI32LE(data, o);
  o += 4;
  const liquidity = readU128LE(data, o);
  o += 16;
  const token_a_amount = bn645(readU64LE(data, o));
  o += 8;
  const token_b_amount = bn645(readU64LE(data, o));
  o += 8;
  const token_a_transfer_fee = bn645(readU64LE(data, o));
  o += 8;
  const token_b_transfer_fee = bn645(readU64LE(data, o));
  const ev = {
    metadata,
    whirlpool,
    position,
    tick_lower_index,
    tick_upper_index,
    liquidity,
    token_a_amount,
    token_b_amount,
    token_a_transfer_fee,
    token_b_transfer_fee
  };
  return { OrcaWhirlpoolLiquidityDecreased: ev };
}
function parsePoolInitializedFromData(data, metadata) {
  let o = 0;
  const whirlpool = readPubkey(data, o);
  o += 32;
  const whirlpools_config = readPubkey(data, o);
  o += 32;
  const token_mint_a = readPubkey(data, o);
  o += 32;
  const token_mint_b = readPubkey(data, o);
  o += 32;
  const tick_spacing = readU16LE(data, o);
  o += 2;
  const token_program_a = readPubkey(data, o);
  o += 32;
  const token_program_b = readPubkey(data, o);
  o += 32;
  const decimals_a = readU8(data, o);
  o += 1;
  const decimals_b = readU8(data, o);
  o += 1;
  const initial_sqrt_price = readU128LE(data, o);
  const ev = {
    metadata,
    whirlpool,
    whirlpools_config,
    token_mint_a,
    token_mint_b,
    tick_spacing,
    token_program_a,
    token_program_b,
    decimals_a,
    decimals_b,
    initial_sqrt_price
  };
  return { OrcaWhirlpoolPoolInitialized: ev };
}

// dist/logs/meteora_amm.js
function bn646(v) {
  return v ?? 0n;
}
function parseSwapFromData2(data, metadata) {
  let o = 0;
  const in_amount = bn646(readU64LE(data, o));
  o += 8;
  const out_amount = bn646(readU64LE(data, o));
  o += 8;
  const trade_fee = bn646(readU64LE(data, o));
  o += 8;
  const admin_fee = bn646(readU64LE(data, o));
  o += 8;
  const host_fee = bn646(readU64LE(data, o));
  const ev = { metadata, in_amount, out_amount, trade_fee, admin_fee, host_fee };
  return { MeteoraPoolsSwap: ev };
}
function parseAddLiquidityFromData2(data, metadata) {
  let o = 0;
  const lp_mint_amount = bn646(readU64LE(data, o));
  o += 8;
  const token_a_amount = bn646(readU64LE(data, o));
  o += 8;
  const token_b_amount = bn646(readU64LE(data, o));
  const ev = { metadata, lp_mint_amount, token_a_amount, token_b_amount };
  return { MeteoraPoolsAddLiquidity: ev };
}
function parseRemoveLiquidityFromData2(data, metadata) {
  let o = 0;
  const lp_unmint_amount = bn646(readU64LE(data, o));
  o += 8;
  const token_a_out_amount = bn646(readU64LE(data, o));
  o += 8;
  const token_b_out_amount = bn646(readU64LE(data, o));
  const ev = {
    metadata,
    lp_unmint_amount,
    token_a_out_amount,
    token_b_out_amount
  };
  return { MeteoraPoolsRemoveLiquidity: ev };
}
function parseBootstrapLiquidityFromData(data, metadata) {
  let o = 0;
  const lp_mint_amount = bn646(readU64LE(data, o));
  o += 8;
  const token_a_amount = bn646(readU64LE(data, o));
  o += 8;
  const token_b_amount = bn646(readU64LE(data, o));
  o += 8;
  const pool = readPubkey(data, o);
  const ev = {
    metadata,
    lp_mint_amount,
    token_a_amount,
    token_b_amount,
    pool
  };
  return { MeteoraPoolsBootstrapLiquidity: ev };
}
function parseSetPoolFeesFromData(data, metadata) {
  if (data.length < 8 + 8 + 8 + 8 + 32)
    return null;
  let o = 0;
  const trade_fee_numerator = bn646(readU64LE(data, o));
  o += 8;
  const trade_fee_denominator = bn646(readU64LE(data, o));
  o += 8;
  const owner_trade_fee_numerator = bn646(readU64LE(data, o));
  o += 8;
  const owner_trade_fee_denominator = bn646(readU64LE(data, o));
  o += 8;
  const pool = readPubkey(data, o);
  const ev = {
    metadata,
    trade_fee_numerator,
    trade_fee_denominator,
    owner_trade_fee_numerator,
    owner_trade_fee_denominator,
    pool
  };
  return { MeteoraPoolsSetPoolFees: ev };
}
function parsePoolCreatedFromData(data, metadata) {
  let o = 0;
  const lp_mint = readPubkey(data, o);
  o += 32;
  const token_a_mint = readPubkey(data, o);
  o += 32;
  const token_b_mint = readPubkey(data, o);
  o += 32;
  const pool_type = readU8(data, o);
  o += 1;
  const pool = readPubkey(data, o);
  const ev = {
    metadata,
    lp_mint,
    token_a_mint,
    token_b_mint,
    pool_type,
    pool
  };
  return { MeteoraPoolsPoolCreated: ev };
}

// dist/logs/meteora_damm.js
function discOf(bytes) {
  const u8 = new Uint8Array(8);
  for (let i = 0; i < 8; i++)
    u8[i] = bytes[i];
  return new DataView(u8.buffer).getBigUint64(0, true);
}
var SWAP = discOf([27, 60, 21, 213, 138, 170, 187, 147]);
var SWAP2 = discOf([189, 66, 51, 168, 38, 80, 117, 153]);
var ADD_LIQUIDITY = discOf([175, 242, 8, 157, 30, 247, 185, 169]);
var REMOVE_LIQUIDITY = discOf([87, 46, 88, 98, 175, 96, 34, 91]);
var LIQUIDITY_CHANGE = discOf([197, 171, 78, 127, 224, 211, 87, 13]);
var INITIALIZE_POOL = discOf([228, 50, 246, 85, 203, 66, 134, 37]);
var CREATE_POSITION = discOf([156, 15, 119, 198, 29, 181, 221, 55]);
var CLOSE_POSITION = discOf([20, 145, 144, 68, 143, 142, 214, 178]);
var UPDATE_DELEGATE_PERMISSION = discOf([66, 188, 75, 151, 150, 232, 87, 93]);
var WITHDRAW_DEAD_LIQUIDITY_REWARD = discOf([228, 66, 150, 195, 42, 62, 163, 13]);
var CREATE_CONFIG = discOf([131, 207, 180, 174, 180, 73, 165, 54]);
var CREATE_DYNAMIC_CONFIG = discOf([231, 197, 13, 164, 248, 213, 133, 152]);
var COMPOUNDING_FEE_LAYOUT_ACTIVATION_SLOT = 406048752;
function usesCompoundingFeeLayout(slot) {
  return slot === 0 || slot >= COMPOUNDING_FEE_LAYOUT_ACTIVATION_SLOT;
}
function bn647(v) {
  return v ?? 0n;
}
function emptyVaults() {
  const z = defaultPubkey();
  return {
    token_a_vault: z,
    token_b_vault: z,
    token_a_mint: z,
    token_b_mint: z,
    token_a_program: z,
    token_b_program: z
  };
}
function parseSwapEvent(data, meta) {
  let o = 0;
  const pool = readPubkey(data, o);
  if (!pool)
    return null;
  o += 32;
  o += 32;
  const trade_direction = readU8(data, o);
  if (trade_direction === null)
    return null;
  o += 1;
  const has_referral = readBool(data, o);
  if (has_referral === null)
    return null;
  o += 1;
  const amount_in = bn647(readU64LE(data, o));
  o += 8;
  const minimum_amount_out = bn647(readU64LE(data, o));
  o += 8;
  const actual_input_amount = bn647(readU64LE(data, o));
  o += 8;
  const output_amount = bn647(readU64LE(data, o));
  o += 8;
  const next_sqrt_price = readU128LE(data, o);
  if (next_sqrt_price === null)
    return null;
  o += 16;
  const lp_fee = bn647(readU64LE(data, o));
  o += 8;
  const protocol_fee = bn647(readU64LE(data, o));
  o += 8;
  const referral_fee = bn647(readU64LE(data, o));
  o += 8;
  o += 8;
  const current_timestamp = bn647(readU64LE(data, o));
  const ev = {
    metadata: meta,
    pool,
    amount_in,
    output_amount,
    trade_direction,
    has_referral,
    minimum_amount_out,
    next_sqrt_price,
    lp_fee,
    protocol_fee,
    partner_fee: 0n,
    referral_fee,
    actual_amount_in: actual_input_amount,
    current_timestamp,
    ...emptyVaults()
  };
  return { MeteoraDammV2Swap: ev };
}
function parseSwap2FromData(data, meta) {
  let o = 0;
  const pool = readPubkey(data, o);
  if (!pool)
    return null;
  o += 32;
  const trade_direction = readU8(data, o);
  if (trade_direction === null)
    return null;
  o += 1;
  const collect_fee_mode = readU8(data, o);
  if (collect_fee_mode === null)
    return null;
  o += 1;
  const has_referral = readBool(data, o);
  if (has_referral === null)
    return null;
  o += 1;
  const amount_0 = bn647(readU64LE(data, o));
  o += 8;
  const amount_1 = bn647(readU64LE(data, o));
  o += 8;
  const swap_mode = readU8(data, o);
  if (swap_mode === null)
    return null;
  o += 1;
  const included_fee_input_amount = bn647(readU64LE(data, o));
  o += 8;
  const excluded_fee_input_amount = bn647(readU64LE(data, o));
  o += 8;
  const amount_left = bn647(readU64LE(data, o));
  o += 8;
  const output_amount = bn647(readU64LE(data, o));
  o += 8;
  const next_sqrt_price = readU128LE(data, o);
  if (next_sqrt_price === null)
    return null;
  o += 16;
  const claiming_or_trading_fee = bn647(readU64LE(data, o));
  o += 8;
  const protocol_fee = bn647(readU64LE(data, o));
  o += 8;
  const compounding_or_partner_fee = bn647(readU64LE(data, o));
  o += 8;
  const referral_fee = bn647(readU64LE(data, o));
  o += 8;
  const included_transfer_fee_amount_in = bn647(readU64LE(data, o));
  o += 8;
  const included_transfer_fee_amount_out = bn647(readU64LE(data, o));
  o += 8;
  const excluded_transfer_fee_amount_out = bn647(readU64LE(data, o));
  o += 8;
  const current_timestamp = bn647(readU64LE(data, o));
  o += 8;
  const reserve_a_amount = bn647(readU64LE(data, o));
  o += 8;
  const reserve_b_amount = bn647(readU64LE(data, o));
  let amount_in;
  let minimum_amount_out;
  if (swap_mode === 0 || swap_mode === 1) {
    amount_in = amount_0;
    minimum_amount_out = amount_1;
  } else if (swap_mode === 2) {
    amount_in = amount_1;
    minimum_amount_out = amount_0;
  } else {
    return null;
  }
  let lp_fee;
  let partner_fee;
  let claiming_fee;
  let compounding_fee;
  if (usesCompoundingFeeLayout(meta.slot)) {
    lp_fee = claiming_or_trading_fee + compounding_or_partner_fee;
    partner_fee = compounding_or_partner_fee;
    claiming_fee = claiming_or_trading_fee;
    compounding_fee = compounding_or_partner_fee;
  } else {
    lp_fee = claiming_or_trading_fee;
    partner_fee = compounding_or_partner_fee;
    claiming_fee = 0n;
    compounding_fee = 0n;
  }
  const ev = {
    metadata: meta,
    pool,
    trade_direction,
    collect_fee_mode,
    has_referral,
    amount_0,
    amount_1,
    swap_mode,
    amount_in,
    minimum_amount_out,
    output_amount,
    next_sqrt_price,
    lp_fee,
    protocol_fee,
    partner_fee,
    referral_fee,
    actual_amount_in: included_fee_input_amount,
    excluded_fee_input_amount,
    amount_left,
    claiming_fee,
    compounding_fee,
    included_transfer_fee_amount_in,
    included_transfer_fee_amount_out,
    excluded_transfer_fee_amount_out,
    current_timestamp,
    reserve_a_amount,
    reserve_b_amount,
    ...emptyVaults()
  };
  return { MeteoraDammV2Swap: ev };
}
function parseCreatePositionEvent(data, meta) {
  if (data.length < 32 * 4)
    return null;
  let o = 0;
  const pool = readPubkey(data, o);
  o += 32;
  const owner = readPubkey(data, o);
  o += 32;
  const position = readPubkey(data, o);
  o += 32;
  const position_nft_mint = readPubkey(data, o);
  const ev = {
    metadata: meta,
    pool,
    owner,
    position,
    position_nft_mint
  };
  return { MeteoraDammV2CreatePosition: ev };
}
function parseClosePositionEvent(data, meta) {
  if (data.length < 32 * 4)
    return null;
  let o = 0;
  const pool = readPubkey(data, o);
  o += 32;
  const owner = readPubkey(data, o);
  o += 32;
  const position = readPubkey(data, o);
  o += 32;
  const position_nft_mint = readPubkey(data, o);
  const ev = {
    metadata: meta,
    pool,
    owner,
    position,
    position_nft_mint
  };
  return { MeteoraDammV2ClosePosition: ev };
}
function parseAddLiquidityFromData3(data, meta) {
  if (data.length < 32 * 3 + 16 + 8 * 6)
    return null;
  let o = 0;
  const pool = readPubkey(data, o);
  o += 32;
  const position = readPubkey(data, o);
  o += 32;
  const owner = readPubkey(data, o);
  o += 32;
  const liquidity_delta = readU128LE(data, o);
  o += 16;
  const token_a_amount_threshold = bn647(readU64LE(data, o));
  o += 8;
  const token_b_amount_threshold = bn647(readU64LE(data, o));
  o += 8;
  const token_a_amount = bn647(readU64LE(data, o));
  o += 8;
  const token_b_amount = bn647(readU64LE(data, o));
  o += 8;
  const total_amount_a = bn647(readU64LE(data, o));
  o += 8;
  const total_amount_b = bn647(readU64LE(data, o));
  const ev = {
    metadata: meta,
    pool,
    position,
    owner,
    liquidity_delta,
    token_a_amount_threshold,
    token_b_amount_threshold,
    token_a_amount,
    token_b_amount,
    total_amount_a,
    total_amount_b
  };
  return { MeteoraDammV2AddLiquidity: ev };
}
function parseRemoveLiquidityFromData3(data, meta) {
  if (data.length < 32 * 3 + 16 + 8 * 4)
    return null;
  let o = 0;
  const pool = readPubkey(data, o);
  o += 32;
  const position = readPubkey(data, o);
  o += 32;
  const owner = readPubkey(data, o);
  o += 32;
  const liquidity_delta = readU128LE(data, o);
  o += 16;
  const token_a_amount_threshold = bn647(readU64LE(data, o));
  o += 8;
  const token_b_amount_threshold = bn647(readU64LE(data, o));
  o += 8;
  const token_a_amount = bn647(readU64LE(data, o));
  o += 8;
  const token_b_amount = bn647(readU64LE(data, o));
  const ev = {
    metadata: meta,
    pool,
    position,
    owner,
    liquidity_delta,
    token_a_amount_threshold,
    token_b_amount_threshold,
    token_a_amount,
    token_b_amount
  };
  return { MeteoraDammV2RemoveLiquidity: ev };
}
function parseLiquidityChangeFromData2(data, meta) {
  const LEN = 177;
  if (data.length < LEN)
    return null;
  const pool = readPubkey(data, 0);
  const position = readPubkey(data, 32);
  const owner = readPubkey(data, 64);
  if (!pool || !position || !owner)
    return null;
  const token_a_amount = bn647(readU64LE(data, 96));
  const token_b_amount = bn647(readU64LE(data, 104));
  const total_amount_a = bn647(readU64LE(data, 112));
  const total_amount_b = bn647(readU64LE(data, 120));
  const reserve_a_amount = bn647(readU64LE(data, 128));
  const reserve_b_amount = bn647(readU64LE(data, 136));
  const liquidity_delta = readU128LE(data, 144);
  if (liquidity_delta === null)
    return null;
  const token_a_amount_threshold = bn647(readU64LE(data, 160));
  const token_b_amount_threshold = bn647(readU64LE(data, 168));
  const change_type = readU8(data, 176);
  if (change_type === 0) {
    const ev = {
      metadata: meta,
      pool,
      position,
      owner,
      token_a_amount,
      token_b_amount,
      liquidity_delta,
      token_a_amount_threshold,
      token_b_amount_threshold,
      total_amount_a,
      total_amount_b,
      reserve_a_amount,
      reserve_b_amount
    };
    return { MeteoraDammV2AddLiquidity: ev };
  }
  if (change_type === 1) {
    const ev = {
      metadata: meta,
      pool,
      position,
      owner,
      token_a_amount,
      token_b_amount,
      liquidity_delta,
      token_a_amount_threshold,
      token_b_amount_threshold,
      total_amount_a,
      total_amount_b,
      reserve_a_amount,
      reserve_b_amount
    };
    return { MeteoraDammV2RemoveLiquidity: ev };
  }
  return null;
}
function skipPoolFees(data, offset) {
  if (offset + 31 > data.length)
    return null;
  offset += 27;
  if (readU16LE(data, offset) === null)
    return null;
  offset += 2;
  if (readU8(data, offset) === null)
    return null;
  offset += 1;
  const tag = readU8(data, offset);
  if (tag === null)
    return null;
  offset += 1;
  if (tag === 1) {
    if (offset + 32 > data.length)
      return null;
    offset += 32;
  } else if (tag !== 0) {
    return null;
  }
  return offset;
}
function parseInitializePoolEvent(data, meta) {
  if (data.length < 32 * 6 + 31 + 109)
    return null;
  let o = 0;
  const pool = readPubkey(data, o);
  o += 32;
  const token_a_mint = readPubkey(data, o);
  o += 32;
  const token_b_mint = readPubkey(data, o);
  o += 32;
  const creator = readPubkey(data, o);
  o += 32;
  const payer = readPubkey(data, o);
  o += 32;
  const alpha_vault = readPubkey(data, o);
  o += 32;
  const poolFeesEnd = skipPoolFees(data, o);
  if (poolFeesEnd === null)
    return null;
  o = poolFeesEnd;
  if (o + 109 > data.length)
    return null;
  const sqrt_min_price = readU128LE(data, o);
  o += 16;
  const sqrt_max_price = readU128LE(data, o);
  o += 16;
  const activation_type = readU8(data, o);
  o += 1;
  const collect_fee_mode = readU8(data, o);
  o += 1;
  const liquidity = readU128LE(data, o);
  o += 16;
  const sqrt_price = readU128LE(data, o);
  o += 16;
  const activation_point = bn647(readU64LE(data, o));
  o += 8;
  const token_a_flag = readU8(data, o);
  o += 1;
  const token_b_flag = readU8(data, o);
  o += 1;
  const token_a_amount = bn647(readU64LE(data, o));
  o += 8;
  const token_b_amount = bn647(readU64LE(data, o));
  o += 8;
  const total_amount_a = bn647(readU64LE(data, o));
  o += 8;
  const total_amount_b = bn647(readU64LE(data, o));
  o += 8;
  const pool_type = readU8(data, o);
  const ev = {
    metadata: meta,
    pool,
    token_a_mint,
    token_b_mint,
    creator,
    payer,
    alpha_vault,
    pool_fees: null,
    sqrt_min_price,
    sqrt_max_price,
    activation_type,
    collect_fee_mode,
    liquidity,
    sqrt_price,
    activation_point,
    token_a_flag,
    token_b_flag,
    token_a_amount,
    token_b_amount,
    total_amount_a,
    total_amount_b,
    pool_type
  };
  return { MeteoraDammV2InitializePool: ev };
}
function parseUpdateDelegatePermissionFromData(data, meta) {
  let o = 0;
  const position = readPubkey(data, o);
  if (!position)
    return null;
  o += 32;
  const owner = readPubkey(data, o);
  if (!owner)
    return null;
  o += 32;
  const permission = readU32LE(data, o);
  if (permission === null)
    return null;
  o += 4;
  const has_delegate = readBool(data, o);
  if (has_delegate === null)
    return null;
  o += 1;
  let delegate = null;
  if (has_delegate) {
    delegate = readPubkey(data, o);
    if (!delegate)
      return null;
  }
  const ev = {
    metadata: meta,
    position,
    owner,
    permission,
    delegate
  };
  return { MeteoraDammV2UpdateDelegatePermission: ev };
}
function parseWithdrawDeadLiquidityRewardFromData(data, meta) {
  let o = 0;
  const pool = readPubkey(data, o);
  if (!pool)
    return null;
  o += 32;
  const reward_mint = readPubkey(data, o);
  if (!reward_mint)
    return null;
  o += 32;
  const amount = readU64LE(data, o);
  if (amount === null)
    return null;
  const ev = {
    metadata: meta,
    pool,
    reward_mint,
    amount
  };
  return { MeteoraDammV2WithdrawDeadLiquidityReward: ev };
}
function parseDynamicFeeParameters(data, offset) {
  let o = offset;
  const bin_step = readU16LE(data, o);
  if (bin_step === null)
    return null;
  o += 2;
  const bin_step_u128 = readU128LE(data, o);
  if (bin_step_u128 === null)
    return null;
  o += 16;
  const filter_period = readU16LE(data, o);
  if (filter_period === null)
    return null;
  o += 2;
  const decay_period = readU16LE(data, o);
  if (decay_period === null)
    return null;
  o += 2;
  const reduction_factor = readU16LE(data, o);
  if (reduction_factor === null)
    return null;
  o += 2;
  const max_volatility_accumulator = readU32LE(data, o);
  if (max_volatility_accumulator === null)
    return null;
  o += 4;
  const variable_fee_control = readU32LE(data, o);
  if (variable_fee_control === null)
    return null;
  o += 4;
  return {
    params: {
      bin_step,
      bin_step_u128,
      filter_period,
      decay_period,
      reduction_factor,
      max_volatility_accumulator,
      variable_fee_control
    },
    next: o
  };
}
function parseCreateConfigFromData(data, meta) {
  let o = 0;
  if (data.length < o + 27)
    return null;
  const base_fee_data = Array.from(data.subarray(o, o + 27));
  o += 27;
  const compounding_fee_bps = readU16LE(data, o);
  if (compounding_fee_bps === null)
    return null;
  o += 2;
  const padding = readU8(data, o);
  if (padding === null)
    return null;
  o += 1;
  const has_dynamic_fee = readBool(data, o);
  if (has_dynamic_fee === null)
    return null;
  o += 1;
  let dynamic_fee = null;
  if (has_dynamic_fee) {
    const parsed = parseDynamicFeeParameters(data, o);
    if (!parsed)
      return null;
    dynamic_fee = parsed.params;
    o = parsed.next;
  }
  const vault_config_key = readPubkey(data, o);
  if (!vault_config_key)
    return null;
  o += 32;
  const pool_creator_authority = readPubkey(data, o);
  if (!pool_creator_authority)
    return null;
  o += 32;
  const activation_type = readU8(data, o);
  if (activation_type === null)
    return null;
  o += 1;
  const sqrt_min_price = readU128LE(data, o);
  if (sqrt_min_price === null)
    return null;
  o += 16;
  const sqrt_max_price = readU128LE(data, o);
  if (sqrt_max_price === null)
    return null;
  o += 16;
  const collect_fee_mode = readU8(data, o);
  if (collect_fee_mode === null)
    return null;
  o += 1;
  const index = readU64LE(data, o);
  if (index === null)
    return null;
  o += 8;
  const config = readPubkey(data, o);
  if (!config)
    return null;
  o += 32;
  const permission = readU128LE(data, o);
  if (permission === null)
    return null;
  const ev = {
    metadata: meta,
    base_fee_data,
    compounding_fee_bps,
    padding,
    dynamic_fee,
    vault_config_key,
    pool_creator_authority,
    activation_type,
    sqrt_min_price,
    sqrt_max_price,
    collect_fee_mode,
    index,
    config,
    permission
  };
  return { MeteoraDammV2CreateConfig: ev };
}
function parseCreateDynamicConfigFromData(data, meta) {
  let o = 0;
  const config = readPubkey(data, o);
  if (!config)
    return null;
  o += 32;
  const pool_creator_authority = readPubkey(data, o);
  if (!pool_creator_authority)
    return null;
  o += 32;
  const index = readU64LE(data, o);
  if (index === null)
    return null;
  o += 8;
  const permission = readU128LE(data, o);
  if (permission === null)
    return null;
  const ev = {
    metadata: meta,
    config,
    pool_creator_authority,
    index,
    permission
  };
  return { MeteoraDammV2CreateDynamicConfig: ev };
}
function parseMeteoraDammLog(log, signature, slot, txIndex, blockTimeUs, grpcRecvUs) {
  const programData = decodeProgramDataLine(log);
  if (!programData)
    return null;
  const disc5 = new DataView(programData.buffer, programData.byteOffset, 8).getBigUint64(0, true);
  const data = programData.subarray(8);
  const meta = makeMetadata(signature, slot, txIndex, blockTimeUs, grpcRecvUs);
  if (disc5 === SWAP)
    return parseSwapEvent(data, meta);
  if (disc5 === SWAP2)
    return parseSwap2FromData(data, meta);
  if (disc5 === ADD_LIQUIDITY)
    return parseAddLiquidityFromData3(data, meta);
  if (disc5 === REMOVE_LIQUIDITY)
    return parseRemoveLiquidityFromData3(data, meta);
  if (disc5 === LIQUIDITY_CHANGE)
    return parseLiquidityChangeFromData2(data, meta);
  if (disc5 === INITIALIZE_POOL)
    return parseInitializePoolEvent(data, meta);
  if (disc5 === CREATE_POSITION)
    return parseCreatePositionEvent(data, meta);
  if (disc5 === CLOSE_POSITION)
    return parseClosePositionEvent(data, meta);
  if (disc5 === UPDATE_DELEGATE_PERMISSION)
    return parseUpdateDelegatePermissionFromData(data, meta);
  if (disc5 === WITHDRAW_DEAD_LIQUIDITY_REWARD) {
    return parseWithdrawDeadLiquidityRewardFromData(data, meta);
  }
  if (disc5 === CREATE_CONFIG)
    return parseCreateConfigFromData(data, meta);
  if (disc5 === CREATE_DYNAMIC_CONFIG)
    return parseCreateDynamicConfigFromData(data, meta);
  return null;
}

// dist/logs/meteora_dbc.js
function disc2(bytes) {
  const u8 = new Uint8Array(8);
  for (let i = 0; i < 8; i++)
    u8[i] = bytes[i];
  return new DataView(u8.buffer).getBigUint64(0, true);
}
var METEORA_DBC_DISC = {
  SWAP: disc2([27, 60, 21, 213, 138, 170, 187, 147]),
  INITIALIZE_POOL: disc2([228, 50, 246, 85, 203, 66, 134, 37]),
  CURVE_COMPLETE: disc2([229, 231, 86, 84, 156, 134, 75, 24])
};
function bn648(v) {
  return v ?? 0n;
}
function parseMeteoraDbcSwapFromData(data, metadata) {
  let o = 0;
  const pool = readPubkey(data, o);
  o += 32;
  const config = readPubkey(data, o);
  o += 32;
  const trade_direction = readU8(data, o);
  o += 1;
  const has_referral = readBool(data, o);
  o += 1;
  const params_amount_in = readU64LE(data, o);
  o += 8;
  const minimum_amount_out = readU64LE(data, o);
  o += 8;
  const actual_input_amount = readU64LE(data, o);
  o += 8;
  const output_amount = readU64LE(data, o);
  o += 8;
  const next_sqrt_price = readU128LE(data, o);
  o += 16;
  const trading_fee = readU64LE(data, o);
  o += 8;
  const protocol_fee = readU64LE(data, o);
  o += 8;
  const referral_fee = readU64LE(data, o);
  o += 8;
  const amount_in = readU64LE(data, o) ?? params_amount_in;
  o += 8;
  const current_timestamp = readU64LE(data, o);
  if (!pool || !config || trade_direction === null || has_referral === null || params_amount_in === null || minimum_amount_out === null || actual_input_amount === null || output_amount === null || next_sqrt_price === null || trading_fee === null || protocol_fee === null || referral_fee === null || current_timestamp === null) {
    return null;
  }
  const ev = {
    metadata,
    pool,
    config,
    trade_direction,
    has_referral,
    amount_in: bn648(amount_in),
    minimum_amount_out: bn648(minimum_amount_out),
    actual_input_amount: bn648(actual_input_amount),
    output_amount: bn648(output_amount),
    next_sqrt_price,
    trading_fee: bn648(trading_fee),
    protocol_fee: bn648(protocol_fee),
    referral_fee: bn648(referral_fee),
    current_timestamp: bn648(current_timestamp)
  };
  return { MeteoraDbcSwap: ev };
}
function parseMeteoraDbcInitializePoolFromData(data, metadata) {
  let o = 0;
  const pool = readPubkey(data, o);
  o += 32;
  const config = readPubkey(data, o);
  o += 32;
  const creator = readPubkey(data, o);
  o += 32;
  const base_mint = readPubkey(data, o);
  o += 32;
  const pool_type = readU8(data, o);
  o += 1;
  const activation_point = readU64LE(data, o);
  if (!pool || !config || !creator || !base_mint || pool_type === null || activation_point === null) {
    return null;
  }
  const ev = {
    metadata,
    pool,
    config,
    creator,
    base_mint,
    pool_type,
    activation_point: bn648(activation_point)
  };
  return { MeteoraDbcInitializePool: ev };
}
function parseMeteoraDbcCurveCompleteFromData(data, metadata) {
  let o = 0;
  const pool = readPubkey(data, o);
  o += 32;
  const config = readPubkey(data, o);
  o += 32;
  const base_reserve = readU64LE(data, o);
  o += 8;
  const quote_reserve = readU64LE(data, o);
  if (!pool || !config || base_reserve === null || quote_reserve === null)
    return null;
  const ev = {
    metadata,
    pool,
    config,
    base_reserve: bn648(base_reserve),
    quote_reserve: bn648(quote_reserve)
  };
  return { MeteoraDbcCurveComplete: ev };
}
function parseMeteoraDbcFromDiscriminator(discriminator, data, metadata) {
  if (discriminator === METEORA_DBC_DISC.SWAP)
    return parseMeteoraDbcSwapFromData(data, metadata);
  if (discriminator === METEORA_DBC_DISC.INITIALIZE_POOL) {
    return parseMeteoraDbcInitializePoolFromData(data, metadata);
  }
  if (discriminator === METEORA_DBC_DISC.CURVE_COMPLETE) {
    return parseMeteoraDbcCurveCompleteFromData(data, metadata);
  }
  return null;
}

// dist/logs/meteora_dlmm.js
function disc3(bytes) {
  const u8 = new Uint8Array(8);
  for (let i = 0; i < 8; i++)
    u8[i] = bytes[i];
  return new DataView(u8.buffer).getBigUint64(0, true);
}
var DLMM = {
  SWAP: disc3([81, 108, 227, 190, 205, 208, 10, 196]),
  SWAP2: disc3([46, 116, 82, 215, 148, 27, 84, 77]),
  ADD_LIQ: disc3([31, 94, 125, 90, 227, 52, 61, 186]),
  REMOVE_LIQ: disc3([116, 244, 97, 232, 103, 31, 152, 58]),
  INIT_BIN_ARRAY: disc3([11, 18, 155, 194, 33, 115, 238, 119]),
  INIT_POOL: disc3([185, 74, 252, 125, 27, 215, 188, 111]),
  CREATE_POS: disc3([144, 142, 252, 84, 157, 53, 37, 121]),
  CLOSE_POS: disc3([255, 196, 16, 107, 28, 202, 53, 128]),
  CLAIM_FEE: disc3([75, 122, 154, 48, 140, 74, 123, 163]),
  CLAIM_FEE2: disc3([232, 171, 242, 97, 58, 77, 35, 45]),
  LEGACY_SWAP: disc3([143, 190, 90, 218, 196, 30, 51, 222]),
  LEGACY_ADD_LIQ: disc3([181, 157, 89, 67, 143, 182, 52, 72]),
  LEGACY_REMOVE_LIQ: disc3([80, 85, 209, 72, 24, 206, 35, 178]),
  LEGACY_INIT_POOL: disc3([95, 180, 10, 172, 84, 174, 232, 40]),
  LEGACY_CREATE_POS: disc3([123, 233, 11, 43, 146, 180, 97, 119]),
  LEGACY_CLOSE_POS: disc3([94, 168, 102, 45, 59, 122, 137, 54]),
  LEGACY_CLAIM_FEE: disc3([152, 70, 208, 111, 104, 91, 44, 1])
};
function bn649(v) {
  return v ?? 0n;
}
function parseDlmmFromDecoded(programData, metadata) {
  if (programData.length < 8)
    return null;
  const dv = new DataView(programData.buffer, programData.byteOffset, 8);
  const discriminator = dv.getBigUint64(0, true);
  const data = programData.subarray(8);
  return parseDlmmEventFromData(discriminator, data, metadata);
}
function parseDlmmEventFromData(discriminator, data, metadata) {
  if (discriminator === DLMM.SWAP || discriminator === DLMM.LEGACY_SWAP) {
    if (data.length < 129)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const from = readPubkey(data, o);
    o += 32;
    const start_bin_id = readI32LE(data, o);
    o += 4;
    const end_bin_id = readI32LE(data, o);
    o += 4;
    const amount_in = bn649(readU64LE(data, o));
    o += 8;
    const amount_out = bn649(readU64LE(data, o));
    o += 8;
    const swap_for_y = readBool(data, o);
    o += 1;
    const fee = bn649(readU64LE(data, o));
    o += 8;
    const protocol_fee = bn649(readU64LE(data, o));
    o += 8;
    const fee_bps = readU128LE(data, o);
    o += 16;
    const host_fee = bn649(readU64LE(data, o));
    const ev = {
      metadata,
      token_x_mint: defaultPubkey(),
      token_y_mint: defaultPubkey(),
      user_token_in: defaultPubkey(),
      user_token_out: defaultPubkey(),
      min_amount_out: 0n,
      pool,
      from,
      start_bin_id,
      end_bin_id,
      amount_in,
      amount_out,
      swap_for_y,
      fee,
      protocol_fee,
      fee_bps,
      host_fee
    };
    return { MeteoraDlmmSwap: ev };
  }
  if (discriminator === DLMM.SWAP2) {
    if (data.length < 147)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const from = readPubkey(data, o);
    o += 32;
    const start_bin_id = readI32LE(data, o);
    o += 4;
    const end_bin_id = readI32LE(data, o);
    o += 4;
    const swap_for_y = readBool(data, o);
    o += 1;
    const fee_bps = readU128LE(data, o);
    o += 16;
    const amount_in = bn649(readU64LE(data, o));
    o += 8;
    o += 8;
    const amount_out = bn649(readU64LE(data, o));
    o += 8;
    const fee = bn649(readU64LE(data, o));
    o += 8;
    const protocol_fee = bn649(readU64LE(data, o));
    o += 8;
    o += 8;
    const host_fee = bn649(readU64LE(data, o));
    const ev = {
      metadata,
      token_x_mint: defaultPubkey(),
      token_y_mint: defaultPubkey(),
      user_token_in: defaultPubkey(),
      user_token_out: defaultPubkey(),
      min_amount_out: 0n,
      pool,
      from,
      start_bin_id,
      end_bin_id,
      amount_in,
      amount_out,
      swap_for_y,
      fee,
      protocol_fee,
      fee_bps,
      host_fee
    };
    return { MeteoraDlmmSwap: ev };
  }
  if (discriminator === DLMM.ADD_LIQ || discriminator === DLMM.LEGACY_ADD_LIQ) {
    if (data.length < 116)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const from = readPubkey(data, o);
    o += 32;
    const position = readPubkey(data, o);
    o += 32;
    const a0 = bn649(readU64LE(data, o));
    o += 8;
    const a1 = bn649(readU64LE(data, o));
    o += 8;
    const active_bin_id = readI32LE(data, o);
    const ev = {
      metadata,
      pool,
      from,
      position,
      amounts: [a0, a1],
      active_bin_id
    };
    return { MeteoraDlmmAddLiquidity: ev };
  }
  if (discriminator === DLMM.REMOVE_LIQ || discriminator === DLMM.LEGACY_REMOVE_LIQ) {
    if (data.length < 116)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const from = readPubkey(data, o);
    o += 32;
    const position = readPubkey(data, o);
    o += 32;
    const a0 = bn649(readU64LE(data, o));
    o += 8;
    const a1 = bn649(readU64LE(data, o));
    o += 8;
    const active_bin_id = readI32LE(data, o);
    const ev = {
      metadata,
      pool,
      from,
      position,
      amounts: [a0, a1],
      active_bin_id
    };
    return { MeteoraDlmmRemoveLiquidity: ev };
  }
  if (discriminator === DLMM.INIT_POOL) {
    if (data.length < 98)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const bin_step = readU16LE(data, o);
    const ev = {
      metadata,
      pool,
      creator: defaultPubkey(),
      active_bin_id: 0,
      bin_step
    };
    return { MeteoraDlmmInitializePool: ev };
  }
  if (discriminator === DLMM.LEGACY_INIT_POOL) {
    if (data.length < 70)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const creator = readPubkey(data, o);
    o += 32;
    const active_bin_id = readI32LE(data, o);
    o += 4;
    const bin_step = readU16LE(data, o);
    const ev = {
      metadata,
      pool,
      creator,
      active_bin_id,
      bin_step
    };
    return { MeteoraDlmmInitializePool: ev };
  }
  if (discriminator === DLMM.INIT_BIN_ARRAY) {
    if (data.length < 72)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const bin_array = readPubkey(data, o);
    o += 32;
    const index = bn649(readU64LE(data, o));
    const ev = { metadata, pool, bin_array, index };
    return { MeteoraDlmmInitializeBinArray: ev };
  }
  if (discriminator === DLMM.CREATE_POS) {
    if (data.length < 96)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const position = readPubkey(data, o);
    o += 32;
    const owner = readPubkey(data, o);
    const ev = {
      metadata,
      pool,
      position,
      owner,
      lower_bin_id: 0,
      width: 0
    };
    return { MeteoraDlmmCreatePosition: ev };
  }
  if (discriminator === DLMM.LEGACY_CREATE_POS) {
    if (data.length < 104)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const position = readPubkey(data, o);
    o += 32;
    const owner = readPubkey(data, o);
    o += 32;
    const lower_bin_id = readI32LE(data, o);
    o += 4;
    const width = readU32LE(data, o);
    const ev = {
      metadata,
      pool,
      position,
      owner,
      lower_bin_id,
      width
    };
    return { MeteoraDlmmCreatePosition: ev };
  }
  if (discriminator === DLMM.CLOSE_POS) {
    if (data.length < 64)
      return null;
    let o = 0;
    const position = readPubkey(data, o);
    o += 32;
    const owner = readPubkey(data, o);
    const ev = {
      metadata,
      pool: defaultPubkey(),
      position,
      owner
    };
    return { MeteoraDlmmClosePosition: ev };
  }
  if (discriminator === DLMM.LEGACY_CLOSE_POS) {
    if (data.length < 96)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const position = readPubkey(data, o);
    o += 32;
    const owner = readPubkey(data, o);
    const ev = { metadata, pool, position, owner };
    return { MeteoraDlmmClosePosition: ev };
  }
  if (discriminator === DLMM.CLAIM_FEE || discriminator === DLMM.CLAIM_FEE2 || discriminator === DLMM.LEGACY_CLAIM_FEE) {
    const requiredLength = discriminator === DLMM.CLAIM_FEE2 ? 116 : 112;
    if (data.length < requiredLength)
      return null;
    let o = 0;
    const pool = readPubkey(data, o);
    o += 32;
    const position = readPubkey(data, o);
    o += 32;
    const owner = readPubkey(data, o);
    o += 32;
    const fee_x = bn649(readU64LE(data, o));
    o += 8;
    const fee_y = bn649(readU64LE(data, o));
    const ev = { metadata, pool, position, owner, fee_x, fee_y };
    return { MeteoraDlmmClaimFee: ev };
  }
  return null;
}

// dist/logs/raydium_launchlab.js
function disc4(bytes) {
  const u8 = new Uint8Array(8);
  for (let i = 0; i < 8; i++)
    u8[i] = bytes[i];
  return new DataView(u8.buffer).getBigUint64(0, true);
}
var RAYDIUM_LAUNCHLAB_DISC = {
  TRADE: disc4([189, 219, 127, 211, 78, 230, 97, 238]),
  POOL_CREATE: disc4([151, 215, 226, 9, 118, 161, 115, 174])
};
function bn6410(v) {
  return v ?? 0n;
}
function parseRaydiumLaunchlabTradeFromData(data, metadata) {
  const pool_state = readPubkey(data, 0);
  const amount_in = readU64LE(data, 88);
  const amount_out = readU64LE(data, 96);
  const trade_direction = readU8(data, 136);
  const exact_in = readBool(data, 138);
  if (!pool_state || amount_in === null || amount_out === null || trade_direction === null || exact_in === null) {
    return null;
  }
  const is_buy = trade_direction === 0;
  const ev = {
    metadata,
    pool_state,
    user: "11111111111111111111111111111111",
    amount_in: bn6410(amount_in),
    amount_out: bn6410(amount_out),
    is_buy,
    trade_direction: is_buy ? "Buy" : "Sell",
    exact_in
  };
  return { RaydiumLaunchlabTrade: ev };
}
function parseRaydiumLaunchlabPoolCreateFromData(data, metadata) {
  if (data.length < 97)
    return null;
  let o = 0;
  const pool_state = readPubkey(data, o);
  o += 32;
  const creator = readPubkey(data, o);
  o += 32;
  const config = readPubkey(data, o);
  if (!pool_state || !creator || !config)
    return null;
  o += 32;
  const decimals = readU8(data, o);
  if (decimals === null)
    return null;
  o += 1;
  const name = readBorshString(data, o);
  if (!name)
    return null;
  o = name.next;
  const symbol = readBorshString(data, o);
  if (!symbol)
    return null;
  o = symbol.next;
  const uri = readBorshString(data, o);
  if (!uri)
    return null;
  const ev = {
    metadata,
    base_mint_param: { symbol: symbol.s, name: name.s, uri: uri.s, decimals },
    pool_state,
    creator
  };
  return { RaydiumLaunchlabPoolCreate: ev };
}
function parseRaydiumLaunchlabFromDiscriminator(discriminator, data, metadata) {
  if (discriminator === RAYDIUM_LAUNCHLAB_DISC.TRADE)
    return parseRaydiumLaunchlabTradeFromData(data, metadata);
  if (discriminator === RAYDIUM_LAUNCHLAB_DISC.POOL_CREATE)
    return parseRaydiumLaunchlabPoolCreateFromData(data, metadata);
  return null;
}

// dist/instr/program_ids.js
var PUMPFUN_PROGRAM_ID = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P";
var PUMPSWAP_PROGRAM_ID = "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA";
var PUMPSWAP_FEES_PROGRAM_ID = "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ";
var PUMP_FEES_PROGRAM_ID = PUMPSWAP_FEES_PROGRAM_ID;
var RAYDIUM_LAUNCHLAB_PROGRAM_ID = "LanMV9sAd7wArD4vJFi2qDdfnVhFxYSUg6eADduJ3uj";
var RAYDIUM_CPMM_PROGRAM_ID = "CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C";
var RAYDIUM_CLMM_PROGRAM_ID = "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK";
var RAYDIUM_AMM_V4_PROGRAM_ID = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8";
var ORCA_WHIRLPOOL_PROGRAM_ID = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc";
var METEORA_POOLS_PROGRAM_ID = "Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB";
var METEORA_DAMM_V2_PROGRAM_ID = "cpamdpZCGKUy5JxQXB4dcpGPiikHawvSWAd6mEn1sGG";
var METEORA_DLMM_PROGRAM_ID = "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo";
var METEORA_DBC_PROGRAM_ID = "dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN";

// dist/logs/optimized_matcher.js
var DLMM_DISC = {
  SWAP: u64leDiscriminator([81, 108, 227, 190, 205, 208, 10, 196]),
  SWAP2: u64leDiscriminator([46, 116, 82, 215, 148, 27, 84, 77]),
  ADD_LIQUIDITY: u64leDiscriminator([31, 94, 125, 90, 227, 52, 61, 186]),
  REMOVE_LIQUIDITY: u64leDiscriminator([116, 244, 97, 232, 103, 31, 152, 58]),
  INITIALIZE_POOL: u64leDiscriminator([185, 74, 252, 125, 27, 215, 188, 111]),
  INITIALIZE_BIN_ARRAY: u64leDiscriminator([11, 18, 155, 194, 33, 115, 238, 119]),
  CREATE_POSITION: u64leDiscriminator([144, 142, 252, 84, 157, 53, 37, 121]),
  CLOSE_POSITION: u64leDiscriminator([255, 196, 16, 107, 28, 202, 53, 128]),
  CLAIM_FEE: u64leDiscriminator([75, 122, 154, 48, 140, 74, 123, 163]),
  CLAIM_FEE2: u64leDiscriminator([232, 171, 242, 97, 58, 77, 35, 45])
};
function discriminatorToEventType(disc5) {
  if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_CREATE)
    return "PumpFunCreate";
  if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_TRADE)
    return "PumpFunTrade";
  if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_MIGRATE)
    return "PumpFunMigrate";
  if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_MIGRATE_BONDING_CURVE_CREATOR)
    return "PumpFunMigrateBondingCurveCreator";
  if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_CREATE_FEE_SHARING_CONFIG)
    return "PumpFeesCreateFeeSharingConfig";
  if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_INITIALIZE_FEE_CONFIG)
    return "PumpFeesInitializeFeeConfig";
  if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_RESET_FEE_SHARING_CONFIG)
    return "PumpFeesResetFeeSharingConfig";
  if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_REVOKE_FEE_SHARING_AUTHORITY)
    return "PumpFeesRevokeFeeSharingAuthority";
  if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_TRANSFER_FEE_SHARING_AUTHORITY)
    return "PumpFeesTransferFeeSharingAuthority";
  if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_ADMIN)
    return "PumpFeesUpdateAdmin";
  if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_FEE_CONFIG)
    return "PumpFeesUpdateFeeConfig";
  if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_FEE_SHARES)
    return "PumpFeesUpdateFeeShares";
  if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_UPSERT_FEE_TIERS)
    return "PumpFeesUpsertFeeTiers";
  if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_BUY)
    return "PumpSwapBuy";
  if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_SELL)
    return "PumpSwapSell";
  if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_CREATE_POOL)
    return "PumpSwapCreatePool";
  if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_ADD_LIQUIDITY)
    return "PumpSwapLiquidityAdded";
  if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_REMOVE_LIQUIDITY)
    return "PumpSwapLiquidityRemoved";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_SWAP)
    return "RaydiumClmmSwap";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_INCREASE_LIQUIDITY)
    return "RaydiumClmmIncreaseLiquidity";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_DECREASE_LIQUIDITY)
    return "RaydiumClmmDecreaseLiquidity";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_LIQUIDITY_CHANGE)
    return "RaydiumClmmLiquidityChange";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_CONFIG_CHANGE)
    return "RaydiumClmmConfigChange";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_CREATE_PERSONAL_POSITION)
    return "RaydiumClmmCreatePersonalPosition";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_LIQUIDITY_CALCULATE)
    return "RaydiumClmmLiquidityCalculate";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_OPEN_LIMIT_ORDER)
    return "RaydiumClmmOpenLimitOrder";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_INCREASE_LIMIT_ORDER)
    return "RaydiumClmmIncreaseLimitOrder";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_DECREASE_LIMIT_ORDER)
    return "RaydiumClmmDecreaseLimitOrder";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_SETTLE_LIMIT_ORDER)
    return "RaydiumClmmSettleLimitOrder";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_UPDATE_REWARD_INFOS)
    return "RaydiumClmmUpdateRewardInfos";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_CREATE_POOL)
    return "RaydiumClmmCreatePool";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_COLLECT_PERSONAL_FEE || disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_COLLECT_PROTOCOL_FEE)
    return "RaydiumClmmCollectFee";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_BASE_IN)
    return "RaydiumCpmmSwap";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_BASE_OUT)
    return "RaydiumCpmmSwap";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_CREATE_POOL)
    return "RaydiumCpmmInitialize";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_DEPOSIT)
    return "RaydiumCpmmDeposit";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_WITHDRAW)
    return "RaydiumCpmmWithdraw";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_SWAP_BASE_IN)
    return "RaydiumAmmV4Swap";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_SWAP_BASE_OUT)
    return "RaydiumAmmV4Swap";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_DEPOSIT)
    return "RaydiumAmmV4Deposit";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_WITHDRAW)
    return "RaydiumAmmV4Withdraw";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_WITHDRAW_PNL)
    return "RaydiumAmmV4WithdrawPnl";
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_INITIALIZE2)
    return "RaydiumAmmV4Initialize2";
  if (disc5 === PROGRAM_LOG_DISC.ORCA_TRADED)
    return "OrcaWhirlpoolSwap";
  if (disc5 === PROGRAM_LOG_DISC.ORCA_LIQUIDITY_INCREASED)
    return "OrcaWhirlpoolLiquidityIncreased";
  if (disc5 === PROGRAM_LOG_DISC.ORCA_LIQUIDITY_DECREASED)
    return "OrcaWhirlpoolLiquidityDecreased";
  if (disc5 === PROGRAM_LOG_DISC.ORCA_POOL_INITIALIZED)
    return "OrcaWhirlpoolPoolInitialized";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_SWAP)
    return "MeteoraPoolsSwap";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_ADD_LIQUIDITY)
    return "MeteoraPoolsAddLiquidity";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_REMOVE_LIQUIDITY)
    return "MeteoraPoolsRemoveLiquidity";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_BOOTSTRAP_LIQUIDITY)
    return "MeteoraPoolsBootstrapLiquidity";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_POOL_CREATED)
    return "MeteoraPoolsPoolCreated";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_SET_POOL_FEES)
    return "MeteoraPoolsSetPoolFees";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_SWAP)
    return "MeteoraDammV2Swap";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_SWAP2)
    return "MeteoraDammV2Swap";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_ADD_LIQUIDITY)
    return "MeteoraDammV2AddLiquidity";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_REMOVE_LIQUIDITY)
    return "MeteoraDammV2RemoveLiquidity";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_LIQUIDITY_CHANGE)
    return null;
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_INITIALIZE_POOL)
    return "MeteoraDammV2InitializePool";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_CREATE_POSITION)
    return "MeteoraDammV2CreatePosition";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_CLOSE_POSITION)
    return "MeteoraDammV2ClosePosition";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_UPDATE_DELEGATE_PERMISSION) {
    return "MeteoraDammV2UpdateDelegatePermission";
  }
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_WITHDRAW_DEAD_LIQUIDITY_REWARD) {
    return "MeteoraDammV2WithdrawDeadLiquidityReward";
  }
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_CREATE_CONFIG)
    return "MeteoraDammV2CreateConfig";
  if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_CREATE_DYNAMIC_CONFIG)
    return "MeteoraDammV2CreateDynamicConfig";
  return null;
}
function programScopedDiscriminatorToEventType(programId, disc5) {
  if (programId === PUMPFUN_PROGRAM_ID) {
    if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_CREATE)
      return "PumpFunCreate";
    if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_TRADE)
      return "PumpFunTrade";
    if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_MIGRATE)
      return "PumpFunMigrate";
    if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_MIGRATE_BONDING_CURVE_CREATOR)
      return "PumpFunMigrateBondingCurveCreator";
    return null;
  }
  if (programId === PUMP_FEES_PROGRAM_ID) {
    if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_CREATE_FEE_SHARING_CONFIG)
      return "PumpFeesCreateFeeSharingConfig";
    if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_INITIALIZE_FEE_CONFIG)
      return "PumpFeesInitializeFeeConfig";
    if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_RESET_FEE_SHARING_CONFIG)
      return "PumpFeesResetFeeSharingConfig";
    if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_REVOKE_FEE_SHARING_AUTHORITY)
      return "PumpFeesRevokeFeeSharingAuthority";
    if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_TRANSFER_FEE_SHARING_AUTHORITY)
      return "PumpFeesTransferFeeSharingAuthority";
    if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_ADMIN)
      return "PumpFeesUpdateAdmin";
    if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_FEE_CONFIG)
      return "PumpFeesUpdateFeeConfig";
    if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_FEE_SHARES)
      return "PumpFeesUpdateFeeShares";
    if (disc5 === PROGRAM_LOG_DISC.PUMP_FEES_UPSERT_FEE_TIERS)
      return "PumpFeesUpsertFeeTiers";
    return null;
  }
  if (programId === PUMPSWAP_PROGRAM_ID) {
    if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_BUY)
      return "PumpSwapBuy";
    if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_SELL)
      return "PumpSwapSell";
    if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_CREATE_POOL)
      return "PumpSwapCreatePool";
    if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_ADD_LIQUIDITY)
      return "PumpSwapLiquidityAdded";
    if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_REMOVE_LIQUIDITY)
      return "PumpSwapLiquidityRemoved";
    return null;
  }
  if (programId === RAYDIUM_LAUNCHLAB_PROGRAM_ID) {
    if (disc5 === RAYDIUM_LAUNCHLAB_DISC.TRADE)
      return "RaydiumLaunchlabTrade";
    if (disc5 === RAYDIUM_LAUNCHLAB_DISC.POOL_CREATE)
      return "RaydiumLaunchlabPoolCreate";
    return null;
  }
  if (programId === RAYDIUM_CLMM_PROGRAM_ID) {
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_SWAP)
      return "RaydiumClmmSwap";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_INCREASE_LIQUIDITY)
      return "RaydiumClmmIncreaseLiquidity";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_DECREASE_LIQUIDITY)
      return "RaydiumClmmDecreaseLiquidity";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_LIQUIDITY_CHANGE)
      return "RaydiumClmmLiquidityChange";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_CONFIG_CHANGE)
      return "RaydiumClmmConfigChange";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_CREATE_PERSONAL_POSITION)
      return "RaydiumClmmCreatePersonalPosition";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_LIQUIDITY_CALCULATE)
      return "RaydiumClmmLiquidityCalculate";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_OPEN_LIMIT_ORDER)
      return "RaydiumClmmOpenLimitOrder";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_INCREASE_LIMIT_ORDER)
      return "RaydiumClmmIncreaseLimitOrder";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_DECREASE_LIMIT_ORDER)
      return "RaydiumClmmDecreaseLimitOrder";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_SETTLE_LIMIT_ORDER)
      return "RaydiumClmmSettleLimitOrder";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_UPDATE_REWARD_INFOS)
      return "RaydiumClmmUpdateRewardInfos";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_CREATE_POOL)
      return "RaydiumClmmCreatePool";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_COLLECT_PERSONAL_FEE || disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_COLLECT_PROTOCOL_FEE) {
      return "RaydiumClmmCollectFee";
    }
    return null;
  }
  if (programId === RAYDIUM_CPMM_PROGRAM_ID) {
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_EVENT || disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_BASE_IN || disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_BASE_OUT)
      return "RaydiumCpmmSwap";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_CREATE_POOL)
      return "RaydiumCpmmInitialize";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_DEPOSIT)
      return "RaydiumCpmmDeposit";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_WITHDRAW)
      return "RaydiumCpmmWithdraw";
    return null;
  }
  if (programId === RAYDIUM_AMM_V4_PROGRAM_ID) {
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_SWAP_BASE_IN || disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_SWAP_BASE_OUT)
      return "RaydiumAmmV4Swap";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_DEPOSIT)
      return "RaydiumAmmV4Deposit";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_WITHDRAW)
      return "RaydiumAmmV4Withdraw";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_INITIALIZE2)
      return "RaydiumAmmV4Initialize2";
    if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_WITHDRAW_PNL)
      return "RaydiumAmmV4WithdrawPnl";
    return null;
  }
  if (programId === ORCA_WHIRLPOOL_PROGRAM_ID) {
    if (disc5 === PROGRAM_LOG_DISC.ORCA_TRADED)
      return "OrcaWhirlpoolSwap";
    if (disc5 === PROGRAM_LOG_DISC.ORCA_LIQUIDITY_INCREASED)
      return "OrcaWhirlpoolLiquidityIncreased";
    if (disc5 === PROGRAM_LOG_DISC.ORCA_LIQUIDITY_DECREASED)
      return "OrcaWhirlpoolLiquidityDecreased";
    if (disc5 === PROGRAM_LOG_DISC.ORCA_POOL_INITIALIZED)
      return "OrcaWhirlpoolPoolInitialized";
    return null;
  }
  if (programId === METEORA_POOLS_PROGRAM_ID) {
    if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_SWAP)
      return "MeteoraPoolsSwap";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_ADD_LIQUIDITY)
      return "MeteoraPoolsAddLiquidity";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_REMOVE_LIQUIDITY)
      return "MeteoraPoolsRemoveLiquidity";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_BOOTSTRAP_LIQUIDITY)
      return "MeteoraPoolsBootstrapLiquidity";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_POOL_CREATED)
      return "MeteoraPoolsPoolCreated";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_AMM_SET_POOL_FEES)
      return "MeteoraPoolsSetPoolFees";
    return null;
  }
  if (programId === METEORA_DAMM_V2_PROGRAM_ID) {
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_SWAP || disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_SWAP2)
      return "MeteoraDammV2Swap";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_ADD_LIQUIDITY)
      return "MeteoraDammV2AddLiquidity";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_REMOVE_LIQUIDITY)
      return "MeteoraDammV2RemoveLiquidity";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_LIQUIDITY_CHANGE)
      return null;
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_INITIALIZE_POOL)
      return "MeteoraDammV2InitializePool";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_CREATE_POSITION)
      return "MeteoraDammV2CreatePosition";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_CLOSE_POSITION)
      return "MeteoraDammV2ClosePosition";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_UPDATE_DELEGATE_PERMISSION) {
      return "MeteoraDammV2UpdateDelegatePermission";
    }
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_WITHDRAW_DEAD_LIQUIDITY_REWARD) {
      return "MeteoraDammV2WithdrawDeadLiquidityReward";
    }
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_CREATE_CONFIG)
      return "MeteoraDammV2CreateConfig";
    if (disc5 === PROGRAM_LOG_DISC.METEORA_DAMM_CREATE_DYNAMIC_CONFIG)
      return "MeteoraDammV2CreateDynamicConfig";
    return null;
  }
  if (programId === METEORA_DBC_PROGRAM_ID) {
    if (disc5 === METEORA_DBC_DISC.SWAP)
      return "MeteoraDbcSwap";
    if (disc5 === METEORA_DBC_DISC.INITIALIZE_POOL)
      return "MeteoraDbcInitializePool";
    if (disc5 === METEORA_DBC_DISC.CURVE_COMPLETE)
      return "MeteoraDbcCurveComplete";
    return null;
  }
  if (programId === METEORA_DLMM_PROGRAM_ID) {
    if (disc5 === DLMM_DISC.SWAP || disc5 === DLMM_DISC.SWAP2)
      return "MeteoraDlmmSwap";
    if (disc5 === DLMM_DISC.ADD_LIQUIDITY)
      return "MeteoraDlmmAddLiquidity";
    if (disc5 === DLMM_DISC.REMOVE_LIQUIDITY)
      return "MeteoraDlmmRemoveLiquidity";
    if (disc5 === DLMM_DISC.INITIALIZE_POOL)
      return "MeteoraDlmmInitializePool";
    if (disc5 === DLMM_DISC.INITIALIZE_BIN_ARRAY)
      return "MeteoraDlmmInitializeBinArray";
    if (disc5 === DLMM_DISC.CREATE_POSITION)
      return "MeteoraDlmmCreatePosition";
    if (disc5 === DLMM_DISC.CLOSE_POSITION)
      return "MeteoraDlmmClosePosition";
    if (disc5 === DLMM_DISC.CLAIM_FEE || disc5 === DLMM_DISC.CLAIM_FEE2)
      return "MeteoraDlmmClaimFee";
    return null;
  }
  return discriminatorToEventType(disc5);
}
function filterAllowsUnknownSupported(filter) {
  return !filter?.include_only;
}
function filterWantsSupportedLogs(filter) {
  return filterIncludesProgram(PUMPFUN_PROGRAM_ID, filter) || filterIncludesProgram(PUMP_FEES_PROGRAM_ID, filter) || filterIncludesProgram(PUMPSWAP_PROGRAM_ID, filter) || filterIncludesProgram(RAYDIUM_LAUNCHLAB_PROGRAM_ID, filter) || filterIncludesProgram(RAYDIUM_CLMM_PROGRAM_ID, filter) || filterIncludesProgram(RAYDIUM_CPMM_PROGRAM_ID, filter) || filterIncludesProgram(RAYDIUM_AMM_V4_PROGRAM_ID, filter) || filterIncludesProgram(ORCA_WHIRLPOOL_PROGRAM_ID, filter) || filterIncludesProgram(METEORA_POOLS_PROGRAM_ID, filter) || filterIncludesProgram(METEORA_DAMM_V2_PROGRAM_ID, filter) || filterIncludesProgram(METEORA_DLMM_PROGRAM_ID, filter) || filterIncludesProgram(METEORA_DBC_PROGRAM_ID, filter);
}
function filterIncludesAny(filter, types) {
  if (filter.include_only) {
    return filter.include_only.some((t) => types.includes(t));
  }
  return types.some((t) => filter.shouldInclude(t));
}
function filterIncludesProgram(programId, filter) {
  if (programId === PUMPFUN_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "PumpFunTrade",
      "PumpFunBuy",
      "PumpFunSell",
      "PumpFunBuyExactSolIn",
      "PumpFunCreate",
      "PumpFunCreateV2",
      "PumpFunComplete",
      "PumpFunMigrate",
      "PumpFunMigrateBondingCurveCreator"
    ]);
  }
  if (programId === PUMP_FEES_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "PumpFeesCreateFeeSharingConfig",
      "PumpFeesInitializeFeeConfig",
      "PumpFeesResetFeeSharingConfig",
      "PumpFeesRevokeFeeSharingAuthority",
      "PumpFeesTransferFeeSharingAuthority",
      "PumpFeesUpdateAdmin",
      "PumpFeesUpdateFeeConfig",
      "PumpFeesUpdateFeeShares",
      "PumpFeesUpsertFeeTiers"
    ]);
  }
  if (programId === PUMPSWAP_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "PumpSwapTrade",
      "PumpSwapBuy",
      "PumpSwapSell",
      "PumpSwapCreatePool",
      "PumpSwapLiquidityAdded",
      "PumpSwapLiquidityRemoved"
    ]);
  }
  if (programId === RAYDIUM_LAUNCHLAB_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "RaydiumLaunchlabTrade",
      "RaydiumLaunchlabPoolCreate",
      "RaydiumLaunchlabMigrateAmm"
    ]);
  }
  if (programId === RAYDIUM_CLMM_PROGRAM_ID) {
    return filterIncludesAny(filter, [
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
      "RaydiumClmmCollectFee"
    ]);
  }
  if (programId === RAYDIUM_CPMM_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "RaydiumCpmmSwap",
      "RaydiumCpmmDeposit",
      "RaydiumCpmmWithdraw",
      "RaydiumCpmmInitialize"
    ]);
  }
  if (programId === RAYDIUM_AMM_V4_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "RaydiumAmmV4Swap",
      "RaydiumAmmV4Deposit",
      "RaydiumAmmV4Withdraw",
      "RaydiumAmmV4Initialize2",
      "RaydiumAmmV4WithdrawPnl"
    ]);
  }
  if (programId === ORCA_WHIRLPOOL_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "OrcaWhirlpoolSwap",
      "OrcaWhirlpoolLiquidityIncreased",
      "OrcaWhirlpoolLiquidityDecreased",
      "OrcaWhirlpoolPoolInitialized"
    ]);
  }
  if (programId === METEORA_POOLS_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "MeteoraPoolsSwap",
      "MeteoraPoolsAddLiquidity",
      "MeteoraPoolsRemoveLiquidity",
      "MeteoraPoolsBootstrapLiquidity",
      "MeteoraPoolsPoolCreated",
      "MeteoraPoolsSetPoolFees"
    ]);
  }
  if (programId === METEORA_DAMM_V2_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "MeteoraDammV2Swap",
      "MeteoraDammV2AddLiquidity",
      "MeteoraDammV2RemoveLiquidity",
      "MeteoraDammV2InitializePool",
      "MeteoraDammV2CreatePosition",
      "MeteoraDammV2ClosePosition",
      "MeteoraDammV2UpdateDelegatePermission",
      "MeteoraDammV2WithdrawDeadLiquidityReward",
      "MeteoraDammV2CreateConfig",
      "MeteoraDammV2CreateDynamicConfig"
    ]);
  }
  if (programId === METEORA_DBC_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "MeteoraDbcSwap",
      "MeteoraDbcInitializePool",
      "MeteoraDbcCurveComplete"
    ]);
  }
  if (programId === METEORA_DLMM_PROGRAM_ID) {
    return filterIncludesAny(filter, [
      "MeteoraDlmmSwap",
      "MeteoraDlmmAddLiquidity",
      "MeteoraDlmmRemoveLiquidity",
      "MeteoraDlmmInitializePool",
      "MeteoraDlmmInitializeBinArray",
      "MeteoraDlmmCreatePosition",
      "MeteoraDlmmClosePosition",
      "MeteoraDlmmClaimFee"
    ]);
  }
  return filterAllowsUnknownSupported(filter);
}
function pumpfunTradeMatchesFilter(ev, includeOnly) {
  if ("PumpFunBuy" in ev)
    return includeOnly.includes("PumpFunBuy") || includeOnly.includes("PumpFunBuyExactSolIn");
  if ("PumpFunSell" in ev)
    return includeOnly.includes("PumpFunSell");
  if ("PumpFunBuyExactSolIn" in ev)
    return includeOnly.includes("PumpFunBuy") || includeOnly.includes("PumpFunBuyExactSolIn");
  if ("PumpFunTrade" in ev)
    return includeOnly.includes("PumpFunTrade");
  if ("PumpFunCreate" in ev)
    return includeOnly.includes("PumpFunCreate");
  if ("PumpFunCreateV2" in ev)
    return includeOnly.includes("PumpFunCreateV2");
  return false;
}
function eventTypeFromDexEvent(ev) {
  const key = Object.keys(ev)[0];
  return key ? key : null;
}
function applyActualEventTypeFilter(ev, filter) {
  if (!ev || !filter)
    return ev;
  const actual = eventTypeFromDexEvent(ev);
  if (actual && !filter.shouldInclude(actual))
    return null;
  return ev;
}
function applyPumpfunSecondaryFilter(ev, filter) {
  if (!ev || !filter)
    return ev;
  if (filter.include_only?.length) {
    const hasSpecific = filter.include_only.some((t) => ["PumpFunBuy", "PumpFunSell", "PumpFunBuyExactSolIn", "PumpFunCreate", "PumpFunCreateV2"].includes(t));
    if (hasSpecific && !pumpfunTradeMatchesFilter(ev, filter.include_only))
      return null;
  }
  return applyActualEventTypeFilter(ev, filter);
}
function filterWantsPumpfunTrade(filter) {
  return !filter || filter.shouldInclude("PumpFunTrade") || filter.shouldInclude("PumpFunBuy") || filter.shouldInclude("PumpFunSell") || filter.shouldInclude("PumpFunBuyExactSolIn");
}
function filterWantsRaydiumLaunchlabTrade(filter) {
  return !filter || filter.shouldInclude("RaydiumLaunchlabTrade");
}
function filterAllowsUnscopedDiscriminator(filter, disc5) {
  if (!filter)
    return true;
  if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_TRADE) {
    return filterWantsPumpfunTrade(filter) || filterWantsRaydiumLaunchlabTrade(filter);
  }
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_BASE_IN) {
    return filter.shouldInclude("RaydiumCpmmSwap") || filter.shouldInclude("MeteoraDlmmSwap");
  }
  const eventType = discriminatorToEventType(disc5);
  if (eventType !== null)
    return filter.shouldInclude(eventType);
  return filterWantsSupportedLogs(filter);
}
function parseUnscopedPumpfunLaunchlabTrade(data, metadata, filter, isCreatedBuy) {
  if (filterWantsPumpfunTrade(filter)) {
    const pumpfun = applyPumpfunSecondaryFilter(parseTradeFromData(data, metadata, isCreatedBuy), filter);
    if (pumpfun)
      return pumpfun;
  }
  if (filterWantsRaydiumLaunchlabTrade(filter)) {
    return applyActualEventTypeFilter(parseRaydiumLaunchlabFromDiscriminator(PROGRAM_LOG_DISC.PUMPFUN_TRADE, data, metadata), filter);
  }
  return null;
}
function parseLogOptimized(log, signature, slot, txIndex, blockTimeUs, grpcRecvUs, eventTypeFilter, isCreatedBuy, recentBlockhash, programId) {
  if (programId === RAYDIUM_AMM_V4_PROGRAM_ID && log.indexOf("ray_log: ") >= 0) {
    if (eventTypeFilter && !eventTypeFilter.shouldInclude("RaydiumAmmV4Swap"))
      return null;
    const rb2 = recentBlockhash && recentBlockhash.length > 0 ? esm_default2.encode(recentBlockhash) : void 0;
    const metadata2 = makeMetadata(signature, slot, txIndex, blockTimeUs, grpcRecvUs, rb2);
    return parseRayLogSwap(log, metadata2);
  }
  const buf = decodeProgramDataLine(log);
  if (!buf)
    return null;
  const disc5 = readDiscriminatorU64(buf);
  if (disc5 === null)
    return null;
  const data = buf.subarray(8);
  const rb = recentBlockhash && recentBlockhash.length > 0 ? esm_default2.encode(recentBlockhash) : void 0;
  const metadata = makeMetadata(signature, slot, txIndex, blockTimeUs, grpcRecvUs, rb);
  const isUnscopedSharedDiscriminator = !programId && (disc5 === PROGRAM_LOG_DISC.PUMPFUN_TRADE || disc5 === PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_BASE_IN);
  const et = programScopedDiscriminatorToEventType(programId, disc5);
  if (eventTypeFilter && isUnscopedSharedDiscriminator) {
    if (!filterAllowsUnscopedDiscriminator(eventTypeFilter, disc5))
      return null;
  } else if (eventTypeFilter && programId === PUMPFUN_PROGRAM_ID && disc5 === PROGRAM_LOG_DISC.PUMPFUN_TRADE) {
    if (!filterWantsPumpfunTrade(eventTypeFilter))
      return null;
  } else if (eventTypeFilter && et !== null) {
    if (!eventTypeFilter.shouldInclude(et))
      return null;
  } else if (eventTypeFilter && et === null) {
    if (programId) {
      if (!filterIncludesProgram(programId, eventTypeFilter))
        return null;
    } else if (!filterAllowsUnscopedDiscriminator(eventTypeFilter, disc5))
      return null;
  }
  if (programId === RAYDIUM_LAUNCHLAB_PROGRAM_ID) {
    const ev = parseRaydiumLaunchlabFromDiscriminator(disc5, data, metadata);
    return applyActualEventTypeFilter(ev, eventTypeFilter);
  }
  if (programId === RAYDIUM_CLMM_PROGRAM_ID) {
    switch (disc5) {
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_SWAP:
        return applyActualEventTypeFilter(parseSwapFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_INCREASE_LIQUIDITY:
        return applyActualEventTypeFilter(parseIncreaseLiquidityFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_DECREASE_LIQUIDITY:
        return applyActualEventTypeFilter(parseDecreaseLiquidityFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_LIQUIDITY_CHANGE:
        return applyActualEventTypeFilter(parseLiquidityChangeFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_CONFIG_CHANGE:
        return applyActualEventTypeFilter(parseConfigChangeFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_CREATE_PERSONAL_POSITION:
        return applyActualEventTypeFilter(parseCreatePersonalPositionFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_LIQUIDITY_CALCULATE:
        return applyActualEventTypeFilter(parseLiquidityCalculateFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_OPEN_LIMIT_ORDER:
        return applyActualEventTypeFilter(parseOpenLimitOrderFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_INCREASE_LIMIT_ORDER:
        return applyActualEventTypeFilter(parseIncreaseLimitOrderFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_DECREASE_LIMIT_ORDER:
        return applyActualEventTypeFilter(parseDecreaseLimitOrderFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_SETTLE_LIMIT_ORDER:
        return applyActualEventTypeFilter(parseSettleLimitOrderFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_UPDATE_REWARD_INFOS:
        return applyActualEventTypeFilter(parseUpdateRewardInfosFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_CREATE_POOL:
        return applyActualEventTypeFilter(parseCreatePoolFromData2(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_COLLECT_PERSONAL_FEE:
        return applyActualEventTypeFilter(parseCollectPersonalFeeFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CLMM_COLLECT_PROTOCOL_FEE:
        return applyActualEventTypeFilter(parseCollectProtocolFeeFromData(data, metadata), eventTypeFilter);
      default:
        return null;
    }
  }
  if (programId === RAYDIUM_CPMM_PROGRAM_ID) {
    switch (disc5) {
      case PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_EVENT:
        return applyActualEventTypeFilter(parseSwapEventFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_BASE_IN:
        return applyActualEventTypeFilter(parseSwapBaseInFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_BASE_OUT:
        return applyActualEventTypeFilter(parseSwapBaseOutFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CPMM_CREATE_POOL:
        return applyActualEventTypeFilter(parseCreatePoolFromData3(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CPMM_DEPOSIT:
        return applyActualEventTypeFilter(parseDepositFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_CPMM_WITHDRAW:
        return applyActualEventTypeFilter(parseWithdrawFromData(data, metadata), eventTypeFilter);
      default:
        return null;
    }
  }
  if (programId === RAYDIUM_AMM_V4_PROGRAM_ID) {
    switch (disc5) {
      case PROGRAM_LOG_DISC.RAYDIUM_AMM_SWAP_BASE_IN:
        return applyActualEventTypeFilter(parseSwapBaseInFromData2(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_AMM_SWAP_BASE_OUT:
        return applyActualEventTypeFilter(parseSwapBaseOutFromData2(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_AMM_DEPOSIT:
        return applyActualEventTypeFilter(parseDepositFromData2(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_AMM_WITHDRAW:
        return applyActualEventTypeFilter(parseWithdrawFromData2(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_AMM_INITIALIZE2:
        return applyActualEventTypeFilter(parseInitialize2FromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.RAYDIUM_AMM_WITHDRAW_PNL:
        return applyActualEventTypeFilter(parseWithdrawPnlFromData(data, metadata), eventTypeFilter);
      default:
        return null;
    }
  }
  if (programId === ORCA_WHIRLPOOL_PROGRAM_ID) {
    switch (disc5) {
      case PROGRAM_LOG_DISC.ORCA_TRADED:
        return applyActualEventTypeFilter(parseTradedFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.ORCA_LIQUIDITY_INCREASED:
        return applyActualEventTypeFilter(parseLiquidityIncreasedFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.ORCA_LIQUIDITY_DECREASED:
        return applyActualEventTypeFilter(parseLiquidityDecreasedFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.ORCA_POOL_INITIALIZED:
        return applyActualEventTypeFilter(parsePoolInitializedFromData(data, metadata), eventTypeFilter);
      default:
        return null;
    }
  }
  if (programId === METEORA_POOLS_PROGRAM_ID) {
    switch (disc5) {
      case PROGRAM_LOG_DISC.METEORA_AMM_SWAP:
        return applyActualEventTypeFilter(parseSwapFromData2(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.METEORA_AMM_ADD_LIQUIDITY:
        return applyActualEventTypeFilter(parseAddLiquidityFromData2(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.METEORA_AMM_REMOVE_LIQUIDITY:
        return applyActualEventTypeFilter(parseRemoveLiquidityFromData2(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.METEORA_AMM_BOOTSTRAP_LIQUIDITY:
        return applyActualEventTypeFilter(parseBootstrapLiquidityFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.METEORA_AMM_POOL_CREATED:
        return applyActualEventTypeFilter(parsePoolCreatedFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.METEORA_AMM_SET_POOL_FEES:
        return applyActualEventTypeFilter(parseSetPoolFeesFromData(data, metadata), eventTypeFilter);
      default:
        return null;
    }
  }
  if (programId === METEORA_DAMM_V2_PROGRAM_ID) {
    return applyActualEventTypeFilter(parseMeteoraDammLog(log, signature, slot, txIndex, blockTimeUs, grpcRecvUs), eventTypeFilter);
  }
  if (programId === METEORA_DBC_PROGRAM_ID) {
    const ev = parseMeteoraDbcFromDiscriminator(disc5, data, metadata);
    return applyActualEventTypeFilter(ev, eventTypeFilter);
  }
  if (programId === METEORA_DLMM_PROGRAM_ID) {
    const ev = parseDlmmFromDecoded(buf, metadata);
    return applyActualEventTypeFilter(ev, eventTypeFilter);
  }
  if (programId === PUMPFUN_PROGRAM_ID) {
    if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_TRADE) {
      return applyPumpfunSecondaryFilter(parseTradeFromData(data, metadata, isCreatedBuy), eventTypeFilter);
    }
    if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_CREATE)
      return applyActualEventTypeFilter(parseCreateFromData(data, metadata), eventTypeFilter);
    if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_MIGRATE)
      return applyActualEventTypeFilter(parseMigrateFromData(data, metadata), eventTypeFilter);
    if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_MIGRATE_BONDING_CURVE_CREATOR) {
      return applyActualEventTypeFilter(parseMigrateBondingCurveCreatorFromData(data, metadata), eventTypeFilter);
    }
    return null;
  }
  if (programId === PUMP_FEES_PROGRAM_ID) {
    switch (disc5) {
      case PROGRAM_LOG_DISC.PUMP_FEES_CREATE_FEE_SHARING_CONFIG:
        return applyActualEventTypeFilter(parseCreateFeeSharingConfigFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMP_FEES_INITIALIZE_FEE_CONFIG:
        return applyActualEventTypeFilter(parseInitializeFeeConfigFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMP_FEES_RESET_FEE_SHARING_CONFIG:
        return applyActualEventTypeFilter(parseResetFeeSharingConfigFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMP_FEES_REVOKE_FEE_SHARING_AUTHORITY:
        return applyActualEventTypeFilter(parseRevokeFeeSharingAuthorityFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMP_FEES_TRANSFER_FEE_SHARING_AUTHORITY:
        return applyActualEventTypeFilter(parseTransferFeeSharingAuthorityFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_ADMIN:
        return applyActualEventTypeFilter(parseUpdateAdminFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_FEE_CONFIG:
        return applyActualEventTypeFilter(parseUpdateFeeConfigFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_FEE_SHARES:
        return applyActualEventTypeFilter(parseUpdateFeeSharesFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMP_FEES_UPSERT_FEE_TIERS:
        return applyActualEventTypeFilter(parseUpsertFeeTiersFromData(data, metadata), eventTypeFilter);
      default:
        return null;
    }
  }
  if (programId === PUMPSWAP_PROGRAM_ID) {
    switch (disc5) {
      case PROGRAM_LOG_DISC.PUMPSWAP_BUY:
        return applyActualEventTypeFilter(parseBuyFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMPSWAP_SELL:
        return applyActualEventTypeFilter(parseSellFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMPSWAP_CREATE_POOL:
        return applyActualEventTypeFilter(parseCreatePoolFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMPSWAP_ADD_LIQUIDITY:
        return applyActualEventTypeFilter(parseAddLiquidityFromData(data, metadata), eventTypeFilter);
      case PROGRAM_LOG_DISC.PUMPSWAP_REMOVE_LIQUIDITY:
        return applyActualEventTypeFilter(parseRemoveLiquidityFromData(data, metadata), eventTypeFilter);
      default:
        return null;
    }
  }
  if (disc5 === PROGRAM_LOG_DISC.PUMPFUN_TRADE) {
    return parseUnscopedPumpfunLaunchlabTrade(data, metadata, eventTypeFilter, isCreatedBuy);
  }
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_CLMM_SWAP)
    return parseSwapFromData(data, metadata);
  if (disc5 === PROGRAM_LOG_DISC.RAYDIUM_AMM_SWAP_BASE_IN)
    return parseSwapBaseInFromData2(data, metadata);
  if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_BUY)
    return parseBuyFromData(data, metadata);
  if (disc5 === PROGRAM_LOG_DISC.PUMPSWAP_SELL)
    return parseSellFromData(data, metadata);
  switch (disc5) {
    case PROGRAM_LOG_DISC.PUMPFUN_CREATE:
      return parseCreateFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMPFUN_MIGRATE:
      return parseMigrateFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMPFUN_MIGRATE_BONDING_CURVE_CREATOR:
      return parseMigrateBondingCurveCreatorFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMP_FEES_CREATE_FEE_SHARING_CONFIG:
      return parseCreateFeeSharingConfigFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMP_FEES_INITIALIZE_FEE_CONFIG:
      return parseInitializeFeeConfigFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMP_FEES_RESET_FEE_SHARING_CONFIG:
      return parseResetFeeSharingConfigFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMP_FEES_REVOKE_FEE_SHARING_AUTHORITY:
      return parseRevokeFeeSharingAuthorityFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMP_FEES_TRANSFER_FEE_SHARING_AUTHORITY:
      return parseTransferFeeSharingAuthorityFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_ADMIN:
      return parseUpdateAdminFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_FEE_CONFIG:
      return parseUpdateFeeConfigFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMP_FEES_UPDATE_FEE_SHARES:
      return parseUpdateFeeSharesFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMP_FEES_UPSERT_FEE_TIERS:
      return parseUpsertFeeTiersFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMPSWAP_CREATE_POOL:
      return parseCreatePoolFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMPSWAP_ADD_LIQUIDITY:
      return parseAddLiquidityFromData(data, metadata);
    case PROGRAM_LOG_DISC.PUMPSWAP_REMOVE_LIQUIDITY:
      return parseRemoveLiquidityFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_INCREASE_LIQUIDITY:
      return parseIncreaseLiquidityFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_DECREASE_LIQUIDITY:
      return parseDecreaseLiquidityFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_LIQUIDITY_CHANGE:
      return parseLiquidityChangeFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_CONFIG_CHANGE:
      return parseConfigChangeFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_CREATE_PERSONAL_POSITION:
      return parseCreatePersonalPositionFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_LIQUIDITY_CALCULATE:
      return parseLiquidityCalculateFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_OPEN_LIMIT_ORDER:
      return parseOpenLimitOrderFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_INCREASE_LIMIT_ORDER:
      return parseIncreaseLimitOrderFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_DECREASE_LIMIT_ORDER:
      return parseDecreaseLimitOrderFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_SETTLE_LIMIT_ORDER:
      return parseSettleLimitOrderFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_UPDATE_REWARD_INFOS:
      return parseUpdateRewardInfosFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_CREATE_POOL:
      return parseCreatePoolFromData2(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_COLLECT_PERSONAL_FEE:
      return parseCollectPersonalFeeFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CLMM_COLLECT_PROTOCOL_FEE:
      return parseCollectProtocolFeeFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_BASE_IN:
      return applyActualEventTypeFilter(parseSwapBaseInFromData(data, metadata), eventTypeFilter);
    case PROGRAM_LOG_DISC.RAYDIUM_CPMM_SWAP_BASE_OUT:
      return parseSwapBaseOutFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CPMM_DEPOSIT:
      return parseDepositFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_CPMM_WITHDRAW:
      return parseWithdrawFromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_AMM_SWAP_BASE_OUT:
      return parseSwapBaseOutFromData2(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_AMM_DEPOSIT:
      return parseDepositFromData2(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_AMM_WITHDRAW:
      return parseWithdrawFromData2(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_AMM_INITIALIZE2:
      return parseInitialize2FromData(data, metadata);
    case PROGRAM_LOG_DISC.RAYDIUM_AMM_WITHDRAW_PNL:
      return parseWithdrawPnlFromData(data, metadata);
    case PROGRAM_LOG_DISC.ORCA_TRADED:
      return parseTradedFromData(data, metadata);
    case PROGRAM_LOG_DISC.ORCA_LIQUIDITY_INCREASED:
      return parseLiquidityIncreasedFromData(data, metadata);
    case PROGRAM_LOG_DISC.ORCA_LIQUIDITY_DECREASED:
      return parseLiquidityDecreasedFromData(data, metadata);
    case PROGRAM_LOG_DISC.ORCA_POOL_INITIALIZED:
      return parsePoolInitializedFromData(data, metadata);
    case PROGRAM_LOG_DISC.METEORA_AMM_SWAP:
      return parseSwapFromData2(data, metadata);
    case PROGRAM_LOG_DISC.METEORA_AMM_ADD_LIQUIDITY:
      return parseAddLiquidityFromData2(data, metadata);
    case PROGRAM_LOG_DISC.METEORA_AMM_REMOVE_LIQUIDITY:
      return parseRemoveLiquidityFromData2(data, metadata);
    case PROGRAM_LOG_DISC.METEORA_AMM_BOOTSTRAP_LIQUIDITY:
      return parseBootstrapLiquidityFromData(data, metadata);
    case PROGRAM_LOG_DISC.METEORA_AMM_POOL_CREATED:
      return parsePoolCreatedFromData(data, metadata);
    case PROGRAM_LOG_DISC.METEORA_AMM_SET_POOL_FEES:
      return parseSetPoolFeesFromData(data, metadata);
    case PROGRAM_LOG_DISC.METEORA_DAMM_SWAP:
    case PROGRAM_LOG_DISC.METEORA_DAMM_SWAP2:
    case PROGRAM_LOG_DISC.METEORA_DAMM_ADD_LIQUIDITY:
    case PROGRAM_LOG_DISC.METEORA_DAMM_REMOVE_LIQUIDITY:
    case PROGRAM_LOG_DISC.METEORA_DAMM_LIQUIDITY_CHANGE:
    case PROGRAM_LOG_DISC.METEORA_DAMM_INITIALIZE_POOL:
    case PROGRAM_LOG_DISC.METEORA_DAMM_CREATE_POSITION:
    case PROGRAM_LOG_DISC.METEORA_DAMM_CLOSE_POSITION:
    case PROGRAM_LOG_DISC.METEORA_DAMM_UPDATE_DELEGATE_PERMISSION:
    case PROGRAM_LOG_DISC.METEORA_DAMM_WITHDRAW_DEAD_LIQUIDITY_REWARD:
    case PROGRAM_LOG_DISC.METEORA_DAMM_CREATE_CONFIG:
    case PROGRAM_LOG_DISC.METEORA_DAMM_CREATE_DYNAMIC_CONFIG:
      return applyActualEventTypeFilter(parseMeteoraDammLog(log, signature, slot, txIndex, blockTimeUs, grpcRecvUs), eventTypeFilter);
    default: {
      const raydium_launchlab = parseRaydiumLaunchlabFromDiscriminator(disc5, data, metadata);
      if (raydium_launchlab)
        return applyActualEventTypeFilter(raydium_launchlab, eventTypeFilter);
      const dlmm = parseDlmmFromDecoded(buf, metadata);
      if (dlmm)
        return applyActualEventTypeFilter(dlmm, eventTypeFilter);
      return null;
    }
  }
}
function parseLogUnified(log, signature, slot, blockTimeUs, txIndex = 0) {
  const grpcRecvUs = nowUs();
  return parseLogOptimized(log, signature, slot, txIndex, blockTimeUs, grpcRecvUs, void 0, false, void 0);
}

// dist/core/unified_parser.js
function parseTransactionEvents(_instructionData, _accounts, logs, signature, slot, _txIndex, blockTimeUs, _programId) {
  return parseLogsOnly(logs, signature, slot, blockTimeUs, _txIndex);
}
function parseLogsOnly(logs, signature, slot, blockTimeUs, txIndex = 0) {
  const out = [];
  for (const log of logs) {
    const e = parseLogUnified(log, signature, slot, blockTimeUs, txIndex);
    if (e)
      out.push(e);
  }
  enrichPumpfunSameTxPostMerge(out);
  return out;
}
function parseTransactionWithListener(instructionData, accounts, logs, signature, slot, txIndex, blockTimeUs, programId, listener) {
  for (const e of parseTransactionEvents(instructionData, accounts, logs, signature, slot, txIndex, blockTimeUs, programId)) {
    listener.onDexEvent(e);
  }
}
function parseTransactionEventsStreaming(_instructionData, _accounts, logs, signature, slot, _txIndex, blockTimeUs, _programId, callback) {
  parseLogsStreaming(logs, signature, slot, blockTimeUs, callback, _txIndex);
}
function parseLogsStreaming(logs, signature, slot, blockTimeUs, callback, txIndex = 0) {
  for (const log of logs) {
    const e = parseLogUnified(log, signature, slot, blockTimeUs, txIndex);
    if (e)
      callback(e);
  }
}
function parseTransactionWithStreamingListener(instructionData, accounts, logs, signature, slot, txIndex, blockTimeUs, programId, listener) {
  parseTransactionEventsStreaming(instructionData, accounts, logs, signature, slot, txIndex, blockTimeUs, programId, (ev) => listener.onDexEventStreaming(ev));
}
function parseLog(log, signature, slot, txIndex, blockTimeUs, grpcRecvUs, eventTypeFilter, isCreatedBuy, recentBlockhash) {
  return parseLogOptimized(log, signature, slot, txIndex, blockTimeUs, grpcRecvUs, eventTypeFilter, isCreatedBuy, recentBlockhash);
}
