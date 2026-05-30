# DssItemSection

**Versão:** 1.0.0 · **Fase:** 2 · **Status:** Pronto para Auditoria DSS v2.2

> Container de layout interno para itens de lista. Orquestra o alinhamento e o espaçamento de avatares, ícones, textos e ações secundárias dentro de um `DssItem`. Wrapper DSS governado sobre infraestrutura `QItemSection`.

---

## 1. Visão Geral

### O que é

`DssItemSection` é um **container de layout** que atua como coluna flex dentro de um `DssItem`. Seu papel é:

- Definir a posição (leading, main, trailing) e o comportamento de alinhamento de cada zona do item
- Garantir o ritmo de espaçamento interno do DssItem via tokens DSS (sobrescrevendo CSS nativo do Quasar — EXC-01)
- Acomodar avatares, ícones, texto e ações secundárias com semântica de layout clara

### O que NÃO é

`DssItemSection` **não** é interativo. Ele não captura eventos, não tem hover, focus ou cursor pointer. Toda interatividade pertence ao `DssItem` pai ou aos componentes colocados dentro da seção.

`DssItemSection` **não** gerencia tipografia. Isso é responsabilidade do `DssItemLabel` (Fase 2 — componente futuro).

### Equivalente Quasar

`QItemSection` — wrapper DSS governado. API idêntica ao QItemSection, com sobrescrita de espaçamentos via tokens DSS (EXC-01).

---

## 2. Classificação DSS

| Campo | Valor |
|-------|-------|
| **Fase** | 2 — Componente Estrutural |
| **Classificação** | Container de Layout Interno — coluna flex dentro do DssItem |
| **Golden Reference** | `DssAvatar` (para seções de mídia) |
| **Golden Context** | `DssList` (container pai da família) |
| **Interatividade** | Nenhuma — delegada ao DssItem pai |

---

## 3. Arquitetura e Responsabilidades

### Gate de Responsabilidade v2.4

| Responsabilidade | DssItemSection | DssItem | DssItemLabel |
|------------------|----------------|---------|--------------|
| Layout de coluna (flex) | ✅ | ❌ | ❌ |
| Alinhamento de avatar/thumbnail | ✅ | ❌ | ❌ |
| Espaçamento entre seções | ✅ | ❌ | ❌ |
| Hover / Focus / Active | ❌ | ✅ | ❌ |
| Touch target | ❌ | ✅ (se clickable) | ❌ |
| Tipografia estruturada (label + caption) | ❌ | ❌ | ✅ (futuro) |

### Hierarquia de Composição

```
DssList (container)
  └── DssItem (item — role="listitem" ou role="button")
       ├── DssItemSection [avatar] — zona leading
       │     └── DssAvatar / DssIcon / DssCheckbox
       ├── DssItemSection [main] — zona principal
       │     └── DssItemLabel (futuro) / texto / DssIcon
       └── DssItemSection [side] — zona trailing
             └── DssIcon / DssBadge / DssButton / DssToggle
```

---

## 4. API

### Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `avatar` | `Boolean` | `false` | Não | Seção de avatar — largura e espaçamento ajustados |
| `thumbnail` | `Boolean` | `false` | Não | Seção de thumbnail — largura para imagem em miniatura |
| `side` | `Boolean` | `false` | Não | Seção lateral — alinhamento à direita para ações |
| `top` | `Boolean` | `false` | Não | Alinha o conteúdo ao topo do item |
| `noWrap` | `Boolean` | `false` | Não | Impede quebra de linha do conteúdo interno |

**Props bloqueadas:** Nenhuma. A API do QItemSection é minimalista e não requer bloqueios.

### Slots

| Slot | Obrigatório | Descrição |
|------|-------------|-----------|
| `default` | Sim | Conteúdo da seção |

### Eventos

Nenhum. Componente não-interativo.

---

## 5. Exemplos de Uso

### 5.1 Seção Principal Simples

```vue
<DssItem>
  <DssItemSection>
    <span>Conteúdo principal do item</span>
  </DssItemSection>
</DssItem>
```

### 5.2 Com Avatar + Texto

```vue
<DssItem>
  <DssItemSection avatar>
    <DssAvatar color="primary" icon="person" />
  </DssItemSection>
  <DssItemSection>
    <div>Ana Silva</div>
    <div>Administradora</div>
  </DssItemSection>
</DssItem>
```

