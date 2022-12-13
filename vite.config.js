import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import laravel from 'vite-plugin-laravel'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    laravel({
      // postcss: [
      //   tailwindcss(),
      //   autoprefixer(),
      // ]
    }),
    svgr()
  ]
})
