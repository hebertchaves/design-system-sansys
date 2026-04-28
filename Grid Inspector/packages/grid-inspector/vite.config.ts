import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    }),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'GridInspector',
      formats: ['es', 'umd'],
      fileName: (format) => `grid-inspector.${format}.js`,
    },
    rollupOptions: {
      // Externalize React as peer dependency (both ESM and UMD rely on CDN/host React)
      // react-dom/client must also be external so createRoot resolves to window.ReactDOM.createRoot
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        // Inject React for UMD bundle
        banner: (chunk) => {
          if (chunk.fileName.includes('umd')) {
            return `
/*
 * @sansys/grid-inspector v1.0.0
 * Universal Grid Inspector - Standalone UMD Bundle
 * Includes React 18.3.1 (for bookmarklet usage)
 */
(function() {
  // Check if React is already loaded
  if (typeof window.React === 'undefined') {
    console.info('[Grid Inspector] Bundled React not loaded in this build. Use ESM version or ensure React is available.');
  }
})();
            `.trim();
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