### 5.3 Ação Secundária (side)

```vue
<DssItem clickable @click="navigate">
  <DssItemSection>
    <span>Configurações</span>
  </DssItemSection>
  <DssItemSection side>
    <DssIcon name="chevron_right" />
  </DssItemSection>
</DssItem>
```

### 5.4 Alinhamento ao Topo (top) — Item multi-linha

```vue
<DssItem>
  <DssItemSection avatar top>
    <DssAvatar color="primary" icon="article" />
  </DssItemSection>
  <DssItemSection>
    <div>Título do documento</div>
    <div>
      Descrição longa com múltiplas linhas que exige alinhamento ao topo
      nas seções laterais para evitar centralização indesejada.
    </div>
  </DssItemSection>
  <DssItemSection side top>
    <span>há 2 dias</span>
  </DssItemSection>
</DssItem>
```

### 5.5 Com Toggle e Sem Quebra de Linha

```vue
<DssItem>
  <DssItemSection no-wrap>
    <span>Modo escuro ativado automaticamente</span>
  </DssItemSection>
  <DssItemSection side>
    <DssToggle v-model="darkMode" />
  </DssItemSection>
</DssItem>
```

---

## 6. Acessibilidade (WCAG 2.1 AA)

| Critério | Implementação |
|----------|---------------|
| Semântica de apresentação | `div` genérico sem role explícito — elemento de layout neutro |
| Semântica de item | Pertence ao DssItem (`role="listitem"` ou `role="button"`) |
| Touch target | Não aplicável — Option B (não-interativo, como DssAvatar Golden Reference) |
| Navegação por teclado | Delegada ao DssItem pai |
| Contraste | Tokens DSS garantem conformidade |
| Conteúdo interativo | Cada componente dentro da seção gerencia sua própria acessibilidade |

---

## 7. Matriz de Composição DSS

### Papel Estrutural

`DssItemSection` é o **container de coluna** dentro do `DssItem`. Ele define a zona (leading, main, trailing) e o comportamento de alinhamento, sem assumir ou impor estrutura interna.

### Componentes DSS Recomendados por Posição

| Posição | Props | Componentes | Fase |
|---------|-------|-------------|------|
| Leading | `avatar=true` | DssAvatar, DssIcon, DssCheckbox, DssRadio | 1 |
| Principal | (padrão) | DssItemLabel (futuro), texto, DssIcon | 1/2 |
| Trailing | `side=true` | DssIcon, DssBadge, DssButton, DssToggle | 1 |
| Thumbnail | `thumbnail=true` | `<img>`, DssAvatar (large) | 1 |

### Limites de Responsabilidade

- ✅ DssItemSection gerencia: layout de coluna, alinhamento, espaçamento (via EXC-01)
- ✅ DssItemSection comunica: zona do item via classes `dss-item-section--*`
- ❌ DssItemSection NÃO gerencia: estados interativos dos filhos
- ❌ DssItemSection NÃO estiliza: internos dos filhos via `::v-deep`
- ❌ DssItemSection NÃO define: tipografia (responsabilidade do DssItemLabel)

### Anti-Patterns

1. **Usar fora de DssItem:** `DssItemSection` requer `DssItem` como pai para layout flex funcionar
2. **Sobrescrever filhos:** Usar `::v-deep .dss-icon` dentro de `DssItemSection`
3. **Combinar avatar + side:** Semanticamente incoerente — a seção é avatar OU lateral
4. **Combinar avatar + thumbnail:** Dois modos mutuamente exclusivos
5. **Acessibilidade em seção:** Adicionar `role`, `aria-label` à seção em vez de ao componente filho interativo

### Plano Futuro

| Componente | Fase | Relação |
|------------|------|---------|
| `DssItemLabel` | 2 | Filho idiomático da seção principal — tipografia label+caption |

---

## 8. Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-font-family-sans` | L2 | Família tipográfica base |
| `--dss-font-size-md` | L2 | Tamanho de fonte base |
| `--dss-text-body` | L2 | Cor de texto padrão |
| `--dss-text-inverse` | L4 | Cor de texto em dark mode |
| `--dss-spacing-3` | L2 | Padding-right da seção avatar (EXC-01) |
| `--dss-spacing-4` | L2 | Padding-right da seção side (EXC-01) |
| `--dss-compact-control-height-md` | L2 | Min-width calculado da seção avatar (EXC-01) |

