import type { DexEvent } from "./dex_event.js";
export declare function enrichCreateV2FromCreateEvents(events: DexEvent[]): void;
export declare function enrichCreateV2ObservedFeeRecipient(events: DexEvent[]): void;
export declare function enrichCreateQuoteMintFromTrades(events: DexEvent[]): void;
export declare function enrichPumpfunTradesFromCreateInstructions(events: DexEvent[]): void;
export declare function enrichPumpfunSameTxPostMerge(events: DexEvent[]): void;
