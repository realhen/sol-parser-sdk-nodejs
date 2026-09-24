import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
import type { AccountData } from "./types.js";
export declare function isGlobalConfigAccount(data: Uint8Array): boolean;
export declare function isPoolAccount(data: Uint8Array): boolean;
export declare function parsePumpswapGlobalConfig(account: AccountData, metadata: EventMetadata): DexEvent | null;
export declare function parsePumpswapPool(account: AccountData, metadata: EventMetadata): DexEvent | null;
export declare function parsePumpswapAccount(account: AccountData, metadata: EventMetadata): DexEvent | null;
