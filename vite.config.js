import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import polyfillNode from "rollup-plugin-polyfill-node";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  plugins: [
    ViteImageOptimizer(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    polyfillNode(),
  ],
  build: {
    target: "es5",
  },
});
