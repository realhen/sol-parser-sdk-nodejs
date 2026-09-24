const ZERO = "11111111111111111111111111111111";
export function metadataForDexEvent(ev) {
    if ("Error" in ev)
        return null;
    const inner = Object.values(ev)[0];
    return inner?.metadata ?? null;
}
export function defaultPubkey() {
    return ZERO;
}
