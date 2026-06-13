# DSSMARKUPTABLE_API.md — DssMarkupTable API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `density` | `'compact' \| 'standard' \| 'comfortable'` | `'standard'` | Densidade visual (padding das células) |
| `flat` | `Boolean` | `false` | Remove sombra e bordas do container |
| `bordered` | `Boolean` | `false` | Adiciona borda externa ao container |
| `separator` | `'horizontal' \| 'vertical' \| 'cell' \| 'none'` | `'horizontal'` | Tipo de separador entre células |
| `square` | `Boolean` | `false` | Remove border-radius (cantos quadrados) |
| `wrapCells` | `Boolean` | `false` | Permite quebra de texto em múltiplas linhas nas células |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Identidade visual de marca no cabeçalho |

### Props Bloqueadas (não expostas)

| Prop Quasar | Motivo do Bloqueio |
|-------------|-------------------|
| `dark` | Gerenciado via `[data-theme="dark"]` global no DSS |
| `dense` | Substituído por `density` com semântica de três níveis |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo da tabela. Deve conter elementos semânticos HTML: `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>` |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| — | — | DssMarkupTable é não-interativo. Nenhum evento emitido. |

## CSS Classes Geradas

| Classe | Condição |
|--------|----------|
| `.dss-markup-table` | Sempre (classe raiz) |
| `.dss-markup-table--compact` | `density === 'compact'` |
| `.dss-markup-table--comfortable` | `density === 'comfortable'` |
| `.dss-markup-table--brand-hub` | `brand === 'hub'` |
| `.dss-markup-table--brand-water` | `brand === 'water'` |
| `.dss-markup-table--brand-waste` | `brand === 'waste'` |

> As classes `.q-markup-table`, `.q-markup-table--bordered`, `.q-markup-table--flat`, `.q-markup-table--square`, `.q-markup-table--[separator]-separator` são geradas pelo motor QMarkupTable.

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-font-family-sans` | — | Família tipográfica base |
| `--dss-font-size-md` | 1rem (16px) | Tamanho de texto padrão das células |
| `--dss-font-size-sm` | 0.875rem (14px) | Tamanho de texto compact + cabeçalho |
| `--dss-font-weight-semibold` | 600 | Peso dos cabeçalhos `<th>` |
| `--dss-font-weight-bold` | 700 | Peso em high-contrast |
| `--dss-text-body` | — | Cor de texto padrão |
| `--dss-text-inverse` | — | Cor de texto em dark mode |
| `--dss-gray-50` | #F9FAFB | Background do cabeçalho e rodapé |
| `--dss-gray-100` | — | Separadores de linha (tbody) |
| `--dss-gray-200` | — | Borda inferior do cabeçalho |
| `--dss-gray-700` | — | Cor do texto dos cabeçalhos |
| `--dss-gray-800` | — | Background cabeçalho em dark mode |
| `--dss-radius-md` | 8px | Border radius do container |
| `--dss-spacing-1_5` | 6px | Padding compact |
| `--dss-spacing-3` | 12px | Padding standard vertical |
| `--dss-spacing-4` | 16px | Padding standard horizontal |
| `--dss-spacing-6` | 24px | Padding comfortable horizontal |
| `--dss-border-width-thin` | 1px | Separadores de linha |
| `--dss-border-width-md` | 2px | Borda inferior do cabeçalho |
| `--dss-hub-50` | — | Header background Hub |
| `--dss-hub-200` | — | Header border Hub |
| `--dss-hub-700` | — | Header text Hub |
| `--dss-hub-900` | — | Header background Hub dark |
| `--dss-water-50` | — | Header background Water |
| `--dss-water-200` | — | Header border Water |
| `--dss-water-700` | — | Header text Water |
| `--dss-water-900` | — | Header background Water dark |
| `--dss-waste-50` | — | Header background Waste |
| `--dss-waste-200` | — | Header border Waste |
| `--dss-waste-700` | — | Header text Waste |
| `--dss-waste-900` | — | Header background Waste dark |

## Exceções Registradas

| ID | Valor | Justificativa |
|----|-------|---------------|
| `EXC-Gate-01` | Seletores descendentes em `.dss-markup-table table/th/td/tr` | QMarkupTable é o motor; seletores obrigatórios para governar slot content |
| `EXC-01` | `rgba(255, 255, 255, 0.15)` | Dark mode header border — nenhum token DSS equivalente |
| `EXC-02` | `rgba(255, 255, 255, 0.06)` | Dark mode row separator — white com baixa opacidade |
| `EXC-03` | `ButtonText` system keyword | Forced-colors mode — tokens CSS ignorados |
| `EXC-04` | `1px solid ButtonText` | Forced-colors row separator — valor absoluto obrigatório |
| `EXC-05` | `1px solid currentColor` | Print mode border — garante visibilidade |

## Estados

| Estado | Aplicável | Observação |
|--------|-----------|------------|
| default | ✅ | Estado normal da tabela |
| hover | ❌ N/A | Não-interativo; hover em linhas é responsabilidade do consumer |
| focus | ❌ N/A | Não-interativo; foco em células é responsabilidade do consumer |
| active | ❌ N/A | Não-interativo |
| disabled | ❌ N/A | Não-interativo |
| loading | ❌ N/A | Consumer usa DssInnerLoading ou DssSkeleton |
| error | ❌ N/A | Consumer trata estado de erro |
| dark mode | ✅ | Via `[data-theme="dark"]` global |
| high contrast | ✅ | Via `prefers-contrast: more` |
| forced-colors | ✅ | Via `forced-colors: active` |
| print | ✅ | Via `@media print` |

## Separadores — Comportamento

| Valor | Comportamento |
|-------|---------------|
| `horizontal` | Borda inferior em cada linha (default) |
| `vertical` | Borda direita em cada célula |
| `cell` | Borda em todas as direções (grade completa) |
| `none` | Sem bordas entre células |

> Os separadores são gerenciados nativamente pelo QMarkupTable via classes CSS (`.q-markup-table--[tipo]-separator`).

## Responsabilidade do Consumer (WCAG)

O consumer **é responsável** pela semântica de acessibilidade das células:

```html
<!-- ✅ CORRETO -->
<thead>
  <tr>
    <th scope="col">Nome</th>
    <th scope="col">Idade</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">João</th> <!-- quando th é cabeçalho de linha -->
    <td>30</td>
  </tr>
</tbody>

<!-- ❌ INCORRETO — th sem scope viola WCAG 1.3.1 -->
<thead>
  <tr>
    <th>Nome</th>
    <th>Idade</th>
  </tr>
</thead>
```
