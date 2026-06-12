import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'dist-smoke',
    emptyOutDir: true,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } },
  },
});
