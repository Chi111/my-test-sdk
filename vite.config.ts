import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: false,
    port: 3001,
  },
  mode: "production",
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        // rollupNodePolyFill(),
        visualizer(),
      ],
    },
  },
});
