# DssButton

Status: ✅ Selo DSS v2.2 | Golden Sample de Documentação

Componente de botão universal do Design System Sansys. Wrapper governado sobre `QBtn` com brandabilidade, acessibilidade WCAG 2.1 AA e 6 variantes visuais.

## Quick Start

```vue
<template>
  <!-- Ação primária -->
  <DssButton label="Salvar" color="primary" />

  <!-- Com brand -->
  <DssButton label="Confirmar" color="hub" variant="elevated" />

  <!-- Ícone + label -->
  <DssButton label="Enviar" icon="send" color="primary" />

  <!-- Apenas ícone (acessível) -->
  <DssButton icon="delete" flat round aria-label="Excluir item" />

  <!-- Loading -->
  <DssButton label="Salvando..." :loading="isSaving" color="primary" />

  <!-- Desabilitado -->
  <DssButton label="Indisponível" :disable="true" />
</template>

<script setup>
import { DssButton } from '@sansys/design-system'
</script>
```

## Quando usar

- Ações primárias: Salvar, Confirmar, Enviar, Criar
- Ações secundárias: Cancelar, Voltar, Fechar
- Ações destrutivas: Excluir, Remover (usar `color="negative"`)
- Navegação com ênfase visual (links que requerem destaque)

## Quando NÃO usar

- Itens de menu navegáveis → usar `DssItem` ou links nativos
- Tabs → usar `DssTab`
- Ações inline em texto → usar link estilizado

## Props Principais

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `label` | `string` | — | Texto do botão |
| `icon` | `string` | — | Ícone antes do label (renderizado via `DssIcon` — CCI §3.1) |
| `iconRight` | `string` | — | Ícone após o label (renderizado via `DssIcon` — CCI §3.1) |
| `color` | `string` | `'primary'` | Cor semântica ou de brand (`hub`, `water`, `waste`) |
| `variant` | `'elevated' \| 'flat' \| 'outline' \| 'unelevated' \| 'push' \| 'glossy'` | `'elevated'` | Variante visual |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamanho do botão |
| `disable` | `boolean` | `false` | Estado desabilitado |
| `loading` | `boolean` | `false` | Estado de carregamento |
| `round` | `boolean` | `false` | Formato circular (apenas ícone) |
| `rounded` | `boolean` | `false` | Bordas arredondadas |
| `dense` | `boolean` | `false` | Padding reduzido |
| `block` | `boolean` | `false` | Largura 100% |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Brand override |
| `href` | `string` | — | Torna o botão um link `<a>` |
| `to` | `string \| object` | — | Rota Vue Router |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo HTML |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo customizado (substitui `label` + ícones) |
| `icon-left` | Ícone customizado à esquerda — precedência sobre a prop `icon` (CCI §3.2) |
| `icon-right` | Ícone customizado à direita — precedência sobre a prop `iconRight` (CCI §3.2) |

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `click` | `MouseEvent` | Clique no botão (não emitido quando `disable` ou `loading`) |

## Estados Visuais

| Estado | Comportamento |
|--------|---------------|
| **hover** | `filter: brightness(0.92)` (light) / `brightness(1.10)` (dark) |
| **active** | `filter: brightness(0.85)` (light) / `brightness(1.20)` (dark) |
| **focus** | Ring visível `--dss-focus-ring-width` / `--dss-focus-ring-color` |
| **disabled** | `opacity: var(--dss-opacity-38)`, cursor not-allowed, não responde a eventos |
| **loading** | Spinner sobreposto, label ocultado, largura preservada |

Touch target mínimo: 48×48px garantido via `::before` (WCAG 2.5.5).

## Exemplos

### Variantes

```vue
<DssButton label="Elevated" variant="elevated" color="primary" />
<DssButton label="Flat" variant="flat" color="primary" />
<DssButton label="Outline" variant="outline" color="primary" />
<DssButton label="Unelevated" variant="unelevated" color="primary" />
```

### Brandabilidade

```vue
<DssButton label="Hub" color="hub" />
<DssButton label="Water" color="water" />
<DssButton label="Waste" color="waste" />
```

### Grupo de ações

```vue
<div class="row q-gutter-sm">
  <DssButton label="Cancelar" flat color="primary" @click="cancel" />
  <DssButton label="Salvar" color="primary" :loading="saving" @click="save" />
</div>
```

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-radius-md` | Border radius padrão |
| `--dss-radius-full` | Variante round |
| `--dss-focus-ring-width` | Largura do focus ring |
| `--dss-focus-ring-color` | Cor do focus ring |
| `--dss-opacity-38` | Estado disabled |
| `--dss-compact-control-height-xs..xl` | Altura por tamanho |
| `--dss-hub-primary`, `--dss-water-primary`, `--dss-waste-primary` | Cores de brand |

## Acessibilidade

- Touch target ≥ 48px via `::before` (reservado exclusivamente para isso)
- Focus ring visível em todos os temas e modos de contraste
- `aria-disabled` para estado disabled (não `disabled` HTML puro)
- Botão de ícone sem label: fornecer `aria-label` obrigatoriamente
- Suporte a `forced-colors` (Windows High Contrast)

## Documentação Completa

| Documento | Descrição |
|-----------|-----------|
| [DssButton.md](./DssButton.md) | **Golden Sample** — Referência de documentação normativa (Template 13.1) |
| [DSSBUTTON_API.md](./DSSBUTTON_API.md) | API Reference — todas as props, variantes, tokens rastreáveis |
| [DssButton.example.vue](./DssButton.example.vue) | Exemplos interativos |
