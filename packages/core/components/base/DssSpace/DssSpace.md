# DssSpace

> Elemento de preenchimento de espaço flexível — puro layout, sem conteúdo visual.

---

## 1. Visão Geral

`DssSpace` é o componente de preenchimento de espaço flexível do Design System Sansys. Seu único propósito é ocupar o espaço disponível restante em um flex container, empurrando os elementos ao redor para as extremidades.

**O que é**: Um `<div aria-hidden="true">` com `flex: 1 1 auto` (modo padrão) ou dimensão fixa via token de spacing (modo fixo).

**O que não é**: Um separador visual (sem borda, sem cor), um container de conteúdo (sem slots), um elemento interativo (sem hover, foco ou clique).

### Relação com DssSeparator

| Componente | Função | Tem visual | Tem semântica |
|------------|--------|------------|---------------|
| `DssSeparator` | Divide visualmente | Sim (borda, cor) | Sim (role="separator") |
| `DssSpace` | Preenche invisível | Não | Não (aria-hidden) |

Use `DssSeparator` quando precisar de uma linha divisória. Use `DssSpace` quando precisar de espaço de layout.

---

## 2. Quando Usar / Não Usar

### ✅ Usar quando:
- Empurrar ações para a extremidade direita de uma toolbar
- Separar logotipo de navegação em um header
- Alinhar botões nas extremidades de uma linha de ações
- Criar um espaço de tamanho governado entre elementos em linha (com prop `size`)

### ❌ Não usar quando:
- Adicionar espaçamento entre parágrafos, cards ou elementos de conteúdo → use `margin`/`padding` com tokens de spacing
- Fora de um flex container → `flex: 1 1 auto` não tem efeito em contextos não-flex
- Como substituto de `gap` em flex containers com múltiplos filhos → `gap` é mais semântico

---

## 3. Especificação Técnica

### 3.1 Dois Modos de Operação

#### Modo Flex-Grow (padrão, sem prop)
```vue
<DssSpace />
```
Comportamento: `flex: 1 1 auto` — o elemento se expande para ocupar **todo** o espaço disponível restante no flex container.

#### Modo Tamanho Fixo (com prop `size`)
```vue
<DssSpace size="4" />  <!-- 16px fixo -->
```
Comportamento: `flex: 0 0 auto` + `width`/`height` via `var(--dss-spacing-{size})` — cria um espaço de dimensão governada e fixa.

### 3.2 Elemento HTML

`DssSpace` renderiza sempre como `<div aria-hidden="true">`. Não há alternância de elemento (ao contrário do `DssSeparator` que usa `<hr>` ou `<div role="separator">`).

Justificativa para elemento nativo vs QSpace:
O Quasar fornece `<q-space>` com comportamento idêntico. O `DssSpace` não encapsula `q-space` por design — ele implementa diretamente a lógica de flex-grow para: (a) eliminar a dependência do Quasar para um elemento tão simples, (b) adicionar o modo `size` com tokens governados, (c) garantir `aria-hidden="true"` estático por padrão.

### 3.3 Comportamentos Implícitos Declarados

| Comportamento | Valor | Justificativa |
|---------------|-------|---------------|
| `inheritAttrs` | `true` (padrão Vue) | Atributos extras (data-testid, id) são aplicados ao `<div>` raiz |
| `aria-hidden` | `"true"` estático | Sempre oculto de leitores de tela — não é prop |
| Slots | Nenhum | Componente de layout puro sem conteúdo |
| Events | Nenhum | Não interativo |

---

## 4. Acessibilidade

### 4.1 Touch Target

**Opção B — Não implementado.**

`DssSpace` é um elemento de layout puro, não interativo. Não há hover, foco, clique ou qualquer forma de interação. Touch target não se aplica.

Referência: mesmo padrão do `DssBadge` (Golden Reference) e `DssSeparator` (Golden Context).

### 4.2 `aria-hidden="true"` Estático

`DssSpace` **sempre** é invisível para tecnologias assistivas. Diferente do `DssSeparator` — que pode ter semântica de separação relevante em determinados contextos — o `DssSpace` nunca carrega informação semântica.

Por isso, `aria-hidden` não é implementado como prop (como no `DssSeparator`), mas como atributo estático no template.

### 4.3 Estados de Acessibilidade Não Aplicáveis

| Estado | Aplicabilidade |
|--------|----------------|
| `prefers-contrast: more` | ❌ Sem cor, sem borda — nada a reforçar |
| `forced-colors: active` | ❌ Sem cor — tokens não são afetados |
| `prefers-reduced-motion` | ❌ Sem animações — mixin dss-transition não utilizado |
| `[data-theme="dark"]` | ❌ Sem cor — não há o que adaptar |
| Brands (`[data-brand="hub"]`) | ❌ Sem cor — não há o que adaptar |

