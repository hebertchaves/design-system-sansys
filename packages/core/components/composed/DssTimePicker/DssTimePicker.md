# DssTimePicker

Widget visual de seleção de tempo (clock face) do Design System Sansys.
Wrapper governado sobre `QTime` do Quasar com tokens DSS, brandabilidade e acessibilidade WCAG 2.1 AA.

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **Componente** | DssTimePicker |
| **Fase** | 2 — Nível 3 (Composed) |
| **Motor Quasar** | QTime (EXC-Gate-01) |
| **Classe CSS** | `dss-time-picker` |
| **Golden Reference** | DssChip |
| **Golden Context** | DssKnob |
| **Família** | Seletores e Pickers |
| **DSS Version** | 2.2 |

---

## 2. Propósito e Escopo

**O que é:** Widget de clock face para seleção visual de horários (hora, minuto, segundo). Renderiza diretamente o relógio analógico do Quasar com tokens DSS e brandabilidade.

**Quando usar:**
- Seleção de horário em formulários (agendamentos, relatórios, turnos)
- Quando o usuário precisa de interface visual de relógio para precisão na seleção
- Em modais/dialogs combinado com DssButton para confirmação

**Quando NÃO usar:**
- Quando um campo de texto simples é suficiente — use DssInput com máscara
- Como substituto de DssInput para entrada manual de horário
- Para selecionar intervalos de tempo — componente não suporta range picker nesta versão

---

## 3. Golden Reference e Golden Context

### Golden Reference: DssChip
DssChip é o Golden Reference interativo global do DSS. DssTimePicker segue os padrões de `defineOptions`, `inheritAttrs: false`, `v-bind="$attrs"` e composable de classes estabelecidos pelo DssChip.

### Golden Context: DssKnob
DssKnob é o Golden Context mais próximo:
- Ambos usam QMotor como root direto (EXC-Gate-01)
- Ambos passam `color="primary"` fixo internamente + `--q-color-primary` CSS override (EXC-Gate-02)
- Ambos são widgets visuais interativos não-field
- Ambos usam `v-bind="$attrs"` antes dos attrs explícitos para garantir precedência
- Ambos usam CSS global (não scoped) com descendant selectors

---

## 4. Arquitetura

### 4.1 Motor Quasar

**EXC-Gate-01**: QTime como root element — sem wrapper div.

QTime gerencia internamente:
- Clock face visual com ponteiro animado
- Navegação por teclado (ArrowUp/Down para ajustar valor)
- ARIA (`role="group"`, ARIA labels nos controles)
- Gestão de views (Hours → Minutes → Seconds)
- Transições de ponteiro e animações

A classe `dss-time-picker` é aplicada via `:class` no QTime (compound: `.q-time.dss-time-picker`).

### 4.2 Controle de Cor (EXC-Gate-02)

QTime usa `--q-color-primary` para colorir os controles ativos. DSS injeta `color="primary"` fixo e sobrescreve via CSS:

```scss
.q-time.dss-time-picker {
  --q-color-primary: var(--dss-action-primary);
}
```

Padrão idêntico ao DssPagination, DssAjaxBar e DssCarousel.

### 4.3 Ordem dos bindings no template

```vue
<QTime
  v-bind="$attrs"       ← primeiro: consumer attrs
  :class="timePickerClasses"
  :model-value="props.modelValue"
  ...props explícitos...
  color="primary"       ← último: sempre prevalece
>
```

A ordem garante que `color="primary"` e demais props fixas sempre prevaleçam sobre `$attrs` do consumer.

---

