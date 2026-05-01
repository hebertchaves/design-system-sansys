# DSSFAB_API.md — DssFab API Reference

> **Fase:** 2 — Componente Composto
> **Golden Reference:** DssChip
> **Golden Context:** DssBtnDropdown
> **Baseado em:** QFab (Quasar)

---

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `Boolean` | `false` | Estado aberto/fechado (v-model) |
| `color` | `String` | `'primary'` | Cor do trigger (paleta Quasar/DSS) |
| `text-color` | `String` | `undefined` | Cor do ícone/texto |
| `label` | `String` | `undefined` | Label → transforma em Extended FAB (pill) |
| `icon` | `String` | `'add'` | Ícone quando fechado (Material Icons) |
| `active-icon` | `String` | `'close'` | Ícone quando aberto |
| `hide-icon` | `Boolean` | `false` | Oculta o ícone do trigger |
| `hide-label` | `Boolean` | `false` | Oculta o label do trigger |
| `direction` | `'up'\|'down'\|'left'\|'right'` | `'up'` | Direção de expansão das ações |
| `vertical-actions-align` | `'left'\|'center'\|'right'` | `'center'` | Alinhamento das ações (direction up/down) |
| `persistent` | `Boolean` | `false` | Não fecha ao clicar fora |
| `disable` | `Boolean` | `false` | Desabilita o FAB |
| `brand` | `'hub'\|'water'\|'waste'\|null` | `null` | Acento de marca Sansys |
| `aria-label` | `String` | `undefined` | Label acessível do trigger |

### Props Bloqueadas (Quasar → DSS não expõe)

| Prop Quasar | Motivo |
|-------------|--------|
| `glossy` | Não faz parte da linguagem visual DSS v2.2 |
| `push` | Não faz parte da linguagem visual DSS v2.2 |
| `flat` | FAB no DSS é sempre elevado (Material Design baseline) |
| `outline` | Variante sem elevação não faz sentido semântico para FAB |
| `unelevated` | Idem |
| `padding` | Padding governado por tokens internos, não exposto |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Ações filhas. Reservado para `DssFabAction` (Nível 3). Temporariamente aceita `<q-fab-action>` nativo (EXC-01) |

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `Boolean` | Estado aberto/fechado mudou |
| `click` | `MouseEvent` | Trigger clicado |
| `show` | — | Ações exibidas |
| `hide` | — | Ações ocultadas |
| `before-show` | — | Antes de exibir ações |
| `before-hide` | — | Antes de ocultar ações |

---

## Classes CSS Geradas

| Classe | Condição |
|--------|----------|
| `.dss-fab` | Sempre (root) |
| `.dss-fab--extended` | Quando `label` está preenchido |
| `.dss-fab--direction-{dir}` | Quando `direction` não é `'up'` (padrão) |
| `.dss-fab--disabled` | Quando `disable` é `true` |
| `.dss-fab--brand-hub` | Quando `brand="hub"` |
| `.dss-fab--brand-water` | Quando `brand="water"` |
| `.dss-fab--brand-waste` | Quando `brand="waste"` |

---

## Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-radius-full` | L2 | Border-radius circular/pill do trigger |
| `--dss-elevation-2` | L2, L4 | Sombra padrão do FAB |
| `--dss-elevation-3` | L2, L4 | Sombra no hover/active |
| `--dss-duration-200` | L2 | Duração da transição de elevação |
| `--dss-easing-standard` | L2 | Easing das transições |
| `--dss-opacity-disabled` | L2 | Opacidade do estado disabled (0.4) |
| `--dss-focus-ring` | L2 | Ring de foco (WCAG 2.4.7) |
| `--dss-focus-ring-dark` | L4 | Ring de foco no dark mode |
| `--dss-border-width-md` | L4 | Borda em high-contrast |
| `--dss-border-width-thick` | L4 | Acento de marca (brand) |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub (light/dark) |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water (light/dark) |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste (light/dark) |

---

## Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `<q-fab-action>` nativo | `DssFab.example.vue`, `DssFab.md` | DssFabAction (Nível 3) ainda não construído. Exceção temporária removível após DssFabAction ser selado. |
| EXC-Gate | `.q-fab__trigger`, `.q-fab__actions` | `2-composition/_base.scss`, `4-output/` | Seletores Quasar internos necessários para override de elevação e shape. Gate de Composição v2.4 não se aplica a internos Quasar. Precedente: DssBtnDropdown gateExceptions. |
| EXC-States-01 | `1px solid ButtonBorder` | `4-output/_states.scss` | Forced-colors mode — system color keywords obrigatórios. Tokens CSS ignorados neste modo. Padrão DssCard EXC-04. |
