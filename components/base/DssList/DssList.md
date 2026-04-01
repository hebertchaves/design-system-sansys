# DssList

**Versão:** 1.0.0 · **Fase:** 2 · **Status:** Pronto para Auditoria DSS v2.2

> Container de layout não-interativo para agrupamento semântico de itens de lista (`DssItem`) e separadores (`DssSeparator`). Fornece contexto visual compartilhado (bordas, padding, separadores automáticos) sem assumir interatividade própria.

---

## 1. Visão Geral

### O que é

`DssList` é um **container estrutural** que atua como orquestrador visual de uma sequência de itens. Seu papel é:

- Prover semântica `role="list"` (acessibilidade)
- Aplicar bordas externas opcionais (prop `bordered`)
- Gerenciar espaçamento interno (prop `padding`)
- Inserir divisores automáticos entre itens (prop `separator`)
- Comunicar identidade de marca via `[data-brand]` (prop `brand`)

### O que NÃO é

`DssList` **não** é interativo. Ele não captura eventos, não tem hover, focus ou cursor pointer. Toda interatividade é delegada aos filhos (`DssItem`).

### Equivalente Quasar

`QList` — porém com API governada e props `dark`/`dense` bloqueadas por decisão arquitetural DSS.

---

## 2. Classificação DSS

| Campo | Valor |
|-------|-------|
| **Fase** | 2 — Composto/Estrutural |
| **Classificação** | Container de Layout Não-Interativo |
| **Golden Reference** | `DssBadge` (não-interativo, Option B) |
| **Golden Context** | `DssCard` (container estrutural) |
| **Interatividade** | Nenhuma — delegada completamente aos filhos |

---

## 3. Arquitetura e Responsabilidades

### Gate de Responsabilidade v2.4

| Responsabilidade | DssList | DssItem |
|------------------|---------|---------|
| Layout container | ✅ | ❌ |
| Bordas externas | ✅ | ❌ |
| Separadores entre itens | ✅ | ❌ |
| Hover / Focus / Active | ❌ | ✅ |
| Click / Keyboard nav | ❌ | ✅ |
| Disabled / Loading | ❌ | ✅ |
| Touch target | ❌ | ✅ (se clickable) |

### Composição

```
DssList (container)
  └── DssItem (filho — role="listitem" ou role="button")
       ├── [leading slot] — DssIcon, DssAvatar, DssCheckbox, etc.
       ├── [default slot] — conteúdo personalizado
       └── [trailing slot] — DssIcon, DssBadge, DssToggle, etc.
```

---

## 4. API

### Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `bordered` | `Boolean` | `false` | Não | Borda externa + border-radius |
| `padding` | `Boolean` | `false` | Não | Padding vertical nas extremidades |
| `separator` | `Boolean` | `false` | Não | Divisores automáticos entre filhos |
| `brand` | `'hub'\|'water'\|'waste'\|null` | `null` | Não | Acento de marca (requer bordered) |
| `ariaLabel` | `String` | `undefined` | Não | Label acessível |
| `ariaLabelledby` | `String` | `undefined` | Não | ID do elemento label |

**Props bloqueadas:**

| Prop | Motivo |
|------|--------|
| `dark` | Governança global via `[data-theme="dark"]` |
| `dense` | Responsabilidade dos DssItems individualmente |

### Slots

| Slot | Obrigatório | Descrição |
|------|-------------|-----------|
| `default` | Sim | Filhos da lista (DssItem, DssSeparator) |

### Eventos

Nenhum. Componente não-interativo.

---

## 5. Exemplos de Uso

### 5.1 Lista Simples

```vue
<DssList aria-label="Opções de navegação">
  <DssItem label="Início" />
  <DssItem label="Produtos" />
  <DssItem label="Contato" />
</DssList>
```

### 5.2 Com Bordas e Separadores

```vue
<DssList bordered separator aria-label="Lista de usuários">
  <DssItem label="Ana Silva" caption="Admin" clickable @click="openUser('ana')" />
  <DssItem label="Bruno Souza" caption="Dev" clickable @click="openUser('bruno')" />
</DssList>
```

