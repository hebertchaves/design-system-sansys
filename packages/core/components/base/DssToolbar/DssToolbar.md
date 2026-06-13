# DssToolbar — Documentação Normativa DSS v2.2

> **Status:** Pendente de auditoria DSS v2.2  
> **Fase:** 2 — Container estrutural horizontal  
> **Categoria:** Container estrutural horizontal — wrapper DSS governado sobre QToolbar  
> **Golden Reference:** DssCard  
> **Golden Context:** DssTabs

---

## 1. Visão Geral

`DssToolbar` é uma barra de ferramentas horizontal. É um **container estrutural não-interativo** — wrapper DSS governado sobre `QToolbar` do Quasar.

Sua função é fornecer um container flexbox horizontal com altura padronizada e suporte a brandabilidade, servindo como bloco de construção base para headers, footers e barras de ações internas.

### Classificação

| Atributo | Valor |
|---------|-------|
| **Categoria** | Container estrutural horizontal |
| **Tipo** | Fase 2 — Container estrutural não-interativo |
| **Nível Quasar** | Nível 1 Independente (`<q-toolbar>` direto) |
| **Interatividade** | Nenhuma — container puro |
| **Brandabilidade** | Sim — prop `brand` + `[data-brand]` automático |

### Quando usar

- Como barra principal de navegação de uma página (header)
- Como barra de ações em um card ou modal
- Como rodapé de diálogo com ações
- Sempre que precisar de um container flexbox horizontal com altura padronizada

### Quando NÃO usar

- Para navegação por abas — use `DssTab` + `DssTabs`
- Para listas de ações verticais — use `DssList` + `DssItem`
- Para menus suspensos — use `DssBtnDropdown`

---

## 2. Anatomia

```
┌──────────────────────────────────────────────────────────────┐
│  .dss-toolbar (.q-toolbar)                                    │
│  ┌──────────┬──────────────────────────────┬───────────────┐ │
│  │ [slot]   │   [slot: conteúdo]           │   [slot]      │ │
│  │ DssButton│   título / texto             │   DssButton   │ │
│  └──────────┴──────────────────────────────┴───────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Partes:**
- **Container raiz** (`.dss-toolbar`) — FrameNode com `display: flex; flex-direction: row`
- **Slot default** — conteúdo do consumidor (DssButton, texto, DssIcon, q-space)

**Nota:** DssToolbar NÃO tem partes internas próprias. Toda composição interna é responsabilidade do consumidor.

---

## 3. API Pública

### 3.1 Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `inset` | `boolean` | `false` | Adiciona recuo extra à esquerda — padding-inline-start de 16px → 24px |
| `brand` | `'hub' \| 'water' \| 'waste'` | `undefined` | Aplica cor de fundo da brand. Ativa `[data-brand]` no elemento |

### 3.2 Props Bloqueadas

| Prop Quasar | Motivo do Bloqueio |
|-------------|-------------------|
| `dark` | Modo escuro governado globalmente via `[data-theme="dark"]` |
| `glossy` | Efeito visual não utilizado no DSS |
| `color` | Cor de fundo governada por tokens DSS + prop `brand` |
| `text-color` | Cor de texto governada por tokens DSS (`--dss-text-body` / `--dss-text-inverse`) |

### 3.3 Props Pass-through (via `$attrs`)

| Prop | Comportamento |
|------|--------------|
| `dense` | Encaminhado via `$attrs` ao QToolbar → aplica `.q-toolbar--dense` (40px vs 56px) |
| `aria-label` | Encaminhado via `$attrs` — **recomendado** para acessibilidade |

### 3.4 Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo da barra de ferramentas. Tipicamente: `DssButton`, texto, `DssIcon`, `q-space` |

### 3.5 Eventos

Nenhum evento emitido pelo DssToolbar. Eventos são responsabilidade dos componentes filhos.

---

## 4. Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-spacing-14` | L2 base | `min-height` padrão (56px) |
| `--dss-spacing-10` | L3 dense | `min-height` compacto (40px) |
| `--dss-spacing-4` | L2 base / L3 dense | `padding-inline` padrão (16px) / dense (12px) |
| `--dss-spacing-6` | L2 base | `padding-inline-start` inset (24px) |
| `--dss-spacing-3` | L3 dense | `padding-inline` dense (12px) |
| `--dss-text-body` | L2 base | Cor padrão do texto |
| `--dss-text-inverse` | L4 brands | Cor do texto sobre brand |
| `--dss-hub-600` | L4 brands | Fundo brand Hub |
| `--dss-water-600` | L4 brands | Fundo brand Water |
| `--dss-waste-600` | L4 brands | Fundo brand Waste |
| `--dss-border-width-thin` | L4 states | Contorno high-contrast / forced-colors |

---

## 5. Classes CSS Geradas

| Classe | Condição |
|--------|---------|
| `dss-toolbar` | Sempre — classe base |
| `dss-toolbar--inset` | `inset === true` |
| `dss-toolbar--brand-hub` | `brand === 'hub'` |
| `dss-toolbar--brand-water` | `brand === 'water'` |
| `dss-toolbar--brand-waste` | `brand === 'waste'` |

