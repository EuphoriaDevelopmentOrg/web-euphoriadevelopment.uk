import react from "@vitejs/plugin-react";
import { vitePages } from "@kingironman2011/vite-pages";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react(), vitePages()],
  server: {
    host: true,
    port: 5173,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
      clientPort: 5173,
    },
    watch: {
      usePolling: true,
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll("\\", "/");
          if (
            normalizedId.includes("/node_modules/react/") ||
            normalizedId.includes("/node_modules/react-dom/") ||
            normalizedId.includes("/node_modules/scheduler/")
          ) {
            return "react-core";
          }
        },
      },
    },
  },
});
