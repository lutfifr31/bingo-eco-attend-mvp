import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/bingo-eco-attend-mvp/',
  plugins: [tailwindcss()],
});