---

## 6. Estados Visuais

### Estados Aplicáveis

| Estado | Implementação |
|--------|--------------|
| **default** | Fundo transparente, texto `--dss-text-body` |
| **branded** | Fundo `--dss-{brand}-600`, texto `--dss-text-inverse` |
| **branded + dense** | Idêntico ao branded, altura reduzida a 40px |

### Estados NÃO Aplicáveis

| Estado | Justificativa |
|--------|--------------|
| `hover` | DssToolbar é container não-interativo. Hover é responsabilidade dos filhos. |
| `focus` | Container não recebe foco. Filhos gerenciam foco. |
| `active` | Idem — sem ação no container. |
| `disabled` | Pertence ao conteúdo, não ao container. |
| `loading` | Pertence ao conteúdo, não ao container. |
| `error` | Pertence ao conteúdo, não ao container. |
| `indeterminate` | Não aplicável a containers. |

---

## 7. Comportamentos Implícitos

### 7.1 Propagação de `[data-brand]`

Quando a prop `brand` é definida:
1. O template adiciona `data-brand="{brand}"` ao elemento raiz via `v-bind="brandAttr"`
2. Componentes filhos que respondem a `[data-brand]` herdam automaticamente as cores da brand
3. Isso permite que `DssButton`, `DssIcon`, etc. adaptem sua aparência sem configuração extra

```html
<!-- Input: brand="hub" -->
<DssToolbar brand="hub">
  <DssButton flat round icon="menu" />
</DssToolbar>

<!-- Output no DOM: -->
<div class="q-toolbar dss-toolbar dss-toolbar--brand-hub" data-brand="hub" role="toolbar">
  <!-- DssButton usa cores hub automaticamente via [data-brand="hub"] -->
</div>
```

### 7.2 Pass-through via `$attrs`

`inheritAttrs: false` está ativo. Atributos não declarados como props são encaminhados para o `<q-toolbar>` via `v-bind="{ ...$attrs, ...brandAttr }"`.

Isso garante que:
- `dense` ative `.q-toolbar--dense` no QToolbar (reduz altura para 40px)
- `aria-label` seja aplicado no elemento raiz para acessibilidade
- Outros atributos HTML válidos sejam respeitados

### 7.3 Comportamento de Layout

O DssToolbar configura o container para:
- `display: flex` com `flex-direction: row`
- `align-items: center` — alinhamento vertical centralizado
- `flex-wrap: nowrap` — sem quebra de linha
- `width: 100%` — ocupa largura total disponível

---

## 8. Governança

### 8.1 Gate de Composição v2.4

**Regra 1 — Uso de primitivo Quasar diretamente:**  
DssToolbar usa `<q-toolbar>` (primitivo Quasar Nível 1 Independente). As classes `.dss-toolbar` são aplicadas no mesmo elemento raiz que `.q-toolbar`.

A sobrescrita dos defaults Quasar (`min-height: 50px`, `padding: 0 12px`) é feita via cascata CSS (mesma especificidade, ordem posterior) — **sem seletor composto necessário** para L2.

**Exceção L3 (Dense):** `.dss-toolbar.q-toolbar--dense` usa seletor composto porque `dense` é gerenciado nativamente pelo QToolbar via `$attrs`, não via prop DSS explícita. Documentado como **EXC-01**.

### 8.2 Gate de Responsabilidade v2.4

DssToolbar é **100% não-interativo**. Nenhum estado hover/focus/active é definido no container. Toda interatividade é responsabilidade dos componentes filhos.

### 8.3 Matriz de Composição

| Papel | Componentes Recomendados |
|-------|--------------------------|
| Ações (ícone) | `DssButton` (variante flat/ghost/round) |
| Título / texto | `<span>` com classe tipográfica (`text-h6`, `text-subtitle1`) |
| Ícone decorativo | `DssIcon` |
| Espaçador | `DssSpace` / `q-space` |
| Separador vertical | `DssSeparator` (vertical) |

**Padrões recomendados:**
- Menu à esquerda + título no centro + ações à direita
- Título à esquerda + ações à direita
- Somente icon buttons (round)

**Anti-patterns:**
- Usar HTML nativo `<button>` em vez de `DssButton`
- Sobrescrever estilos internos de `DssButton` via `::v-deep` dentro do DssToolbar
- Aninhar toolbars (DssToolbar dentro de DssToolbar)
- Adicionar estados hover/focus ao container

---

## 9. Acessibilidade

### 9.1 Semântica ARIA

| Atributo | Valor | Fonte |
|---------|-------|-------|
| `role` | `toolbar` | Herdado nativamente do QToolbar |
| `aria-label` | Definido pelo consumidor | Via `$attrs` — **recomendado** |

O QToolbar do Quasar define `role="toolbar"` na div raiz nativamente. O DssToolbar herda esse comportamento sem necessidade de declaração explícita.

**Recomendação:** Sempre definir `aria-label` descritivo:
```vue
<DssToolbar aria-label="Barra de navegação principal">
```

