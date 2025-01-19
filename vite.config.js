import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'


export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    rollupOptions: {
      input: '/src/main.tsx', // Ensure this points to the correct file
    }
  },
  resolve: {
    alias: {
      '@': '/src/',
    }
  }
})
