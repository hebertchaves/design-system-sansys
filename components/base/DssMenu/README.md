# DssMenu

Overlay de navegação flutuante para exibição de ações e opções contextuais.

## Quick Start

```vue
<DssButton label="Ações">
  <DssMenu v-model="menuAberto">
    <DssList>
      <DssItem label="Editar" clickable v-close-popup />
      <DssItem label="Excluir" clickable v-close-popup />
    </DssList>
  </DssMenu>
</DssButton>
```

## Quando Usar

- Ações contextuais em botões (kebab menu, "Mais opções")
- Seletores de opção customizados (dropdown alternativo ao DssSelect)
- Submenus de navegação

## Quando NÃO Usar

- Confirmações de ação → usar diálogo
- Formulários complexos → usar DssCard em modal
- Informação contextual sem ação → usar DssTooltip

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `modelValue` | `Boolean` | `false` | Controle de visibilidade (v-model) |
| `fit` | `Boolean` | `false` | Mesma largura do elemento trigger |
| `cover` | `Boolean` | `false` | Menu cobre o elemento trigger |
| `anchor` | `MenuPosition` | — | Ponto de ancoragem no trigger |
| `self` | `MenuPosition` | — | Ponto de alinhamento do menu |
| `offset` | `[number, number]` | — | Deslocamento `[x, y]` em pixels |

### Props Bloqueadas

| Prop QMenu | Motivo |
|------------|--------|
| `dark` | Modo escuro via `[data-theme="dark"]` global |
| `square` | Cantos quadrados violam `--dss-radius-md` |

### Props via `$attrs` (exemplos)

| Prop | Descrição |
|------|-----------|
| `transition-show` | Animação de abertura |
| `transition-hide` | Animação de fechamento |
| `max-height` | Altura máxima do menu |
| `max-width` | Largura máxima do menu |
| `persistent` | Não fecha ao clicar fora |

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do menu. Usar exclusivamente `DssList > DssItem`. |

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `Boolean` | Sincronização do v-model |
| `show` | `Event` | Após abertura completa |
| `hide` | `Event` | Após fechamento completo |

## Modos de Uso

### Básico

```vue
<DssButton label="Opções">
  <DssMenu v-model="open">
    <DssList>
      <DssItem label="Ação 1" clickable v-close-popup />
      <DssItem label="Ação 2" clickable v-close-popup />
    </DssList>
  </DssMenu>
</DssButton>
```

### Com Separadores

```vue
<DssMenu v-model="open">
  <DssList>
    <DssItem label="Novo" clickable v-close-popup />
    <DssItem label="Abrir" clickable v-close-popup />
    <DssSeparator />
    <DssItem label="Salvar" clickable v-close-popup />
  </DssList>
</DssMenu>
```

### Fit (mesma largura do trigger)

```vue
<DssButton label="Selecionar" style="width: 200px">
  <DssMenu v-model="open" fit>
    <DssList>
      <DssItem label="Ativo" clickable v-close-popup />
      <DssItem label="Inativo" clickable v-close-popup />
    </DssList>
  </DssMenu>
</DssButton>
```

### Posicionamento Customizado

```vue
<DssMenu anchor="top right" self="bottom right" :offset="[0, 8]">
  <!-- conteúdo -->
</DssMenu>
```

## Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Fundo do menu |
| `--dss-elevation-3` | Sombra de elevação |
| `--dss-radius-md` | Borda arredondada |
| `--dss-font-family-sans` | Família tipográfica |
| `--dss-text-body` | Cor de texto padrão |
| `--dss-border-width-thin` | Borda no dark mode |
| `--dss-gray-200` | Cor da borda no dark mode |
| `--dss-border-width-md` | Borda reforçada em prefers-contrast |

## Acessibilidade

- `role="menu"` aplicado nativamente pelo QMenu
- Navegação por teclado (setas, Esc) gerenciada pelo QMenu
- Recomendar `aria-label` via `$attrs`
- Deve existir em contexto de elemento trigger com `aria-haspopup="menu"`

---

**Design System Sansys — DSS v2.2**
