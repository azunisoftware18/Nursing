import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  preview: {
    host: true,
    port: 3000,
    allowedHosts: [
      'jwokgk8c00csoko44ks444sw.147.93.20.127.sslip.io'
    ]
  }
})
