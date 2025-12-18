import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

const isDev = process.env.NODE_ENV !== 'production';
const apiTarget = process.env.VITE_API_URL || 'http://192.168.1.3:8999';

// https://vite.dev/config/
export default defineConfig({
  base: isDev ? '/' : '/log/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api.ts/proxy': {
        target: apiTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\.ts\/proxy/, ''),
      },
    },
  },
});
