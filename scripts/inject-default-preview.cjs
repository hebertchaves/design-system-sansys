const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

// Mapeamento de defaults por componente (extraído da análise anterior)
const defaultPreviews = {
  DssButton: {
    props: { variant: "elevated", color: "primary", size: "md" },
    computedDimensions: { minHeight: "44px", minWidth: "64px" },
    computedTokens: { padding: "--dss-spacing-2 --dss-spacing-4", fontSize: "--dss-font-size-md", borderRadius: "--dss-radius-sm", gap: "--dss-spacing-2" },
    demoContent: "Label 'Action'"
  },
  DssBadge: {
    props: { color: "primary" },
    computedDimensions: { minHeight: "24px", minWidth: "24px" },
    computedTokens: { padding: "--dss-spacing-0_5 --dss-spacing-1", fontSize: "--dss-font-size-xs", borderRadius: "--dss-radius-full" },
    demoContent: "Label '99+'"
  },
  DssChip: {
    props: { variant: "filled", color: "primary", size: "md" },
    computedDimensions: { minHeight: "28px" },
    computedTokens: { padding: "--dss-spacing-1 --dss-spacing-3", fontSize: "--dss-font-size-sm", borderRadius: "--dss-radius-full", gap: "--dss-spacing-1" },
    demoContent: "Label 'Chip'"
  },
  DssCard: {
    props: { variant: "elevated", square: false },
    computedDimensions: { minWidth: "100%" },
    computedTokens: { borderRadius: "--dss-radius-lg" },
    demoContent: "DssCardSection com texto"
  },
  DssInput: {
    props: { variant: "outlined", type: "text", dense: false },
    computedDimensions: { minHeight: "44px", width: "100%" },
    computedTokens: { padding: "--dss-spacing-4 --dss-spacing-4" },
    demoContent: "Placeholder 'Digite aqui'"
  },
  DssCheckbox: {
    props: { color: "primary", size: "md" },
    computedDimensions: { minHeight: "48px", minWidth: "48px" },
    computedTokens: { gap: "--dss-spacing-2", fontSize: "--dss-font-size-sm" },
    demoContent: "Label 'Opção'"
  },
  DssIcon: {
    props: { size: "md" },
    computedDimensions: { width: "24px", height: "24px" },
    computedTokens: { width: "--dss-icon-size-md", height: "--dss-icon-size-md" },
    demoContent: "Ícone 'star'"
  },
  DssAvatar: {
    props: { size: "md" },
    computedDimensions: { width: "48px", height: "48px" },
    computedTokens: { width: "--dss-touch-target-min", height: "--dss-touch-target-min", borderRadius: "--dss-radius-full" },
    demoContent: "Iniciais 'AB'"
  },
  DssSpinner: {
    props: { type: "standard", size: "md" },
    computedDimensions: { width: "24px", height: "24px" },
    computedTokens: { width: "--dss-icon-size-md", height: "--dss-icon-size-md" },
    demoContent: "Spinner girando"
  },
  DssToggle: {
    props: { color: "primary", size: "md" },
    computedDimensions: { minHeight: "48px", minWidth: "48px" },
    computedTokens: { gap: "--dss-spacing-2", fontSize: "--dss-font-size-sm" },
    demoContent: "Label 'Ativar'"
  },
  DssRadio: {
    props: { color: "primary", size: "md" },
    computedDimensions: { minHeight: "48px", minWidth: "48px" },
    computedTokens: { gap: "--dss-spacing-2", fontSize: "--dss-font-size-sm" },
    demoContent: "Label 'Opção'"
  }
};

// Fallback genérico para componentes não mapeados explicitamente
const genericFallback = {
  props: {},
  computedDimensions: {},
  computedTokens: {},
  demoContent: "Conteúdo padrão"
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file === 'dss.meta.json') {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const meta = JSON.parse(content);
        
        // Se já tem defaultPreview, pula
        if (meta.defaultPreview) continue;
        
        const compName = meta.component;
        const previewData = defaultPreviews[compName] || genericFallback;
        
        // Adiciona o campo antes de 'tokens' ou no final
        const newMeta = {};
        for (const key in meta) {
          if (key === 'tokens') {
            newMeta.defaultPreview = previewData;
          }
          newMeta[key] = meta[key];
        }
        if (!newMeta.defaultPreview) {
          newMeta.defaultPreview = previewData;
        }
        
        fs.writeFileSync(fullPath, JSON.stringify(newMeta, null, 2) + '\n');
        console.log(`Atualizado: ${compName}`);
      } catch (e) {
        console.error(`Erro em ${fullPath}:`, e.message);
      }
    }
  }
}

processDirectory(componentsDir);
console.log('Concluído!');
