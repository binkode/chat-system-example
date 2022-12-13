import { defineConfig } from 'laravel-vite'
import reactJsx from 'vite-react-jsx'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    reactJsx(),
    svgr()
  ]
})
