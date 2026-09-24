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

// dist/core/metadata.js
var metadata_exports = {};
__export(metadata_exports, {
  makeMetadata: () => makeMetadata
});
module.exports = __toCommonJS(metadata_exports);
function makeMetadata(signature, slot, txIndex, blockTimeUs, grpcRecvUs, recentBlockhash) {
  return {
    signature,
    slot,
    tx_index: txIndex,
    block_time_us: blockTimeUs ?? 0,
    grpc_recv_us: grpcRecvUs,
    recent_blockhash: recentBlockhash
  };
}
