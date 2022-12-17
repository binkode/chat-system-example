import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";

export default defineConfig({
  plugins: [react(), laravel(["resources/js/app.jsx"]), svgr()],
});
