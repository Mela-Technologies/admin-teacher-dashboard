import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    
  ],
   esbuild: {
    // ignore TypeScript errors during build
    logOverride: { "ts-unused-params": "silent" },
  },
})
