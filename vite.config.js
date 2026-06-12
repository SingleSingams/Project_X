import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  // Relative Pfade, damit der Build auch unter einem Unterpfad
  // (z. B. GitHub Pages) funktioniert
  base: './',
  plugins: [svelte()],
});
