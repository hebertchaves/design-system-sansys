# DSSSPLITTER_API.md — DssSplitter API Reference

## Props

| Prop | Tipo | Default | Obrigatória | Descrição |
|------|------|---------|-------------|-----------|
| `modelValue` | `Number` | `50` | Não | Posição do separador em `%` (ou `px` quando `unit='px'`). Controla o tamanho do painel `before`. Compatível com `v-model`. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Não | Orientação do layout: `'horizontal'` = painéis lado a lado (separador vertical); `'vertical'` = painéis empilhados (separador horizontal). |
| `limits` | `[Number, Number]` | `[0, 100]` | Não | Limites `[min, max]` para o `modelValue`. Impede que qualquer painel colapse abaixo do mínimo ou ultrapasse o máximo. Ex: `[20, 80]` mantém cada painel com pelo menos 20%. |
| `reverse` | `Boolean` | `false` | Não | Inverte a ordem visual dos painéis (before aparece após, after aparece antes) sem alterar a lógica de `modelValue`. |
| `disabled` | `Boolean` | `false` | Não | Desativa a interação com o separador. O layout mantém a posição atual do separador. Aplica `opacity: var(--dss-opacity-disabled)` e `pointer-events: none`. |
| `emitImmediately` | `Boolean` | `false` | Não | Quando `true`, emite `update:modelValue` continuamente durante o arrasto. Quando `false`, emite apenas ao soltar. |
| `unit` | `'%' \| 'px'` | `'%'` | Não | Unidade para `modelValue`. `'%'` é relativo ao container; `'px'` é absoluto. Use `'px'` quando o painel deve ter tamanho fixo independente do container. |

## Slots

| Slot | Scoped | Descrição |
|------|--------|-----------|
| `before` | Não | Conteúdo do primeiro painel. Em `orientation='horizontal'`: painel esquerdo. Em `orientation='vertical'`: painel superior. |
| `after` | Não | Conteúdo do segundo painel. Em `orientation='horizontal'`: painel direito. Em `orientation='vertical'`: painel inferior. |
| `separator` | Não | Conteúdo personalizado dentro do separador. Opcional — sem conteúdo, o separador é um div transparente com cursor resize. |

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `Number` | Emitido quando a posição do separador é alterada pelo usuário (arrasto ou teclado). Compatível com `v-model`. |

## CSS Classes

| Classe | Descrição |
|--------|-----------|
| `.dss-splitter` | Classe raiz (sempre presente) |
| `.dss-splitter--vertical` | Ativo quando `orientation='vertical'` |
| `.dss-splitter--disabled` | Ativo quando `disabled=true` |
| `.dss-splitter--reversed` | Ativo quando `reverse=true` |

## Tokens Utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-gray-200` | — | Cor padrão do separador |
| `--dss-gray-400` | — | Separador hover (light mode) / active (dark mode) |
| `--dss-gray-600` | — | Separador active/drag (light mode) |
| `--dss-gray-700` | — | Separador default (dark mode) |
| `--dss-gray-500` | — | Separador hover (dark mode) |
| `--dss-gray-800` | — | Separador hover em prefers-contrast: more |
| `--dss-gray-900` | — | Separador active em prefers-contrast: more |
| `--dss-duration-250` | 250ms | Duração da transição de cor |
| `--dss-easing-ease-out` | — | Curva de animação |
| `--dss-touch-target-md` | 44px | Tamanho mínimo da área de toque (WCAG 2.5.5) |
| `--dss-opacity-disabled` | 0.4 | Opacidade no estado disabled |
| `--dss-focus-shadow-primary` | — | Shadow de foco (WCAG 2.4.7) |
| `--dss-action-hub` | — | Separador hover/active em brand="hub" |
| `--dss-action-water` | — | Separador hover/active em brand="water" |
| `--dss-action-waste` | — | Separador hover/active em brand="waste" |

## Props Bloqueadas (não expostas do QSplitter)

| Prop Quasar | Motivo do Bloqueio |
|-------------|-------------------|
| `separator-class` | Governado via CSS DSS (EXC-Gate-02) |
| `separator-style` | Governado via CSS DSS (EXC-Gate-02) |
| `dark` | Governado via tokens em 4-output/_states.scss |
| `before-class` | Consumidor aplica class diretamente no conteúdo do slot |
| `after-class` | Consumidor aplica class diretamente no conteúdo do slot |

## Navegação por Teclado (Gerenciada pelo QSplitter)

| Tecla | Ação |
|-------|------|
| `Tab` | Foca o separador |
| `←` / `→` | Ajusta posição (orientation='horizontal') |
| `↑` / `↓` | Ajusta posição (orientation='vertical') |
| `Home` | Move para o limite mínimo (`limits[0]`) |
| `End` | Move para o limite máximo (`limits[1]`) |

## Exemplo de uso v-model

```vue
<template>
  <DssSplitter v-model="splitSize" :limits="[20, 80]" style="height: 400px;">
    <template #before>
      <DssCard>Painel Esquerdo</DssCard>
    </template>
    <template #after>
      <DssCard>Painel Direito</DssCard>
    </template>
  </DssSplitter>
</template>

<script setup>
import { ref } from 'vue'
const splitSize = ref(50)
</script>
```
