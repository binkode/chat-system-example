import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "laravel-vite";

export default defineConfig(({ command }) => ({
  plugins: [reactRefresh()]
}));
