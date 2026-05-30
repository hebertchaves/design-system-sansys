# DssOptionGroup — API Reference

**Design System Sansys v2.2 — Componente Fase 2**

---

## Props

### `modelValue` (v-model)

| Campo | Valor |
|-------|-------|
| Tipo | `any \| any[]` |
| Obrigatório | Sim (para controle de estado) |

Valor selecionado.
- **type="radio"**: qualquer valor escalar correspondente ao `value` de uma opção
- **type="checkbox"/"toggle"**: array de valores das opções marcadas

`null` / `undefined` representa nenhuma seleção.

---

### `options`

| Campo | Valor |
|-------|-------|
| Tipo | `OptionGroupItem[]` |
| Obrigatório | **Sim** |

Array de objetos que define os controles do grupo.

**Estrutura de `OptionGroupItem`:**

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `label` | `string` | Texto do controle (**obrigatório**) |
| `value` | `any` | Valor único da opção (**obrigatório**, apenas primitivos) |
| `disable` | `boolean?` | Desabilita apenas este item |
| `color` | `string?` | Cor específica deste controle |
| `keepColor` | `boolean?` | Mantém cor quando inativo |

---

### `type`

| Campo | Valor |
|-------|-------|
| Tipo | `'radio' \| 'checkbox' \| 'toggle'` |
| Default | `'radio'` |

Determina o componente DSS renderizado para cada opção.

| Valor | Componente renderizado | modelValue esperado |
|-------|----------------------|---------------------|
| `radio` | DssRadio | Escalar |
| `checkbox` | DssCheckbox | Array |
| `toggle` | DssToggle | Array |

---

### `color`

| Campo | Valor |
|-------|-------|
| Tipo | `string` |
| Default | `undefined` |

Cor padrão repassada a todos os controles do grupo. Sistema de cores Quasar/DSS (ex: `'primary'`, `'secondary'`). Pode ser sobrescrita por `option.color`.

---

### `keepColor`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Mantém a cor do controle quando não está ativo/marcado. Repassado a todos os filhos.

---

### `inline`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Layout horizontal — controles exibidos side-by-side com `gap: var(--dss-spacing-4)`.

---

### `disable`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Desabilita todo o grupo. Repassado a todos os filhos. `aria-disabled="true"` no container.

---

### `readonly`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Somente leitura. `pointer-events: none` no container. Foco visual dos filhos permanece acessível.

---

### `dense`

| Campo | Valor |
|-------|-------|
| Tipo | `boolean` |
| Default | `false` |

Modo compacto. Reduz o gap entre controles e repassa `dense` a cada filho.

| Modo | Gap padrão | Gap dense |
|------|-----------|-----------|
| Vertical | `--dss-spacing-2` | `--dss-spacing-1` |
| Horizontal (inline) | `--dss-spacing-4` | `--dss-spacing-2` |

---

### `ariaLabel`

| Campo | Valor |
|-------|-------|
| Tipo | `string` |
| Default | `undefined` |

Label acessível para o container do grupo (`aria-label`). **Altamente recomendado** — o grupo não possui label visual próprio.

---

### `ariaLabelledby`

| Campo | Valor |
|-------|-------|
| Tipo | `string` |
| Default | `undefined` |

ID de elemento externo que serve como label do grupo (`aria-labelledby`).

```html
<label id="plano-label">Selecione o plano</label>
<DssOptionGroup aria-labelledby="plano-label" :options="..." />
```

---

## Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global |
| `size` | Tamanhos controlados pelos tokens dos componentes da Fase 1 |
| `leftLabel` | Alinhamento de label deve seguir o padrão DSS |

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `any \| any[]` | Emitido quando a seleção muda |

---

## Slots

Nenhum slot disponível nesta versão. Conteúdo dos controles é definido via `options`.

---

## Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-spacing-1` | L3 | Gap vertical dense |
| `--dss-spacing-2` | L2/L3 | Gap vertical padrão / gap horizontal dense |
| `--dss-spacing-4` | L2 | Gap horizontal (inline) |

---

## Exemplos de Uso

### Radio Group Básico

```vue
<DssOptionGroup
  v-model="plano"
  :options="[
    { label: 'Básico', value: 'basico' },
    { label: 'Profissional', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
  ]"
  aria-label="Selecione o plano"
/>
```

### Checkbox Múltiplo

```vue
<DssOptionGroup
  v-model="funcionalidades"
  :options="opcoes"
  type="checkbox"
  color="primary"
  aria-label="Funcionalidades ativas"
/>
<!-- funcionalidades é um array: ['feat1', 'feat2'] -->
```

### Toggle Inline com Dense

```vue
<DssOptionGroup
  v-model="diasAtivos"
  :options="opcoesDias"
  type="toggle"
  inline
  dense
  aria-label="Dias de notificação"
/>
```

### Com Opção Individual Desabilitada

```vue
<DssOptionGroup
  v-model="valor"
  :options="[
    { label: 'Disponível', value: 'a' },
    { label: 'Indisponível', value: 'b', disable: true },
    { label: 'Disponível', value: 'c' },
  ]"
/>
```

---

*DSS v2.2 — DssOptionGroup API Reference*
