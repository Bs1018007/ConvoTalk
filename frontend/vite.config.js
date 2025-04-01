import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    host: '0.0.0.0',  // Expose to all network interfaces
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://backend:3000', // Use Docker service name instead of localhost
        changeOrigin: true
      }
    }
  }
});