## 5. Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `String` | `undefined` | Valor do tempo selecionado (formato depende de `mask`) |
| `landscape` | `Boolean` | `false` | Layout horizontal (relógio ao lado do header) |
| `mask` | `String` | `'HH:mm'` | Máscara de formato do valor |
| `locale` | `Object` | `undefined` | Objeto de locale para i18n |
| `format24h` | `Boolean` | `true` | Formato 24h vs AM/PM |
| `defaultView` | `'Hours' \| 'Minutes' \| 'Seconds'` | `'Hours'` | View inicial ao renderizar |
| `options` | `Function` | `undefined` | Restringe horas/minutos selecionáveis |
| `hourOptions` | `Number[]` | `undefined` | Lista de horas permitidas |
| `minuteOptions` | `Number[]` | `undefined` | Lista de minutos permitidos |
| `secondOptions` | `Number[]` | `undefined` | Lista de segundos permitidos |
| `withSeconds` | `Boolean` | `false` | Exibe seletor de segundos |
| `nowBtn` | `Boolean` | `false` | Exibe botão "Agora" |
| `minimal` | `Boolean` | `false` | Sem header, apenas clock face |
| `readonly` | `Boolean` | `false` | Interativo visualmente, não editável |
| `disable` | `Boolean` | `false` | Desabilitado completo |
| `name` | `String` | `undefined` | Nome para formulários nativos |
| `tabindex` | `String \| Number` | `undefined` | Ordem de foco por teclado |

### Props bloqueadas

| Prop | Motivo |
|------|--------|
| `color` | DSS usa `color="primary"` fixo + `--q-color-primary` override (EXC-Gate-02) |
| `textColor` | Governado via descendant selectors com tokens DSS |
| `dark` | Modo escuro governado globalmente via `[data-theme='dark']` |
| `square` | Border-radius governado via `--dss-radius-md` |
| `flat` | Elevação não aplicada ao DssTimePicker |
| `bordered` | Borda não aplicada ao DssTimePicker |

---

## 6. Emits

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `string` | Emitido quando o usuário seleciona hora/minuto/segundo |

---

## 7. Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo adicional renderizado dentro do QTime (uso avançado) |

---

## 8. Atributos ($attrs)

DssTimePicker usa `inheritAttrs: false` + `v-bind="$attrs"` ao QTime. Todos os atributos extras são repassados ao motor QTime.

Exemplos:
```html
<DssTimePicker aria-label="Horário de início" />
<DssTimePicker data-testid="picker-start" />
```

---

## 9. Estados

### Estados aplicáveis

| Estado | Localização | Implementação |
|--------|-------------|---------------|
| `hover` | Números do clock face | `.q-time__clock-position:hover { background-color: var(--dss-surface-hover) }` |
| `focus` | Root | `:focus-visible { outline: var(--dss-border-width-md) solid var(--dss-focus-ring) }` |
| `disabled` | Root | `[aria-disabled='true'] { opacity: var(--dss-opacity-disabled) }` |
| `readonly` | Root | `.q-time--readonly { cursor: default }` |

### Estados não aplicáveis

| Estado | Motivo |
|--------|--------|
| `active` | QTime gerencia internamente via EXC-Gate-02b (número selecionado) |
| `loading` | QTime é síncrono — sem estado de carregamento |
| `error` | Widget visual; validação é responsabilidade do consumidor (ex: DssField wrapping) |

---

## 10. Tokens DSS Utilizados

| Token | Uso |
|-------|-----|
| `--dss-action-primary` | Via `--q-color-primary` (ponteiro, header, número ativo) |
| `--dss-surface-default` | Background do clock face |
| `--dss-surface-hover` | Hover nos números |
| `--dss-radius-md` | Border-radius do container |
| `--dss-text-body` | Texto dos números no clock |
| `--dss-text-secondary` | Texto do header AM/PM |
| `--dss-border-width-thin` | Print border |
| `--dss-border-width-md` | Focus outline width |
| `--dss-opacity-disabled` | Opacidade disabled (0.4) |
| `--dss-focus-ring` | Cor do outline de foco |
| `--dss-duration-hover` | Duração das transições |
| `--dss-easing-hover` | Easing das transições |
| `--dss-duration-0` | prefers-reduced-motion |
| `--dss-hub-600` | Brand Hub |
| `--dss-water-500` | Brand Water |
| `--dss-waste-600` | Brand Waste |

---

## 11. Brandabilidade

