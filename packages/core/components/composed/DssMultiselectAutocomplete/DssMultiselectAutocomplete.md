# DssMultiselectAutocomplete — Documentação (Template 13.1)

## 1. Visão Geral

**O que é:** campo de **seleção múltipla com autocomplete**. Combina três coisas num só controle: filtrar opções digitando, marcar várias com checkbox e ver/remover o que foi escolhido. É um **composto Fase 3** — não reimplementa nada: envelopa o `DssSelect` e injeta bases DSS nos slots.

**Quando usar:**
- Escolher **vários** itens de uma lista grande demais para rolar (clientes, municípios, categorias)
- Filtros de relatório e de tabela, onde o usuário acumula critérios
- Bases servidas por API, com busca no servidor (`loadOptions`) e paginação (`loadMore`)
- Campos em coluna estreita: o controle mantém **altura de uma linha** em qualquer largura

**Quando NÃO usar:**
- Seleção **única** → `DssSelect`
- Lista curta e fixa (até ~7 itens), toda visível de uma vez → `DssCheckbox` em grupo; o dropdown só atrapalha
- Quando o usuário precisa **comparar** os itens antes de escolher → uma lista sempre visível serve melhor que um painel que fecha
- Como campo de texto livre: o componente **não** cria opções novas a partir do que se digita

---

## 2. Classificação DSS

- **Tipo:** Composto de campo (seleção múltipla + autocomplete)
- **Categoria:** Composto de seleção (campo)
- **Fase:** 3
- **Motor:** QSelect (via `DssSelect`)
- **Interativo:** Sim
- **Classificação:** `Action`
- **Golden Reference:** `DssChip`
- **Golden Context:** `DssSelect`
- **previewGroup:** `form-controles`

---

## 3. Arquitetura

### Composição — aninhar, não recriar

O componente é **thin**: sua identidade vem de presets sobre o `DssSelect`, que por sua vez envelopa o `QSelect`.

| Base consumida | Papel |
|---|---|
| `DssSelect` | Raiz. Campo, menu teleportado e reinjeção de brand via `popup-content-class`. `multiple` + `use-input` chegam ao QSelect por passthrough de `$attrs`. |
| `DssItem` | Cada **opção** do dropdown |
| `DssCheckbox` | Glifo de estado no slot `leading` da opção — **decorativo** |
| `DssChip` | Token no campo (`flat`) e na seção "Selecionados" (`outline`) |

Nenhum componente Quasar cru aparece no template. O `.q-menu` que existe no DOM é criado **internamente pelo QSelect** — não é instanciado aqui nem pelo `DssSelect`, e não pode ser trocado por `DssMenu` sem abandonar o QSelect e reconstruir posicionamento, virtual scroll, teclado e ARIA.

### A opção é `DssItem`, não `q-item`

O `itemProps` do QSelect é repassado ao root do `DssItem` via `$attrs`: `role="option"` e `aria-selected` aplicam normalmente, a navegação por teclado funciona via `aria-activedescendant`, e o estado de foco chega como **atributo** `focused="true"` (num QItem seria a classe `q-manual-focusable--focused`).

Ganho: sem `.q-item`, os vazamentos do Quasar somem **na origem** — em especial a margem `.q-item .q-icon`, que empurrava o glifo do checkbox para fora do centro.

Custo: o `_panel.scss` do `DssSelect` estiliza `.q-item`, não `DssItem`. Por isso hover/selecionado/foco da opção são recriados na Layer 4 mirando **atributos** (`[aria-selected]`, `[focused]`).

### Checkbox decorativo

O `DssCheckbox` da opção é `aria-hidden` e `pointer-events: none`. A **fonte de verdade do estado é o `aria-selected` da option** — o checkbox apenas o desenha. Sem isso haveria dois controles concorrentes anunciando o mesmo estado.

### Campo de uma linha — a contagem é medida

O campo **nunca cresce em altura**: numa grade de formulário, um campo que quebra em duas linhas desloca todo o layout à volta.

Quantos chips cabem **não é configurável por prop** — é medido em runtime com `ResizeObserver`. Um número fixo erra nas duas pontas: desperdiça espaço num campo largo e, num estreito, expulsa o input de busca (sem ele o autocomplete deixa de funcionar).

A medição roda em **duas passadas**:
1. reexibe todos os chips para ler as larguras naturais — um chip escondido tem largura `0`, e medir com ele já escondido perpetuaria a decisão anterior (o campo nunca voltaria a crescer ao alargar);
2. acumula as larguras dentro do orçamento (`largura da linha − reserva do input − reserva do contador`) e corta.