### 5.3 Com Padding

```vue
<DssList padding bordered>
  <DssItem label="Configurações" clickable />
  <DssItem label="Sair" clickable />
</DssList>
```

### 5.4 Com Brand

```vue
<DssList bordered separator brand="hub">
  <DssItem label="Dashboard" clickable brand="hub" />
  <DssItem label="Relatórios" clickable brand="hub" />
</DssList>
```

### 5.5 Com DssSeparator Manual

```vue
<DssList bordered padding>
  <DssItem label="Perfil" clickable />
  <DssSeparator />
  <DssItem label="Sair" clickable />
</DssList>
```

---

## 6. Acessibilidade (WCAG 2.1 AA)

| Critério | Implementação |
|----------|---------------|
| Semântica de lista | `role="list"` no container |
| Semântica de item | `DssItem` aplica `role="listitem"` (estático) ou `role="button"` (clickable) |
| Label descritivo | `aria-label` e `aria-labelledby` disponíveis |
| Touch target | Não aplicável — Option B (não-interativo, como DssBadge) |
| Navegação por teclado | Delegada aos DssItems |
| Contraste | Tokens DSS garantem conformidade |

**Recomendação:** Sempre forneça `ariaLabel` ou `ariaLabelledby` para identificar o propósito da lista em contextos onde o título visual pode não estar presente.

---

## 7. Matriz de Composição DSS

### Papel Estrutural

`DssList` é o **container orquestrador**. Ele define o contexto visual mas não impõe estrutura interna.

### Componentes DSS Recomendados

| Componente | Fase | Uso Típico |
|------------|------|------------|
| `DssItem` | 1 | Filho principal — estático ou clickable |
| `DssSeparator` | 1 | Divisor explícito entre grupos |
| `DssIcon` | 1 | No slot `leading` ou `trailing` do DssItem |
| `DssBadge` | 1 | No slot `trailing` do DssItem |
| `DssAvatar` | 1 | No slot `leading` do DssItem |
| `DssToggle` | 1 | No slot `trailing` do DssItem |
| `DssCheckbox` | 1 | No slot `leading` do DssItem |
| `DssRadio` | 1 | No slot `leading` do DssItem |

### Limites de Responsabilidade

- ✅ DssList gerencia: layout container, bordas externas, separadores automáticos
- ✅ DssList comunica: brand identity via `data-brand`
- ❌ DssList NÃO gerencia: estados interativos dos filhos
- ❌ DssList NÃO estiliza: internos dos filhos via `::v-deep`
- ❌ DssList NÃO cria: dependências técnicas obrigatórias nos filhos

### Anti-Patterns

1. **HTML nativo como filho:** Usar `<li>` ou `<div>` direto em vez de `DssItem`
2. **Sobrescrever filho:** Usar `::v-deep .dss-item` dentro de DssList
3. **Dense global:** Tentar forçar dense em todos os filhos via DssList
4. **Menus flutuantes:** Usar DssList para menus contextuais (usar `q-menu`)
5. **Aninhamento excessivo:** Mais de 2 níveis de DssList sem hierarquia clara
6. **Mistura separator + DssSeparator:** Usar as duas abordagens ao mesmo tempo dobra os separadores

### Plano Futuro

| Componente | Fase | Relação |
|------------|------|---------|
| `DssItemSection` | 2 | Filho do DssItem para layouts complexos |
| `DssItemLabel` | 2 | Filho do DssItem para hierarquia label+caption tipada |

---

