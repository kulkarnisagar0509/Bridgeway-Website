import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // The email backend runs alongside Vite in dev (node --watch server.js).
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})