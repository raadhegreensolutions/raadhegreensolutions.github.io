import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Required for project Pages URL: https://raadhegreensolutions.github.io/raadhegreensolutions/
  base: '/raadhegreensolutions/',
  plugins: [react(), tailwindcss()],
})
