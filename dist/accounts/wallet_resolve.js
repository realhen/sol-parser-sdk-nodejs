/**
 * 与 Rust `accounts/utils::user_wallet_pubkey_for_onchain_account` 对齐：
 * 由链上账户 owner / data / executable 推断「用户钱包」公钥（Base58）。
 */
import { readPubkey } from "../util/binary.js";
const TOKEN_PROGRAM = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_2022 = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
const SYSTEM = "11111111111111111111111111111111";
/** SPL Token `Account` 布局长度（与 `spl_token::state::Account::LEN` 一致） */
const SPL_TOKEN_ACCOUNT_LEN = 165;
function isTokenProgramOwner(owner) {
    return owner === TOKEN_PROGRAM || owner === TOKEN_2022;
}
export function userWalletPubkeyForOnchainAccount(address, owner, data, executable) {
    if (executable)
        return null;
    if (owner === SYSTEM) {
        return data.length === 0 ? address : null;
    }
    if (isTokenProgramOwner(owner) && data.length === SPL_TOKEN_ACCOUNT_LEN) {
        return readPubkey(data, 32);
    }
    return null;
}
