import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Root domain GitHub Pages (e.g. https://raadhegreensolutions.github.io/)
  base: '/',
  plugins: [react(), tailwindcss()],
})
