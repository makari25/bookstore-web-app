import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This is the key part:
      '/api': {
        target: 'http://localhost:5000', // Your backend server address
        changeOrigin: true,
        secure: false,
      },
    },
  },
})