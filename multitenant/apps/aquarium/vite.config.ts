import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/aquarium',
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  server: { port: 4201, strictPort: true },
  preview: { port: 4201, strictPort: true },
  build: {
    outDir: '../../dist/apps/aquarium',
    emptyOutDir: true,
  },
  test: {
    name: 'aquarium',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.{ts,tsx}'],
  },
});
