/**
 * ==========================================================================
 * BOOKMARKLET GENERATOR
 * ==========================================================================
 *
 * Generates a minified bookmarklet that loads the UMD bundle.
 *
 * Usage:
 *   npm run build:bookmarklet
 *
 * Output:
 *   - dist/bookmarklet.js (minified bookmarklet code)
 *   - dist/bookmarklet.html (installation page)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { minify } from 'terser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');

// Ensure dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// ============================================================================
// BOOKMARKLET SOURCE
// ============================================================================

const bookmarkletSource = `
(function() {
  'use strict';

  // Check if already loaded
  if (window.__SANSYS_GRID_INSPECTOR__) {
    console.log('[Grid Inspector] Already loaded - toggling');
    window.__SANSYS_GRID_INSPECTOR__.toggle();
    return;
  }

  // Set bookmarklet flag
  window.__SANSYS_GRID_INSPECTOR_BOOKMARKLET__ = true;

  // Load CSS
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://unpkg.com/@sansys/grid-inspector@latest/dist/style.css';
  document.head.appendChild(css);

  // Load UMD bundle
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@sansys/grid-inspector@latest/dist/grid-inspector.umd.js';
  script.onload = function() {
    console.log('[Grid Inspector] ✅ Loaded successfully');
  };
  script.onerror = function() {
    console.error('[Grid Inspector] ❌ Failed to load');
    alert('Erro ao carregar Grid Inspector. Verifique a conexão.');
  };
  document.head.appendChild(script);
})();
`.trim();

// ============================================================================
// GENERATE MINIFIED BOOKMARKLET
// ============================================================================

async function generateBookmarklet() {
  console.log('🔨 Generating bookmarklet...\\n');

  // Minify
  const minified = await minify(bookmarkletSource, {
    compress: {
      drop_console: false,
      drop_debugger: true,
      pure_funcs: [],
    },
    format: {
      comments: false,
      semicolons: true,
    },
  });

  if (!minified.code) {
    throw new Error('Minification failed');
  }

  // Create javascript: URI
  const bookmarkletCode = `javascript:${encodeURIComponent(minified.code)}`;

  console.log('📏 Size:', {
    original: bookmarkletSource.length,
    minified: minified.code.length,
    encoded: bookmarkletCode.length,
  });

  // Save bookmarklet
  const bookmarkletPath = resolve(distDir, 'bookmarklet.txt');
  writeFileSync(bookmarkletPath, bookmarkletCode, 'utf-8');
  console.log('✅ Saved:', bookmarkletPath);

  // Generate installation page
  generateInstallationPage(bookmarkletCode);

  console.log('\\n✅ Bookmarklet generation complete!');
}

// ============================================================================
// GENERATE INSTALLATION PAGE
// ============================================================================

function generateInstallationPage(bookmarkletCode) {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grid Inspector - Instalação</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 800px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 32px;
    }
    .section {
      margin-bottom: 32px;
    }
    .section h2 {
      font-size: 1.5rem;
      margin-bottom: 12px;
      color: #333;
    }
    .bookmarklet {
      display: inline-block;
      background: #10b981;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.2s;
      cursor: move;
    }
    .bookmarklet:hover {
      background: #059669;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }
    .instructions {
      background: #f3f4f6;
      border-left: 4px solid #667eea;
      padding: 16px;
      border-radius: 4px;
      margin: 16px 0;
    }
    .instructions ol {
      margin-left: 20px;
    }
    .instructions li {
      margin: 8px 0;
    }
    code {
      background: #1f2937;
      color: #10b981;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    .npm-section {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      border-radius: 4px;
      margin: 16px 0;
    }
    pre {
      background: #1f2937;
      color: #10b981;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 12px 0;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 16px 0;
    }
    .feature {
      background: #f9fafb;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    .feature h3 {
      font-size: 1rem;
      margin-bottom: 8px;
      color: #667eea;
    }
    .badge {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-left: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 Grid Inspector</h1>
    <p class="subtitle">
      Ferramenta universal de validação de grid para Design Systems
      <span class="badge">v1.0.0</span>
    </p>

    <!-- OPÇÃO A: BOOKMARKLET -->
    <div class="section">
      <h2>📌 Opção A: Bookmarklet (Arrastar)</h2>
      <p style="margin-bottom: 16px;">
        Arraste o botão abaixo para a barra de favoritos do seu navegador:
      </p>

      <a href="${bookmarkletCode}" class="bookmarklet" onclick="alert('Arraste este botão para a barra de favoritos!\\n\\nNão clique - arraste.'); return false;">
        🎯 Grid Inspector
      </a>

      <div class="instructions">
        <strong>📋 Como usar:</strong>
        <ol>
          <li>Arraste o botão verde acima para a barra de favoritos</li>
          <li>Navegue até qualquer site (Vue, React, HTML)</li>
          <li>Clique no favorito "Grid Inspector"</li>
          <li>✅ Inspector será injetado na página</li>
        </ol>
      </div>

      <div class="features">
        <div class="feature">
          <h3>✅ Universal</h3>
          <p>Funciona em qualquer site</p>
        </div>
        <div class="feature">
          <h3>🚀 Zero Setup</h3>
          <p>Não precisa instalação</p>
        </div>
        <div class="feature">
          <h3>🔄 Sempre Atualizado</h3>
          <p>Carrega última versão</p>
        </div>
      </div>
    </div>

    <!-- OPÇÃO C: NPM PACKAGE -->
    <div class="section">
      <h2>📦 Opção C: NPM Package (Devs)</h2>

      <div class="npm-section">
        <strong>🛠️ Para desenvolvedores Vue/React:</strong>
        <p style="margin-top: 8px;">
          Instale o package e injete no modo de desenvolvimento.
        </p>
      </div>

      <strong>1. Instalar:</strong>
      <pre>npm install @sansys/grid-inspector</pre>

      <strong>2. Injetar (Vue):</strong>
      <pre>// src/main.ts
import { injectGridInspector } from '@sansys/grid-inspector';
import '@sansys/grid-inspector/styles';

if (import.meta.env.DEV) {
  injectGridInspector();
}</pre>

      <strong>3. Injetar (React):</strong>
      <pre>// src/index.tsx
import { injectGridInspector } from '@sansys/grid-inspector';
import '@sansys/grid-inspector/styles';

if (process.env.NODE_ENV === 'development') {
  injectGridInspector();
}</pre>

      <div class="features">
        <div class="feature">
          <h3>⚙️ Configurável</h3>
          <p>Controle via código</p>
        </div>
        <div class="feature">
          <h3>🔒 Dev Only</h3>
          <p>Não vai para produção</p>
        </div>
        <div class="feature">
          <h3>🎨 TypeScript</h3>
          <p>Types inclusos</p>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #666;">
      <p>
        <strong>Sansys Design System</strong><br>
        Documentação completa: <a href="https://github.com/hebertchaves/design-system-sansys" target="_blank" style="color: #667eea;">GitHub</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const htmlPath = resolve(distDir, 'bookmarklet.html');
  writeFileSync(htmlPath, html, 'utf-8');
  console.log('✅ Saved:', htmlPath);
}

// ============================================================================
// RUN
// ============================================================================

generateBookmarklet().catch(console.error);
