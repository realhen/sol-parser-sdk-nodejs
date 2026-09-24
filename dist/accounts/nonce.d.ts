import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
import type { AccountData } from "./types.js";
export declare function isNonceAccount(data: Uint8Array): boolean;
export declare function parseNonceAccount(account: AccountData, metadata: EventMetadata): DexEvent | null;