DssTimePicker reage ao atributo `[data-brand]` aplicado no ancestral:

```html
<div data-brand="hub">
  <DssTimePicker v-model="time" />
</div>
```

Brands suportados: `hub` | `water` | `waste`

Implementação via `--q-color-primary` override nos seletores `[data-brand='x'] .q-time.dss-time-picker`.

---

## 12. Acessibilidade

| Critério | Implementação |
|----------|---------------|
| **ARIA** | QTime implementa `role="group"`, ARIA labels nos controles de hora/minuto |
| **Teclado** | ArrowUp/Down ajustam o valor; Tab navega entre views |
| **Touch target** | QTime gerencia dimensões dos números internamente |
| **Focus** | `:focus-visible` outline visível via tokens DSS |
| **Reduced motion** | `transition-duration: var(--dss-duration-0) !important` em `prefers-reduced-motion: reduce` |
| **Forced colors** | SystemColor keywords (Highlight, HighlightText, ButtonText) |
| **Contraste** | `prefers-contrast: more` adiciona outlines extras |
| **Dark mode** | Tokens DSS ajustam automaticamente via `[data-theme='dark']` |

---

## 13. Composição Recomendada

```html
<!-- ✅ Como picker em dialog com confirmação -->
<DssDialog v-model="dialogOpen">
  <DssTimePicker v-model="selectedTime" />
  <div class="row justify-end q-gutter-sm q-mt-md">
    <DssButton flat label="Cancelar" @click="dialogOpen = false" />
    <DssButton label="Confirmar" @click="confirmTime" />
  </div>
</DssDialog>

<!-- ✅ Como picker em popup proxy com trigger em input -->
<DssInput v-model="timeInput" readonly>
  <template #append>
    <DssIcon name="access_time">
      <DssPopupProxy>
        <DssTimePicker v-model="timeInput" @update:model-value="closePopup" />
      </DssPopupProxy>
    </DssIcon>
  </template>
</DssInput>
```

---

## 14. Anti-Patterns

| Anti-pattern | Correto |
|-------------|---------|
| `<DssTimePicker color="blue" />` | `color` é bloqueada — DSS governa via tokens |
| `<DssTimePicker dark />` | Usar `[data-theme='dark']` globalmente |
| Usar como input de texto manual | Combinar com DssInput externamente |
| `square` ou `flat` props | Não suportadas — estilo fixo DSS |

---

## 15. Exceções aos Gates v2.4

| ID | Tipo | Local | Justificativa |
|----|------|-------|---------------|
| EXC-Gate-01 | Gate de Composição | `1-structure/DssTimePicker.ts.vue` | QTime root — clock face, navegação por teclado, ARIA insubstituível |
| EXC-Gate-02 | CSS Custom Property Override | `2-composition/_base.scss` | `--q-color-primary` override — padrão DssPagination/DssAjaxBar/DssCarousel |
| EXC-Gate-02b | Descendant Selector | `2-composition/_base.scss` | `.q-time__header`, `.q-time__clock-position--active` — sem CSS hooks nativos |

---

## 16. Gaps Conhecidos (Fase 3)

| ID | Descrição | Impacto | Plano |
|----|-----------|---------|-------|
| GAP-01 | Classes CSS descendentes (`.q-time__header-label`, `.q-time__header-ampm`) assumidas com base na convenção de nomes do QTime, não verificadas contra snapshot do DOM real. Risco de CSS morto se o Quasar usar nomes diferentes. | Baixo — estilo do header degradaria gracefully | Validar em Fase 3 com snapshot DOM do QTime renderizado |

---

## 17. Referências

- [QTime API — Quasar Framework](https://quasar.dev/vue-components/time)
- Golden Context: `DSS/components/base/DssKnob/`
- Golden Reference: `DSS/components/base/DssChip/`
- Padrão EXC-Gate-02: `DSS/components/base/DssPagination/`
- Faseamento: `DSS/docs/reference/DSS_FASEAMENTO_COMPONENTES.md`
