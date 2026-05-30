# DssParallax — Documentação Normativa (Template 13.1)

## 1. Visão Geral

**O que é:** `DssParallax` é um container de efeito de paralaxe — uma técnica visual onde a imagem de fundo se move em velocidade diferente do conteúdo em primeiro plano durante o scroll, criando ilusão de profundidade.

**Quando usar:**
- Seções hero de páginas com impacto visual
- Divisores entre seções de landing pages
- Banners de destaque com conteúdo sobreposto
- Cenários onde profundidade visual enriquece a experiência sem comprometer usabilidade

**Quando NÃO usar:**
- Em páginas com alta densidade de informação (distrai do conteúdo principal)
- Em fluxos de formulários ou operações críticas (foco deve estar na tarefa)
- Em listas e tabelas (risco de distração e impacto em performance)
- Em dispositivos onde performance é crítica sem testes prévioss

---

## 2. Classificação DSS

- **Tipo:** Container de efeito visual não interativo
- **Categoria:** Mídia e Visualização
- **Fase:** 2 — Nível 1
- **Interativo:** Não
- **Golden Reference:** DssBadge (componente não interativo — governança de categoria)
- **Golden Context:** DssVideo (mesma família Mídia e Visualização, mesmo nível arquitetural)

---

## 3. API

### Props

| Prop | Type | Default | Obrigatório | Description |
|------|------|---------|-------------|-------------|
| `src` | `String` | `undefined` | Recomendado | URL da imagem de fundo |
| `height` | `Number` | `500` | Não | Altura em pixels |
| `speed` | `Number` | `0.5` | Não | Velocidade do paralaxe (0–1) |
| `scrollTarget` | `String \| Element` | `window` | Não | Container de scroll alvo |
| `alt` | `String` | `undefined` | Condicional* | Texto alternativo da imagem |
| `decorative` | `Boolean` | `false` | Não | Marca como decorativo |

*`alt` é obrigatório quando a imagem de fundo transmite conteúdo significativo. Em dev mode, aviso é emitido se nem `alt` nem `decorative` forem fornecidos.

### Slots

| Slot | Description |
|------|-------------|
| `default` | Conteúdo overlay — renderizado sobre o efeito de paralaxe |

### Events

Nenhum. QParallax não expõe eventos controláveis pelo DSS.

---

## 4. Estados

| Estado | Implementado | Observação |
|--------|-------------|------------|
| default | ✅ | Estado padrão com efeito de paralaxe ativo |
| reduced-motion | ✅ | Fallback estático quando `prefers-reduced-motion: reduce` |
| hover | — | N/A — componente não interativo |
| focus | — | N/A — componente não interativo (conteúdo do slot é acessível independentemente) |
| active | — | N/A — sem interação direta |
| disabled | — | N/A — sem semântica de disable para efeitos visuais |
| loading | — | N/A — QParallax não expõe slot de loading para a imagem de fundo |
| error | — | N/A — QParallax não expõe slot de erro para a imagem de fundo |

---

## 5. Tokens Utilizados

Nenhum token `var(--dss-*)` é utilizado neste componente. Todas as propriedades visuais são prop-driven ou valores estruturais fixos:

| Propriedade | Fonte | Motivo |
|-------------|-------|--------|
| `background-image` | Prop `src` (style binding) | URL fornecida pelo consumidor — não tokenizável |
| `height` | Prop `height` (style binding) | Dimensão variável por uso — não tokenizável |
| `background-size: cover` | Valor estrutural fixo | Comportamento de cover — sem equivalente em token DSS |
| `background-position: center` | Valor estrutural fixo | Posição padrão para paralaxe — sem equivalente em token DSS |
| `-webkit-tap-highlight-color: transparent` | Valor hardcoded estrutural | Exceção canônica DSS — consistência com Golden Reference (DssBadge) |

> **Declaração de conformidade:** A ausência de tokens `var(--dss-*)` é intencional e arquiteturalmente correta. Um componente de efeito visual cujas dimensões e imagem são 100% prop-driven não tem propriedades tokenizáveis na camada CSS.

---

## 6. Acessibilidade

### WCAG 2.1 AA

| Critério | Status | Implementação |
|----------|--------|---------------|
| 1.1.1 Conteúdo Não Textual | ✅ | `alt` prop renderiza `<span class="dss-sr-only">` para CSS backgrounds que transmitem conteúdo |
| 2.3.3 Animação de Interação | ✅ (AAA) | Fallback estático quando `prefers-reduced-motion: reduce` |
| 1.4.11 Contraste Não Textual | ✅ | `forced-colors: active` aplica `background-color: Canvas` |
| 4.1.2 Nome, Função, Valor | ✅ | Conteúdo do slot default é acessível normalmente |

### Touch Target

