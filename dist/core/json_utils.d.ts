/**
 * `JSON.stringify` 默认无法处理 `bigint`。
 * 下列工具将树中所有 `bigint` 转为十进制字符串，便于与 Go `DexEvent` / Python 字典经 JSON 输出对齐。
 */
/** 供 `JSON.stringify(value, replacer)` 使用 */
export declare function bigintToJsonReplacer(_key: string, value: unknown): unknown;
/** 将含 `bigint` 的值序列化为 JSON 字符串（`DexEvent`、元数据等） */
export declare function dexEventToJsonString(value: unknown, space?: string | number): string;
