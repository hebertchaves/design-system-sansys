# DSSBAR_API.md — DssBar API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dense` | `Boolean` | `false` | Modo compacto — reduz a altura e o padding interno. Delegado ao QBar via `:dense`. |
| `elevated` | `Boolean` | `false` | Adiciona sombra de elevação à barra. Aplicada via classe `dss-bar--elevated`. |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo da barra — pode conter `DssButton`, `DssIcon`, títulos, `q-space`, etc. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| — | — | DssBar é um container não-emissor. Elementos internos emitem seus próprios eventos. |

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-font-family-sans` | Família tipográfica |
| `--dss-font-size-md` | Tamanho de fonte base |
| `--dss-font-weight-normal` | Peso de fonte base |
| `--dss-line-height-md` | Altura de linha |
| `--dss-touch-target-md` | Altura mínima padrão (48px) |
| `--dss-compact-control-height-sm` | Altura mínima em modo compacto |
| `--dss-padding-4` | Padding horizontal padrão |
| `--dss-padding-2` | Padding horizontal em modo denso |
| `--dss-gap-2` | Espaçamento entre itens internos |
| `--dss-surface-default` | Cor de fundo padrão |
| `--dss-text-body` | Cor de texto padrão |
| `--dss-text-inverse` | Cor de texto sobre fundos de brand |
| `--dss-gray-700` | Cor de borda em prefers-contrast: more |
| `--dss-border-width-thin` | Espessura de borda em prefers-contrast e print |
| `--dss-shadow-md` | Sombra de elevação (prop `elevated`) |
| `--dss-hub-600` | Cor de fundo para brand Hub |
| `--dss-water-500` | Cor de fundo para brand Water |
| `--dss-waste-600` | Cor de fundo para brand Waste |

## CSS Classes

| Classe | Condição | Descrição |
|--------|----------|-----------|
| `.dss-bar` | Sempre | Classe raiz |
| `.dss-bar--elevated` | `elevated=true` | Aplica sombra de elevação |
| `.q-bar--dense` | `dense=true` (QBar) | Aplicada pelo motor QBar internamente |

## Exceções Registradas

| ID | Tipo | Localização | Descrição |
|----|------|-------------|-----------|
| EXC-Gate-02 | gateException | `3-variants/_variant.scss` | `.dss-bar.q-bar--dense` — QBar aplica classe internamente |
| EXC-States-01 | statesException | `4-output/_states.scss` | System colors em forced-colors mode |
| EXC-04 | printException | `4-output/_states.scss` | `!important` em @media print |

## Estados

| Estado | Suportado | Observação |
|--------|-----------|------------|
| default | ✅ | Estado inicial |
| dense | ✅ | Prop `dense=true` |
| elevated | ✅ | Prop `elevated=true` |
| hover | N/A | Barra não tem cursor próprio |
| focus | N/A | Barra não é focável — elementos internos têm foco próprio |
| active | N/A | Barra não tem estado pressionado |
| disabled | N/A | Barra não é desabilitável semanticamente |
| loading | N/A | Componente de estrutura |