Não aplicável — DssParallax não é interativo. O touch target de elementos dentro do slot default é responsabilidade dos próprios componentes filhos.

### Navegação por Teclado

O componente em si não recebe foco. Elementos interativos dentro do slot default (botões, links) são navegáveis por teclado normalmente — o DssParallax não interfere.

### prefers-reduced-motion

Quando `prefers-reduced-motion: reduce` está ativo:
1. O QParallax é substituído por um `<div>` estático
2. O background-image ainda é exibido (sem animação)
3. O conteúdo do slot default permanece visível e acessível
4. Scroll listeners do QParallax não são registrados

A troca é reativa — se o usuário alterar a preferência em tempo de execução, o componente se adapta sem recarregar.

---

## 7. Comportamentos Implícitos

### inheritAttrs: false
`$attrs` (id, class extra, data-*, aria-* adicionais) são encaminhados ao root element ativo. Permite que atributos avançados do QParallax não declarados nas props (ex: `no-observer`) fluam automaticamente quando o QParallax está ativo.

### Imagem de fundo e Leitores de Tela
`background-image` CSS é tecnicamente invisível ao accessibility tree — leitores de tela não anunciam backgrounds. Para imagens semanticamente significativas, o DssParallax insere um `<span class="dss-sr-only">` com o texto de `alt`. O span é visualmente oculto mas presente no DOM.

### Slot Default e Acessibilidade
O conteúdo do slot default é acessível normalmente. A natureza decorativa da imagem de fundo NÃO afeta a acessibilidade do conteúdo overlay.

---

## 8. Paridade com Golden Reference (DssBadge)

| Aspecto | DssBadge | DssParallax | Status |
|---------|----------|-------------|--------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Igual |
| `inheritAttrs: false` | ✅ | ✅ | Igual |
| `v-bind="$attrs"` no root | ✅ | ✅ | Igual |
| `-webkit-tap-highlight-color: transparent` | ✅ | ✅ | Igual |
| Componente não interativo | ✅ | ✅ | Igual |
| Touch target `::before` ausente | ✅ | ✅ | Igual |
| Estados hover/focus/active ausentes | ✅ | ✅ | Igual |
| Fallback `prefers-reduced-motion` | ❌ | ✅ | **Diferente** — paralaxe requer tratamento específico de animação |

Divergência intencional documentada: o tratamento de `prefers-reduced-motion` é específico de DssParallax e não existe em DssBadge porque DssBadge não possui animação.

---

## 9. Matriz de Composição DSS

### Papel Estrutural
DssParallax é um container de fundo — fornece o efeito visual. Não instancia componentes filhos automaticamente.

### Componentes DSS Recomendados no Slot

| Componente | Status | Uso |
|------------|--------|-----|
| `DssCard` | ✅ Existente | Card flutuante sobre o paralaxe |
| `DssButton` | ✅ Existente | CTA sobre o paralaxe |
| `DssImg` | ✅ Existente | Imagem adicional em overlay |

### Padrões de Layout
- `DssParallax` com `DssCard` centrado: hero section
- `DssParallax` sem overlay (slot vazio): divisor visual entre seções
- `DssParallax` com texto e botões: landing page hero

### Limites de Responsabilidade
- DssParallax: efeito de paralaxe, acessibilidade da imagem de fundo
- Conteúdo do slot: responsabilidade dos componentes filhos (layout, cores, tipografia)
- Brand: responsabilidade dos componentes filhos (DssParallax é agnóstico de brand)

### Anti-Patterns
- ❌ Aninhar DssParallax dentro de DssParallax
- ❌ Usar DssParallax em fluxos de formulário ou operações críticas
- ❌ Definir `height` muito baixo (< 100px) — o efeito fica imperceptível
- ❌ Usar `speed=1` com conteúdo de overlay (confuso visualmente)
- ❌ Omitir `alt` ou `decorative` em produção (erro de acessibilidade)

---

## 10. Exceções Registradas

| ID | Regra | Detalhe | Local |
|----|-------|---------|-------|
| EXC-Gate-01 | Gate de Composição v2.4 — componente Quasar como root | QParallax é root element quando `prefers-reduced-motion` não está ativo. Evita DOM desnecessário e preserva scroll listeners nativos do QParallax. | `1-structure/DssParallax.ts.vue` — branch `v-if="!isReducedMotion"` |
| EXC-States-01 | Fallback de estado especial | `prefers-reduced-motion: reduce` não é tratado via CSS puro — requer troca de componente (QParallax → div) para evitar registro de scroll listeners. | `1-structure/DssParallax.ts.vue` — branch `v-else` |

---

## 11. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-18 | Claude (DSS Agent) | Criação inicial — Fase 2, Nível 1, Família Mídia e Visualização |
