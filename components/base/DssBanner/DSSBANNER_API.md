# DSSBANNER_API.md — DssBanner API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Variante semântica do banner |
| `icon` | `String` | *ícone padrão da variante* | Nome do ícone Material Icons. Use `""` para suprimir o ícone |
| `dismissible` | `Boolean` | `false` | Exibe botão de fechar (×) |
| `dismissLabel` | `String` | `'Fechar'` | Rótulo acessível do botão fechar (aria-label) |
| `dense` | `Boolean` | `false` | Modo compacto — reduz padding interno |
| `rounded` | `Boolean` | `false` | Aplica bordas arredondadas |
| `inlineActions` | `Boolean` | `false` | Exibe as ações na mesma linha do conteúdo (útil para mensagens curtas) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo principal do banner (mensagem, texto rico) |
| `avatar` | Área de ícone/avatar. Sobrescreve a prop `icon` quando fornecido |
| `actions` | Botões ou links de ação. Sobrescreve o botão fechar padrão do `dismissible` |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `dismiss` | — | Emitido quando o usuário clica no botão fechar (dismissible) |

## Ícones Padrão por Variante

| Variante | Ícone Padrão |
|----------|--------------|
| `default` | *(nenhum)* |
| `info` | `info` |
| `success` | `check_circle` |
| `warning` | `warning` |
| `error` | `error` |

## ARIA

| Variante | `role` | `aria-live` |
|----------|--------|-------------|
| `default` | `status` | `polite` |
| `info` | `status` | `polite` |
| `success` | `status` | `polite` |
| `warning` | `alert` | `assertive` |
| `error` | `alert` | `assertive` |

## Tokens Usados

| Token | Uso |
|-------|-----|
| `--dss-font-family-sans` | Fonte base |
| `--dss-font-size-md` | Tamanho do texto |
| `--dss-font-weight-normal` | Peso da fonte |
| `--dss-line-height-md` | Altura de linha |
| `--dss-padding-4` | Padding interno padrão (16px) |
| `--dss-padding-2` | Padding no modo dense (8px) |
| `--dss-gap-3` | Gap entre ícone e conteúdo (12px) |
| `--dss-spacing-0_5` | Ajuste de alinhamento do ícone |
| `--dss-border-width-heavy` | Largura da borda esquerda de acento (4px) |
| `--dss-text-body` | Cor do texto principal |
| `--dss-surface-default` | Fundo padrão |
| `--dss-surface-subtle` | Fundo do variant `default` |
| `--dss-surface-brand-light` | Fundo em contexto de marca |
| `--dss-gray-300` | Borda acento do variant `default` |
| `--dss-gray-700` | Borda acento do variant `default` em high-contrast |
| `--dss-feedback-info` | Borda acento do variant `info` |
| `--dss-feedback-info-deep` | Cor do ícone do variant `info` |
| `--dss-feedback-info-surface` | Fundo do variant `info` |
| `--dss-feedback-success` | Borda acento do variant `success` |
| `--dss-feedback-success-deep` | Cor do ícone do variant `success` |
| `--dss-feedback-success-surface` | Fundo do variant `success` |
| `--dss-feedback-warning` | Borda acento do variant `warning` |
| `--dss-feedback-warning-deep` | Cor do ícone do variant `warning` |
| `--dss-feedback-warning-surface` | Fundo do variant `warning` |
| `--dss-feedback-error` | Borda acento do variant `error` |
| `--dss-feedback-error-deep` | Cor do ícone do variant `error` |
| `--dss-feedback-error-surface` | Fundo do variant `error` |
| `--dss-hub-600` | Borda e ícone no contexto Hub |
| `--dss-water-500` | Borda e ícone no contexto Water |
| `--dss-waste-600` | Borda e ícone no contexto Waste |
| `--dss-duration-250` | Duração da transição de entrada |
| `--dss-easing-standard` | Curva de easing da transição |

## Classes CSS

| Classe | Description |
|--------|-------------|
| `.dss-banner` | Elemento raiz |
| `.dss-banner--default` | Variante padrão/neutra |
| `.dss-banner--info` | Variante informativa |
| `.dss-banner--success` | Variante de sucesso |
| `.dss-banner--warning` | Variante de aviso |
| `.dss-banner--error` | Variante de erro |
| `.dss-banner--dismissible` | Banner com botão fechar |
| `.dss-banner__icon` | Ícone semântico do banner |
| `.dss-banner__dismiss` | Botão de fechar |

## Exceções Registradas

| ID | Tipo | Localização | Justificativa |
|----|------|-------------|---------------|
| `EXC-Gate-01` | Gate de Composição | `2-composition/_base.scss` | Descendant selectors para subáreas do QBanner motor |
| `EXC-Gate-02` | Gate de Composição | `3-variants/_variant.scss` | `.dss-banner.q-banner--dense` para modo compacto |
| `EXC-States-01` | Estado | `4-output/_states.scss` | `ButtonText` em forced-colors (System Color permitido) |
| `EXC-04` | Print | `4-output/_states.scss` | `!important` em @media print |
| `EX-Color-01` | Cor | `_base.scss + _variant.scss` | CSS custom property `--dss-banner-icon-color` |
