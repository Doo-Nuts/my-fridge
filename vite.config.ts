import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { ssr } from 'vite-plugin-ssr/plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ssr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },

  
})
