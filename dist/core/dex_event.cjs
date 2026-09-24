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

// dist/core/dex_event.js
var dex_event_exports = {};
__export(dex_event_exports, {
  defaultPubkey: () => defaultPubkey,
  metadataForDexEvent: () => metadataForDexEvent
});
module.exports = __toCommonJS(dex_event_exports);
var ZERO = "11111111111111111111111111111111";
function metadataForDexEvent(ev) {
  if ("Error" in ev)
    return null;
  const inner = Object.values(ev)[0];
  return inner?.metadata ?? null;
}
function defaultPubkey() {
  return ZERO;
}
