# DssSkeleton — Documentação Normativa (Template 13.1)

## 1. Visão Geral e Classificação

**O que é:** `DssSkeleton` é um placeholder visual de carregamento — exibe a estrutura estimada do conteúdo final antes que os dados reais estejam disponíveis. Melhora a percepção de desempenho e elimina saltos visuais de layout (layout shift) durante o carregamento assíncrono.

**Quando usar:**
- Carregamento de dados assíncronos (cards, listas, avatares, parágrafos)
- Transições entre estados de carregamento e conteúdo final
- Qualquer contexto onde `spinner` genérico não representa fielmente a estrutura do conteúdo

**Quando NÃO usar:**
- Operações instantâneas (< ~200ms) — use `delay` no `v-if` do pai em vez de mostrar o skeleton
- Erros de carregamento — substitua por componente de feedback de erro
- Dentro de modais ou drawers com loading próprio — use `DssInnerLoading` no container

**Classificação DSS:**
- **Tipo:** Não interativo — Feedback Visual
- **Categoria:** Progresso e Feedback
- **Fase:** 2 — Nível 1
- **Família:** Progresso e Feedback
- **Interativo:** Não
- **Quasar Base:** `QSkeleton`
- **Golden Reference:** `DssBadge`
- **Golden Context:** `DssInnerLoading`

---

## 2. API Surface

### Props principais

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `type` | `SkeletonType` | `'rect'` | Forma visual do placeholder |
| `width` | `String` | — | Largura explícita |
| `height` | `String` | — | Altura explícita |
| `lines` | `Number` | — | Linhas (apenas `type='text'`, > 1 ativa multi) |
| `animation` | `SkeletonAnimation` | `'wave'` | Tipo de animação |
| `bordered` | `Boolean` | — | Adiciona borda |
| `radius` | `SkeletonRadius` | — | Token DSS de raio de borda |
| `tag` | `String` | — | Tag HTML do QSkeleton interno |
| `brand` | `SkeletonBrand` | — | Contexto de brand Sansys |

**Slots:** Nenhum (componente de placeholder puro).

**Events:** Nenhum (componente não emissor).

*API completa em [DSSSKELETON_API.md](./DSSSKELETON_API.md)*

---

## 3. Comportamento e Estados

### Estados Aplicáveis

| Estado | Implementação | Detalhes |
|--------|--------------|---------|
| Carregando (`wave`) | ✅ QSkeleton nativo | Animação de onda horizontal |
| Carregando (`pulse`) | ✅ QSkeleton nativo | Animação de pulso de opacidade |
| Estático (`none`) | ✅ QSkeleton nativo | Sem animação |
| Dark mode | ✅ CSS token | `--dss-surface-muted` adapta automaticamente |
| prefers-contrast: more | ✅ `1px solid currentColor` | Demarcar formas visualmente (Precedente: DssBadge) |
| prefers-reduced-motion | ✅ EX-States-01 | Suprime toda animação |
| forced-colors | ✅ EX-States-03 | SystemColor keywords |
| Print | ✅ EX-States-02 | `display: none` |

### Estados Explicitamente Não Aplicáveis

| Estado | Razão |
|--------|-------|
| hover | Componente não interativo — `aria-hidden="true"` |
| focus | Não recebe foco — placeholder visual puro |
| active | Não possui interação de pressão |
| disabled | Estado de "desabilitado" não faz sentido semântico em skeleton |
| loading | O skeleton EM SI representa o estado de loading do contexto pai |
| error | Substituir o skeleton por componente de erro — responsabilidade do consumer |

---

## 4. Tokens DSS