**Print**: `display: none` — espaços de layout puro não têm significado em mídia impressa.

---

## 5. Golden Component

### 5.1 Golden Reference: DssBadge

DssBadge é o Golden Reference para componentes não-interativos no DSS. `DssSpace` segue as mesmas decisões arquiteturais fundamentais:
- Touch target: Opção B (não aplicável)
- Sem estados de interação (hover, focus, active, disabled)
- Aria-hidden como mecanismo de invisibilidade

### 5.2 Golden Context: DssSeparator

`DssSeparator` é o Golden Context porque é o componente estrutural/decorativo mais próximo em natureza. Ambos são elementos de layout puro, não-interativos, sem conteúdo semântico próprio gerado internamente.

**Justificativa da escolha de DssSeparator como Golden Context**: Embora DssSeparator tenha mais complexidade visual (5 cores, 4 tamanhos, dark mode, forced-colors), ele representa o baseline correto para componentes de infraestrutura de layout. A paridade de decisões arquiteturais (4 camadas, Entry Point Wrapper, Barrel Export, Touch Target Opção B) é mais relevante do que encontrar um Golden Context de complexidade equivalente, que não existe no DSS Fase 1 para este caso.

### 5.3 Paridade com Golden Context (DssSeparator)

| Aspecto | DssSeparator | DssSpace | Diferença |
|---------|-------------|----------|-----------|
| Touch Target | Opção B | Opção B | Igual |
| Arquitetura 4 camadas | ✅ | ✅ | Igual |
| Entry Point Wrapper | ✅ | ✅ | Igual |
| Barrel Export (types + composables) | ✅ | ✅ | Igual |
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Igual |
| Mixin `dss-transition` | ✅ (cor muda) | ❌ (sem cor) | Diferente — justificado: sem propriedades animáveis |
| `aria-hidden` | Prop opcional | Atributo estático | Diferente — justificado: DssSpace nunca tem semântica |
| Elemento HTML | `<hr>` ou `<div role>` | Sempre `<div>` | Diferente — justificado: sem role semântico aplicável |
| Dark mode | ✅ (EXC-01 rgba) | ❌ | Diferente — justificado: sem cor |
| prefers-contrast | ✅ | ❌ | Diferente — justificado: sem cor, sem borda |
| forced-colors | ✅ (EXC-02 1px) | ❌ | Diferente — justificado: sem cor |
| `_brands.scss` | ✅ (hub/water/waste) | Arquivo vazio | Diferente — justificado: sem cor |
| Prop `size` | Não existe | ✅ | Diferente — funcionalidade adicional governada |

---

## 6. Tokens Utilizados

Todos os tokens referenciados são tokens de spacing genéricos existentes no catálogo DSS:

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-spacing-px` | 1px | size="px" |
| `--dss-spacing-0_5` | 2px | size="0_5" |
| `--dss-spacing-1` | 4px | size="1" |
| `--dss-spacing-1_5` | 6px | size="1_5" |
| `--dss-spacing-2` | 8px | size="2" |
| `--dss-spacing-2_5` | 10px | size="2_5" |
| `--dss-spacing-3` | 12px | size="3" |
| `--dss-spacing-3_5` | 14px | size="3_5" |
| `--dss-spacing-4` | 16px | size="4" |
| `--dss-spacing-5` | 20px | size="5" |
| `--dss-spacing-6` | 24px | size="6" |
| `--dss-spacing-7` | 28px | size="7" |
| `--dss-spacing-8` | 32px | size="8" |
| `--dss-spacing-9` | 36px | size="9" |
| `--dss-spacing-10` | 40px | size="10" |
| `--dss-spacing-11` | 44px | size="11" |
| `--dss-spacing-12` | 48px | size="12" |
| `--dss-spacing-14` | 56px | size="14" |
| `--dss-spacing-16` | 64px | size="16" |
| `--dss-spacing-20` | 80px | size="20" |
| `--dss-spacing-24` | 96px | size="24" |

**Total**: 21 tokens. Todos existentes no catálogo DSS. Nenhum token criado.

---

## 7. Exceções Documentadas

**Nenhuma exceção.**

`DssSpace` não contém valores hardcoded. Todos os valores são derivados de tokens DSS ou de valores CSS intrínsecos (`flex: 1 1 auto`, `min-width: 0`, `min-height: 0`) que não requerem tokenização.

---

## 8. Anti-Patterns

### ❌ Anti-Pattern 1: Espaçamento entre conteúdo

```vue
<!-- ❌ INCORRETO: DssSpace entre parágrafos -->
<p>Primeiro parágrafo</p>
<DssSpace size="4" />
<p>Segundo parágrafo</p>