Sem layout medível (jsdom, antes da primeira pintura) **todos** permanecem visíveis: concluir "nada cabe" a partir de zeros esconderia a seleção inteira por falta de informação.

Comportamento resultante, medido:

| largura do campo | mostra | contador |
|---|---|---|
| 260px | — | `5` (total) |
| 360px | 1 chip | `+4` |
| 480px | 2 chips | `+3` |
| cheia | todos | — |

Quando **nenhum** chip cabe, o contador exibe o **total** e não `+N` — "mais 5" é incoerente sem nada visível. O `aria-label` acompanha: `"5 selecionados"` vs `"mais 4 de 5 selecionados"`.

### Dois tratamentos de chip, dois papéis

| lugar | variante | por quê |
|---|---|---|
| campo | `flat` | resume a seleção; sem fundo nem borda, não compete com a lista |
| seção "Selecionados" | `outline` | gere a seleção; a borda delimita o token e evita duplicar visualmente o campo |

---

## 4. API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `any[]` | `[]` | Valores selecionados. Sempre array. Use com `v-model`. |
| `options` | `any[]` | `[]` | Lista de opções (objetos ou primitivos). |
| `optionValue` | `string \| ((o: any) => any)` | `'value'` | Campo/função que extrai o **valor** da opção. |
| `optionLabel` | `string \| ((o: any) => string)` | `'label'` | Campo/função que extrai o **rótulo** exibido. |
| `emitValue` | `boolean` | `false` | Emite apenas o valor em vez do objeto inteiro. |
| `mapOptions` | `boolean` | `false` | Mapeia valores emitidos de volta para objetos (requer `emitValue`). |
| `inputDebounce` | `number \| string` | `300` | Debounce (ms) do filtro. |
| `loadOptions` | `(query: string) => any[] \| Promise<any[]>` | `undefined` | Busca **assíncrona** (server-side). Quando fornecida, **substitui** o filtro local. |
| `loadMore` | `(query: string, loaded: number) => any[] \| Promise<any[]>` | `undefined` | Carregamento **incremental** (infinite scroll). Retornar `[]` sinaliza fim. |
| `label` | `string` | `''` | Rótulo do campo. |
| `placeholder` | `string` | `''` | Placeholder do input de busca. |
| `loading` | `boolean` | `false` | Indicador de carregamento (soma-se ao interno de `loadOptions`). |
| `disable` | `boolean` | `false` | Desabilita o campo. |
| `readonly` | `boolean` | `false` | Somente leitura. |
| `clearable` | `boolean` | `false` | Botão de limpar toda a seleção. |
| `chipsRemovable` | `boolean` | `true` | Chips removíveis (botão × + evento `remove`). |
| `showSelectedSummary` | `boolean` | `false` | Seção "Selecionados" fixa no topo do painel. **Opt-in.** |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Brand override, propagado ao `DssSelect`. |
| `ariaLabel` | `string` | `undefined` | Label ARIA do campo. |

Props não declaradas (`hint`, `rules`, `dense`, `error`…) chegam ao `DssSelect`/`QSelect` via `$attrs`.

**Não há prop para limitar chips no campo.** É deliberado: ver §3 — a contagem é medida.

### Slots

| Slot | Escopo | Padrão DSS |
|------|--------|-----------|
| `option` | `{ opt, selected, toggleOption, index }` | `DssItem` + `DssCheckbox` decorativo + rótulo |
| `selected-item` | `{ opt, index, removeAtIndex }` | `DssChip` `flat` removível + contador `+N` |

O slot do consumidor **tem precedência** sobre o padrão. Demais slots (`label`, `prepend`, `append`, `no-option`, `hint`, `error`…) são repassados ao `DssSelect`.

> Ao sobrescrever `selected-item`, o campo perde o colapso de uma linha — a medição depende dos chips internos. Se fizer isso, garanta você mesmo que o campo não cresça.

### Events

| Evento | Payload | Quando |
|--------|---------|--------|
| `update:modelValue` | `any[]` | A seleção muda (marcar, desmarcar, remover chip, limpar) |
| `remove` | `any` | Um chip é removido — no campo **ou** na seção "Selecionados" |
| `focus` | `FocusEvent` | Campo recebe foco |
| `blur` | `FocusEvent` | Campo perde foco |
| `clear` | — | Seleção inteira limpa via `clearable` |
| `popup-show` | — | Dropdown abriu |
| `popup-hide` | — | Dropdown fechou |

### Métodos expostos