| Token | Propriedade | Contexto |
|-------|-------------|----------|
| `--dss-surface-muted` | `background-color` | Fundo padrão (EXC-Gate-01) |
| `--dss-radius-sm` | `border-radius` | Default rect/text/heading |
| `--dss-radius-full` | `border-radius` | circle/avatar |
| `--dss-gray-200` | `border-color` | `bordered` padrão (EXC-Gate-03) |
| `--dss-icon-size-xl` | `width`, `height` | avatar padrão (48px) |
| `--dss-spacing-2` | `gap` | multi-linha gap |
| `--dss-spacing-6` | `height` | heading padrão (24px) |
| `--dss-hub-100` | `background-color` | Brand hub |
| `--dss-water-100` | `background-color` | Brand water |
| `--dss-waste-100` | `background-color` | Brand waste |
| `--dss-hub-200` | `border-color` | Brand hub + bordered |
| `--dss-water-200` | `border-color` | Brand water + bordered |
| `--dss-waste-200` | `border-color` | Brand waste + bordered |

---

## 5. Acessibilidade

- **`aria-hidden="true"` no root:** DssSkeleton é um placeholder visual puro — leitores de tela devem ignorá-lo completamente. O root `<div>` recebe `aria-hidden="true"` por padrão.

- **`aria-busy` é responsabilidade do consumer:** O container pai que exibe o skeleton deve ter `aria-busy="true"` enquanto carrega e `aria-busy="false"` quando o conteúdo real for renderizado. DssSkeleton não manipula DOM do consumer.

- **WCAG 2.3.3 (Animação sob Solicitação — Nível AAA):** `prefers-reduced-motion: reduce` suprime completamente todas as animações QSkeleton (EX-States-01). Inclui `::after` pseudo-element.

- **WCAG 1.4.11 (Contraste Não-Textual — Nível AA):** `forced-colors: active` aplica SystemColor keywords (`Canvas`, `CanvasText`). `forced-color-adjust` não declarado (herdado é correto — DssSkeleton não tem slot).

- **Nenhum touch target:** Componente não interativo. `::before` não implementado (Opção B — consistente com DssBadge e DssInnerLoading).

- **`inheritAttrs: false` + `v-bind="$attrs"`:** Atributos extras do consumer são forwarded ao root `<div>`. Permite que o consumer sobrescreva `aria-hidden` se necessário para padrões de acessibilidade avançados.

---

## 6. Comportamentos Implícitos

1. **Multi-linha: última linha com 70% de largura** — Quando `type='text'` e `lines > 1`, a última linha usa `width="70%"` para realismo de parágrafo. Valor estrutural canônico (sem token).

2. **QSkeleton wave animation usa `::after`** — O shimmer é um overlay branco semi-transparente sobre `background-color`. Funciona em light e dark mode.

3. **`radius` via CSS custom property** — O prop `radius` injeta `--dss-skeleton-radius: var(--dss-radius-*)` no root. SCSS usa fallback para `--dss-radius-sm`. Não afeta `circle`/`avatar`.

4. **`width`/`height` explícitos sobrescrevem defaults CSS** — QSkeleton inline styles têm precedência sobre CSS defaults de `heading` e `avatar`.

5. **`bordered` delegado ao QSkeleton** — DssSkeleton hooks `.q-skeleton.q-skeleton--bordered` para sobrescrever border-color com token DSS.

6. **`tag` prop** — Controla a tag HTML raiz de cada `<QSkeleton>` interno. Útil para listas (`<li>`) ou tabelas (`<td>`).

7. **`defineEmits` omitido** — Container não-emissor. Precedente: DssLinearProgress, DssCircularProgress, DssInnerLoading.

---

## 7. Paridade Golden Reference / Golden Context

| Aspecto | DssBadge (Ref) | DssInnerLoading (Context) | DssSkeleton | Status |
|---------|---------------|--------------------------|-------------|--------|
| Interatividade | ❌ | ❌ | ❌ | ✅ Paridade |
| Touch Target | N/A Opção B | N/A Opção B | N/A | ✅ Paridade |
| defineEmits | Omitido | Omitido | Omitido | ✅ Paridade |
| `aria-hidden` root | — | — | ✅ root div | ✅ Intencional (placeholder puro) |
| Brand dual-selector | ✅ | ✅ | ✅ | ✅ Paridade |
| QSkeleton root | ❌ | ✅ EXC-Gate-01 | ❌ | ✅ Div wrapper (precisa de `lines`) |
| prefers-reduced-motion | ✅ | ✅ | ✅ EX-States-01 | ✅ Paridade |
| forced-colors | ✅ | ✅ | ✅ EX-States-03 | ✅ Paridade |
| print display:none | ✅ | ✅ | ✅ EX-States-02 | ✅ Paridade |
| inheritAttrs:false | ✅ | ✅ | ✅ | ✅ Paridade |