---

## 9. Exceções à Regra Token First

| ID | Valor / Seletor | Local | Justificativa |
|----|-----------------|-------|---------------|
| EXC-01 | Seletores compostos `.dss-item-section.q-item__section--side/avatar` | `2-composition/_base.scss` | Gate de Composição v2.4. O QItemSection aplica padding e min-width hardcoded nas classes internas. Seletores compostos DSS+Quasar são a única forma de sobrescrever CSS de terceiros com tokens DSS. |
| EXC-02 | `ButtonText` (CSS system keyword) | `4-output/_states.scss` | Forced-colors mode. System keywords obrigatórios — tokens CSS são ignorados pelo navegador neste modo. Padrão canônico DSS. |

---

## 10. Comparação com Equivalente Quasar (QItemSection)

| Característica | QItemSection | DssItemSection | Nota |
|----------------|--------------|----------------|------|
| `avatar` | ✅ | ✅ | — |
| `thumbnail` | ✅ | ✅ | — |
| `side` | ✅ | ✅ | — |
| `top` | ✅ | ✅ | — |
| `noWrap` | ✅ | ✅ | — |
| `dark` | ✅ | ❌ | Bloqueado — governança global via `[data-theme="dark"]` |
| Espaçamentos | Hardcoded (Quasar) | Tokens DSS | DSS sobrescreve via EXC-01 |

> **Declaração:** `DssItemSection` é um wrapper DSS governado sobre infraestrutura QItemSection. Diverge do QItemSection apenas no sistema de espaçamento (tokens vs. hardcoded) e no gerenciamento do dark mode.

---

## 11. Comportamentos Implícitos

### Forwarding de Atributos

`DssItemSection` usa `inheritAttrs: false` e aplica `v-bind="$attrs"` no `<q-item-section>` raiz. Atributos extras (`id`, `class`, `data-*`) são aplicados ao container da seção.

```vue
<!-- Input do consumidor -->
<DssItemSection id="leading" data-testid="avatar-section" class="my-section" />

<!-- Renderizado -->
<div
  class="q-item__section q-item__section--main dss-item-section my-section"
  id="leading"
  data-testid="avatar-section"
/>
```

### Estratégia de CSS Global

Estilos carregados **globalmente via `dist/style.css`** — padrão alinhado com DssItem, DssSeparator e DssList (família de lista, todos selados). Sem `<style>` block próprio no componente.

### Sobrescrita de CSS Quasar (EXC-01)

Os seletores compostos `.dss-item-section.q-item__section--side` e `.dss-item-section.q-item__section--avatar` são necessários porque o elemento renderizado carrega **ambas** as classes simultaneamente. A especificidade extra garante que os valores DSS prevalecem sobre os do Quasar.

### Hierarquia de Classes no Elemento Renderizado

```html
<!-- DssItemSection avatar=true renderizado -->
<div class="q-item__section q-item__section--side q-item__section--avatar dss-item-section dss-item-section--avatar">
  <!-- conteúdo -->
</div>
```

O seletor `.dss-item-section.q-item__section--avatar { padding-right: var(--dss-spacing-3) }` tem maior especificidade que `.q-item__section--avatar { padding-right: 16px }` e prevalece.

---

## 12. Reconciliação Transversal

### SCSS ↔ Documentação

Todos os tokens documentados na seção 8 estão presentes no código SCSS. Zero tokens fantasma.

### SCSS ↔ Exceções

EXC-01 e EXC-02 registrados em `dss.meta.json`. Comentários inline nos arquivos SCSS correspondentes.

### Código ↔ Documentação

Todas as props documentadas implementadas em `item-section.types.ts` e no componente Vue. Nenhuma prop bloqueada (API QItemSection já é minimalista).

### Golden Context (DssList) ↔ DssItemSection

Comparação explícita em `DSSITEMSECTION_API.md` (Paridade com Golden Context). Divergências justificadas: nível hierárquico diferente, role diferente, brand diferente.

---

**Componente PRONTO PARA AUDITORIA DSS v2.2**
