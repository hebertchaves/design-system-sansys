# Prompt de Extração e Mapeamento de Defaults Visuais (Figma → DSS)

Este prompt deve ser fornecido ao agente local (Claude Code CLI) que possui acesso ao Figma via MCP. O objetivo é extrair os valores visuais dos protótipos, mapeá-los para tokens DSS e preencher o campo `defaultPreview` de todos os 56 componentes do repositório.

## 🎯 Objetivo
Você deve atualizar o arquivo `dss.meta.json` de todos os componentes do repositório, preenchendo o campo `defaultPreview` com os valores visuais canônicos extraídos do Figma e mapeados para os tokens DSS corretos.

## 🛠️ Ferramentas Necessárias
- Acesso ao Figma via MCP (para ler os nodes indicados)
- Acesso de leitura/escrita ao repositório local do DSS

## 📋 Instruções de Execução

### Passo 1: Extração de Dados do Figma
Use a tool MCP do Figma para inspecionar os seguintes nodes no arquivo `u2XlRujP4RwNqAAgIDaoJA` (DSS - Base de componentes):
- `159-358`
- `159-2468`
- `160-3333`
- `160-4259`

Para cada componente encontrado nestes nodes, extraia:
1. **Dimensões:** Altura e largura (mínimas ou fixas)
2. **Espaçamento:** Padding (horizontal e vertical) e Gap (se houver filhos)
3. **Bordas:** Corner radius e Border width
4. **Tipografia:** Font size, Font weight e Line height
5. **Cores:** Background color (surface) e Text color
6. **Sombras:** Box shadow (se houver)

### Passo 2: Mapeamento para Tokens DSS
Cruze os valores extraídos com os tokens DSS existentes. **NUNCA invente tokens.** Use apenas os tokens reais do repositório.

**Tabela de Mapeamento Canônico:**

| Propriedade | Valor Figma | Token DSS Correspondente |
|---|---|---|
| **Altura (Controles)** | 32px | `--dss-form-control-height-xs` |
| | 36px | `--dss-form-control-height-sm` |
| | 44px | `--dss-form-control-height-md` (Padrão) |
| | 52px | `--dss-form-control-height-lg` |
| | 64px | `--dss-form-control-height-xl` |
| **Espaçamento (Padding/Gap)** | 4px | `--dss-spacing-1` |
| | 8px | `--dss-spacing-2` |
| | 12px | `--dss-spacing-3` |
| | 16px | `--dss-spacing-4` |
| | 24px | `--dss-spacing-6` |
| **Corner Radius** | 4px | `--dss-radius-sm` |
| | 8px | `--dss-radius-md` (Padrão para controles) |
| | 12px | `--dss-radius-lg` (Padrão para superfícies) |
| | 16px | `--dss-radius-xl` |
| | 9999px | `--dss-radius-full` |
| **Tipografia** | 14px | `--dss-font-size-sm` |
| | 16px | `--dss-font-size-md` (Padrão) |
| | 400 (Normal) | `--dss-font-weight-normal` |
| | 500 (Medium) | `--dss-font-weight-medium` |
| | 1.5 (150%) | `--dss-line-height-normal` |
| **Bordas** | 0px | `--dss-border-width-none` |
| | 1px | `--dss-border-width-thin` |
| | 2px | `--dss-border-width-md` |
| **Cores Base** | Fundo neutro | `--dss-surface-default` |
| | Texto neutro | `--dss-text-body` |
| **Sombras** | Elevação leve | `--dss-shadow-sm` |
| | Elevação média | `--dss-shadow-md` |

### Passo 3: Inferência por Categoria (Para componentes sem protótipo)
Para os componentes que não estão nos nodes do Figma, você deve inferir os valores baseando-se na categoria do componente, mantendo a unidade visual:

1. **Controles Interativos (Button, Input, Select, Checkbox, Toggle, etc.)**
   - Altura: `--dss-form-control-height-md` (44px)
   - Radius: `--dss-radius-md` (8px)
   - Tipografia: `--dss-font-size-md`, `--dss-font-weight-medium`
   - Border: `--dss-border-width-thin` (se aplicável) ou `--dss-border-width-none`

2. **Controles Informativos (Badge, Chip não-interativo, etc.)**
   - Altura: `--dss-form-control-height-sm` (36px) ou menor
   - Radius: `--dss-radius-full` (Badge) ou `--dss-radius-md` (Chip)
   - Tipografia: `--dss-font-size-sm` ou `--dss-font-size-xs`

3. **Superfícies (Card, Dialog, Drawer, Banner, etc.)**
   - Padding: `--dss-spacing-4` (16px) ou `--dss-spacing-6` (24px)
   - Radius: `--dss-radius-lg` (12px)
   - Surface: `--dss-surface-default`
   - Text: `--dss-text-body`
   - Shadow: `--dss-shadow-md` (se flutuante)

4. **Navegação (Tabs, Breadcrumbs, Stepper, Menu)**
   - Altura de item: `--dss-form-control-height-md` (44px)
   - Tipografia: `--dss-font-size-md`

### Passo 4: Atualização dos Arquivos `dss.meta.json`
Para CADA UM dos 56 componentes no repositório, atualize o campo `defaultPreview` no respectivo `dss.meta.json`.

**Estrutura Obrigatória do `defaultPreview`:**
O objeto `defaultPreview` DEVE conter os seguintes campos, preenchidos com os tokens mapeados:

```json
"defaultPreview": {
    "props": {
        // Props que geram o estado neutro/default
    },
    "computedDimensions": {
        "minHeight": "44px", // Exemplo
        "minWidth": "..." // Se aplicável
    },
    "computedTokens": {
        "padding": "--dss-spacing-X",
        "gap": "--dss-spacing-X", // Se houver filhos
        "borderRadius": "--dss-radius-X",
        "borderWidth": "--dss-border-width-X",
        "fontSize": "--dss-font-size-X",
        "fontWeight": "--dss-font-weight-X",
        "lineHeight": "--dss-line-height-normal",
        "surface": "--dss-surface-default", // OBRIGATÓRIO
        "textColor": "--dss-text-body", // OBRIGATÓRIO
        "shadow": "--dss-shadow-X" // Se aplicável
    },
    "demoContent": "Descrição do conteúdo de demonstração"
}
```

**Regras Críticas:**
1. **Neutralidade:** O estado default deve ser neutro. Use `--dss-surface-default` e `--dss-text-body` para garantir suporte automático ao Dark Mode.
2. **Completude:** Todos os campos listados em `computedTokens` acima devem estar presentes se a propriedade visual se aplicar ao componente. `surface`, `textColor` e `lineHeight` são OBRIGATÓRIOS para todos os componentes que renderizam texto ou possuem fundo.
3. **Sem Hardcode:** Nunca use valores hexadecimais (ex: `#ffffff`) ou pixels (ex: `16px`) dentro de `computedTokens`. Use APENAS tokens DSS.

### Passo 5: Validação
Após atualizar todos os arquivos, verifique se o JSON continua válido e se nenhum token inventado foi utilizado.
