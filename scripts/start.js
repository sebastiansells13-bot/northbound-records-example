#!/usr/bin/env node
// Dev entrypoint. No CSS build to run in parallel here (plain hand-written
// CSS, passthrough-copied) — just Eleventy in watch mode.
import { spawn } from "node:child_process";
import { rmSync } from "node:fs";

function clean() {
  rmSync("dev", { recursive: true, force: true });
  rmSync("docs", { recursive: true, force: true });
}

clean();

const child = spawn("npm run watch:eleventy", { stdio: "inherit", shell: true });

function shutdown() {
  child.kill();
  clean();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
child.on("exit", (code) => {
  clean();
  process.exit(code ?? 0);
});
