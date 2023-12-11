import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import mkcert from "vite-plugin-mkcert";
import fs from "fs";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    https: {
      key: fs.readFileSync("keys/agent2-key.pem"),
      cert: fs.readFileSync("keys/agent2-cert.pem"),
    },
    port: 3000,
  },
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
        "process.env.ANCHOR_BROWSER": "true", // 修改为字符串形式
      },
      // Enable esbuild polyfill plugins
      plugins: [NodeModulesPolyfillPlugin()],
    },
  },
  // mode: "production",
  build: {
    minify: true,
  },
});
