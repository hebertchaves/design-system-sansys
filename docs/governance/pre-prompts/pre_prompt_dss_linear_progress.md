# Pré-prompt de Criação: DssLinearProgress (Nível 2)

**Objetivo:** Criar o componente `DssLinearProgress` no Design System Sansys (DSS) Fase 2.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssLinearProgress`
- **Nível Arquitetural:** Nível 2 (Composição de base)
- **Família:** Progresso e Feedback
- **Golden Reference:** `DssBadge` (Componente não interativo) e `DssChip` (Componente interativo)
- **Golden Context:** `DssSpinner` (Componente não interativo de feedback)
- **Status:** Desbloqueado

**Justificativa da Fase 2:** O `DssLinearProgress` é um componente de feedback visual fundamental, sem dependências bloqueantes, e é pré-requisito crítico para o `DssUploader` (Nível 3). Ele fornece feedback claro sobre o status de operações em andamento, melhorando a experiência do usuário ao reduzir a incerteza durante tempos de espera.

## 2. Riscos Arquiteturais e Gates

### 2.1. Gate de Composição v2.4
- **Risco:** O `QLinearProgress` nativo injeta classes próprias e gerencia a animação da barra (determinate/indeterminate).
- **Estratégia:** O `DssLinearProgress` deve ser um wrapper direto do `<q-linear-progress>`. Não tente reconstruir a lógica de animação ou cálculo de porcentagem.
- **Exceção (EXC-Gate):** Os seletores `.q-linear-progress`, `.q-linear-progress__track` e `.q-linear-progress__model` são internos do Quasar e necessários para override de tokens de cor e altura. Isso deve ser documentado no `dss.meta.json` como exceção ao Gate de Composição.

### 2.2. Gate de Responsabilidade v2.4
- O `DssLinearProgress` **não deve** gerenciar estado interativo (não tem hover, focus ou active).
- O `DssLinearProgress` **não deve** calcular o progresso por conta própria — ele apenas recebe o valor numérico (0.0 a 1.0) e repassa ao Quasar.
- O componente deve focar exclusivamente na apresentação visual do progresso, delegando a lógica de negócio para os componentes pais.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

**Comportamento:**
- `value` (Number) - Valor do progresso (0.0 a 1.0). Se omitido, o componente assume estado indeterminado.
- `indeterminate` (Boolean) - Força o estado indeterminado independente do `value`.
- `reverse` (Boolean) - Inverte a direção da animação/preenchimento.

**Visual:**
- `color` (String) - Cor semântica DSS (`hub`, `water`, `waste`, `error`, `success`, `warning`, `info`). Padrão: `hub`.
- `size` (String) - Altura da barra (`xs`, `sm`, `md`, `lg`, `xl`). Padrão: `md`.
- `brand` (String) - Aplica contexto de brand Sansys.
- `stripe` (Boolean) - Aplica padrão listrado à barra de progresso.

### 3.2. Props Bloqueadas (Governança DSS)
- `dark` → O DSS gerencia o dark mode via CSS global.
- `track-color` → A cor do track (fundo) é estritamente governada pelo DSS (`--dss-surface-muted`).
- `rounded` → O DSS define o border-radius globalmente via tokens.

## 4. Governança de Tokens e CSS

- **Altura (Size):**
  - `xs`: `var(--dss-spacing-1)` (4px)
  - `sm`: `var(--dss-spacing-2)` (8px)
  - `md`: `var(--dss-spacing-3)` (12px) - Padrão
  - `lg`: `var(--dss-spacing-4)` (16px)
  - `xl`: `var(--dss-spacing-6)` (24px)
- **Border Radius:** `var(--dss-radius-full)` (9999px) para a barra e para o track.
- **Cor do Track (Fundo):** `var(--dss-surface-muted)`.
- **Cor do Model (Progresso):** Mapeada a partir da prop `color` para os tokens de brand (`--dss-action-hub`, `--dss-action-water`, `--dss-action-waste`) ou feedback (`--dss-feedback-success`, etc).
- **Transição:** `var(--dss-duration-250)` e `var(--dss-easing-standard)`.
- **Foco:** `outline: 2px solid white` (quando aplicável em contextos específicos).
- **Texto:** `var(--dss-text-subtle)` para rótulos associados.
- **Superfície:** `var(--dss-action-hub-surface)` para fundos relacionados.

## 5. Acessibilidade e Estados

- **Touch Target:** Não aplicável (Opção B — componente não interativo).
- **ARIA:** O Quasar gerencia `role="progressbar"`, `aria-valuenow`, `aria-valuemin` e `aria-valuemax`.
- **Estados aplicáveis:** `default`, `indeterminate`, `disabled` (opacidade reduzida).
- **High Contrast:** Em `forced-colors: active`, garantir que o track e o model usem SystemColor keywords (ex: `CanvasText` para o model, `Canvas` com borda para o track).

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssLinearProgress.example.vue` deve cobrir:
1. **Determinado:** Barra com valor fixo (ex: 0.7).
2. **Indeterminado:** Barra em animação contínua.
3. **Cores de Feedback:** Exemplos com `success`, `error`, `warning`.
4. **Tamanhos:** Demonstração dos tamanhos `xs` a `xl`.
5. **Brand:** Barra com prop `brand` aplicada.
6. **Stripe:** Barra com padrão listrado.
7. **Reverse:** Barra com preenchimento reverso.

## 7. Exceções aos Gates v2.4

### EXC-Gate-01: Override de classes internas do Quasar
- **Regra Violada:** Uso de seletores internos (`.q-linear-progress`, `.q-linear-progress__track`, `.q-linear-progress__model`).
- **Justificativa:** Necessário para aplicar tokens de cor, altura e border-radius do DSS à estrutura gerada pelo Quasar, garantindo consistência visual.

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios
- **Value**: Slider numérico (0.0 a 1.0) para controlar o progresso.
- **Indeterminate**: Toggle [true, false].
- **Color**: Select com as cores semânticas (`hub`, `water`, `waste`, `success`, `error`, `warning`, `info`).
- **Size**: Select com os tamanhos (`xs`, `sm`, `md`, `lg`, `xl`).
- **Stripe**: Toggle [true, false].
- **Reverse**: Toggle [true, false].

### 8.2 Composite Logic
- O playground **deve** demonstrar a transição suave quando o controle `Value` é alterado. A barra não deve "pular" instantaneamente, mas animar até o novo valor.
- Quando `Indeterminate` for ativado, o controle `Value` deve ser visualmente ignorado/desabilitado no playground, provando que o estado indeterminado tem precedência.
- A alteração de `Color` deve refletir imediatamente na barra de progresso, utilizando os tokens de brand corretos (`hub`, `water`, `waste`).

### 8.3 Estados a Expor
| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Determinado** | Barra preenchida até a porcentagem exata | Visual | Prop `value` |
| **Indeterminado** | Animação contínua de carregamento | Visual | Prop `indeterminate="true"` |
| **Stripe** | Padrão listrado sobre a cor de progresso | Visual | Prop `stripe="true"` |
| **Reverse** | Preenchimento da direita para a esquerda | Visual | Prop `reverse="true"` |
| **High Contrast** | Cores do sistema operacional | Acessibilidade | Emulação do SO |
| **Disabled** | Opacidade reduzida indicando inatividade | Visual | Prop `disabled="true"` |

---
*Nota de Governança: Este documento foi revisado para garantir conformidade com as diretrizes de design system da Sansys, incluindo a correta aplicação de tokens de brand (hub, water, waste) e a estrutura de 8 eixos.*
