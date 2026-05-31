# DssFabAction — API Reference

> **Família:** FAB | **Fase:** 2 | **Nível:** 3  
> **Componente Quasar base:** `QFabAction`  
> **Golden Reference:** DssChip | **Golden Context:** DssFab

---

## Props

### Conteúdo Visual

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `color` | `string` | `'primary'` | Não | Cor do botão de ação (compatível com paleta Quasar e DSS) |
| `text-color` | `string` | `undefined` | Não | Cor do ícone/texto. Sobrescreve o contraste automático |
| `icon` | `string` | `undefined` | Não | Ícone Material Icons exibido no centro do botão |
| `label` | `string` | `undefined` | Não | Texto inline ao lado do ícone. Ativa o modo Extended (pill) |
| `external-label` | `string` | `undefined` | Não | Texto flutuante ao lado do botão circular |
| `label-position` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'left'` | Não | Posição do `external-label`. Ignorado sem `external-label` |

### Navegação

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `to` | `string \| object` | `undefined` | Não | Rota Vue Router para navegação interna |
| `href` | `string` | `undefined` | Não | URL para navegação externa. Transforma o botão em `<a>` |
| `target` | `string` | `'_self'` | Não | Alvo do link quando `href` é fornecido |

### Estado

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `disable` | `boolean` | `false` | Não | Desabilita o botão. Aplica opacidade 0.4 e bloqueia interações |

### Brandabilidade

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Não | Aplica acento visual de marca via inset box-shadow na borda inferior |

### Acessibilidade

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `aria-label` | `string` | `undefined` | Recomendado | Label acessível para o botão. **Obrigatório quando sem `label` ou `external-label`** |

---

## Props bloqueadas (QFabAction)

As seguintes props existem na API do QFabAction mas são bloqueadas pelo DSS v2.2:

| Prop | Motivo |
|------|--------|
| `glossy` | Não pertence à linguagem visual DSS v2.2 |
| `push` | Não pertence à linguagem visual DSS v2.2 |
| `flat` | FabAction no DSS é sempre elevado (Material Design baseline) |
| `outline` | Idem flat — variante sem elevação não faz sentido semântico |
| `unelevated` | Idem flat |
| `padding` | Padding governado por `--dss-padding-4` internamente |

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `click` | `MouseEvent` | Emitido ao clicar no botão de ação |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `icon` | Substitui o ícone padrão por conteúdo personalizado |

```vue
<DssFabAction color="primary" label="Upload">
  <template #icon>
    <DssIcon name="upload" />
  </template>
</DssFabAction>
```

---

## Estados

| Estado | Classe DSS | Trigger | Comportamento |
|--------|------------|---------|---------------|
| `default` | `.dss-fab-action` | — | Elevação `--dss-elevation-1` |
| `hover` | — | `:hover` | Elevação `--dss-elevation-2` |
| `focus` | — | `:focus-visible` | `--dss-focus-ring` + outline-offset 2px |
| `active` | — | `:active` | Elevação `--dss-elevation-2` |
| `disabled` | `.dss-fab-action--disabled` | `disable` prop | Opacidade 0.4, pointer-events none |

### Dark Mode

| Estado | Comportamento |
|--------|---------------|
| `focus-visible` | `outline: 2px solid white` (EXC-States-02 — sem token `--dss-focus-ring-dark`) |

---

## Tokens

### Forma
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-radius-full` | 9999px | Border radius circular |

### Elevação
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-elevation-1` | shadow sm | Estado padrão |
| `--dss-elevation-2` | shadow md | Estado hover/active |

### Dimensões
| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-spacing-10` | 40px | Tamanho visual mínimo do botão |
| `--dss-touch-target-md` | 44px | Touch target WCAG 2.5.5 via `::before` |
| `--dss-padding-4` | 16px | Padding horizontal (modo Extended) |

### Animação
| Token | Uso |
|-------|-----|
| `--dss-duration-200` | Duração das transições |
| `--dss-easing-standard` | Curva de animação |

### Acessibilidade
| Token | Uso |
|-------|-----|
| `--dss-focus-ring` | Anel de foco (light mode) |
| `--dss-opacity-disabled` | Opacidade estado disabled (0.4) |

### Brand
| Token | Brand | Uso |
|-------|-------|-----|
| `--dss-hub-600` | Hub | Acento borda inferior (light) |
| `--dss-hub-400` | Hub | Acento borda inferior (dark) |
| `--dss-water-500` | Water | Acento borda inferior (light) |
| `--dss-water-400` | Water | Acento borda inferior (dark) |
| `--dss-waste-600` | Waste | Acento borda inferior (light) |
| `--dss-waste-500` | Waste | Acento borda inferior (dark) |

---

## Exceções documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| `EXC-States-01` | `1px solid ButtonBorder` | `_states.scss` `@media forced-colors` | forced-colors mode requer system color keywords |
| `EXC-States-02` | `outline: 2px solid white` | `_states.scss` `[data-theme='dark']` | Token `--dss-focus-ring-dark` não existe no catálogo v2.2 |

---

## Exemplos

### Básico (ícone único)
```vue
<DssFab v-model="open" icon="add">
  <DssFabAction color="primary" icon="mail" aria-label="Enviar e-mail" />
</DssFab>
```

### Extended (ícone + label)
```vue
<DssFab v-model="open" icon="add">
  <DssFabAction color="primary" icon="mail" label="E-mail" />
  <DssFabAction color="secondary" icon="share" label="Compartilhar" />
</DssFab>
```

### Label externo
```vue
<DssFab v-model="open" icon="add">
  <DssFabAction
    color="primary"
    icon="mail"
    external-label="Enviar e-mail"
    label-position="left"
  />
</DssFab>
```

### Navegação
```vue
<!-- Interna (Vue Router) -->
<DssFabAction color="primary" icon="home" to="/" aria-label="Ir para início" />

<!-- Externa -->
<DssFabAction color="primary" icon="open_in_new" href="https://sansys.com.br" target="_blank" aria-label="Abrir site" />
```

### Desabilitado
```vue
<DssFabAction color="primary" icon="delete" disable aria-label="Excluir (indisponível)" />
```

### Com brand
```vue
<div data-brand="hub">
  <DssFab v-model="open" brand="hub" icon="add">
    <DssFabAction color="primary" icon="mail" brand="hub" aria-label="E-mail" />
  </DssFab>
</div>
```
