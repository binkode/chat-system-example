import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "laravel-vite";
/*
* @type {import('vite').UserConfig}
*/
export default defineConfig(({ command }) => ({
  // plugins: [require('vite-plugin-react')],
  plugins: [reactRefresh()],
  // esbuild: {
  //   jsxInject: `import React from 'react';`
  // },
  // jsx: 'react',
  // base: command === "serve" ? "" : "/build/",
  // publicDir: "fake_dir_so_nothing_gets_copied",
  // build: {
  //   manifest: true,
  //   outDir: "public/build",
  //   rollupOptions: {
  //     input: "resources/js/app.js"
  //   }
  // }
}));
