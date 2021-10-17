import { defineConfig } from "laravel-vite";
import reactJsx from "vite-react-jsx";
import reactSvgPlugin from "vite-plugin-react-svg";

export default defineConfig({
  plugins: [
    reactJsx(),
    reactSvgPlugin({
      memo: true,
      defaultExport: "component",
      expandProps: "start",
    }),
  ],
});