| Método | Assinatura | Descrição |
|--------|-----------|-----------|
| `focus` | `() => void` | Foca o campo |
| `blur` | `() => void` | Remove o foco |
| `showPopup` | `() => void` | Abre o dropdown |
| `hidePopup` | `() => void` | Fecha o dropdown |
| `selectRef` | `Ref<any>` | Referência ao `DssSelect` interno |

---

## 5. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| hover (opção) | ✅ | `--dss-action-primary-surface` (primary 8%) — **mais claro** que o selecionado, para nunca se confundir com ele |
| selecionado (opção) | ✅ | `--dss-surface-selected` (primary 12%). A marca de seleção é o **checkbox**; o fundo apenas reforça |
| selecionado + hover | ⚠️ | Mantém a cor de selecionado. **Não há token** de "selecionado + hover" no catálogo; inventar valor violaria Token First. Lacuna registrada |
| focus (opção, teclado) | ✅ | Anel via `[focused='true']` → `--dss-focus-primary`, `outline-offset` negativo (anel inset, não cortado pelo overflow do painel) |
| focus (campo) | ✅ | Herdado do `DssSelect` |
| disabled | ✅ | `disable` propagado ao `DssSelect`; chips deixam de ser removíveis |
| readonly | ✅ | `readonly` propagado; chips deixam de ser removíveis |
| loading | ✅ | `loading` externo **ou** fetch de `loadOptions` em andamento |
| carregando mais | ✅ | Rodapé "Carregando mais…" durante `loadMore` |
| error | ➖ | Delegado ao `DssSelect` via `$attrs` (`error`, `error-message`, `rules`) |

---

## 6. Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-action-primary-surface` | Fundo do hover da opção |
| `--dss-surface-selected` | Fundo da opção selecionada |
| `--dss-surface-default` | Fundo da seção "Selecionados" |
| `--dss-text-body` | Cor do rótulo da opção (neutro — a seleção é indicada pelo checkbox) |
| `--dss-text-secondary` | Rótulo "Selecionados (N)" e "Carregando mais…" |
| `--dss-focus-primary` | Anel de foco por teclado na opção |
| `--dss-border-width-md` | Espessura do anel de foco |
| `--dss-border-width-thin` | Borda inferior da seção "Selecionados" |
| `--dss-gray-200` | Cor dessa borda |
| `--dss-font-size-xs` | Rótulo da seção e do rodapé de carregamento |
| `--dss-font-weight-medium` | Peso do rótulo da seção |
| `--dss-spacing-1` | Gap entre tokens da seção |
| `--dss-spacing-2` · `--dss-spacing-3` | Paddings da seção e do rodapé |
| `--dss-touch-target-md` | Base do cálculo da folga vertical dos tokens (44px) |
| `--dss-compact-control-height-sm` | Base do mesmo cálculo (24px) |

---

## 7. Acessibilidade

- **WCAG 2.1 AA**
- **ARIA:** `role="combobox"` + `aria-multiselectable`; cada opção com `role="option"` e `aria-selected`. O checkbox da opção é `aria-hidden` — **não** duplica o anúncio de estado
- **Teclado:** setas navegam (via `aria-activedescendant`), Enter/Espaço alternam, Escape fecha, Backspace remove o último token com a busca vazia
- **Foco:** no listbox o Tab **não entra nas opções** — o foco fica no campo e as setas navegam. Para medir/testar, use `showPopup()` + `ArrowDown`
- **Contador:** o rótulo visual é abreviado (`+3` / `5`), mas o `aria-label` é sempre por extenso (`"mais 3 de 5 selecionados"` / `"5 selecionados"`)
- **Touch target:** os tokens da seção recebem folga vertical derivada de `(--dss-touch-target-md − --dss-compact-control-height-sm) / 2`, para o alvo de 44px caber sem gerar scroll fantasma
- **Seção fixa:** `position: sticky` mantém "Selecionados" visível enquanto a lista rola — a seleção nunca sai de vista

---

## 8. Exceções Registradas

| ID | Tipo | Local | Justificativa |
|----|------|-------|---------------|
| EXC-Panel-01 | Estilização de classe Quasar | `4-output/_states.scss` | Os estados da opção são recriados mirando **atributos** (`[aria-selected]`, `[focused]`) sob `.dss-select__panel`, porque o painel do `DssSelect` estiliza `.q-item` e a opção aqui é `DssItem` |
| EXC-Overlay-01 | Neutralização de estilo da base | `4-output/_states.scss` | `&:hover::after { opacity: 0 }` desliga o overlay de hover do `DssItem` clicável (que pinta `currentColor` a 10% — véu **escuro**, pois o rótulo é neutro). O realce deste painel é azul |
| EXC-Layout-01 | Medição em runtime | `1-structure/*.ts.vue` | `ResizeObserver` decide quantos chips cabem. Não há alternativa declarativa: depende da largura real e do tamanho dos rótulos |
| EXC-Media-01 | Valor em px fora de token | `2-composition/_base.scss` | Reservas de layout da medição (`INPUT_RESERVE_PX`, `COUNTER_RESERVE_PX`) e o `min-width` do input em `em`. São limiares de layout, não dimensões de componente |

