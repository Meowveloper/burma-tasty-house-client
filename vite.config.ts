import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port : 3000, 
    open : true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Create a separate chunk for dependencies
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust size limit if necessary
  }
})
