import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: mode === 'development', // Only in dev
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: process.env.NODE_ENV === 'production' 
            ? '/' 
            : 'http://localhost:3000',
          changeOrigin: true
        },
        '/auth': {
          target: process.env.NODE_ENV === 'production'
            ? '/'
            : 'http://localhost:3000',
          changeOrigin: true
        }
      }
    },
    preview: {
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://backend:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  };
});