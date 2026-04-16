# DssStep

Passo individual de um stepper/wizard. Wrapper DSS governado sobre `QStep` do Quasar.

## Quando usar

- Para representar etapas sequenciais de um processo (wizard, onboarding, checkout)
- Dentro de um `q-stepper` (ou `DssStepper`, quando disponível)
- Quando o fluxo tem estados claros: pendente → ativo → concluído

## Quando NÃO usar

- Fora de um container stepper (`q-stepper` / `DssStepper`)
- Como elemento de lista ou menu — use `DssItem` ou `DssList`
- Para navegação por abas — use `DssTab` + `DssTabs`

## Quick Start

```vue
<template>
  <q-stepper v-model="step" flat animated>
    <DssStep :name="1" title="Identificação" done>
      Conteúdo do passo 1 (concluído)
    </DssStep>

    <DssStep :name="2" title="Configuração">
      Conteúdo do passo 2 (ativo)
    </DssStep>

    <DssStep :name="3" title="Confirmação">
      Conteúdo do passo 3
    </DssStep>
  </q-stepper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DssStep } from '@dss/components'

const step = ref(2)
</script>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `string \| number` | — | **Obrigatório.** Identificador único para o v-model do container |
| `title` | `string` | — | Título principal do passo |
| `caption` | `string` | — | Texto secundário abaixo do título |
| `icon` | `string` | — | Ícone Material Icons (substitui o número no dot) |
| `activeIcon` | `string` | — | Ícone quando o passo está ativo |
| `doneIcon` | `string` | — | Ícone quando concluído (padrão Quasar: `check`) |
| `errorIcon` | `string` | — | Ícone quando tem erro (padrão Quasar: `warning`) |
| `done` | `boolean` | `false` | Marca o passo como concluído (dot verde) |
| `error` | `boolean` | `false` | Marca o passo com erro (dot vermelho) |
| `disable` | `boolean` | `false` | Desabilita interação com o passo |
| `headerNav` | `boolean` | `false` | Torna o cabeçalho clicável para navegação livre |

## Props bloqueadas

| Prop Quasar | Motivo |
|------------|--------|
| `color` / `active-color` / `done-color` / `error-color` | Cores governadas por tokens DSS |
| `prefix` | DSS usa apenas números ou ícones no dot |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do passo. Exibido quando o passo está ativo. Aceita qualquer componente DSS |

## Estados

| Estado | Como ativar | Cor do dot |
|--------|------------|------------|
| Inativo | Padrão | `--dss-surface-muted` (cinza) |
| Ativo | v-model do container | `--dss-action-primary` |
| Concluído | prop `done` | `--dss-feedback-success` (verde) |
| Erro | prop `error` | `--dss-feedback-error` (vermelho) |
| Desabilitado | prop `disable` | Opacidade `--dss-opacity-disabled` |

## Brandabilidade

```html
<!-- Herança via container pai -->
<div data-brand="hub">
  <q-stepper v-model="step">
    <DssStep :name="1" title="Passo Hub" done />
    <DssStep :name="2" title="Passo Ativo" />
  </q-stepper>
</div>
```

Brands disponíveis: `hub` (laranja), `water` (azul), `waste` (verde).

## Navegação com teclado

- `Tab`: navega até o cabeçalho do passo (quando `headerNav=true`)
- `Enter` / `Space`: ativa o passo (gerenciado pelo QStepper)
- `→` / `←`: navega entre passos (gerenciado nativamente pelo QStepper)

## Documentação completa

- [DssStep.md](./DssStep.md) — Documentação normativa
- [DSSSTEP_API.md](./DSSSTEP_API.md) — Referência técnica completa
