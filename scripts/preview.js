import { spawn } from "node:child_process";

const port = Number(process.env.PORT) || 4173;
const vite = process.platform === "win32" ? "vite.cmd" : "vite";
const preview = spawn(
  vite,
  ["preview", "--host", "0.0.0.0", "--port", String(port)],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
  },
);

preview.on("exit", (code) => process.exit(code ?? 1));
