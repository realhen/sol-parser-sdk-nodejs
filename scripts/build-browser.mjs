import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { build } from "esbuild";

rmSync("browser/types", { recursive: true, force: true });
mkdirSync("browser", { recursive: true });
execFileSync(process.execPath, ["node_modules/typescript/bin/tsc", "-p", "tsconfig.browser.json"], {
  stdio: "inherit",
});

for (const [format, extension] of [["esm", "mjs"], ["cjs", "cjs"]]) {
  const result = await build({
    entryPoints: ["src/browser.ts"],
    outfile: `browser/index.${extension}`,
    bundle: true,
    platform: "browser",
    format,
    target: "es2022",
    metafile: true,
  });
  const transportInputs = Object.keys(result.metafile.inputs).filter((input) =>
    /(?:@solana\/web3|@grpc\/|@triton-one\/|src\/(?:grpc|shredstream)\/|rpc_wallet)/.test(input)
  );
  if (transportInputs.length) {
    throw new Error(`Browser bundle includes transport dependencies: ${transportInputs.join(", ")}`);
  }
}

const declarations = 'export * from "./types/browser.js";\n';
writeFileSync("browser/index.d.ts", declarations);
writeFileSync("browser/index.d.mts", declarations);
