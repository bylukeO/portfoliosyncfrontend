import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'https://portfoliosyncbackend.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
    // Define global constants for runtime access
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  }
})

