import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
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
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GridInspector',
      formats: ['es', 'umd'],
      fileName: (format) => `grid-inspector.${format}.js`,
    },
    rollupOptions: {
      // Externalize React for NPM usage (peer dependency)
      // But bundle it for UMD (bookmarklet standalone)
      external: (id) => {
        // Only externalize for ESM build
        if (id === 'react' || id === 'react-dom' || id === 'react/jsx-runtime') {
          return true; // External for ESM
        }
        return false;
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
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
