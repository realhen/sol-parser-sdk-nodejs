import { rmSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { build } from "esbuild";

rmSync(new URL("../dist", import.meta.url), { recursive: true, force: true });
execFileSync(
  process.execPath,
  ["node_modules/typescript/bin/tsc", "--project", "tsconfig.browser.json"],
  { stdio: "inherit" },
);
const manifest = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);
const entryPoints = [
  ...new Set(Object.values(manifest.exports).map((entry) => entry.import)),
];
await build({
  entryPoints,
  outdir: "dist",
  outbase: "dist",
  outExtension: { ".js": ".cjs" },
  bundle: true,
  external: ["buffer"],
  platform: "browser",
  format: "cjs",
  target: "es2022",
});
