import { cpSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { vitePages } from "@kingironman2011/vite-pages";
import { defineConfig } from "vite";

const projectRoot = resolve(import.meta.dirname);

function updateLegacyDocsStyles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) updateLegacyDocsStyles(file);
    if (entry.isFile() && entry.name.endsWith(".html")) {
      writeFileSync(
        file,
        readFileSync(file, "utf8").replaceAll(
          "/public/css/docs.css",
          "/styles.css",
        ),
      );
    }
  }
}

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
            updateLegacyDocsStyles(resolve(dir, "docs", entry.name));
          }
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (asset) =>
          asset.name?.endsWith(".css")
            ? "styles.css"
            : "assets/[name]-[hash][extname]",
      },
    },
  },
});
