import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { oidcSpa } from 'oidc-spa/vite-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/zoo',
  plugins: [
    react(),
    tailwindcss(),
    oidcSpa({ browserRuntimeFreeze: { enabled: true } }),
  ],
  resolve: { tsconfigPaths: true },
  server: { port: 4200, strictPort: true },
  preview: { port: 4200, strictPort: true },
  build: {
    outDir: '../../dist/apps/zoo',
    emptyOutDir: true,
  },
  test: {
    name: 'zoo',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.{ts,tsx}'],
    env: { VITE_OIDC_USE_MOCK: 'true' },
  },
});
