import type { EventMetadata } from "../core/metadata.js";
import type { DexEvent } from "../core/dex_event.js";
import type { AccountData } from "./types.js";
/** SPL Token 账户解析（快速路径 + 扩展长度回退） */
export declare function parseTokenAccount(account: AccountData, metadata: EventMetadata): DexEvent | null;
