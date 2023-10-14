import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from 'path';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  
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
      plugins: [
        /**
         * BEBUG: 引用 @library3/ebook.js 源码调试时会出现：Identifier 'Buffer' has already been declared
         * 目前把 glitter.js 拷贝到 pc/node_modules 下面，通过 pages/Search/ebook.ts 调试
         */
        // NodeGlobalsPolyfillPlugin({
        //   process: true,
        //   buffer: true,
        // }),
        /**
         * ** 不起用下面插件，会出现其他包找不到：MnemonicKey2-->fromSeed-->hmacSHA512-->createHmac-->new Hmac-->Hmac.CipherBase **
         * 启用后，App.tsx引用buffer报错，Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/buffer.js?* v=4ab7e0fb' does not provide an export named 'default'
         */
        NodeModulesPolyfillPlugin(),
      ],
    },
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
