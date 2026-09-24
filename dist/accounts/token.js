import { readPubkey, readU64LE } from "../util/binary.js";
const TOKEN_PROGRAM = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_2022 = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
const MINT_SIZE = 82;
const SUPPLY_OFF = 36;
const DECIMALS_OFF = 44;
const TOKEN_ACCOUNT_SIZE = 165;
const AMOUNT_OFF = 64;
function isTokenProgramOwner(owner) {
    return owner === TOKEN_PROGRAM || owner === TOKEN_2022;
}
function parseMintFast(account, metadata) {
    const { data } = account;
    if (data.length < MINT_SIZE)
        return null;
    const supply = readU64LE(data, SUPPLY_OFF);
    const decimals = data[DECIMALS_OFF] ?? 0;
    if (supply === null)
        return null;
    const ev = {
        metadata,
        pubkey: account.pubkey,
        executable: account.executable,
        lamports: account.lamports,
        owner: account.owner,
        rent_epoch: account.rent_epoch,
        supply,
        decimals,
    };
    return { TokenInfo: ev };
}
function parseTokenFast(account, metadata) {
    const { data } = account;
    if (data.length !== TOKEN_ACCOUNT_SIZE)
        return null;
    const amount = readU64LE(data, AMOUNT_OFF);
    if (amount === null)
        return null;
    const ev = {
        metadata,
        pubkey: account.pubkey,
        executable: account.executable,
        lamports: account.lamports,
        owner: account.owner,
        rent_epoch: account.rent_epoch,
        amount,
        // 快速路径：将 `token_owner` 设为账户 owner（程序 ID）
        token_owner: account.owner,
    };
    return { TokenAccount: ev };
}
/** Token-2022 等扩展账户：读取标准 Account 布局前 165 字节中的 owner / amount */
function parseTokenWithExtensions(account, metadata) {
    const d = account.data;
    if (!isTokenProgramOwner(account.owner) || d.length <= TOKEN_ACCOUNT_SIZE)
        return null;
    const tokenOwner = readPubkey(d, 32);
    const amount = readU64LE(d, AMOUNT_OFF);
    if (tokenOwner === null || amount === null)
        return null;
    const ev = {
        metadata,
        pubkey: account.pubkey,
        executable: account.executable,
        lamports: account.lamports,
        owner: account.owner,
        rent_epoch: account.rent_epoch,
        amount,
        token_owner: tokenOwner,
    };
    return { TokenAccount: ev };
}
/** SPL Token 账户解析（快速路径 + 扩展长度回退） */
export function parseTokenAccount(account, metadata) {
    if (!isTokenProgramOwner(account.owner))
        return null;
    if (account.data.length <= 100) {
        const m = parseMintFast(account, metadata);
        if (m)
            return m;
    }
    const t = parseTokenFast(account, metadata);
    if (t)
        return t;
    const ext = parseTokenWithExtensions(account, metadata);
    if (ext)
        return ext;
    if (account.data.length >= MINT_SIZE) {
        const m = parseMintFast(account, metadata);
        if (m)
            return m;
    }
    return null;
}
