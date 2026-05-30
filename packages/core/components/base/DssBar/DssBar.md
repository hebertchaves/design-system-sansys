# DssBar — Documentação (Template 13.1)

## 1. Visão Geral

**O que é:** `DssBar` é uma barra de sistema que serve como contêiner para títulos de janela (aplicações desktop/Electron), barras superiores de estilo mobile, ou qualquer barra horizontal de sistema. É um wrapper do componente `QBar` do Quasar com tokens DSS e suporte a brandabilidade.

**Quando usar:**
- Barras de título de janela em aplicações Electron
- Barras de sistema estilo mobile (topo de tela)
- Quando uma barra horizontal compacta com layout flex é necessária
- Como container para ações de janela (fechar, minimizar, maximizar)

**Quando NÃO usar:**
- Barras de navegação principal → use `DssToolbar`
- Barras de abas → use `DssTabs`
- Cabeçalhos de seção → use `DssHeader`
- Rodapés → use `DssFooter`

---

## 2. Classificação DSS

- **Tipo:** Estrutural / Sistema
- **Categoria:** Notificações e Alertas
- **Família:** Notificações e Alertas
- **Fase:** 2
- **Nível:** 1 — Independente
- **Interativo:** Não (é container; elementos internos podem ser interativos)
- **Motor Quasar:** `QBar`
- **Golden Reference:** DssBadge (não-interativo — componente não responde a estados de interação próprios)
- **Golden Context:** DssToolbar (container horizontal de sistema)

---

## 3. API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `dense` | `Boolean` | `false` | Modo compacto — reduz a altura e o padding interno |
| `elevated` | `Boolean` | `false` | Adiciona sombra de elevação |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo da barra — aceita `DssButton`, `DssIcon`, títulos, `q-space`, etc. |

### Events

Nenhum. `DssBar` é um container não-emissor. Eventos são emitidos pelos elementos internos.

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Barra padrão com surface-default |
| dense | ✅ | Prop `dense=true` — altura e padding reduzidos |
| elevated | ✅ | Prop `elevated=true` — sombra de elevação |
| hover | N/A | Barra não tem interação de cursor própria |
| focus | N/A | Barra não é focável; elementos internos têm foco próprio |
| active | N/A | Barra não tem estado pressionado |
| disabled | N/A | Não aplicável semanticamente |
| loading | N/A | Componente de estrutura |

---

## 5. Tokens Utilizados

| Token | Uso |
|-------|-----|
| `--dss-font-family-sans` | Tipografia |
| `--dss-font-size-md` | Tamanho de fonte |
| `--dss-font-weight-normal` | Peso de fonte |
| `--dss-line-height-md` | Altura de linha |
| `--dss-touch-target-md` | Altura mínima (48px) |
| `--dss-compact-control-height-sm` | Altura mínima em modo compacto |
| `--dss-padding-4` | Padding horizontal |
| `--dss-padding-2` | Padding horizontal compacto |
| `--dss-gap-2` | Espaçamento entre itens |
| `--dss-surface-default` | Fundo padrão |
| `--dss-text-body` | Texto padrão |
| `--dss-text-inverse` | Texto sobre fundos de brand |
| `--dss-gray-700` | Borda em alto contraste |
| `--dss-border-width-thin` | Espessura de borda |
| `--dss-shadow-md` | Sombra de elevação |
| `--dss-hub-600` | Fundo brand Hub |
| `--dss-water-500` | Fundo brand Water |
| `--dss-waste-600` | Fundo brand Waste |

---

## 6. Acessibilidade

- **WCAG 2.1 AA:** A barra é um container — os elementos internos são responsáveis pela acessibilidade individual
- **Touch target:** N/A — a barra não é focável nem clicável diretamente. Elementos interativos internos (DssButton) têm touch target próprio de 48px
- **ARIA:** Não há atributos ARIA obrigatórios no root. Consumer deve adicionar `role="banner"` ou `aria-label` conforme o contexto
- **Navegação por teclado:** Elementos internos são responsáveis pela navegação via teclado
- **Contraste:** Tokens de brand usam `--dss-text-inverse` sobre fundos escuros — verificar contraste mínimo 4.5:1 na configuração de brand
- **Modo forced-colors:** Usa system colors `ButtonFace`/`ButtonText` (WCAG 1.4.11)
- **Prefers-contrast: more:** Adiciona borda inferior `--dss-gray-700` para separação visual

