# DssHeader — API Reference

> Wrapper DSS governado sobre `QHeader` do Quasar. Container estrutural superior de página.

---

## Props

### `modelValue` (v-model)

- **Tipo:** `Boolean`
- **Padrão:** `true`
- **Descrição:** Visibilidade do header. Controla a presença da faixa sem desmontar o layout — o conteúdo sobe e desce acompanhando.

### `reveal`

- **Tipo:** `Boolean`
- **Padrão:** `false`
- **Descrição:** Esconde o header ao rolar para baixo e o traz de volta ao rolar para cima.

### `revealOffset`

- **Tipo:** `Number`
- **Padrão:** `250`
- **Descrição:** Distância de rolagem (px) antes de o `reveal` começar a agir. Evita que o header pisque em rolagens curtas.

### `elevated`

- **Tipo:** `Boolean`
- **Padrão:** `false`
- **Descrição:** Aplica sombra de elevação para destacar o header do conteúdo rolado. Usa token `--dss-elevation-2`. Recomendado para layouts onde o conteúdo rola sob o header.

```vue
<DssHeader elevated>
  <DssToolbar>...</DssToolbar>
</DssHeader>
```

---

### `bordered`

- **Tipo:** `Boolean`
- **Padrão:** `false`
- **Descrição:** Aplica borda inferior sutil (`--dss-border-width-thin solid --dss-gray-200`). Alternativa flat ao `elevated` para layouts com fundo claro onde sombra seria visualmente excessiva.

```vue
<DssHeader bordered>
  <DssToolbar>...</DssToolbar>
</DssHeader>
```

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `reveal` | `boolean` | Emitido quando o header é revelado (`true`) ou escondido (`false`) pelo comportamento de `reveal`. |
| `update:modelValue` | `boolean` | v-model da visibilidade. |

---

## Props Bloqueadas (Não Disponíveis)

| Prop QHeader | Status | Motivo |
|--------------|--------|--------|
| `color` | Bloqueada | Background governado por `--dss-surface-default` via CSS |
| `height-hint` | Bloqueada | Calculado automaticamente pelo Quasar com base no conteúdo |
| `dark` | Bloqueada | Modo escuro governado globalmente via `[data-theme="dark"]` |

---

## Props Repassadas via `$attrs`

Props QHeader aceitas pelo componente via `v-bind="$attrs"` (não declaradas como props DSS):

> `reveal` e `reveal-offset` SAÍRAM desta lista em set/2026: passaram a ser props
> declaradas do DSS (ver acima), com tipo, default e documentação próprios. Passar
> comportamento por `$attrs` funciona, mas não aparece na API — e o que não aparece
> não é escolhido.

| Prop | Tipo | Descrição |
|------|------|-----------|
| — | — | Nenhuma prop de comportamento depende mais de `$attrs`. |
| `height-hint` | `String\|Number` | **Bloqueada** — não usar |

```vue
<!-- reveal via $attrs -->
<DssHeader :reveal="true">
  <DssToolbar>...</DssToolbar>
</DssHeader>
```

---

## Slots

### `default`

- **Descrição:** Conteúdo do header. Deve conter exclusivamente componentes `DssToolbar`.
- **Tipo esperado:** `DssToolbar` (um ou mais)

```vue
<DssHeader>
  <!-- ✅ Correto -->
  <DssToolbar>
    <DssButton flat round icon="menu" aria-label="Menu" />
    <span class="text-subtitle1">Título</span>
  </DssToolbar>

  <!-- ❌ Incorreto — HTML nativo sem DssToolbar -->
  <div class="minha-toolbar">...</div>
</DssHeader>
```

---

## Events (legado desta seção)

> Esta seção afirmava "DssHeader não emite eventos próprios" e listava `click` e
> `focus` como "não aplicáveis". Desde set/2026 o componente EMITE dois eventos —
> ver a seção **Eventos** acima. `click`/`focus` nunca foram eventos declarados:
> eram entradas de documentação sem contrapartida no código, e o gate de paridade
> de API as acusava como "sobram (não tipados"). Removidas.

---

## Atributos Passados via `$attrs`

DssHeader usa `inheritAttrs: false` e repassa todos os atributos via `v-bind="$attrs"` ao `<q-header>` interno.

Atributos recomendados:

| Atributo | Exemplo | Descrição |
|----------|---------|-----------|
| `aria-label` | `aria-label="Cabeçalho principal"` | Label para screen readers |
| `id` | `id="app-header"` | ID para ancoragem |
| `role` | Não alterar | `role="banner"` aplicado nativamente |

---

## Tokens Utilizados

| Token CSS | Camada | Uso |
|-----------|--------|-----|
| `--dss-surface-default` | L2 base | Cor de fundo (sobrescreve bg-primary do QHeader) |
| `--dss-text-body` | L2 base | Cor de texto padrão |
| `--dss-elevation-2` | L3 elevated | Box-shadow da variante elevated |
| `--dss-border-width-thin` | L3 bordered | Espessura da borda inferior |
| `--dss-gray-200` | L3 bordered | Cor da borda inferior |
| `--dss-border-width-md` | L4 states | Borda reforçada em high contrast |

---

## Classes CSS Geradas

