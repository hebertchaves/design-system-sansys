# DssMarkupTable — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssMarkupTable` é um wrapper DSS governado sobre o `QMarkupTable` do Quasar Framework, fornecendo tabelas HTML semânticas com estilização completa via tokens DSS, brandabilidade por produto (Hub, Water, Waste) e conformidade WCAG 2.1 AA.

**Quando usar:**
- Exibição de dados tabulares estáticos (relatórios, comparações, listagens)
- Quando os dados não precisam de ordenação, filtro ou paginação built-in
- Tabelas de referência com estrutura `<thead>` + `<tbody>` + `<tfoot>`
- Layouts onde o consumer gerencia os dados e a tabela apenas exibe

**Quando NÃO usar:**
- Dados que precisam de ordenação interativa → use `DssTable` (Nível 4)
- Dados com filtro ou paginação nativa → use `DssTable`
- Listas simples de itens sem estrutura tabular → use `DssList` + `DssItem`
- Dados altamente dinâmicos com virtualização → use `DssVirtualScroll`

---

## 2. Classificação DSS

- **Tipo:** Superfície de Dados Tabulares (não-interativa)
- **Categoria:** Base — Tabela Simples
- **Fase:** 2 — Nível 1
- **Família:** Tabela Simples
- **Interativo:** Não
- **Motor Quasar:** `QMarkupTable`
- **Golden Reference:** DssBadge (componente não-interativo)
- **Golden Context:** DssList (container estrutural não-interativo com slot)

---

## 3. Modelo Arquitetural DSS × Quasar

### Declaração de Modelo

- **Quasar** = camada de execução (motor de renderização da tabela)
- **DSS** = camada de governança, semântica e tokenização

O DSS **não herda** automaticamente a API do QMarkupTable. Props são mapeadas com semântica DSS:

| QMarkupTable | DssMarkupTable | Motivo da Divergência |
|--------------|----------------|----------------------|
| `dense` | `density` | Três níveis semânticos (compact/standard/comfortable) |
| `dark` | Bloqueado | Gerenciado via `[data-theme="dark"]` global |
| `flat` | `flat` | Mantido (semântica idêntica) |
| `bordered` | `bordered` | Mantido (semântica idêntica) |
| `separator` | `separator` | Mantido (mesmos valores) |
| `square` | `square` | Mantido (semântica idêntica) |
| `wrap-cells` | `wrapCells` | camelCase DSS style |
| — | `brand` | Adição DSS: identidade de produto |

### EXC-Gate-01: QMarkupTable como Motor

O QMarkupTable é o motor de renderização. Seletores CSS descendentes (`.dss-markup-table th`, `.dss-markup-table td`, etc.) são obrigatórios para governar o conteúdo de slot. Esta é uma exceção documentada do Gate de Composição v2.4 — não é `:deep()` em estilo scoped, mas CSS global estrutural.

---

## 4. API

### Props

*(ver DSSMARKUPTABLE_API.md — seção Props)*

### Slots

| Slot | Conteúdo Esperado |
|------|-------------------|
| `default` | Elementos HTML semânticos: `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>` |

### Events

DssMarkupTable é **não-interativo**. Nenhum evento é emitido pelo componente.  
`defineEmits` não é declarado (padrão DSS para containers não-emissores).

---

## 5. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Estado visual base |
| dark mode | ✅ | Via `[data-theme="dark"]` — fundo escuro, texto invertido |
| high-contrast | ✅ | Via `prefers-contrast: more` — bordas mais fortes |
| forced-colors | ✅ | Via `forced-colors: active` — system keywords |
| print | ✅ | Via `@media print` — borda e background ajustados |
| hover | ❌ N/A | Não-interativo; consumer gerencia hover de linhas |
| focus | ❌ N/A | Não-interativo; células não têm foco próprio |
| active | ❌ N/A | Não-interativo |
| disabled | ❌ N/A | Não-interativo |
| loading | ❌ N/A | Consumer usa `DssInnerLoading` ou `DssSkeleton` |
| error | ❌ N/A | Consumer gerencia estado de erro |

---

## 6. Tokens Utilizados

*(nomes exatos — correspondência 1:1 com o SCSS)*

