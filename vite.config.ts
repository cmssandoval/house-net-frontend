import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const buildTime = new Date()
  .toLocaleString('sv-SE', { timeZone: 'America/Santiago' });

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src')}},
  define: { __BUILD__: JSON.stringify(buildTime) },
});
