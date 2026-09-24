import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/libs/api-manager',
  resolve: { tsconfigPaths: true },
  test: {
    name: 'api-manager',
    watch: false,
    environment: 'node',
    include: ['src/**/*.spec.ts'],
  },
});
