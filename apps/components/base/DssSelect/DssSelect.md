# DssSelect

**Versão DSS**: 2.2.0
**Golden Reference**: DssChip
**Golden Context**: DssInput
**Fase**: 1
**Classificação**: Action Control interativo — campo de seleção

---

## 1. Identidade e Papel Semântico

`DssSelect` é o componente oficial do Design System Sansys para **campos de seleção** (dropdowns). Implementado como wrapper do `QSelect` do Quasar com encapsulamento controlado da API.

### O que é

- Campo de seleção de uma ou múltiplas opções governado pelo DSS
- Wrapper de `QSelect` com encapsulamento controlado da API Quasar
- Suporte completo a variantes visuais, brandabilidade e acessibilidade
- Dois modos de seleção: simples (`modelValue: any`) e múltipla (`multiple`, `useChips`)
- Dropdown (painel) com govenance DSS via injeção de classe por `popup-content-class`

### Quando usar

- Quando o usuário deve escolher uma ou mais opções de uma lista pré-definida
- Listas com mais de 5 itens (para listas menores, considere `DssRadio`)
- Formulários de cadastro, filtros, configurações

### Quando NÃO usar

- Para input de texto livre → use `DssInput`
- Para texto multilinhas → use `DssTextarea`
- Para escolha binária simples → use `DssCheckbox` ou `DssToggle`
- Para listas de até 5 itens visíveis → use `DssRadio`

---

## 2. Golden Component

### Golden Reference: DssChip

`DssChip` é o Golden Reference oficial para `DssSelect` porque é o **Golden Reference canônico para componentes interativos** no DSS (conforme `DSS_GOLDEN_COMPONENTS.md`). Governa decisões de categoria: pseudo-elementos (`::before` para touch target), convenção de estados, ARIA, e padrões de acessibilidade compartilhados por todos os Action Controls interativos.

### Golden Context: DssInput

`DssInput` é o Golden Context de auditoria para `DssSelect` porque:
- Ambos são Action Controls interativos de formulário
- Compartilham as mesmas variantes visuais (outlined, filled, standout, borderless)
- Compartilham os mesmos tokens de estilo (input-height, spacing, colors)
- Compartilham o mesmo padrão de brandabilidade
- `DssSelect` segue o mesmo sistema de prioridades de estados que DssInput
- É o componente certificado mais próximo funcionalmente de um campo de entrada

### Diferença Arquitetural Principal

| Aspecto | DssInput | DssSelect |
|---------|----------|-----------|
| Implementação | HTML nativo customizado | Wrapper QSelect |
| SCSS | Classes próprias (`.dss-input__*`) | Override classes Quasar (`.q-field__*`) |
| Painel dropdown | Não existe | QMenu teleportado para body — requer `popup-content-class` |
| Camada 2 | `_base.scss` único | `_base.scss` + `_panel.scss` — campo + painel separados |
| Prop `type` | Aceita tipo variável | Não aplicável — select é dropdown por definição |

Esta diferença é uma divergência arquitetural intencional e documentada. A equipe DSS optou por aproveitar a infraestrutura do `QSelect` (gerenciamento de dropdown, virtual scroll, chips nativos, filtros) em vez de reimplementar do zero.

---

## 3. Touch Target

**Opção A — Interativo**: `min-height: var(--dss-input-height-md)` aplicado em `.dss-select .q-field__control`.

**Justificativa**: `DssSelect` é um controle de formulário interativo. O campo em si constitui a área de toque — não há necessidade de `::before` como ocorre em controles compactos (DssCheckbox, DssRadio). Esta decisão é consistente com a governança estabelecida no DssInput (auditoria Jan 2026) e confirmada para DssTextarea (auditoria Mar 2026).

- **Touch target padrão**: `var(--dss-input-height-md)` = 44px (WCAG 2.1 AA — SC 2.5.5)
- **Touch target dense**: `var(--dss-input-height-sm)` = 36px (versão compacta, uso contextual)
- **`::before`**: Não utilizado (reservado para controles compactos por convenção DSS)

---

## 4. Variantes Visuais

### `outlined` (padrão)

Borda completa ao redor. Fundo transparente. Label flutua sobre a borda com notch effect.

```vue
<DssSelect v-model="val" :options="opts" label="Selecione" variant="outlined" />
```

### `filled`

