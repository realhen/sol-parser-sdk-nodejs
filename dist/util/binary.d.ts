export declare function readU8(u8: Uint8Array, o: number): number | null;
export declare function readU16LE(u8: Uint8Array, o: number): number | null;
export declare function readU32LE(u8: Uint8Array, o: number): number | null;
export declare function readI32LE(u8: Uint8Array, o: number): number | null;
export declare function readU64LE(u8: Uint8Array, o: number): bigint | null;
export declare function readI64LE(u8: Uint8Array, o: number): bigint | null;
export declare function readU128LE(u8: Uint8Array, o: number): bigint | null;
export declare function readBool(u8: Uint8Array, o: number): boolean | null;
export declare function readPubkey(u8: Uint8Array, o: number): string | null;
export declare function readBorshString(u8: Uint8Array, o: number): {
    s: string;
    next: number;
} | null;
export declare function readDiscriminatorU64(u8: Uint8Array): bigint | null;
