# DssToggle — Quick Reference

**Componente de alternancia (toggle/switch) do Design System Sansys**

---

## Instalacao

```js
import { DssToggle } from '@dss/components/base/DssToggle'
```

---

## Uso Basico

```vue
<DssToggle v-model="enabled" label="Ativar notificacoes" />
```

---

## Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `modelValue` | `any` | `false` | Valor reativo (v-model): boolean, array, ou valor customizado |
| `trueValue` | `any` | `true` | Valor quando ativo |
| `falseValue` | `any` | `false` | Valor quando inativo |
| `val` | `any` | — | Valor para array mode |
| `label` | `string` | `''` | Texto do label |
| `leftLabel` | `boolean` | `false` | Label a esquerda |
| `color` | `ToggleColor` | `'primary'` | Cor quando ativo (uniao literal — cor arbitraria e rejeitada por tipo) |
| `size` | `ToggleSize` | `'md'` | Tamanho (`xs\|sm\|md\|lg\|xl`) |
| `keepColor` | `boolean` | `false` | Colore a BORDA do track tambem no estado desligado (fundo segue muted) |
| `checkedIcon` | `string` | — | Glifo dentro do thumb quando ligado. Omitido = thumb liso |
| `disable` | `boolean` | `false` | Desabilita |
| `dense` | `boolean` | `false` | Modo denso. Reduz gap, altura e font-size. Remove touch target. |
| `rules` | `ToggleRule[]` | `undefined` | Regras de validação. Declarar `rules` REGISTRA o campo no `DssForm` ancestral |
| `lazyRules` | `boolean \| 'ondemand'` | `false` | Quando as regras rodam sozinhas |
| `error` | `boolean` | `false` | Estado de erro imposto de fora — soma-se ao erro das `rules` |
| `errorMessage` | `string` | `''` | Mensagem de erro |
| `brand` | `'hub'\|'water'\|'waste'\|null` | `null` | Marca |
| `tabindex` | `number\|string\|null` | `null` | Tabindex |
| `ariaLabel` | `string` | — | ARIA label |

---

## Eventos

| Evento | Payload | Descricao |
|--------|---------|-----------|
| `update:modelValue` | `any` | Emitido ao mudar valor (boolean, array ou valor customizado) |

---

## Slots

| Slot | Descricao |
|------|-----------|
| `default` | Conteudo customizado do label |

---

## Exemplos

### 1. Toggle basico
```vue
<DssToggle v-model="notifications" label="Notificacoes" />
```

### 2. Com cores
```vue
<DssToggle v-model="darkMode" color="primary" label="Modo Escuro" />
<DssToggle v-model="sound" color="positive" label="Som Ativado" />
```

### 3. Com brand
```vue
<DssToggle v-model="feature" brand="hub" color="primary" label="Feature Hub" />
<DssToggle v-model="feature" brand="water" color="secondary" label="Feature Water" />
```

### 4. Tamanhos
```vue
<DssToggle v-model="val" size="xs" label="XS" />
<DssToggle v-model="val" size="sm" label="SM" />
<DssToggle v-model="val" size="md" label="MD" />
<DssToggle v-model="val" size="lg" label="LG" />
```

### 5. Estados
```vue
<DssToggle v-model="val" disable label="Desabilitado" />
<DssToggle v-model="val" dense label="Denso" />
<DssToggle v-model="val" error error-message="Campo obrigatorio" label="Com erro" />
```

### 6. Label a esquerda
```vue
<DssToggle v-model="val" left-label label="Label a esquerda" />
```

### 7. Array mode (grupo)
```vue
<DssToggle v-model="features" val="wifi" label="Wi-Fi" />
<DssToggle v-model="features" val="bluetooth" label="Bluetooth" />
<DssToggle v-model="features" val="nfc" label="NFC" />
```

---

## Estados