## 8. Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-font-family-sans` | L2 | Família tipográfica base |
| `--dss-font-size-md` | L2 | Tamanho de fonte base |
| `--dss-text-body` | L2 | Cor de texto padrão |
| `--dss-text-inverse` | L4 | Cor de texto em dark mode |
| `--dss-border-width-thin` | L3 | Largura de borda/separador |
| `--dss-border-width-md` | L4 | High contrast mode |
| `--dss-border-width-thick` | L4 | Acento de marca |
| `--dss-gray-200` | L3 | Cor do separador |
| `--dss-gray-300` | L3 | Cor da borda externa |
| `--dss-radius-md` | L3 | Border-radius do container bordered |
| `--dss-spacing-2` | L3 | Padding vertical |
| `--dss-hub-300/400/600/700` | L4 | Brand Hub |
| `--dss-water-200/300/400/500/600` | L4 | Brand Water |
| `--dss-waste-200/300/500/600/700` | L4 | Brand Waste |

---

## 9. Exceções à Regra Token First

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `rgba(255,255,255,0.2)` | `4-output/_states.scss` | Dark mode border. Sem token DSS com white+alpha. |
| EXC-02 | `rgba(255,255,255,0.12)` | `4-output/_states.scss` | Dark mode separator. Padrão Material Design. |
| EXC-03 | `2px solid ButtonText` | `4-output/_states.scss` | Forced-colors. System keywords obrigatórios. |
| EXC-04 | `1px solid ButtonText` | `4-output/_states.scss` | Forced-colors separator. Obrigatório. |
| EXC-05 | `4px solid Highlight` | `4-output/_states.scss` | Forced-colors brand accent. Obrigatório. |
| EXC-06 | Seletor `.dss-list--separator > * + *` | `3-variants/_separator.scss` | Gate de Composição v2.4. Separadores automáticos CSS. |

---

## 10. Comparação com Equivalente Quasar (QList)

| Característica | QList | DssList | Nota |
|----------------|-------|---------|------|
| `bordered` | ✅ | ✅ | — |
| `padding` | ✅ | ✅ | — |
| `separator` | ✅ | ✅ | — |
| `dark` | ✅ | ❌ | Bloqueado — governança global |
| `dense` | ✅ | ❌ | Bloqueado — responsabilidade dos filhos |
| `role="list"` | Implícito | Explícito | DSS declara explicitamente |
| Brand | ❌ | ✅ | Feature exclusiva DSS |

> **Declaração:** `DssList` é um wrapper DSS governado sobre infraestrutura QList. Não é 100% compatível com a API do QList por decisão arquitetural.

---

## 11. Comportamentos Implícitos

### Dark Mode + `bordered` + `brand` (acento de marca)

> **Nota:** Em dark mode com `bordered=true` e `brand` ativo, o acento de marca (`border-left` colorida) é substituído pela borda white-alpha padrão de dark mode (`rgba(255, 255, 255, 0.2)`). Este é um comportamento intencional e idêntico ao DssCard (Golden Context, selado em fev/2026). A regra de dark mode em `4-output/_states.scss` tem especificidade igual à de `4-output/_brands.scss` e é declarada após, prevalecendo no cascade CSS. O acento de marca é totalmente visível em light mode.

### Estratégia de Carregamento CSS

Os estilos são carregados **globalmente via `dist/style.css`** — padrão alinhado com DssItem e DssSeparator (Fase 1, selados). O componente não contém `<style>` block próprio.

### Forwarding de Atributos

`DssList` usa `inheritAttrs: false` e aplica `v-bind="$attrs"` no elemento raiz. Atributos extras (`id`, `class`, `data-*`) são aplicados ao container da lista.

---

## 12. Reconciliação Transversal

### SCSS ↔ CSS

Compilado confirmado. Zero erros. Camadas L2→L3→L4 importadas em ordem no orquestrador.

### SCSS ↔ Documentação

Todos os tokens documentados na seção 8 estão presentes no código SCSS. Zero tokens fantasma.

### Código ↔ Documentação

Todas as props documentadas estão implementadas em `list.types.ts` e no componente Vue. Props bloqueadas documentadas com justificativa.

### Golden Context (DssCard) ↔ DssList

Comparação explícita na seção [DSSLIST_API.md#paridade](./DSSLIST_API.md). Divergências justificadas.

---

**Componente PRONTO PARA AUDITORIA DSS v2.2**
