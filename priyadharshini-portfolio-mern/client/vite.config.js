import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Builds the site into ../public, which server.js serves.
export default defineConfig({
  plugins: [react()],
  build: { outDir: '../public', emptyOutDir: true },
  server: {
    proxy: { '/api': 'http://localhost:5000' },
  },
});
