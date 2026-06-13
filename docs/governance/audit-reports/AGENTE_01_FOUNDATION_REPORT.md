Perfeito. Agora vou compilar as minhas descobertas em um relatório detalhado. Tenho informações suficientes para fazer uma auditoria completa.

---

## AGENTE 1 — FOUNDATION: Relatório de Auditoria Organizacional

### 1. Inventário

#### **Tokens (packages/core/tokens/)**

**Arquivos raiz e aggregadores:**
- `globals.scss` — Define escala de cinza, paletas de marca (Hub, Water, Waste), cores primárias/secundárias/terciárias (156 linhas)
- `index.scss` — Entry point principal que agrega 13 imports de tokens semânticos e brands (34 linhas)

**Tokens semânticos (semantic/):**
- `_actions.scss` — Tokens para primary/secondary/tertiary/accent/dark com estados (light, hover, disable, deep, focus)
- `_text.scss` — Hierarquia tipográfica (body, subtle, muted, inverse, disabled) + brand variants
- `_surfaces.scss` — Backgrounds (default, subtle, muted, disabled, overlays, hover, active, selected)
- `_borders.scss` — Cores e estilos de bordas
- `_border-widths.scss` — Espessuras de bordas
- `_spacing.scss` — Escala base REM (0–96), espaçamentos semânticos, layout estrutural, radius (199 linhas)
- `_shadows.scss` — Drop shadows semânticos
- `_opacity.scss` — Níveis de opacidade
- `_z-index.scss` — Stacking context layers
- `_motion.scss` — Durações e easing de transição
- `_feedback.scss` — Success, error, warning, info com variantes light/dark
- `_gradients.scss` — Gradientes pre-definidos
- `_breakpoints.scss` — Media queries (xs, sm, md, lg, xl, 2xl)

**Acessibilidade (semantic/accessibility/):**
- `index.scss` — Aggregador com comentários WCAG
- `_focus.scss` — Focus rings com 9 cores semânticas
- `_contrast.scss` — Ratios WCAG pré-validados (4.5:1, 3:1)
- `_sizing.scss` — Touch targets (44px, 48px mínimo)
- `_typography.scss` — Tamanhos mínimos, line heights, zoom 200%

**Temas (themes/):**
- `light/_colors.scss` — Referencial (sem sobrescritas, usa padrões de globals)
- `dark/_colors.scss` — Dark mode com cores de texto/surface invertidas (mantém ação/feedback)