<!-- ✅ CORRETO: margin com token de spacing -->
<p style="margin-bottom: var(--dss-spacing-4)">Primeiro parágrafo</p>
<p>Segundo parágrafo</p>
```

`DssSpace` é exclusivo para flex containers de layout (toolbars, headers, linhas de ação). Em contextos de conteúdo, use `margin` ou `padding` diretamente.

### ❌ Anti-Pattern 2: Valores arbitrários de size

```vue
<!-- ❌ INCORRETO: --dss-spacing-23 não existe -->
<DssSpace size="23" />

<!-- ✅ CORRETO: use apenas valores do tipo SpaceSize -->
<DssSpace size="24" />  <!-- ou "20", "16", etc. -->
```

### ❌ Anti-Pattern 3: Uso fora de flex container

```vue
<!-- ❌ INCORRETO: flex: 1 1 auto não tem efeito fora de flex -->
<div style="display: block">
  <DssSpace />  <!-- sem efeito visual -->
</div>

<!-- ✅ CORRETO: sempre dentro de flex -->
<div style="display: flex">
  <DssSpace />
</div>
```

### ❌ Anti-Pattern 4: Múltiplos DssSpace consecutivos para tamanho fixo

```vue
<!-- ❌ INCORRETO: divide o espaço em duas partes iguais (não é 32px fixo) -->
<DssSpace />
<DssSpace />

<!-- ✅ CORRETO: um único DssSpace com size explícito -->
<DssSpace size="8" />  <!-- 32px fixo -->
```

---

## 9. Estados

### Estados Aplicáveis

| Estado | Descrição |
|--------|-----------|
| flex-grow | Modo padrão: ocupa espaço disponível restante |
| size fixo | Modo com prop: dimensão governada por token |

### Estados NÃO Aplicáveis

| Estado | Justificativa |
|--------|---------------|
| hover | Não interativo |
| focus | Não interativo |
| active | Não interativo |
| disabled | Não interativo — sem funcionalidade a desabilitar |
| loading | Não interativo — sem operação assíncrona |
| error | Não é formulário |
| indeterminate | Não é controle de seleção |

---

## 10. Limitações Conhecidas

1. **Sem suporte a `flex-basis` explícito**: O modo flex-grow usa sempre `flex: 1 1 auto`. Para casos que requerem `flex-basis` específico sem grow, use CSS diretamente.

2. **Sem prop `horizontal`/`vertical`**: O DssSpace aplica `width` e `height` simultaneamente para suportar ambas as orientações. Em containers mistos (flex-row e flex-column alternados), ambas as dimensões são definidas corretamente pelo token.

3. **Invisibilidade em impressão**: `display: none` em mídia print significa que qualquer layout que dependa do DssSpace para posicionamento pode ter aparência diferente em PDF/impressão.

---

## 11. Uso Previsto em Componentes Futuros

`DssSpace` será utilizado internamente pelos seguintes componentes planejados para a Fase 2:

| Componente | Uso |
|------------|-----|
| `DssToolbar` (Fase 2) | Separar título/logo das ações à direita |
| `DssNavbar` (Fase 2) | Separar logo de links de navegação |
| `DssCardActions` (Fase 2) | Alinhar botões à direita no rodapé de cards |
| `DssAppBar` (Fase 2) | Flexibilidade de layout da barra de aplicação |

Esta dependência é registrada para análise de impacto em atualizações futuras do DssSpace.

---

## 12. Arquitetura

```
DSS/components/base/DssSpace/ (14 arquivos)
├── 1-structure/
│   └── DssSpace.ts.vue           Layer 1: Vue + TS (Composition API)
├── 2-composition/
│   └── _base.scss                Layer 2: flex: 1 1 auto, min-width/height: 0
├── 3-variants/
│   ├── _sizes.scss               Layer 3: modificadores .dss-space--size-{value}
│   └── index.scss                Orchestrador L3
├── 4-output/
│   ├── _states.scss              Layer 4: apenas print (display: none)
│   ├── _brands.scss              Layer 4: vazio (sem cor)
│   └── index.scss                Orchestrador L4
├── composables/
│   ├── useSpaceClasses.ts        Lógica de classes (computed)
│   └── index.ts                  Barrel export de composables
├── types/
│   └── space.types.ts            SpaceSize, SpaceProps
├── DssSpace.module.scss          Orchestrador principal: L2 → L3 → L4
├── DssSpace.example.vue          5 cenários de uso
├── DssSpace.md                   Documentação normativa (este arquivo)
├── DSSSPACE_API.md               API Reference
├── README.md                     Quick start
├── dss.meta.json                 Metadados: Golden Context, tokens, audit status
└── index.js                      Barrel export: componente + composable + types
```
