import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    strictPort: false,
    open: true
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