---

## 7. Brandabilidade

O `DssBar` reage ao atributo `[data-brand]` no ancestral:

```html
<!-- Brand Hub -->
<div data-brand="hub">
  <DssBar>Sansys Hub</DssBar>
</div>

<!-- Brand Water -->
<div data-brand="water">
  <DssBar>Sansys Water</DssBar>
</div>

<!-- Brand Waste -->
<div data-brand="waste">
  <DssBar>Sansys Waste</DssBar>
</div>
```

Cada brand sobrescreve a cor de fundo com o token de brand correspondente e usa `--dss-text-inverse` para o texto.

---

## 8. Exceções Registradas

| ID | Tipo | Localização | Descrição |
|----|------|-------------|-----------|
| EXC-Gate-02 | gateException | `3-variants/_variant.scss` | `.dss-bar.q-bar--dense` — QBar aplica classe internamente; compound selector necessário |
| EXC-States-01 | statesException | `4-output/_states.scss` | System colors em `forced-colors: active` (WCAG 1.4.11) |
| EXC-04 | printException | `4-output/_states.scss` | `!important` em `@media print` para visibilidade |

---

## 9. Exceções aos Gates v2.4

| ID | Gate | Tipo | Localização | Justificativa |
|----|------|------|-------------|---------------|
| EXC-Gate-02 | Gate de Composição v2.4 | Compound selector `.dss-bar.q-bar--dense` | `3-variants/_variant.scss` | QBar aplica `.q-bar--dense` internamente ao elemento raiz. Sem este seletor, não é possível ajustar padding/min-height no modo compacto sem alterar props internas do QBar. Padrão idêntico a DssBanner EXC-Gate-02. |
| EXC-States-01 | Gate de Estados | System colors em `forced-colors: active` | `4-output/_states.scss` | `ButtonFace`/`ButtonText` são CSS System Colors obrigatórios em forced-colors (WCAG 1.4.11). Valores hardcoded `1px` em `border-bottom` são aceitos neste contexto conforme DSS_IMPLEMENTATION_GUIDE. |
| EXC-04 | Gate de Print | `!important` em `@media print` | `4-output/_states.scss` | Navegadores removem backgrounds em impressão por padrão. `!important` necessário para sobrescrever inline styles do QBar. Padrão canônico DSS. |

---

## 10. Padrões de Composição

### Barra com título e ações

```vue
<DssBar elevated>
  <span>Minha Aplicação</span>
  <q-space />
  <DssButton flat round icon="minimize" aria-label="Minimizar" />
  <DssButton flat round icon="crop_square" aria-label="Maximizar" />
  <DssButton flat round icon="close" aria-label="Fechar" />
</DssBar>
```

### Barra mobile com brand

```vue
<div data-brand="hub">
  <DssBar>
    <DssButton flat round icon="menu" aria-label="Menu" />
    <span>Dashboard</span>
    <q-space />
    <DssButton flat round icon="notifications" aria-label="Notificações" />
  </DssBar>
</div>
```

### Barra compacta em contexto de formulário

```vue
<DssBar dense>
  <DssIcon name="settings" aria-hidden="true" />
  <span>Configurações</span>
</DssBar>
```

---

## 11. Notas de Implementação

- **Dark mode:** Gerenciado via cascade global de tokens (`tokens/themes/dark/_colors.scss`). Nenhum override manual no componente.
- **Prop `dark` bloqueada:** Não exposta — DSS usa `[data-theme="dark"]` globalmente.
- **`inheritAttrs: false` + `v-bind="$attrs"`:** Atributos extras (data-testid, aria-label, etc.) são encaminhados ao elemento QBar raiz.
- **`defineEmits` omitido:** DssBar é container não-emissor — omissão é intencional e conforme padrão DSS.

---

## 12. Changelog

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0.0 | 2026-05-20 | Criação inicial — Fase 2 Nível 1 |
