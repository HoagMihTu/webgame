import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import preload from "vite-plugin-preload";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), preload()],
  server: {
    host: true,
    port: 4444
},
define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
},
base: './',
})
