import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' means load all env vars (not just VITE_ prefixed)
  const env = loadEnv(mode, process.cwd(), '')
  
  console.log('🔧 Environment Configuration:')
  console.log(`   Mode: ${mode}`)
  console.log(`   Port: ${env.VITE_PORT || '5173'} (from env: ${env.VITE_PORT})`)
  console.log(`   API URL: ${env.VITE_API_URL || 'http://localhost:3001'}`)
  console.log(`   Host: ${env.VITE_HOST || 'true'}`)
  
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: parseInt(env.VITE_PORT || '5173', 10),
      host: env.VITE_HOST === 'localhost' ? true : env.VITE_HOST,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    // Define global constants for runtime access
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  }
})

