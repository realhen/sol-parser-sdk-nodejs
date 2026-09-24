import { enrichPumpfunSameTxPostMerge } from "./pumpfun_fee_enrich.js";
import { parseLogUnified, parseLogOptimized } from "../logs/optimized_matcher.js";
import { nowUs } from "./clock.js";
/** 从交易解析事件；当前主路径为日志解析 */
export function parseTransactionEvents(_instructionData, _accounts, logs, signature, slot, _txIndex, blockTimeUs, _programId) {
    return parseLogsOnly(logs, signature, slot, blockTimeUs, _txIndex);
}
export function parseLogsOnly(logs, signature, slot, blockTimeUs, txIndex = 0) {
    const out = [];
    for (const log of logs) {
        const e = parseLogUnified(log, signature, slot, blockTimeUs, txIndex);
        if (e)
            out.push(e);
    }
    enrichPumpfunSameTxPostMerge(out);
    return out;
}
export function parseTransactionWithListener(instructionData, accounts, logs, signature, slot, txIndex, blockTimeUs, programId, listener) {
    for (const e of parseTransactionEvents(instructionData, accounts, logs, signature, slot, txIndex, blockTimeUs, programId)) {
        listener.onDexEvent(e);
    }
}
export function parseTransactionEventsStreaming(_instructionData, _accounts, logs, signature, slot, _txIndex, blockTimeUs, _programId, callback) {
    parseLogsStreaming(logs, signature, slot, blockTimeUs, callback, _txIndex);
}
export function parseLogsStreaming(logs, signature, slot, blockTimeUs, callback, txIndex = 0) {
    for (const log of logs) {
        const e = parseLogUnified(log, signature, slot, blockTimeUs, txIndex);
        if (e)
            callback(e);
    }
}
export function parseTransactionWithStreamingListener(instructionData, accounts, logs, signature, slot, txIndex, blockTimeUs, programId, listener) {
    parseTransactionEventsStreaming(instructionData, accounts, logs, signature, slot, txIndex, blockTimeUs, programId, (ev) => listener.onDexEventStreaming(ev));
}
/** 带完整 gRPC 元数据字段的日志解析 */
export function parseLog(log, signature, slot, txIndex, blockTimeUs, grpcRecvUs, eventTypeFilter, isCreatedBuy, recentBlockhash) {
    return parseLogOptimized(log, signature, slot, txIndex, blockTimeUs, grpcRecvUs, eventTypeFilter, isCreatedBuy, recentBlockhash);
}
export { nowUs };