### 9.2 Touch Target

**Opção B — Não implementado.** DssToolbar é container, não controle interativo. Touch targets são responsabilidade dos filhos (DssButton, etc.).

### 9.3 Navegação por Teclado

Não gerenciada pelo DssToolbar. A navegação entre elementos da toolbar é responsabilidade dos filhos e do browser. O `role="toolbar"` sugere navegação com Tab entre grupos e setas entre itens — implementação é do browser e dos componentes filhos.

### 9.4 Contraste de Cores

| Brand | Contraste (texto branco) | WCAG |
|-------|--------------------------|------|
| Sem brand (padrão) | Depende do contexto | — |
| Hub (`--dss-hub-600`) | ~2.8:1 | AA para texto grande/bold (≥18pt ou 14pt bold) — **EXC-02** |
| Water (`--dss-water-600`) | ~7.0:1 | AA + AAA ✓ |
| Waste (`--dss-waste-600`) | ~5.0:1 | AA ✓ |

⚠️ **Hub brand:** O consumidor DEVE garantir que o conteúdo em `brand="hub"` seja texto grande ou bold para atender WCAG AA.

### 9.5 Forced Colors / High Contrast

Em `forced-colors: active` (Windows High Contrast), tokens CSS são ignorados. O DssToolbar aplica keywords de cor do sistema (`ButtonFace`, `ButtonText`) conforme padrão canônico DSS. Documentado como **EXC-03**.

---

## 10. Paridade com Golden Reference (DssCard)

DssCard é o Golden Reference para DssToolbar. Ambos são containers estruturais não-interativos que:
- Fornecem layout e superfície visual para elementos filhos
- Não têm estados hover/focus/active próprios
- Suportam brandabilidade via `[data-brand]`
- Herdam pattern de dual seletor em `_brands.scss`

| Característica | DssCard | DssToolbar |
|----------------|---------|------------|
| Interatividade | Nenhuma | Nenhuma |
| Brandabilidade | Via `[data-brand]` | Via `[data-brand]` |
| Touch target | N/A | N/A |
| Overflow | Sim (diversas variantes) | Não aplicável |
| Estados | default, branded | default, branded |
| Filhos gerenciados | DssCardSection, DssCardActions | N/A (livre) |

**Diferença principal:** DssToolbar é horizontal (barra) enquanto DssCard é uma superfície bidimensional. DssToolbar não tem sub-componentes DSS dedicados — composição é totalmente livre.

---

## 11. Exceções Documentadas

### EXC-01 — Seletor Composto com Classe Quasar Interna
**Localização:** `2-composition/_base.scss`, `3-variants/_dense.scss`  
**Valor:** `.dss-toolbar` (L2 sem composto), `.dss-toolbar.q-toolbar--dense` (L3 composto)  
**Gates violados:** Gate de Composição v2.4 — Regra 1 (L3)  
**Justificativa:** L2 usa cascata pura sem composto (aceitável). L3 usa seletor composto com `.q-toolbar--dense` porque `dense` é gerenciado pelo QToolbar via `$attrs` — não há prop DSS explícita para referenciar. Sem o composto, os estilos dense sobrescreveriam qualquer `.dss-toolbar`.

### EXC-02 — Contraste Hub Brand Abaixo do AA Normal
**Localização:** `4-output/_brands.scss`  
**Valor:** `background-color: var(--dss-hub-600)` (#ef7a11) com `--dss-text-inverse` (branco)  
**Justificativa:** Hub-600 (#ef7a11) com texto branco: contraste ~2.8:1 — abaixo de 4.5:1 (AA texto normal), mas atende 3:1 (AA texto grande ≥18pt ou bold ≥14pt). `hub-600` é a cor oficial do produto Hub — usar `hub-800` (contraste ~6:1) divergiria do guideline de brand. Consumidor deve garantir texto grande ou bold.

### EXC-03 — Forced Colors: System Color Keywords
**Localização:** `4-output/_states.scss`  
**Valor:** `ButtonFace`, `ButtonText`, `Canvas`, `CanvasText`  
**Justificativa:** Em `forced-colors: active`, tokens CSS são ignorados pelo browser. Keywords de cor do sistema são obrigatórias. Padrão canônico DSS (precedente: DssTab, DssStep).

### EXC-04 — Print: Valores Hardcoded
**Localização:** `4-output/_states.scss`  
**Valor:** `#000 !important`, `transparent !important`  
**Justificativa:** Impressão monocromática. Tokens CSS podem não ser resolvidos em contexto de impressão. Valores hardcoded garantem legibilidade. Precedente: DssTab, DssStep.

---

## 12. Componentes Futuros Dependentes

| Componente | Dependência |
|-----------|-------------|
| `DssHeader` | Usa DssToolbar como container de navegação principal |
| `DssFooter` | Usa DssToolbar como container de rodapé |
| `DssToolbarTitle` | Slot dedicado para título com tipografia governada |

---

## 13. Histórico

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0.0 | 2026-04-16 | Criação inicial — PRONTO PARA AUDITORIA DSS v2.2 |