---

## 9. Composição e Padrões de Uso

### Básico

```vue
<DssMultiselectAutocomplete
  v-model="frutas"
  :options="['Maçã', 'Banana', 'Cereja']"
  label="Frutas"
  placeholder="Digite para filtrar…"
/>
```

### Objetos + emitValue

```vue
<DssMultiselectAutocomplete
  v-model="cidadeIds"
  :options="cidades"
  option-value="id"
  option-label="nome"
  emit-value
  map-options
  clearable
  label="Cidades"
/>
```

### Coluna estreita (o caso que motiva o componente)

```vue
<!-- Em ~260px o campo mostra só o contador e mantém a altura de uma linha;
     a seção do painel é onde a seleção é vista e gerida. -->
<div style="width: 260px">
  <DssMultiselectAutocomplete
    v-model="selecionados"
    :options="opcoes"
    label="Categorias"
    show-selected-summary
  />
</div>
```

### Busca no servidor + paginação

```vue
<DssMultiselectAutocomplete
  v-model="clientes"
  :load-options="(q) => api.get('/clientes', { params: { q } })"
  :load-more="(q, loaded) => api.get('/clientes', { params: { q, offset: loaded } })"
  option-value="id"
  option-label="nome"
  emit-value
  label="Clientes"
/>
```

### Anti-patterns

```vue
<!-- ❌ ERRADO: envolver num container que force o campo a crescer -->
<div style="height: auto; min-height: 120px">
  <DssMultiselectAutocomplete v-model="v" :options="o" />
</div>
<!-- ✅ CORRETO: o campo já garante uma linha; deixe o container seguir o campo -->
<DssMultiselectAutocomplete v-model="v" :options="o" />

<!-- ❌ ERRADO: usar para seleção única -->
<DssMultiselectAutocomplete v-model="[um]" :options="o" />
<!-- ✅ CORRETO -->
<DssSelect v-model="um" :options="o" />

<!-- ❌ ERRADO: esperar que o filtro local funcione junto com loadOptions -->
<!-- loadOptions SUBSTITUI o filtro local; o servidor é a fonte -->
```

---

## 10. Paridade com Golden Context (DssSelect)

| Aspecto | DssSelect | DssMultiselectAutocomplete | Divergência |
|---------|-----------|----------------------------|-------------|
| Motor | QSelect | QSelect (via DssSelect) | ✅ mesma base |
| `inheritAttrs: false` + `$attrs` | ✅ | ✅ | ✅ |
| Brand no menu teleportado | `popup-content-class` | herdado | ✅ |
| Chips do campo | `.q-chip` nativo (cinza) | `DssChip` `flat` | ⚠️ o composto **consome a base**; o `useChips` do DssSelect ainda não. Reconciliação prevista na adequação do DssChip |
| Opção do dropdown | `.q-item` do QSelect | `DssItem` | ✅ divergência deliberada — elimina vazamentos na origem |
| Altura do campo | cresce com os chips | **fixa em uma linha** | ✅ divergência deliberada — requisito de grade |
| Scroll do painel | `overflow: hidden auto` | idem (herdado) | ✅ |

---

## 11. Changelog

| Versão | Data | Descrição |
|--------|------|-----------|
| 0.4.0 | 2026-08 | Campo de uma linha com contagem medida (`ResizeObserver`); chips `flat` no campo e `outline` na seção; seção "Selecionados" fixa (`sticky`); hover da opção em azul mais claro que o selecionado |
| 0.3.1 | 2026-07 | Incremento 3b — lazy/infinite loading (`loadMore`) |
| 0.3.0 | 2026-07 | Incremento 3 — busca assíncrona (`loadOptions`) |
| 0.2.0 | 2026-07 | Incremento 2 — seção "Selecionados" no topo do painel |
| 0.1.0 | 2026-07 | Incremento 1 — multiseleção + autocomplete + checkbox por opção + chips removíveis |

> **Status:** `draft`. Pendente para o selo: cobertura de teste dos Incrementos 2/3/3b e da medição adaptativa (esta exige mockar `getBoundingClientRect` — jsdom não tem layout).
