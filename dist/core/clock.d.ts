/** 当前时间微秒戳（用于 `grpc_recv_us`） */
export declare function nowUs(): number;
/** 与 Rust `now_micros` 一致（别名） */
export declare const nowMicros: typeof nowUs;
/** 与 Rust `now_nanos` 同语义：墙钟纳秒（`Date` 精度为毫秒，纳秒位为推算值） */
export declare function nowNanos(): bigint;
/** 与 Rust `elapsed_micros_since` 一致 */
export declare function elapsedMicrosSince(startUs: number): number;
