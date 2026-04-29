import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import importantScope from './scripts/postcss-important-scope.mjs';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    importantScope(),
  ],
};
