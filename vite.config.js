import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router-dom/')) {
            return 'react'
          }
          if (id.includes('/@heroui/')) return 'heroui'
          if (id.includes('/framer-motion/') || id.includes('/motion-')) return 'motion'
          if (id.includes('/swiper/')) return 'swiper'
          return 'vendor'
        },
      },
    },
  },
})