| Classe | Condição |
|--------|----------|
| `dss-header` | Sempre presente |
| `dss-header--elevated` | `elevated=true` |
| `dss-header--bordered` | `bordered=true` |
| `q-header` | Aplicada pelo QHeader (Quasar) |
| `fixed-top` | Aplicada pelo QHeader (Quasar) |

---

## Composição — Gate v2.4

### Padrão Correto

```vue
<!-- ✅ Slot com DssToolbar exclusivamente -->
<DssHeader elevated>
  <DssToolbar>
    <DssButton flat round icon="menu" aria-label="Menu" />
    <DssSpace />
    <DssButton flat round icon="account_circle" aria-label="Perfil" />
  </DssToolbar>
</DssHeader>
```

### Anti-Patterns

```vue
<!-- ❌ HTML nativo diretamente no slot -->
<DssHeader>
  <div class="minha-barra">Errado</div>
</DssHeader>

<!-- ❌ brand no DssHeader (deve ser no DssToolbar) -->
<DssHeader brand="hub">  <!-- brand não é prop de DssHeader -->
  <DssToolbar>...</DssToolbar>
</DssHeader>

<!-- ❌ Múltiplos DssHeader por página -->
<DssHeader>...</DssHeader>
<DssHeader>...</DssHeader>  <!-- viola role="banner" único -->

<!-- ❌ Sobrescrever z-index -->
<DssHeader style="z-index: 9999">...</DssHeader>
```

---

## Acessibilidade

| Aspecto | Valor | Fonte |
|---------|-------|-------|
| `role` | `banner` | Nativo QHeader |
| Landmark | Header de página | Obrigatório único por página |
| WCAG | 2.1 AA | Conformidade DSS |

---

## Paridade com Golden Reference (DssCard)

| Aspecto | DssCard | DssHeader | Divergência |
|---------|---------|-----------|-------------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Igual |
| `withDefaults(defineProps<T>())` | ✅ | ✅ | Igual |
| `v-bind="$attrs"` forwarding | ✅ | ✅ | Igual |
| Container não-interativo | Parcial (tem clickable) | ✅ Total | Intencional — DssHeader nunca é clicável |
| Variantes visuais | `elevated`, `flat`, `bordered`, `outlined` | `elevated`, `bordered` | Intencional — Header tem 2 variantes de elevação |
| Brand via prop | ✅ `brand` prop | ❌ Sem brand | Intencional — brand é do DssToolbar filho |
| Background override | `--dss-surface-default` | `--dss-surface-default` + `!important` | EXC-02 — QHeader injeta `bg-primary !important` |

---

## Paridade com Golden Context (DssToolbar)

| Aspecto | DssToolbar | DssHeader | Divergência |
|---------|------------|-----------|-------------|
| `inheritAttrs: false` + `v-bind="$attrs"` | ✅ | ✅ | Igual |
| Container não-interativo 100% | ✅ | ✅ | Igual |
| Props bloqueadas (color, dark) | ✅ `color`, `dark`, `glossy` | ✅ `color`, `height-hint` | Leve diferença — contexto QHeader vs QToolbar |
| `brand` prop | ✅ (toolbar aplica brand) | ❌ (brand é do DssToolbar) | Intencional — DssHeader delega brand ao filho |
| Background override | `background-color: transparent` | `background-color: var(--dss-surface-default) !important` | EXC-02 — QHeader aplica `bg-primary !important` |


## Separação do conteúdo — o que cada prop faz (set/2026)

| combinação | sombra | linha |
|---|---|---|
| padrão | `--dss-elevation-1` | `--dss-border-subtle` |
| `elevated` | `--dss-elevation-2` | `--dss-border-subtle` |
| `bordered` | **nenhuma** | `--dss-border-default` |
| `elevated` + `bordered` | nenhuma | `--dss-border-default` |

`bordered` é a **alternativa flat**: troca o separador, não o acrescenta.
Combinar com `elevated` é contraditório e `bordered` vence — é a última na
cascata.

**As duas props eram INERTES até set/2026.** A camada de composição declarava
`box-shadow: … !important`, então o `elevation-2` do `elevated` nunca vencia; e
o `bordered` só redeclarava a mesma borda que a base já aplicava. Medido na
página de teste, as quatro combinações saíam pixel a pixel iguais.

O `!important` foi removido porque a justificativa registrada nele era falsa: ele
alegava que o QHeader aplica `bg-primary !important`, mas a regra real é
`.q-layout__section--marginal { background-color: var(--q-primary) }` — layered e
SEM `!important`. CSS DSS unlayered já vencia sozinho.

## `reveal`, `revealOffset` e `v-model` (novas em set/2026)

Vieram do de-para com o `QHeader`, que tem 6 props enquanto o DSS expunha 2.
`reveal` esconde o header ao rolar para baixo e o traz de volta ao rolar para
cima; `revealOffset` (px) é a distância mínima antes de isso começar, evitando
piscar em rolagens curtas; o `v-model` controla a presença da faixa sem desmontar
o layout.

`height-hint` segue **não exposta**: é a altura que o QLayout assume para o header
antes de medi-lo, e no DSS a altura é consequência do DssToolbar que vai dentro —
expor a dica abriria uma segunda fonte de verdade para dimensão.
