import { cpSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { vitePages } from "@kingironman2011/vite-pages";
import { defineConfig } from "vite";

const projectRoot = resolve(import.meta.dirname);

export default defineConfig({
  plugins: [
    react(),
    vitePages({ verbose: true }),
    {
      name: "copy-unmigrated-static-pages",
      writeBundle({ dir }) {
        // These pages keep their legacy URLs until they become React routes.
        cpSync(resolve(projectRoot, "public"), resolve(dir, "public"), {
          recursive: true,
        });
        for (const entry of readdirSync(resolve(projectRoot, "docs"), {
          withFileTypes: true,
        })) {
          if (entry.isDirectory()) {
            cpSync(
              resolve(projectRoot, "docs", entry.name),
              resolve(dir, "docs", entry.name),
              { recursive: true },
            );
          }
        }
      },
    },
  ],
});
