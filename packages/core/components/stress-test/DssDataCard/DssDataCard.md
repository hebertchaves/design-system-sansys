# DssDataCard — Documentação Normativa DSS v2.2

> **Fase:** 3 — Componente Composto Complexo  
> **Status:** Em auditoria  
> **Golden Reference:** DssChip (interativo)  
> **Golden Context:** *Este componente É o Golden Context da Fase 3*  
> **Família:** Card de Dados

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Componente | `DssDataCard` |
| CSS Class | `.dss-data-card` |
| Fase | 3 |
| Nível | 1 (Golden Context — sem dependência de outros componentes Fase 3) |
| Quasar Base | Nenhuma direta — orquestra componentes DSS Fase 1/2 |
| Família | Composição Complexa / Card de Dados |

---

## 2. Propósito

`DssDataCard` é um componente de Fase 3 que orquestra `DssCard`, `DssToolbar`, `DssTabs`, `DssTabPanels` e paginação interna em uma composição profunda. É o **Golden Context da Fase 3**: serve como baseline de auditoria para todos os outros componentes compostos complexos do DSS.

Seu propósito é apresentar conjuntos de dados com múltiplas visões (abas), paginação interna e ações de toolbar, propagando estado global (`disabled`, `brand`) sem prop drilling excessivo.

---

## 3. Quando usar / Quando NÃO usar

**Usar quando:**
- Dados têm múltiplas visualizações (resumo, detalhes, histórico)
- Há paginação de itens gerenciada internamente
- O card precisa de toolbar com ações e título
- O contexto exige propagação de brand sem configuração individual por filho

**Não usar quando:**
- O card é simples sem abas → usar `DssCard` diretamente
- O conteúdo é um formulário → usar `DssForm` + `DssCard`
- A paginação é controlada externamente → criar composição ad-hoc

---

## 4. Regras de Acessibilidade

- `aria-busy` no root quando `loading=true`
- `aria-disabled` no root quando `disabled=true`
- Skeleton com `role="status"` e `aria-label="Carregando conteúdo"`
- Paginação: label com `aria-live="polite"` e `role="status"`
- Botões de paginação: `aria-label` descritivo em cada botão
- `aria-current="page"` no botão da página ativa
- `tabsAriaLabel` obrigatório para DssTabs quando `tabs` é fornecida

---

## 5. Gestão de Foco

- Foco segue a ordem DOM natural: toolbar → abas → conteúdo → paginação → footer
- Botões desabilitados (`disabled=true`) ficam fora do tab order via `pointer-events: none`
- DssTabs gerencia o próprio foco interno (setas para navegação entre abas)

---

## 6. Props

