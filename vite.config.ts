import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    https: false,
    port: 3001,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [NodeModulesPolyfillPlugin()],
    },
  },
  mode: "production",
  build: {
    minify: true,
  },
});
