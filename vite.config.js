import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 4444
},
define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
},
})