#!/usr/bin/env node

/**
 * Gerador de PDF simples usando Markdown
 * Converte DssButton.md para PDF com formatação preservada
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const inputFile = process.argv[2] || 'components/base/DssButton/DssButton.md';
const outputFile = inputFile.replace('.md', '.pdf');

console.log(`📄 Convertendo: ${inputFile} → ${outputFile}`);

// Verificar se o arquivo existe
if (!fs.existsSync(inputFile)) {
  console.error(`❌ Erro: Arquivo não encontrado: ${inputFile}`);
  process.exit(1);
}

// Tentar usar pandoc (mais rápido e melhor formatação)
exec('which pandoc', (error) => {
  if (!error) {
    // Usar pandoc se disponível
    const pandocCmd = `pandoc "${inputFile}" -o "${outputFile}" --pdf-engine=wkhtmltopdf --toc --toc-depth=3 -V geometry:margin=1in`;

    console.log('🔧 Usando Pandoc...');
    exec(pandocCmd, (err, stdout, stderr) => {
      if (err) {
        console.log('⚠️  Pandoc falhou, tentando método alternativo...');
        convertWithMarkdownPdf();
      } else {
        console.log(`✅ PDF gerado: ${outputFile}`);
      }
    });
  } else {
    // Fallback para markdown-pdf via npm
    convertWithMarkdownPdf();
  }
});

function convertWithMarkdownPdf() {
  console.log('🔧 Usando markdown-pdf...');

  const cmd = `npx --yes markdown-pdf "${inputFile}" -o "${outputFile}"`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erro na conversão: ${error.message}`);
      console.log('\n📝 Alternativa: Abra o arquivo .md no VSCode e use "Markdown PDF" extension');
      process.exit(1);
    }

    if (fs.existsSync(outputFile)) {
      const stats = fs.statSync(outputFile);
      console.log(`✅ PDF gerado com sucesso!`);
      console.log(`📊 Tamanho: ${(stats.size / 1024).toFixed(2)} KB`);
      console.log(`📍 Local: ${path.resolve(outputFile)}`);
    } else {
      console.log('⚠️  PDF não foi gerado.');
    }
  });
}