Fundo preenchido (`--dss-gray-100`), borda apenas na parte inferior. Sugere "área editável".

```vue
<DssSelect v-model="val" :options="opts" label="Plano" variant="filled" />
```

### `standout`

Fundo sutil em repouso, box-shadow pronunciado no foco. Visual de "destaque".

```vue
<DssSelect v-model="val" :options="opts" label="Categoria" variant="standout" />
```

### `borderless`

Sem borda visível, sublinhado sutil no foco. Para contextos com delimitação visual externa.

```vue
<DssSelect v-model="val" :options="opts" label="Filtro" variant="borderless" />
```

---

## 5. Modos de Seleção

### Modo simples (padrão)

O campo aceita um único valor. `modelValue` é o objeto de opção selecionado (ou o valor extraído quando `emitValue=true`).

```vue
<!-- String simples -->
<DssSelect v-model="cidade" :options="cidades" label="Cidade" />

<!-- Objeto com emitValue + mapOptions -->
<DssSelect
  v-model="idSelecionado"
  :options="[{ label: 'Item A', value: 1 }, { label: 'Item B', value: 2 }]"
  option-label="label"
  option-value="value"
  emit-value
  map-options
  label="Selecione"
/>
```

**`emitValue` + `mapOptions` — Anti-pattern crítico**: Usar `emitValue=true` sem `mapOptions=true` faz o QSelect perder o mapeamento label↔valor. O campo fica impossibilitado de exibir o label correto para o valor armazenado. **Sempre usar os dois juntos.**

### Modo múltiplo com chips nativos

O campo aceita múltiplos valores. `modelValue` é um array. `use-chips` exibe cada seleção como chip nativo do QSelect.

```vue
<DssSelect
  v-model="categorias"
  :options="opcoesCategorias"
  label="Categorias"
  multiple
  use-chips
  clearable
/>
```

### Modo múltiplo com DssChip (governança completa)

Para chips com governança DSS total (acessibilidade, tokens, brandabilidade), usar slot `selected-item` com `DssChip`.

```vue
<DssSelect
  v-model="tags"
  :options="opcoesTags"
  label="Tags"
  multiple
>
  <template #selected-item="{ opt, index }">
    <DssChip
      :label="opt.label ?? opt"
      removable
      @remove="tags.splice(index, 1)"
    />
  </template>
</DssSelect>
```

**Regra**: `use-chips` sem slot `selected-item` usa chips nativos do QSelect — sem governança DSS. Para governança completa, usar `DssChip` no slot.

---

## 6. Painel Dropdown — Decisão Arquitetural

### Problema: QMenu teleportado

O painel dropdown do QSelect (um `QMenu`) é **teleportado para o `<body>`** pelo Quasar. Isso significa que o painel é um irmão do campo no DOM — não um filho. Consequentemente, seletores como `.dss-select .q-menu` não funcionam.

### Solução: `popup-content-class`

O QSelect aceita a prop `popup-content-class` que injeta classes diretamente no elemento QMenu. O componente usa esta prop para injetar:

- `dss-select__panel` — classe base do painel DSS
- `dss-select__panel--brand-{x}` — classe de brand quando `brand` está ativo

```vue
<!-- Internamente em 1-structure/DssSelect.ts.vue -->
const panelClasses = computed(() => {
  const classes = ['dss-select__panel']
  if (props.brand) classes.push(`dss-select__panel--brand-${props.brand}`)
  return classes.join(' ')
})
```

### Implicação no SCSS

O SCSS do painel (`2-composition/_panel.scss`) usa `.dss-select__panel` como seletor raiz — não `.dss-select`. Isso é intencional e necessário dado o teleport.

```scss
// ✅ Correto — painel é teleportado
.dss-select__panel {
  background-color: var(--dss-surface-default);
  border-radius: var(--dss-radius-md);
}

// ❌ Incorreto — não funciona com teleport
.dss-select .q-menu { ... }
```

### Implicação para consumidores

Ao tentar customizar o dropdown externamente, consumidores DEVEM usar `.dss-select__panel` como seletor base. Tentar sobrescrever via `.dss-select > .q-menu` ou similar não funcionará.

---

## 7. Estados