| Token | Uso |
|-------|-----|
| `--dss-font-family-sans` | Família tipográfica de todo o texto |
| `--dss-font-size-md` | Tamanho padrão das células (`td`) |
| `--dss-font-size-sm` | Tamanho compact + cabeçalho `th` |
| `--dss-font-weight-semibold` | Peso do texto em `<th>` |
| `--dss-font-weight-bold` | Peso em high-contrast |
| `--dss-text-body` | Cor de texto padrão |
| `--dss-text-inverse` | Cor de texto em dark mode |
| `--dss-gray-50` | Background de `<thead>` e `<tfoot>` |
| `--dss-gray-100` | Separadores de linha em `<tbody>` |
| `--dss-gray-200` | Borda inferior do cabeçalho |
| `--dss-gray-700` | Cor do texto dos `<th>` |
| `--dss-gray-800` | Background cabeçalho em dark mode |
| `--dss-radius-md` | Border radius do container |
| `--dss-spacing-1_5` | Padding vertical compact (6px) |
| `--dss-spacing-3` | Padding vertical standard (12px) |
| `--dss-spacing-4` | Padding horizontal standard (16px) |
| `--dss-spacing-6` | Padding horizontal comfortable (24px) |
| `--dss-border-width-thin` | Separadores de linha (1px) |
| `--dss-border-width-md` | Borda do cabeçalho (2px) |
| `--dss-hub-50/200/700/900` | Background/borda/texto cabeçalho Hub |
| `--dss-water-50/200/700/900` | Background/borda/texto cabeçalho Water |
| `--dss-waste-50/200/700/900` | Background/borda/texto cabeçalho Waste |

---

## 7. Acessibilidade

### WCAG 2.1 AA

- **1.1.1 Conteúdo não textual:** N/A — tabela de texto estruturado
- **1.3.1 Informação e relações:** Estrutura semântica via `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` + atributo `scope` (responsabilidade do consumer)
- **1.4.3 Contraste mínimo:** Tokens DSS garantem contraste ≥ 4.5:1 em modo padrão e high-contrast
- **2.1.1 Teclado:** N/A — tabela estática sem interação nativa
- **2.5.5 Tamanho do alvo:** N/A — não-interativo
- **4.1.2 Nome, função, valor:** `<table>` fornece role semântico nativo; consumer é responsável por `scope` e `aria-label` quando necessário

### Responsabilidade do Consumer

O consumer **é responsável** por:

```html
<!-- ✅ scope="col" em cabeçalhos de coluna -->
<th scope="col">Nome</th>

<!-- ✅ scope="row" em cabeçalhos de linha -->
<th scope="row">Linha A</th>

<!-- ✅ aria-label quando a tabela não tem caption visível -->
<DssMarkupTable aria-label="Usuários do sistema">
  ...
</DssMarkupTable>

<!-- ✅ <caption> para descrever a tabela quando possível -->
<DssMarkupTable>
  <caption class="sr-only">Relatório de usuários ativos em maio/2026</caption>
  ...
</DssMarkupTable>
```

---

## 8. Comportamentos Implícitos

### Forwarding de Atributos

`inheritAttrs: false` + `v-bind="$attrs"` no `<q-markup-table>`:
- Atributos não declarados como props (ex: `aria-label`, `id`, `data-*`) são passados diretamente ao elemento raiz
- Consumer pode adicionar `aria-label` diretamente na tag `<DssMarkupTable>`

### Responsividade

O QMarkupTable adiciona `overflow: auto` no container por padrão, permitindo scroll horizontal em viewports menores que a tabela. Nenhuma configuração adicional é necessária.

### Overflow de Células

Por padrão (`wrapCells: false`), o conteúdo das células não quebra linha. Quando `wrapCells: true`, o QMarkupTable adiciona classe `.q-markup-table--cells-wrap` e o DSS sobreescreve `white-space: normal` nas células.

---

## 9. Paridade com Golden Component

### Comparação com DssBadge (Golden Reference)

| Aspecto | DssBadge | DssMarkupTable | Justificativa |
|---------|----------|----------------|---------------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Padrão DSS |
| `inheritAttrs: false` | ✅ | ✅ | Forwarding explícito |
| `v-bind="$attrs"` | ✅ | ✅ | Passa para motor |
| Touch target `::before` | N/A | N/A | Ambos não-interativos |
| `-webkit-tap-highlight-color` | ✅ | N/A | DssMarkupTable não é tapped |
| `defineEmits` | Não declarado | Não declarado | Padrão DSS para não-emissores |
| `withDefaults` | Props com defaults não-triviais | ✅ | `density: 'standard'`, `separator: 'horizontal'` |
| Forced-colors | ✅ | ✅ | System keywords |
| Dark mode via `[data-theme]` | ✅ | ✅ | Padrão DSS |

