import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 5000,
    open: true
  },
  build: {
    target: 'esnext',
    brotliSize: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['solid-js'],
          utils: ['/src/utils/theme.js', '/src/utils/export.js', '/src/utils/storage.js'],
        },
        inlineDynamicImports: false,
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['solid-js'],
  },
  base: '/table/',
});
