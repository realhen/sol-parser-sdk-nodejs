export type NumericAmount = bigint | number | string;
export type NormalizedTradeSide = "Buy" | "Sell";
/**
 * Convert a Q64.64 sqrt price into quote-token units per one base token.
 */
export declare function sqrtPriceX64ToPrice(sqrtPriceX64: NumericAmount, baseDecimals: number, quoteDecimals: number): number;
/**
 * Compute quote-token price per one base token from raw vault balances.
 */
export declare function vaultPriceFromBalances(baseRaw: NumericAmount, quoteRaw: NumericAmount, baseDecimals: number, quoteDecimals: number): number | undefined;
/**
 * Positive watched-token delta means Buy; negative means Sell.
 */
export declare function normalizeBuySellFromTokenDelta(tokenDelta: NumericAmount): NormalizedTradeSide | undefined;
/**
 * If input is quote, the user buys base. If input is base, the user sells base.
 */
export declare function normalizeBuySellFromInputMint(inputMint: string, baseMint: string, quoteMint: string): NormalizedTradeSide | undefined;
