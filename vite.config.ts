import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/RNR-WEB_DEMO/',
  plugins: [react()],
  define: {
    // For compatibility with process.env.PUBLIC_URL in React Router
    'process.env.PUBLIC_URL': JSON.stringify('/RNR-WEB_DEMO'),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  },
  publicDir: 'public',
});