| Estado | Descricao |
|--------|-----------|
| default | Track vazio com borda |
| hover | Track com `brightness(0.95)` |
| active | Track com `brightness(0.90)` |
| focus | Outline `--dss-focus-ring` |
| checked | Track colorido, thumb a direita |
| disabled | `opacity: var(--dss-opacity-disabled)` |
| error | Cor `--dss-error-600` |
| dense | Reducao visual (gap, altura, font-size) + remove touch target |

---

## Tokens Principais

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-compact-control-height-md` | 28px | Altura visual padrao |
| `--dss-touch-target-md` | 44px | Touch target WCAG |
| `--dss-opacity-disabled` | 0.4 | Opacidade disabled |
| `--dss-focus-ring` | — | Cor do focus ring |
| `--dss-duration-200` | 200ms | Transicoes |
| `--dss-easing-standard` | cubic-bezier(0.4,0,0.2,1) | Curva de easing |

---

## Anti-patterns

1. **Nao usar para formularios com submit** — Toggle tem efeito imediato. Use DssCheckbox para formularios.
2. **Nao criar tokens especificos** — Use tokens genericos (`--dss-spacing-*`, `--dss-compact-control-height-*`).
3. **Nao usar `::before` para efeitos visuais** — `::before` e reservado para touch target (WCAG 2.5.5).

---

## Acessibilidade

- `role="switch"` no input nativo
- `aria-checked` reflete estado atual
- `aria-describedby` associa mensagem de erro
- Touch target >= 44px via `::before`
- Focus ring tokenizado via `--dss-focus-ring`
- `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, `print` suportados

---

## Arquitetura

```
DssToggle/
├── 1-structure/DssToggle.ts.vue    # Vue component
├── 2-composition/_base.scss        # Base styles
├── 3-variants/index.scss           # Empty (Phase 1)
├── 4-output/_brands.scss           # Hub, Water, Waste
├── 4-output/_states.scss           # Dark, contrast, motion
├── composables/useToggleClasses.ts # CSS classes
├── types/toggle.types.ts           # TypeScript interfaces
└── DssToggle.module.scss           # Orchestrator
```

---

## Referencias

- [DssToggle.md](./DssToggle.md) — Documentacao completa
- [DSS_TOGGLE_API.md](./DSS_TOGGLE_API.md) — API Reference
- [DssToggle.example.vue](./DssToggle.example.vue) — Showcase visual
- [Quasar QToggle](https://quasar.dev/vue-components/toggle) — Framework de referencia

## Validação dentro de um `DssForm`

Declarar `rules` **registra** este campo no `DssForm` ancestral: a partir daí ele entra no
`validate()` e no `submit()` do formulário. Sem `rules`, o campo continua fora — é o
comportamento do QField e vale igual aqui.

```vue
<DssForm ref="form" @submit.prevent="enviar">
  <DssToggle v-model="ativo" label="Ativar" :rules="[v => v === true || 'Precisa estar ativo']" />
  <DssButton type="submit" label="Enviar" color="primary" />
</DssForm>
```

Cada regra recebe o valor e devolve `true`/`undefined` (aprovado), `false` (reprovado sem
mensagem), uma `string` (reprovado, e a string é a mensagem) ou uma `Promise` dessas. A
primeira regra síncrona que reprova interrompe as demais — paridade com o QField.

**`lazyRules`** decide quando a regra roda sozinha: `false` (padrão) a cada mudança do valor
depois da primeira interação, `true` só ao perder o foco, `'ondemand'` apenas via
`validate()`.

**Campo desabilitado não valida** e responde aprovado — um obrigatório inerte na tela não
pode travar o envio.

O componente expõe `validate()` e `resetValidation()` para quem guarda um `ref` do campo.

> Histórico: até set/2026 este campo não se registrava no formulário, e o `DssForm.validate()`
> respondia `true` mesmo com regra que sempre reprova. O registro vem do composable global
> `useFieldValidation`, sobre o `useFormChild` do Quasar.
