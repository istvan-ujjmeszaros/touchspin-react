import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup-vitest.ts'],
    include: ['**/unit-tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/index.ts',
        'src/bootstrap3.tsx',
        'src/bootstrap4.tsx',
        'src/bootstrap5.tsx',
        'src/tailwind.tsx',
        'src/vanilla.tsx',
      ],
    },
  },
});