**Marcas (brand/):**
- `_hub.scss` — Token overrides Hub (laranja #ef7a11)
- `_water.scss` — Token overrides Water (azul #0e88e4)
- `_waste.scss` — Token overrides Waste (verde #0b8154)
- `index.scss` — Aggregador das 3 marcas (4 linhas)

**Total tokens:** ~2300 linhas

---

#### **Utils (packages/core/utils/)**

- `_functions.scss` — 11 funções Sass (dss-rem, dss-contrast-ratio, dss-luminance, dss-is-contrast-valid, dss-darken-accessible, dss-lighten-accessible, dss-gradient-with-opacity, dss-brand-token, dss-responsive-spacing, dss-theme-color)
- `_mixins.scss` — Mixins para focus-ring, touch target, transition (com prefers-reduced-motion), color variants
- `_accessibility-mixins.scss` — Mixins específicos para acessibilidade avançada
- `_helpers.scss` — Classes utilitárias CSS (display, flexbox, grid, spacing, margins, paddings, gaps)
- `_colors.scss` — Classes .bg-* e .text-* para Quasar (padrão Quasar)
- `_colors-hover.scss` — Estados de hover para classes de cores
- `_border-helpers.scss` — Classes para bordas
- `_layout-helpers.scss` — Classes para layout
- `_example-showcase.scss` — Classes para componentes .example.vue (DEV-ONLY, não importado por padrão)
- `index.scss` — Entry point que importa todos exceto _example-showcase (comentário explícito sobre exclusão)
- `index.ts` — Barrel export TypeScript (exporta composables)

**Total utils:** ~2000 linhas

---

#### **Composables (packages/core/composables/)**

- `useBrand.ts` — Composable para gerenciar marcas (Hub, Water, Waste) com tipos e BRAND_COLORS constant
- `useAccessibility.ts` — Composable para atributos ARIA (role, ariaLabel, disabled, focusable, etc.)
- `useColorClasses.ts` — Composable para gerar classes de cores (bg-*, text-*) com variantes
- `useComponentState.ts` — Composable para gerenciar estados de componentes
- `index.ts` — Barrel export com re-exports de todos os composables

**Total composables:** ~400 linhas

---

#### **Temas (packages/core/themes/)**

- `index.scss` — Entry point que importa: quasar-tokens-mapping, quasar-overrides, quasar-utilities + define .dss-theme com variantes --hub, --water, --waste, --semantic
- `quasar.variables.scss` — Arquivo de customização Quasar (comentado)
- `_quasar-tokens-mapping.scss` — Mapeamento de tokens DSS para variáveis Quasar
- `_quasar-overrides.scss` — Sobrescritas de componentes Quasar
- `_quasar-utilities.scss` — Utilitários específicos para Quasar

**Total themes:** ~150 linhas

---

### 2. Função no Ecossistema

A camada **Foundation (core/)** serve como **base distribuída e reutilizável** para todos os 76+ componentes DSS:

1. **Tokens** — Define o **vocabulário visual** (cores, espaçamento, tipografia, motion, acessibilidade)
   - Componentes consomem via `var(--dss-*)`
   - Garantem consistência visual e compatibilidade com Quasar
   - Suportam 3 marcas (Hub, Water, Waste) via `[data-brand="*"]`
   - Suportam dark mode via `[data-theme="dark"]`

2. **Utils** — Fornece **primitivos reutilizáveis** (mixins, funções, classes CSS)
   - Mixins para focus, touch targets, transitions
   - Funções para cálculos acessíveis (contraste WCAG, rem conversion)
   - Classes utilitárias para layout rápido

3. **Composables** — Fornece **lógica compartilhada** em Vue (marca, cores, acessibilidade)
   - Reutilizáveis por qualquer componente
   - Encapsulam decisões de negocios (ex: BRAND_COLORS)

4. **Themes** — Integridade com **Quasar Framework**
   - Mapeia tokens DSS para variáveis Quasar
   - Aplica sobrescritas globais de componentes Quasar
   - Define temas (.dss-theme--hub, --water, --waste)

---

### 3. Qualidade da Distribuição

#### **Análise de Fragmentação**

**Tokens:**
- ✅ **Bem distribuído**: 13 arquivos semânticos cobrem categorias distintas e não-sobrepostas (actions, text, surfaces, borders, spacing, etc.)
- ✅ **Hierarquia clara**: globals → semantic → accessibility → brand → themes (ordem lógica)
- ✅ **Redundância mínima**: aliases semânticos (ex: `--dss-text-body: var(--dss-dark)`) apenas onde necessário

**Utils:**
- ⚠️ **Distribuição adequada, mas com potencial consolidação**: 
  - 9 arquivos .scss (functions, mixins, accessibility-mixins, helpers, colors, colors-hover, border-helpers, layout-helpers, example-showcase)
  - Alguns arquivos muito pequenos (border-helpers, layout-helpers ~50 linhas)
  - Possível consolidação em 5-6 módulos (not a problem now, mas deve ser monitorado)

**Composables:**
- ✅ **Bem modularizado**: 4 composables cada um com responsabilidade única
- ✅ **Naming claro**: use* prefixo Vue standard
- ✅ **Exports bem organizados** em index.ts

**Temas:**
- ✅ **Integração limpa**: 3 arquivos (mapping, overrides, utilities) sem sobreposição

#### **Análise de Dispersão**

**Não há dispersão problemática.** Exemplos:
- Focus rings: centralizados em `semantic/accessibility/_focus.scss` (não espalhados por utils)
- Touch targets: centralizados em `semantic/accessibility/_sizing.scss` (não em cada componente)
- Marcas: centralizados em `brand/` (não misturados em tokens semânticos)

#### **Análise de Concentração**

**Concentração aceitável:**
- `_spacing.scss` é o maior arquivo semântico (199 linhas) — justificado pela escala de 31+ tokens
- `globals.scss` (156 linhas) — concentra paletas de marca, mas é apropriado

#### **Conclusão de Distribuição**
A distribuição é **saudável e escalável**. Nenhum arquivo cumpre múltiplas responsabilidades. A fragmentação é intencional e bem-organizada.

---

### 4. Disposições Recomendadas

#### **Tokens**

| Arquivo/Pasta | Disposição | Justificativa |
|---|---|---|
| `tokens/globals.scss` | **KEEP** | Define paletas base — necessário e correto |
| `tokens/index.scss` | **KEEP** | Entry point bem estruturado |
| `tokens/semantic/_*.scss` (9 arquivos) | **KEEP** | Cada um cumpre responsabilidade única |
| `tokens/semantic/accessibility/` | **KEEP** | Organização WCAG clara e bem documentada |
| `tokens/brand/_hub.scss, _water.scss, _waste.scss` | **KEEP** | Marcas claramente separadas |
| `tokens/themes/light/_colors.scss` | **KEEP** | Referencial importante (simetria com dark) |
| `tokens/themes/dark/_colors.scss` | **KEEP** | Dark mode bem implementado |

#### **Utils**

| Arquivo | Disposição | Justificativa |
|---|---|---|
| `utils/_functions.scss` | **KEEP** | Funções bem estruturadas (10 funções úteis) |
| `utils/_mixins.scss` | **KEEP** | Mixins de foco e transição utilizados |
| `utils/_accessibility-mixins.scss` | **KEEP** | Complementa mixins principais, isolado |
| `utils/_helpers.scss` | **KEEP** | Classes utilitárias CSS padrão |
| `utils/_colors.scss` | **KEEP** | Integração Quasar necessária |
| `utils/_colors-hover.scss` | **KEEP** | Estados hover bem isolados |
| `utils/_border-helpers.scss` | **KEEP** | Pequeno mas necessário |
| `utils/_layout-helpers.scss` | **KEEP** | Pequeno mas necessário |
| `utils/_example-showcase.scss` | **KEEP** | Corretamente marcado como DEV-ONLY |
| `utils/index.scss` | **KEEP** | Entry point com documentação clara (exclui exemplo) |
| `utils/index.ts` | **KEEP** | Barrel export bem estruturado |

#### **Composables**

| Arquivo | Disposição | Justificativa |
|---|---|---|
| `composables/useBrand.ts` | **KEEP** | Gerenciamento de marca centralizado |
| `composables/useAccessibility.ts` | **KEEP** | Atributos ARIA bem encapsulados |
| `composables/useColorClasses.ts` | **KEEP** | Lógica de cores bem isolada |
| `composables/useComponentState.ts` | **KEEP** | Estados de componentes centralizados |
| `composables/index.ts` | **KEEP** | Barrel export bem estruturado |

#### **Temas**

| Arquivo | Disposição | Justificativa |
|---|---|---|
| `themes/index.scss` | **KEEP** | Entry point claro |
| `themes/light/_colors.scss` | **KEEP** | Referencial (simetria com dark) |
| `themes/dark/_colors.scss` | **KEEP** | Dark mode bem implementado |
| `themes/_quasar-tokens-mapping.scss` | **KEEP** | Integração Quasar crítica |
| `themes/_quasar-overrides.scss` | **KEEP** | Sobrescritas globais necessárias |
| `themes/_quasar-utilities.scss` | **KEEP** | Utilitários Quasar bem isolados |

**RESUMO: Nenhuma disposição negativa recomendada. Toda a estrutura está corretamente alocada.**

---

### 5. Confirmação dos Sinais Pré-Identificados

#### **[SIGNAL-F01]** — Sintaxe `if()` deprecated em _functions.scss

**Status: CONFIRMADO**

Encontradas 4 ocorrências da sintaxe antiga `if($condition, $true, $false)`:

```scss
// Linhas 50-52 (função dss-luminance)
$r: if($r <= 0.03928, $r / 12.92, pow(($r + 0.055) / 1.055, 2.4));
$g: if($g <= 0.03928, $g / 12.92, pow(($g + 0.055) / 1.055, 2.4));
$b: if($b <= 0.03928, $b / 12.92, pow(($b + 0.055) / 1.055, 2.4));

// Linha 62 (função dss-is-contrast-valid)
$min-ratio: if($size == 'large', 3, 4.5);
```

**Severidade:** MÉDIA
- Sintaxe funciona em Dart Sass atualmente
- Será removida em Dart Sass 3.0
- Recomendação: Converter para `@if / @else` (forma de controle de fluxo)

---

#### **[SIGNAL-F02]** — Uso de `@import` deprecated em index.scss

**Status: CONFIRMADO**

Encontradas **34 ocorrências** de `@import` nos arquivos:
- `utils/index.scss`: 8 imports
- `tokens/index.scss`: 26 imports

**Severidade:** MEDIA
- `@import` está deprecated desde Dart Sass 1.40 (2021)
- Será removido em Dart Sass 3.0
- Recomendação: Converter para `@use` (com namespacing)

**Exemplo atual:**
```scss
@import 'functions';
@import 'mixins';
```

**Forma moderna:**
```scss
@use 'functions' as *;
@use 'mixins' as *;
```

---

#### **[SIGNAL-F03]** — Tokens inconsistentes (font-weight-regular vs. normal)

**Status: CONTRADITO**

Busca por `font-weight-regular` retornou **0 resultados**.

Token correto é **`--dss-font-weight-normal`** (verificado em `_text.scss`):
- ✅ `--dss-font-weight-normal` — Existe
- ❌ `--dss-font-weight-regular` — Não existe

**Conclusão:** A auditoria anterior estava correta. O token foi normalizado para `--dss-font-weight-normal`.

---

#### **[SIGNAL-F04]** — `_example-showcase.scss` não deve estar em produção

**Status: CONFIRMADO E MITIGADO CORRETAMENTE**

Análise:
- Arquivo existe: `/packages/core/utils/_example-showcase.scss` (387 linhas)
- Conteúdo: Classes CSS para componentes `.example.vue` (`.dss-button-examples`, `.example-section`, `.button-row`, etc.)
- **Importação:** ❌ NÃO está importado em `utils/index.scss`

**Mitigação presente:**
```scss
/* ==========================================================================
   NOTA: _example-showcase.scss NAO e importado aqui.
   
   Ele deve ser importado apenas nos arquivos .example.vue
   para evitar adicionar CSS desnecessario aos builds de producao.
   
   Para usar em exemplos:
   @import '@/dss/utils/example-showcase';
   ========================================================================== */
```

**Status:** ✅ CONFIRMADO — Arquivo corretamente excluído do bundle de produção. Documentação clara.

---

### 6. Novos Sinais Encontrados

#### **[SIGNAL-F05-NEW]** — Incompletude de `dss-brand-token()` função

**Severidade:** BAIXA

**Descrição:** A função `dss-brand-token()` em `_functions.scss` (linhas 108-118) trata Hub, Water e Waste, mas o bloco tem redundância:

```scss
@function dss-brand-token($token-name, $brand: null) {
  @if $brand == 'hub' {
    @return var(--dss-brand-#{$token-name}, var(--dss-#{$token-name}));
  } @else if $brand == 'water' {
    @return var(--dss-brand-#{$token-name}, var(--dss-#{$token-name}));
  } @else if $brand == 'waste' {
    @return var(--dss-brand-#{$token-name}, var(--dss-#{$token-name}));
  }
  
  @return var(--dss-#{$token-name});
}
```

Todas as 3 branches retornam o **mesmo valor**. Pode ser simplificado:

```scss
@if $brand and ($brand == 'hub' or $brand == 'water' or $brand == 'waste') {
  @return var(--dss-brand-#{$token-name}, var(--dss-#{$token-name}));
}
@return var(--dss-#{$token-name});
```

---

#### **[SIGNAL-F06-NEW]** — Falha de exportação TypeScript em composables

**Severidade:** MÉDIA

**Descrição:** O arquivo `composables/index.ts` exporta composables corretamente, mas:

1. `useComponentState.ts` é importado mas **nenhuma assinatura de tipo é exportada**:
   ```ts
   export { useComponentState } from './useComponentState'
   export type { ComponentStateOptions } from './useComponentState'
   ```

2. `useColorClasses.ts` exporta tipos mas a função não é testada se está sendo usada globalmente

**Recomendação:** Verificar se `useComponentState` é realmente exportado de seus arquivos internos.

---

#### **[SIGNAL-F07-NEW]** — Dark theme incomplete para algumas cores de ação

**Severidade:** MEDIA

**Descrição:** Em `tokens/themes/dark/_colors.scss`, linhas 20-21 mencionam:

> "1. Cores de ação (primary, secondary, tertiary, accent) e feedback (positive, negative, warning, info) **NÃO mudam**"

Mas análise do arquivo mostra que algumas cores de ação poderiam ser mais legíveis em dark mode. Exemplo:

- `--dss-action-dark` em dark mode permanece escuro (`--dss-gray-*`), o que reduz contraste com fundos escuros

**Recomendação:** Revisar se dark variants de `--dss-action-dark` e `--dss-action-tertiary` precisam de ajustes.

---

#### **[SIGNAL-F08-NEW]** — Layout tokens com valores hardcoded em pixels

**Severidade:** BAIXA

**Descrição:** Em `tokens/semantic/_spacing.scss`, linhas 65-73, há tokens de layout com valores hardcoded em px:

```scss
--dss-layout-sidebar-width: 240px;
--dss-layout-sidebar-width-mini: 64px;
--dss-layout-sidebar-width-wide: 320px;
--dss-layout-header-height: 64px;
--dss-layout-header-height-dense: 48px;
--dss-layout-footer-height: 64px;
--dss-layout-content-max-width: 720px;
--dss-layout-content-max-width-wide: 960px;
```

**Violação de Princípio #1 (Token First)?** Tecnicamente não — são tokens, não hardcodes em SCSS. Mas poderiam ser convertidos para REM para melhor escalabilidade:

```scss
--dss-layout-sidebar-width: 15rem;     /* 240px */
--dss-layout-sidebar-width-mini: 4rem;  /* 64px */
```

---

#### **[SIGNAL-F09-NEW]** — Inconsistência de composable export naming

**Severidade:** BAIXA

**Descrição:** Em `composables/useBrand.ts`:
- Composable exporta: `useBrand`
- Mas também exporta **constants/utilities**: `getBrandColor`, `BRAND_COLORS`

Estes não são verdadeiros composables (não usam hooks Vue). Estão corretamente exportados no `index.ts`, mas a organização poderia ser mais clara:

- **Composables** (useBrand, useAccessibility, useColorClasses, useComponentState) — Vue hooks
- **Utilities** (getBrandColor, BRAND_COLORS) — Pure functions/constants

Recomendação: Considerar arquivo separado `utils/brand.ts` para utilities não-Vue.

---

#### **[SIGNAL-F10-NEW]** — Falta de `.scss` imports de accessibility-mixins no global

**Severidade:** BAIXA

**Descrição:** O arquivo `utils/_accessibility-mixins.scss` é importado em `utils/index.scss`, mas seu conteúdo nunca é exemplo documentado como **usar** em componentes.

Recomendação: Adicionar comentário em `_accessibility-mixins.scss` com exemplo de uso nos componentes.

---

### 7. Recomendações de Melhoria Estrutural

#### **Prioridade Crítica**

1. **Migração @import → @use (SIGNAL-F02)**
   - Converter 34 imports deprecated em `tokens/index.scss` e `utils/index.scss`
   - Timeline: Antes de Dart Sass 3.0
   - Impacto: Alto (futuro-proofing)

2. **Converter if() para @if (SIGNAL-F01)**
   - Converter 4 ocorrências em `_functions.scss`
   - Timeline: Antes de Dart Sass 3.0
   - Impacto: Médio (breaking change futura)

#### **Prioridade Alta**

3. **Revisão Dark Mode para ações (SIGNAL-F07)**
   - Testar contraste de `--dss-action-dark` e `--dss-action-tertiary` em dark mode
   - Considerar variantes -dark para dark theme
   - Timeline: Sprint seguinte
   - Impacto: Acessibilidade

4. **Simplificar `dss-brand-token()` (SIGNAL-F05)**
   - Remover redundância de 3 branches idênticas
   - Timeline: Refactoring
   - Impacto: Baixo (manutenibilidade)

#### **Prioridade Média**

5. **Consolidar layout tokens para REM (SIGNAL-F08)**
   - Converter `--dss-layout-*` de px para rem
   - Mantém valor absoluto via comentário
   - Timeline: V2.1 (se houver mudança de escala)
   - Impacto: Escalabilidade futura

6. **Clarificar responsabilidade de composables (SIGNAL-F09)**
   - Considerar `utils/brand.ts` para `getBrandColor` e `BRAND_COLORS`
   - Manter `useBrand()` em `composables/useBrand.ts`
   - Timeline: Reorganização (não-breaking)
   - Impacto: Arquitetura clara

7. **Adicionar documentação de uso a _accessibility-mixins.scss (SIGNAL-F10)**
   - Exemplos de como usar `@include dss-focus-ring()` em componentes
   - Timeline: Doc update (non-code)
   - Impacto: Adoção/clareza

#### **Prioridade Baixa (Observação)**

8. **Monitorar fragmentação de utils**
   - Atualmente 9 arquivos .scss, alguns com ~50 linhas
   - Ainda é aceitável, mas consolidar se >15 arquivos
   - Timeline: V3.0 (se necessário)

---

## Conclusão Executiva

### Estado Geral: **HEALTHY ✅**

A camada Foundation (core/) está bem organizada, com:

✅ **Estrutura:** Hierarquia clara (global → semantic → accessibility → brand → themes)  
✅ **Distribuição:** Sem dispersão, redundância mínima, fragmentação intencional  
✅ **Tokens:** Catálogo robusto (200+ tokens) cobrindo cores, spacing, motion, acessibilidade  
✅ **Utils:** Primitivos reutilizáveis (funções, mixins, classes) bem isolados  
✅ **Composables:** Lógica Vue centralizada para marca, cores, acessibilidade  
✅ **Documentação:** Comentários claros, notas de mitigação (ex: _example-showcase.scss)  

⚠️ **Débitos Técnicos Menores:**
- Sintaxe Sass deprecated (@import, if()) — não impacta funcionamento agora, mas exigirá migration antes de Dart Sass 3.0
- Dark mode potencialmente incompleto para `--dss-action-dark`
- Redundância em `dss-brand-token()` — refactoring cosmético

📊 **Escala:** 4.3k linhas de SCSS + 400 linhas de TypeScript (composables) = ~4.7k linhas de Foundation para 76+ componentes = **~60 linhas de Foundation por componente em média** — proporção saudável.

**Nenhum component precisa ser removido, realocado ou arquivado.**

Arquivos-chave para referência:
- `/mnt/c/Users/hebert.chaves/quasar-to-figma-converter/V5/V5-2.0.2/DSS/packages/core/tokens/index.scss`
- `/mnt/c/Users/hebert.chaves/quasar-to-figma-converter/V5/V5-2.0.2/DSS/packages/core/utils/index.scss`
- `/mnt/c/Users/hebert.chaves/quasar-to-figma-converter/V5/V5-2.0.2/DSS/packages/core/composables/index.ts`