| Estado | Implementação | Descrição |
|--------|--------------|-----------|
| **default** | `.dss-select--{variant}` | Repouso — borda/fundo conforme variante |
| **hover** | `:not(.disabled):not(.readonly):not(.focused):hover` | Borda/fundo ligeiramente intensificados |
| **focus** | `.dss-select--focused` + `.q-field--focused` | Borda/sombra com `--dss-action-primary`; seta invertida 180° |
| **active** | (via hover + foco simultâneos) | Campo aberto para seleção |
| **disabled** | `.dss-select--disabled` | opacity 0.4, pointer-events none |
| **readonly** | `.dss-select--readonly` | Cursor default, borda reduzida, dropdown não abre |
| **error** | `.dss-select--error` + `.q-field--error` | Borda/sombra com `--dss-error-600` |
| **loading** | `.dss-select--loading` | pointer-events none, spinner via QSelect |

### Estados NÃO aplicáveis

| Estado | Justificativa |
|--------|--------------|
| **indeterminate** | Não aplicável — select é seleção de lista, não tristate |
| **loading bloqueante** | loading fase 1 mostra spinner sem impedir leitura do valor selecionado |

### Rotação da seta de dropdown

O ícone de seta (`q-icon` dentro de `.q-field__append`) rotaciona 180° quando o campo está focado (dropdown aberto). Implementado em `2-composition/_base.scss` via:

```scss
.dss-select--focused .q-field__append .q-icon,
.q-field--focused .q-field__append .q-icon {
  transform: rotate(180deg);
  transition: transform var(--dss-duration-200) var(--dss-easing-standard);
}
```

---

## 8. Acessibilidade (WCAG 2.1 AA)

### Keyboard Navigation

- `Tab`: foca no select
- `Shift+Tab`: foco reverso
- `Space` / `Enter`: abre o dropdown
- `Esc`: fecha o dropdown sem seleção
- `Arrow Up` / `Arrow Down`: navega as opções
- `Enter`: confirma seleção da opção focada
- `Home` / `End`: vai para primeira/última opção

### ARIA

- `aria-label`: via prop `ariaLabel` (sobrescreve label visual para screen readers)
- `aria-required`: via prop `required` (`aria-required="true"`)
- `aria-invalid`: gerenciado internamente pelo QSelect quando `error=true`
- `aria-describedby`: gerenciado pelo QSelect para conectar campo com hint/error
- O papel semântico do input (`combobox`) e as relações com o listbox são gerenciados pelo QSelect

### Clear Button

- Botão de limpar (quando `clearable=true`) é operável por teclado

### Focus Ring

- Estilo de foco visível: `outline: var(--dss-border-width-md) solid var(--dss-focus-ring)` via `:has(:focus-visible)`
- Variantes já aplicam `box-shadow` no foco como indicador primário
- `outline` como indicador secundário de fallback

### Dark Mode (`[data-theme="dark"]`)

Implementado em `4-output/_states.scss`. Cobre:
- Campo: fundo das variantes filled/standout, borda outlined, cores de texto/label/placeholder/hint
- Painel: fundo, borda, cores dos itens e estados hover/selected/disabled

### High Contrast (`prefers-contrast: more`)

- Campo: `border-width: var(--dss-border-width-md) !important`, `border-color: currentColor !important`, outline adicional no foco
- Painel: borda de contraste nos itens selecionados e no painel em si

### Forced Colors (`forced-colors: active`)

- Campo: `border: var(--dss-border-width-md) solid ButtonText`; foco: `border-color: Highlight`; disabled: `border-color: GrayText`; texto: `color: FieldText`; fundo: `background-color: Field`
- Painel: itens ativos usam `color: HighlightText`, `background-color: Highlight`
- **Sem** `forced-color-adjust: none` (regra estabelecida em DssTextarea NC-03: usar system color keywords diretamente)

### Reduced Motion

- Todas as `transition` e `animation` são suprimidas via `transition: none !important`

---

## 9. Brandabilidade

Ativada via prop `brand` ou contexto `[data-brand="hub|water|waste"]`:

```vue
<!-- Via prop -->
<DssSelect v-model="val" :options="opts" brand="hub" label="Hub" />

<!-- Via contexto -->
<div data-brand="water">
  <DssSelect v-model="val" :options="opts" label="Water" />
</div>
```