**Divergências Intencionais:**
- `-webkit-tap-highlight-color` não aplicável: DssMarkupTable não recebe eventos de toque diretamente
- Touch target não aplicável: componente não-interativo (N/A, Opção B conforme DssBadge)

---

## 10. Mapeamento de Composição DSS

### Papel Estrutural

DssMarkupTable é uma **superfície de exibição de dados**. Ele:
- Fornece estrutura visual (`border-radius`, `overflow`, separadores)
- Fornece tokens de tipografia e espaçamento para células
- **Não instancia** filhos automaticamente — depende 100% do slot

### Componentes DSS Recomendados no Slot

| Componente | Uso na Tabela |
|------------|---------------|
| 🟢 `DssBadge` | Status nas células (Ativo, Inativo, etc.) |
| 🟢 `DssChip` | Tags categóricas |
| 🟢 `DssIcon` | Ícones de status ou ação |
| 🟢 `DssTooltip` | Detalhes adicionais em hover de célula |
| 🟡 `DssPagination` | Quando consumer pagina os dados |
| ⚪ `DssCheckbox` | Seleção de linhas (consumer implementa) |

### Anti-Patterns de Composição

- ❌ Usar HTML `<table>` nativo sem DssMarkupTable no contexto DSS
- ❌ Omitir `scope` nos elementos `<th>` (viola WCAG 1.3.1)
- ❌ Aplicar cores diretamente nas células via `style` inline — usar classes utilitárias DSS
- ❌ Usar DssMarkupTable para dados que precisam de sorting/filtering/pagination → DssTable
- ❌ Aninhar tabelas (tables dentro de cells) sem clara necessidade semântica

---

## 11. Exceções Registradas

| ID | Tipo | Valor | Localização | Justificativa |
|----|------|-------|-------------|---------------|
| EXC-Gate-01 | Estrutural | Seletores descendentes | 2-composition, 3-variants, 4-output | QMarkupTable é o motor; slot content exige descendant selectors |
| EXC-01 | Visual | `rgba(255, 255, 255, 0.15)` | 4-output/_states.scss | Dark mode header border (thead/tfoot) sem token equivalente |
| EXC-02 | Visual | `rgba(255, 255, 255, 0.06)` | 4-output/_states.scss | Dark mode row separator sem token equivalente |
| EXC-03 | Acessibilidade | `ButtonText` | 4-output/_states.scss | forced-colors: tokens ignorados neste modo |
| EXC-04 | Acessibilidade | `1px solid ButtonText` | 4-output/_states.scss | forced-colors row separator |
| EXC-05 | Print | `1px solid currentColor` | 4-output/_states.scss | Print border para visibilidade na impressão |

### Exceções aos Gates v2.4

**Gate de Composição v2.4 — EXC-Gate-01**

O Gate de Composição v2.4 proíbe seletores descendentes com `>` ou espaço em componentes com slot. Esta proibição protege o isolamento de escopo.

**Exceção documentada:** DssMarkupTable usa QMarkupTable como motor de renderização. O QMarkupTable renderiza o conteúdo de slot como filhos diretos do elemento `<table>`, tornando impossível aplicar tokens DSS de tipografia, espaçamento e cores nos elementos `<th>`, `<td>`, `<tr>`, `<thead>`, `<tbody>`, `<tfoot>` sem seletores descendentes. A alternativa (estilizar via `:deep()` scoped) foi rejeitada pois DssMarkupTable usa `<style>` global para permitir que tokens DSS e seletores brand funcionem corretamente fora do scope Vue.

**Gate de Responsabilidade v2.4 — Consumer ARIA**

O Gate de Responsabilidade v2.4 define que o componente DSS deve garantir a acessibilidade WCAG 2.1 AA de forma autônoma. Para DssMarkupTable, a semântica de acessibilidade das células (`scope="col"`, `scope="row"`, `aria-label`) é **delegada ao consumidor** por design intencional:

- O consumer controla quais colunas são cabeçalhos de linha vs. coluna
- O consumer conhece o contexto semântico dos dados
- O componente fornece a estrutura `<table>` com role semântico nativo

Esta delegação está alinhada com o comportamento documentado do `QMarkupTable` e com a responsabilidade do consumidor conforme WCAG 1.3.1.

---

## 12. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-19 | DSS Agent | Criação inicial — Fase 2 Nível 1 — Família Tabela Simples |
