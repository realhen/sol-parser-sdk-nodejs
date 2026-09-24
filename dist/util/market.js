function amountToNumber(value) {
    if (typeof value === "bigint")
        return Number(value);
    if (typeof value === "number")
        return value;
    if (value.trim() === "")
        throw new Error("amount must not be empty");
    return Number(value);
}
/**
 * Convert a Q64.64 sqrt price into quote-token units per one base token.
 */
export function sqrtPriceX64ToPrice(sqrtPriceX64, baseDecimals, quoteDecimals) {
    const sqrt = amountToNumber(sqrtPriceX64) / 2 ** 64;
    return sqrt * sqrt * 10 ** (baseDecimals - quoteDecimals);
}
/**
 * Compute quote-token price per one base token from raw vault balances.
 */
export function vaultPriceFromBalances(baseRaw, quoteRaw, baseDecimals, quoteDecimals) {
    const base = amountToNumber(baseRaw);
    if (base === 0)
        return undefined;
    return (amountToNumber(quoteRaw) / base) * 10 ** (baseDecimals - quoteDecimals);
}
/**
 * Positive watched-token delta means Buy; negative means Sell.
 */
export function normalizeBuySellFromTokenDelta(tokenDelta) {
    const delta = amountToNumber(tokenDelta);
    if (delta > 0)
        return "Buy";
    if (delta < 0)
        return "Sell";
    return undefined;
}
/**
 * If input is quote, the user buys base. If input is base, the user sells base.
 */
export function normalizeBuySellFromInputMint(inputMint, baseMint, quoteMint) {
    if (baseMint === quoteMint)
        return undefined;
    if (inputMint === quoteMint)
        return "Buy";
    if (inputMint === baseMint)
        return "Sell";
    return undefined;
}
