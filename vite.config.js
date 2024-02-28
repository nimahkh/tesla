import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import polyfillNode from "rollup-plugin-polyfill-node";

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  plugins: [
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
