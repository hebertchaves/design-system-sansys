# DSS — Workflow do Default Preview Data-Driven

> **Status:** Normativo Vinculante  
> **Versão DSS:** v2.3.0  
> **Autoridade:** Este documento descreve o sistema que governa a renderização do estado default dos componentes na página `TestDefaultPreview.vue`. Qualquer alteração no schema ou no workflow deve ser refletida aqui.

---

## 1. Princípio

A página `apps/sandbox/src/TestDefaultPreview.vue` não contém props hardcoded. O aspecto visual default de cada componente é inteiramente determinado pelo campo `defaultPreview` do seu `dss.meta.json` — a única fonte de verdade.

```
dss.meta.json (defaultPreview)
    ↓  lido por
DemoRenderer.vue  (h() render function)
    ↓  usado em
TestDefaultPreview.vue  (import.meta.glob → agrupado por previewGroup)
    ↓  estilizado por
packages/core/index.scss  (compilado ao vivo pelo Vite)
```

---

## 2. Campos Obrigatórios em `dss.meta.json`

Todo componente DSS elegível para exibição no preview **DEVE** declarar:

### `previewGroup` (string)

Define em qual das 15 seções da página o componente aparece.

| Valor | Seção |
| :--- | :--- |
| `"acoes"` | 1. Ações |
| `"indicadores"` | 2. Indicadores e Avatares |
| `"form-campos"` | 3. Formulários — Campos |
| `"form-controles"` | 4. Formulários — Controles |
| `"progresso"` | 5. Progresso e Feedback |
| `"banners"` | 6. Banners e Barras |
| `"navegacao"` | 7. Navegação |
| `"stepper"` | 8. Stepper |
| `"listas"` | 9. Listas e Estrutura |
| `"cartoes"` | 10. Cartões e Superfícies |
| `"timeline"` | 11. Timeline |
| `"arvore"` | 12. Árvore |
| `"midia"` | 13. Mídia e Scroll |
| `"layout"` | 14. Layout Estrutural |
| `"contextuais"` | 15. Componentes Contextuais |

### `defaultPreview.props` (object)

Props que determinam o aspecto visual default. Inclui tanto props de estilo (`variant`, `color`, `size`) quanto props de dados necessárias para renderização (`label`, `modelValue`, `options`). Deve refletir o estado `withDefaults()` do componente Vue.

### `defaultPreview.demoSlots` (object | null)

Descreve o conteúdo de slots em formato JSON. `null` indica que o componente não precisa de slots — renderiza apenas via props.

**Schema de um nó:**
```json
{
  "component": "DssCardSection",
  "props": { "key": "value" },
  "children": "texto ou outro nó ou array de nós"
}
```

**Nó HTML literal** (para casos excepcionais como `DssMarkupTable`):
```json
{ "html": "<thead><tr><th>Nome</th></tr></thead>" }
```

**Exemplos:**

```json
// Slot de texto simples
"demoSlots": { "default": "Ação Principal" }

// Slot com componente aninhado
"demoSlots": {
  "default": [
    { "component": "DssCardSection", "children": "Conteúdo" },
    { "component": "DssCardActions", "children": [
      { "component": "DssButton", "props": { "flat": true }, "children": "OK" }
    ]}
  ]
}

// Slots múltiplos (ex: DssSplitter)
"demoSlots": {
  "before": [{ "html": "<div style='padding:8px'>Esquerdo</div>" }],
  "after":  [{ "html": "<div style='padding:8px'>Direito</div>" }]
}

// Sem slots
"demoSlots": null
```

---

## 3. Arquivos do Sistema

### `apps/sandbox/src/DemoRenderer.vue`

Componente Vue com render function pura (`h()`). Importa todos os componentes DSS base e os registra em um registry interno. Recebe `meta` (objeto `dss.meta.json`) como prop e renderiza o componente com seus `defaultPreview.props` e `defaultPreview.demoSlots`.

Não contém `<template>` nem `<style>`. Nunca editar para fins de estilo ou layout.

### `apps/sandbox/src/TestDefaultPreview.vue`

Usa `import.meta.glob` para carregar todos os `dss.meta.json` em build time. Agrupa por `previewGroup` e renderiza cada componente via `<DemoRenderer :meta="meta" />`. O badge de contagem no header reflete `allMetas.length` dinamicamente.

---

## 4. Scripts de Manutenção

### `npm run update:meta-preview`

**Quando usar:** Ao criar um novo componente ou ao alterar o schema de `previewGroup`/`demoSlots` para múltiplos componentes.

Lê `scripts/update-meta-preview.cjs`. Injeta `previewGroup` e `defaultPreview.demoSlots` em todos os `dss.meta.json` a partir dos mapas definidos no próprio script. Também mescla patches em `defaultPreview.props`.

> ⚠️ Para um único componente, editar o `dss.meta.json` diretamente é mais eficiente.

### `npm run sync:visual-contract`

**Quando usar:** Após qualquer alteração em `defaultPreview` (props, demoSlots, computedDimensions, etc.) de qualquer `dss.meta.json`.

Lê `scripts/sync-visual-contract.js`. Regenera a seção `<!-- BEGIN:AUTO-GENERATED --> ... <!-- END:AUTO-GENERATED -->` em `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md` com uma tabela atualizada de todos os componentes.

> ❌ **Nunca editar manualmente** a região delimitada pelos comentários `AUTO-GENERATED` no `DSS_REFERENCIA_VISUAL_ANALISE.md`.

### `npm run setup:hooks`

**Quando usar:** Uma vez após clonar o repositório ou em qualquer nova máquina de desenvolvimento.

Copia `scripts/hooks/pre-commit` para `.git/hooks/pre-commit` e torna executável. O hook detecta `dss.meta.json` staged e executa `sync:visual-contract` automaticamente, adicionando o doc atualizado ao mesmo commit.

---

## 5. Fluxo para Alterar o Default Visual de um Componente

1. Editar `defaultPreview.props` e/ou `defaultPreview.demoSlots` no `dss.meta.json` do componente
2. Verificar visualmente no sandbox: `npm run sandbox:dev` → página Default Preview
3. Ao commitar: o pre-commit hook sincroniza `DSS_REFERENCIA_VISUAL_ANALISE.md` automaticamente
4. Se o hook não estiver instalado: rodar `npm run sync:visual-contract` antes de commitar

## 6. Fluxo para Adicionar um Novo Componente ao Preview

1. Criar o `dss.meta.json` com `previewGroup`, `defaultPreview.props` e `defaultPreview.demoSlots`
2. Adicionar o import do componente em `DemoRenderer.vue` (registry interno)
3. O componente aparecerá automaticamente na seção correta sem alterar `TestDefaultPreview.vue`

---

## 7. Relação com Outros Documentos

| Documento | Relação |
| :--- | :--- |
| `DSS_REFERENCIA_VISUAL_ANALISE.md` | Espelho human-readable. Seção de dados é gerada por `sync:visual-contract`. |
| `DSS_MONOREPO_PATH_MAP.md` | Lista os scripts e os caminhos dos arquivos do sistema. |
| `CLAUDE.md` | Referencia este documento na lista de leitura obrigatória. |
