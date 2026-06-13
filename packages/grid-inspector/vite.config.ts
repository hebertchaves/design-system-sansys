import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      skipDiagnostics: true,
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  css: {
    postcss: {
      plugins: [
        tailwindcss({ config: resolve(__dirname, 'tailwind.config.js') }),
        autoprefixer(),
      ],
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'GridInspector',
      formats: ['es', 'umd'],
      fileName: (format) => `grid-inspector.${format}.js`,
    },
    rollupOptions: {
      // React é bundlado em todos os formatos (ESM + UMD) para uso
      // auto-contido: apps Vue sem React, bookmarklet, e ambientes mistos.
      // Não há externalizações — o bundle é sempre self-contained.
      output: {
        banner: (chunk) => {
          if (chunk.fileName.includes('umd')) {
            return `/*
 * @sansys/grid-inspector v1.0.0
 * Universal Grid Inspector — Standalone Bundle (React embutido)
 */`;
          }
          return '';
        },
      },
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for debugging
        drop_debugger: true,
      },
      format: {
        comments: /Grid Inspector|@sansys/,
      },
    },
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
});
