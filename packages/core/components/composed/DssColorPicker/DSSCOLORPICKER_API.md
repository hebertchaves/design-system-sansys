# DSSCOLORPICKER_API.md — DssColorPicker API Reference

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `String` | `undefined` | Valor atual da cor. Use com `v-model`. |
| `defaultValue` | `String` | `undefined` | Valor padrão ao montar (sem v-model). |
| `formatModel` | `'rgb' \| 'hex' \| 'hexa' \| 'rgba' \| 'hsl' \| 'hsla' \| 'hsv' \| 'hsva'` | `undefined` | Formato de emissão da cor. Padrão Quasar: `'rgb'`. |
| `noHeader` | `Boolean` | `false` | Remove o cabeçalho (preview da cor selecionada). |
| `noHeaderTabs` | `Boolean` | `false` | Remove as abas (spectrum / tune / palette). |
| `noFooter` | `Boolean` | `false` | Remove o rodapé. |
| `defaultView` | `'spectrum' \| 'tune' \| 'palette'` | `'spectrum'` | View padrão ao abrir. |
| `palette` | `String[]` | `undefined` | Array de cores HEX para a aba de paleta. |
| `square` | `Boolean` | `false` | Remove border-radius (cantos retos). |
| `flat` | `Boolean` | `false` | Estilo plano sem sombra ou borda. |
| `bordered` | `Boolean` | `false` | Adiciona borda. |
| `disable` | `Boolean` | `false` | Desabilita todo o componente. |
| `readonly` | `Boolean` | `false` | Exibe mas impede alterações. |
| `name` | `String` | `undefined` | Atributo `name` para hidden input em formulários. |
| `tabindex` | `String \| Number` | `undefined` | Índice de tabulação. |

### Props Bloqueadas

| Prop Quasar | Motivo do Bloqueio |
|-------------|--------------------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` globalmente. Uso via prop causaria inconsistência. |
| `color` | DSS controla via `--q-color-primary` CSS. `color="primary"` é fixo internamente. |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo adicional dentro do QColor (ex: botões de ação no footer). |

---

## Events

| Evento | Payload | Quando é emitido |
|--------|---------|-----------------|
| `update:modelValue` | `String \| null` | A cada mudança de cor (durante drag, durante digitação). Use com `v-model`. |
| `change` | `String \| null` | Quando a interação termina (mouseup, keyup final, enter no input). Ideal para submit de formulários. |

---

## CSS Classes

| Classe | Descrição |
|--------|-----------|
| `.dss-color-picker` | Classe raiz adicionada ao `QColor`. Usada para todos os overrides CSS DSS. |

---

## Tokens Utilizados

| Token | Valor de Referência | Uso |
|-------|---------------------|-----|
| `--dss-action-primary` | brand-dependent | Indicador de aba ativa (via `--q-color-primary`) |
| `--dss-surface-default` | `#fff` / dark: `#1e1e1e` | Fundo do container |
| `--dss-radius-md` | `8px` | Border-radius do container e header |
| `--dss-radius-sm` | `4px` | Border-radius dos palette squares |
| `--dss-border-width-thin` | `1px` | Borda em forced-colors e print |
| `--dss-border-width-md` | `2px` | Outline de foco |
| `--dss-opacity-disabled` | `0.4` | Opacidade no estado disabled |
| `--dss-focus-ring` | brand-dependent | Cor do outline de foco |
| `--dss-duration-hover` | `150ms` | Transição de hover na paleta |
| `--dss-easing-hover` | `ease-out` | Easing da transição |
| `--dss-duration-0` | `0ms` | Supressão de animações |
| `--dss-hub-600` | `#E65100` | Brand Hub |
| `--dss-water-500` | `#0277BD` | Brand Water |
| `--dss-waste-600` | `#2E7D32` | Brand Waste |