| Marca | Token de foco (campo) | Token de label | Token de hint | Token de selecionado (painel) |
|-------|----------------------|----------------|---------------|-------------------------------|
| hub | `--dss-hub-600` | `--dss-hub-700` | `--dss-hub-700` | `--dss-hub-600` |
| water | `--dss-water-500` | `--dss-water-600` | `--dss-water-700` | `--dss-water-600` |
| waste | `--dss-waste-600` | `--dss-waste-700` | `--dss-waste-800` | `--dss-waste-600` |

**Regra**: Error state sempre usa `--dss-error-600` independente de brand.

### Brand no painel

O brand do painel é injetado via `popup-content-class` (classe `dss-select__panel--brand-{x}`), não via herança DOM. Isso é necessário porque o painel é teleportado e não pode herdar o `[data-brand]` do campo pai.

---

## 10. Anti-Patterns

1. **Usar `DssSelect` para input de texto livre** → use `DssInput` ou `DssTextarea`. DssSelect não aceita texto digitado livre como valor — apenas seleções da lista de opções.

2. **Tentar sobrescrever o dropdown via CSS externo sem usar `.dss-select__panel`** → o QMenu é teleportado para o body e é um irmão do campo no DOM. Seletores como `.dss-select .q-menu` não funcionam. A classe injetada via `popup-content-class` (`.dss-select__panel`) é a única forma correta de escopar estilos do painel.

3. **Usar `use-chips` sem `DssChip` no slot `selected-item` quando chips governados pelo DSS são necessários** → os chips nativos do QSelect não possuem governança DSS completa (tokens, acessibilidade, brandabilidade). Para governança total, usar `DssChip` via slot.

4. **Combinar `emitValue=true` sem `mapOptions=true`** → o QSelect não conseguirá exibir o label correto da opção selecionada. O campo mostrará o valor bruto (ex.: `1`) em vez do label (`"Item A"`). Sempre usar os dois juntos.

---

## 11. Paridade com DssInput (Golden Context)

| Característica | DssInput | DssSelect | Diferença justificada |
|----------------|----------|-----------|----------------------|
| Variantes | 4 | 4 | Idêntico |
| Tokens de cor | Mesmos | Mesmos | Idêntico |
| Touch Target | `--dss-input-height-md` | `--dss-input-height-md` | Idêntico |
| Brandabilidade | hub/water/waste | hub/water/waste | Idêntico |
| Dark mode | Sim | Sim (campo + painel) | DssSelect adiciona dark mode do painel |
| Prop `type` | Aceita | Não aplicável | Divergência estrutural: select é dropdown |
| HTML base | Nativo `<input>` | `QSelect` wrapper | Divergência intencional: aproveita dropdown do Quasar |
| SCSS targets | `.dss-input__*` | `.q-field__*` | Divergência necessária: QSelect gera HTML próprio |
| Camada 2 | `_base.scss` único | `_base.scss` + `_panel.scss` | DssSelect adiciona painel como elemento distinto |
| Painel dropdown | Não existe | Existe (teleportado via `popup-content-class`) | Exclusivo de select |
| Seleção múltipla | Não existe | `multiple` + `use-chips` + slot | Exclusivo de select |
| `clearable` | Não existe | Existe | Exclusivo de select (Fase 1) |
| `options` / `optionLabel` / `optionValue` | Não existe | Existe | Exclusivo de select |

---

## 12. Exceções Documentadas

### EX-01 — Ausência de touch target `::before`

**Descrição**: `DssSelect` não implementa `::before` como touch target, diferente de controles compactos como DssCheckbox e DssRadio.

**Justificativa**: O campo em si (`.q-field__control`) tem `min-height: var(--dss-input-height-md)` = 44px, atingindo o requisito de touch target por dimensão intrínseca (Opção A). O `::before` (Opção B) é necessário apenas em controles cujo elemento visual é menor que 44px.

**Conformidade**: SC 2.5.5 (Target Size) — atingido por dimensão, não por pseudo-elemento.

---

## 13. Uso Previsto em Componentes Futuros

- **DssFormField**: Wrapper de formulário que pode hospedar DssSelect com label externo e validação
- **DssCombobox** (Fase 2): Variant de DssSelect com campo de busca interno e filtro
- **DssMultiSelect** (Fase 2): Composto de DssSelect + DssChip + sistema de tags para seleções complexas
- **DssFilterBar**: Barra de filtros que usa múltiplos DssSelect em layout horizontal
