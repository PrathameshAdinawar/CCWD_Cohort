import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  // this config means add http://localhost:3000 before /api
  // so it becomes http://localhost:3000/api 
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // this kind of cheating with server as we say the origin is this localhost
        changeOrigin: true
      }
    }
  }
})
