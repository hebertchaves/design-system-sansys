#!/usr/bin/env node

/**
 * Converte Markdown para HTML pronto para impressão em PDF
 * Uso: node md-to-html-pdf.js <arquivo.md>
 */

const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2] || 'components/base/DssButton/DssButton.md';
const outputFile = inputFile.replace('.md', '.html');

console.log(`📄 Convertendo: ${inputFile} → ${outputFile}`);

// Ler arquivo markdown
if (!fs.existsSync(inputFile)) {
  console.error(`❌ Erro: Arquivo não encontrado: ${inputFile}`);
  process.exit(1);
}

const markdown = fs.readFileSync(inputFile, 'utf-8');

// Usar marked se disponível, senão usar regex simples
let htmlContent = '';

try {
  const { marked } = require('marked');
  htmlContent = marked.parse(markdown);
} catch (err) {
  // Fallback: conversão básica com regex
  console.log('⚠️  marked não instalado, usando conversão básica...');
  htmlContent = markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\`([^\`]+)\`/gim, '<code>$1</code>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^\| (.+) \|$/gim, (match) => {
      const cells = match.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    });

  htmlContent = `<p>${htmlContent}</p>`;
}

// Template HTML completo com estilos para PDF
const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DssButton - Documentação DSS</title>
  <style>
    @page {
      size: A4;
      margin: 2cm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 210mm;
      margin: 0 auto;
      padding: 20px;
      background: white;
    }

    h1 {
      font-size: 2.5em;
      margin-top: 0;
      margin-bottom: 0.5em;
      color: #000000;
      border-bottom: 3px solid #333333;
      padding-bottom: 0.3em;
      page-break-after: avoid;
    }

    h2 {
      font-size: 1.8em;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      color: #1a1a1a;
      border-bottom: 2px solid #666666;
      padding-bottom: 0.2em;
      page-break-after: avoid;
    }

    h3 {
      font-size: 1.4em;
      margin-top: 1.2em;
      margin-bottom: 0.4em;
      color: #333333;
      page-break-after: avoid;
    }

    h4 {
      font-size: 1.2em;
      margin-top: 1em;
      color: #555555;
      page-break-after: avoid;
    }

    p {
      margin: 0.8em 0;
      text-align: justify;
    }

    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.9em;
      color: #c7254e;
    }

    pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 1em;
      border-radius: 5px;
      overflow-x: auto;
      page-break-inside: avoid;
    }

    pre code {
      background: transparent;
      color: inherit;
      padding: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
      page-break-inside: avoid;
      font-size: 0.9em;
    }

    th {
      background: #2d2d2d;
      color: white;
      padding: 10px;
      text-align: left;
      font-weight: 600;
    }

    td {
      padding: 10px;
      border: 1px solid #ddd;
    }

    tr:nth-child(even) {
      background: #f9f9f9;
    }

    blockquote {
      margin: 1em 0;
      padding: 0.5em 1em;
      border-left: 4px solid #666666;
      background: #f5f5f5;
      page-break-inside: avoid;
    }

    ul, ol {
      margin: 0.8em 0;
      padding-left: 2em;
    }

    li {
      margin: 0.3em 0;
    }

    .badge {
      display: inline-block;
      padding: 0.2em 0.6em;
      background: #666666;
      color: #ffffff;
      border-radius: 3px;
      font-weight: bold;
      font-size: 0.85em;
    }

    .page-break {
      page-break-before: always;
    }

    @media print {
      body {
        max-width: 100%;
        padding: 0;
      }

      .no-print {
        display: none;
      }

      a {
        text-decoration: none;
        color: #000;
      }

      a[href]:after {
        content: " (" attr(href) ")";
        font-size: 0.8em;
        color: #666;
      }
    }

    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      background: #333333;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      z-index: 1000;
    }

    .print-button:hover {
      background: #1a1a1a;
    }

    @media print {
      .print-button {
        display: none;
      }
    }
  </style>
</head>
<body>
  <button class="print-button no-print" onclick="window.print()">🖨️ Imprimir/Salvar PDF</button>

  <article>
    ${htmlContent}
  </article>

  <script>
    // Auto-print ao carregar (opcional)
    // window.onload = () => setTimeout(() => window.print(), 500);
  </script>
</body>
</html>`;

// Salvar HTML
fs.writeFileSync(outputFile, html, 'utf-8');

console.log(`✅ HTML gerado com sucesso!`);
console.log(`📍 Local: ${path.resolve(outputFile)}`);
console.log(`\n📝 Instruções:`);
console.log(`   1. Abra o arquivo HTML em um navegador`);
console.log(`   2. Clique no botão "Imprimir/Salvar PDF" ou pressione Ctrl+P`);
console.log(`   3. Selecione "Salvar como PDF" como destino`);
console.log(`   4. Ajuste margens se necessário (recomendado: padrão)`);
console.log(`   5. Salve o arquivo PDF\n`);
