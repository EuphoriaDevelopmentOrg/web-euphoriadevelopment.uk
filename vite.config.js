import { cpSync, readdirSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { defineConfig } from "vite";

const projectRoot = resolve(import.meta.dirname);

function findHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(file);
    return entry.name.endsWith(".html") ? [file] : [];
  });
}

const pages = Object.fromEntries(
  findHtmlFiles(projectRoot)
    .filter((file) => {
      const segments = relative(projectRoot, file).split(sep);
      return !segments.includes("dist") && !segments.includes("node_modules");
    })
    .map((file) => [relative(projectRoot, file).replace(/\.html$/, ""), file]),
);

export default defineConfig({
  plugins: [
    {
      name: "copy-legacy-public-paths",
      writeBundle({ dir }) {
        cpSync(resolve(projectRoot, "public"), resolve(dir, "public"), {
          recursive: true,
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: pages,
    },
  },
});