Ver [DSSDATACARD_API.md](./DSSDATACARD_API.md#props).

---

## 7. Emits

| Evento | Payload | Quando |
|---|---|---|
| `update:modelValue` | `number` | Mudança de página |
| `tab-change` | `string \| number` | Troca de aba ativa |
| `refresh` | — | Clique no botão refresh da toolbar |

---

## 8. Slots

| Slot | Tipo de conteúdo | Onde renderiza |
|---|---|---|
| `toolbar-actions` | `DssButton`, `DssIcon` | Toolbar, após o botão refresh |
| `tab-{name}` | Qualquer conteúdo | DssTabPanel correspondente à aba |
| `default` | Qualquer conteúdo | DssCardSection (apenas sem abas) |
| `footer` | Qualquer conteúdo | Rodapé do card (condicional) |

---

## 9. Variantes visuais

DssDataCard não expõe variantes próprias de densidade. A variante do container é delegada via prop `variant` para o `DssCard` interno:

| `variant` | Aparência |
|---|---|
| `'elevated'` (default) | Sombra elevada — padrão de dashboard |
| `'flat'` | Sem sombra — para cards dentro de outro card |
| `'bordered'` | Borda explícita, sem sombra |
| `'outlined'` | Outline fino |

---

## 10. Estados

| Estado | Como ativa | Comportamento |
|---|---|---|
| `loading` | `:loading="true"` | Skeleton substitui conteúdo; paginação ocultada; `aria-busy` no root |
| `disabled` | `:disabled="true"` | Opacidade `--dss-opacity-disabled`; `pointer-events: none`; botões internos desabilitados via provide/inject |

**Estados não aplicáveis ao container root:**
- `hover`, `focus`, `active` — pertencem aos componentes filhos interativos

---

## 11. Brandabilidade

A prop `brand` aplica `[data-brand]` no root do `DssDataCard`. Isso:
1. Muda a cor das bordas separadoras dos wrappers `__toolbar` e `__tabs` via `4-output/_brands.scss`
2. Propaga brand para `DssToolbar` e `DssTabs` internos via cascata CSS — **sem prop drilling**

| Brand | Token de borda |
|---|---|
| `'hub'` | `--dss-hub-600` |
| `'water'` | `--dss-water-500` |
| `'waste'` | `--dss-waste-600` |

---

## 12. 5 Padrões Obrigatórios da Fase 3

### 12.1. `inheritAttrs: false`
`v-bind="$attrs"` aplicado no `DssCard` raiz via `useAttrs()`. Garante que `class`, `style` e `data-test` do consumidor aterrisem no nó correto, não no elemento root do template.

### 12.2. `provide/inject` tipado
`DATA_CARD_DISABLED_KEY` (tipo `InjectionKey<Ref<boolean>>`) provê o estado `disabled` para toda a árvore. Componentes filhos que precisam reagir ao `disabled` do DssDataCard injetam via `injectDataCardDisabled()`.

### 12.3. CSS Variables como canal visual
`brand` é propagada via `[data-brand]` no root — sem passar a prop manualmente para DssToolbar, DssTabs, etc. Os filhos lêem a brand via cascata CSS nativa do DSS.

### 12.4. Proibição de `:deep()` para layout
O layout entre DssToolbar, DssTabs, DssTabPanels e a paginação é controlado exclusivamente por classes `dss-data-card__*`. Nenhum `:deep()` injeta CSS em componentes filhos.

### 12.5. Slots dinâmicos
Cada aba em `tabs` gera automaticamente um slot `tab-{name}`. O consumidor usa `<template #tab-resumo>`. A geração é via `v-for` sobre `tabs` no `DssTabPanel`.

---

## 13. Exceções

| ID | Tipo | Descrição |
|---|---|---|
| EXC-Structural-01 | Código | `gap: 2px` em `__title-group` — gap geométrico mínimo; `--dss-spacing-1` (4px) é o menor token disponível |
| EXC-Structural-02 | Código | `line-height: 1.3` em `__subtitle` — sem token DSS para 1.3; `--dss-line-height-xs` (1.4) seria visualmente incorreto |
| EXC-Structural-03 | Código | `opacity: 0.4` no `@keyframes dss-data-card-shimmer` — valor de ponto médio da animação; nenhum token DSS de opacidade para animações existe; `--dss-opacity-disabled` tem o mesmo valor mas semântica de estado disabled, inapropriada para contexto de animação |

---

## 14. Exemplos de código

### Básico (sem abas)
```vue
<DssDataCard title="Resumo Geral" subtitle="Dados do mês atual">
  <p>Conteúdo no slot default.</p>
</DssDataCard>
```

### Com abas e paginação
```vue
<DssDataCard
  title="Registros"
  :tabs="[{ name: 'lista', label: 'Lista' }, { name: 'mapa', label: 'Mapa' }]"
  :total-items="87"
  :items-per-page="10"
  v-model="currentPage"
  brand="water"
>
  <template #tab-lista>
    <p>Página {{ currentPage }}</p>
  </template>
  <template #tab-mapa>
    <p>Visualização em mapa</p>
  </template>
</DssDataCard>
```

### Com ações e estados
```vue
<DssDataCard title="Dashboard" :loading="carregando" :disabled="somenteLeitura">
  <template #toolbar-actions>
    <DssButton variant="flat" icon="download" aria-label="Exportar" />
  </template>
  <template #footer>
    <small>Atualizado: {{ dataAtualizacao }}</small>
  </template>
</DssDataCard>
```

---

## 15. Histórico

| Data | Versão | Evento |
|---|---|---|
| 2026-04-24 | 1.0.0 | Criado como stress-test da Fase 3 |
| 2026-05-23 | 1.0.0 | Promovido para auditoria formal; arquivos completados; tokens corrigidos |
