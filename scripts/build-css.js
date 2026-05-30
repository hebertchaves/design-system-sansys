#!/usr/bin/env node
/**
 * Build DSS Full CSS
 * Compila index.scss para dss-example/public/dss-full.css
 *
 * Uso: npm run build:css
 */

const { execSync } = require('child_process');
const path = require('path');

const SCSS_SOURCE = path.join(__dirname, 'index.scss');
const CSS_OUTPUT = path.join(__dirname, 'dss-example/public/dss-full.css');

console.log('🎨 Compilando SCSS do DSS...');
console.log(`📄 Source: ${SCSS_SOURCE}`);
console.log(`📦 Output: ${CSS_OUTPUT}`);

try {
  // Compilar SCSS usando npx sass
  execSync(`npx sass "${SCSS_SOURCE}" "${CSS_OUTPUT}"`, {
    stdio: 'inherit'
  });

  console.log('✅ CSS compilado com sucesso!');
  console.log(`📊 Arquivo gerado: ${CSS_OUTPUT}`);
} catch (error) {
  console.error('❌ Erro ao compilar SCSS:', error.message);
  process.exit(1);
}
