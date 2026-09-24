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

// dist/util/market.js
var market_exports = {};
__export(market_exports, {
  normalizeBuySellFromInputMint: () => normalizeBuySellFromInputMint,
  normalizeBuySellFromTokenDelta: () => normalizeBuySellFromTokenDelta,
  sqrtPriceX64ToPrice: () => sqrtPriceX64ToPrice,
  vaultPriceFromBalances: () => vaultPriceFromBalances
});
module.exports = __toCommonJS(market_exports);
function amountToNumber(value) {
  if (typeof value === "bigint")
    return Number(value);
  if (typeof value === "number")
    return value;
  if (value.trim() === "")
    throw new Error("amount must not be empty");
  return Number(value);
}
function sqrtPriceX64ToPrice(sqrtPriceX64, baseDecimals, quoteDecimals) {
  const sqrt = amountToNumber(sqrtPriceX64) / 2 ** 64;
  return sqrt * sqrt * 10 ** (baseDecimals - quoteDecimals);
}
function vaultPriceFromBalances(baseRaw, quoteRaw, baseDecimals, quoteDecimals) {
  const base = amountToNumber(baseRaw);
  if (base === 0)
    return void 0;
  return amountToNumber(quoteRaw) / base * 10 ** (baseDecimals - quoteDecimals);
}
function normalizeBuySellFromTokenDelta(tokenDelta) {
  const delta = amountToNumber(tokenDelta);
  if (delta > 0)
    return "Buy";
  if (delta < 0)
    return "Sell";
  return void 0;
}
function normalizeBuySellFromInputMint(inputMint, baseMint, quoteMint) {
  if (baseMint === quoteMint)
    return void 0;
  if (inputMint === quoteMint)
    return "Buy";
  if (inputMint === baseMint)
    return "Sell";
  return void 0;
}