**Divergência intencional:** DssSkeleton usa `<div>` wrapper (não QSkeleton como root). Justificativa: a prop `lines` requer múltiplos QSkeleton filhos quando `type='text'`. Um root variável (às vezes QSkeleton, às vezes div) viola a arquitetura DSS. A consistência do wrapper div é preferida.

---

## 8. Composição e Integração

### Uso típico: card skeleton

```vue
<template>
  <div :aria-busy="loading" style="position: relative;">
    <!-- Skeleton visível durante carregamento -->
    <template v-if="loading">
      <DssSkeleton type="avatar" style="margin-bottom: 12px;" />
      <DssSkeleton type="heading" width="70%" style="margin-bottom: 8px;" />
      <DssSkeleton type="text" :lines="3" />
    </template>
    <!-- Conteúdo real após carregamento -->
    <template v-else>
      <DssCard>...</DssCard>
    </template>
  </div>
</template>
```

### Anti-patterns de composição

- ❌ **Usar DssSkeleton dentro de `DssInnerLoading`** — sobreposição de padrões de loading
- ❌ **Não declarar `aria-busy` no container pai** — leitores de tela não saberão do estado de loading
- ❌ **Skeleton permanente sem condição de remoção** — `DssSkeleton` deve ser removido do DOM quando o conteúdo carregar
- ❌ **Usar valores px hardcoded em `width`/`height`** — prefira tokens DSS como `width="var(--dss-spacing-32)"`

### Composição recomendada

| Caso de uso | Componente de conteúdo final |
|-------------|------------------------------|
| `type='avatar'` | `DssAvatar` |
| `type='heading'` | `<h2>`, `<h3>` com tipografia DSS |
| `type='text'` | Parágrafos de texto |
| `type='rect'` | `DssCard`, `DssImg`, `DssVideo` |

---

## 9. Exceções Registradas

| ID | Tipo | Localização | Valor | Justificativa |
|----|------|-------------|-------|---------------|
| EXC-Gate-01 | Gate Estrutural | `2-composition/_base.scss` | `.dss-skeleton .q-skeleton { background-color }` | QSkeleton aplica background-color via CSS interno sem hook de CSS custom property. Descendant selector necessário para injetar tokens DSS. |
| EXC-Gate-02 | Gate Estrutural | `2-composition/_base.scss` | `.dss-skeleton--type-* .q-skeleton { border-radius }` | Override de border-radius do QSkeleton para aplicar tokens DSS via `--dss-skeleton-radius`. |
| EXC-Gate-03 | Gate Estrutural | `2-composition/_base.scss` | `.q-skeleton.q-skeleton--bordered { border-color }` | Override de border-color do QSkeleton bordered para `--dss-gray-200`. |
| EX-States-01 | Estado | `4-output/_states.scss` | `animation: none !important; 0.01ms; 1` | prefers-reduced-motion suprime animações QSkeleton (`::after` keyframes). Precedente: DssLinearProgress, DssCircularProgress, DssInnerLoading. |
| EX-States-02 | Estado | `4-output/_states.scss` | `display: none` | Print: skeleton oculto — não faz sentido em impressão. Precedente: DssCircularProgress, DssInnerLoading. |
| EX-States-03 | Estado | `4-output/_states.scss` | `Canvas`, `CanvasText`, `1px` | forced-colors SystemColor keywords. `forced-color-adjust` NÃO usado (sem slot). Precedente: DssCircularProgress, DssInnerLoading. |
| EX-Structural-01 | Estrutural | Template | `70%` | Largura da última linha em multi-linha text — valor canônico de simulação realista de parágrafo. |

---

## 10. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-18 | Claude (DSS Agent) | Criação inicial. Fase 2 Nível 1 — Família Progresso e Feedback. |
