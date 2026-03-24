# DssSpinner — Documentação Normativa DSS v2.2

**Versão**: 1.0.0 | **Status**: Conformant — Selado 2026-03-24 | **Fase**: 1

---

## 1. Identidade e Papel Semântico

O `DssSpinner` é um **componente de Feedback de Status** do tipo indicador de carregamento indeterminado. Representa um processo em andamento sem duração definida, informando ao usuário que o sistema está processando.

**Categoria**: Feedback de Status — Indicador de Carregamento
**Papel semântico**: `role="status"` com `aria-live="polite"` no container
**Implementação**: Wrapper dos componentes `QSpinner*` do Quasar Framework

### O que este componente faz

- Indica visualmente um estado de carregamento ou processamento em andamento
- Suporta 8 variantes gráficas via prop `type` (mapeadas para QSpinner*)
- Controla cor via tokens DSS semânticos ou herança de `currentColor` do contexto
- Dimensiona via tokens `--dss-icon-size-*` (mesmos do DssIcon — Golden Context)
- Expõe texto acessível sr-only customizável via `ariaLabel`
- Interrompe animação em `prefers-reduced-motion: reduce` (WCAG 2.3.3)

### O que este componente NÃO faz

- Não indica progresso determinado (ex: 60% completo) → use barra de progresso
- Não é interativo — não possui touch target próprio (Opção B)
- Não reimplementa animações SVG — delega 100% ao Quasar
- Não expõe prop `color` ao QSpinner interno — governança de cor é exclusiva do DSS

---

## 2. Golden Component

### Golden Reference: DssBadge (não interativo)

**DssBadge** é o **Golden Reference oficial** para componentes não interativos do DSS (designação formal — `DSS_GOLDEN_COMPONENTS.md §1.1`). DssSpinner é não interativo (Opção B, `pointer-events: none`), portanto está na cadeia de governança do DssBadge.

O que o Golden Reference DssBadge estabelece para DssSpinner:
- **Touch Target**: Opção B — delegado ao container pai, não implementado no próprio componente
- **Padrão de pseudo-elementos**: `::before` não utilizado (sem touch target próprio)
- **Decisões contextuais**: cor via `currentColor` do contexto, sem estados interativos (hover, focus, active)

### Golden Context: DssIcon

`DssIcon` (selado 2026-02-13) é o **Golden Context** de DssSpinner — o baseline de auditoria mais próximo por proximidade semântica e arquitetural. Ambos são componentes visuais não interativos com as mesmas características estruturais:

- `color: inherit` por padrão → herança de `currentColor` do contexto
- `pointer-events: none` → não interativo
- `flex-shrink: 0` → não comprime em layouts flex
- `vertical-align: middle` → alinhamento em contextos inline
- Sizing via tokens de ícone (`--dss-icon-size-*` — seção 7.11)
- Touch Target Opção B (responsabilidade do container pai)
- `_brands.scss` com padrão idêntico: `.dss-X--brand-hub.dss-X` + `[data-brand="hub"] .dss-X`
- `_states.scss` com `animation: none !important` em `prefers-reduced-motion`

**Diferença principal**: DssSpinner é um indicador de **estado transitório** (loading), enquanto DssIcon é um pictograma estático. Daí a necessidade de `role="status"` e `aria-live="polite"` vs. `role="img"` do DssIcon.

---

## 3. Touch Target

**Estratégia**: Opção B — componente NÃO INTERATIVO

DssSpinner não implementa touch target próprio. A interatividade (se necessária) é responsabilidade do container:

- Dentro de `DssButton` em estado loading → DssButton possui touch target
- Spinner de página inteira → o overlay/backdrop é responsável
- Spinner inline isolado → não requer touch target (não clicável)

`::before` não é utilizado. `pointer-events: none` garante que o spinner não intercepte eventos do container.

---

## 4. Implementação como Wrapper QSpinner*

### Decisão Arquitetural: Component Map

O `type` prop mapeia para componentes Quasar via um mapa estático em tempo de compilação:

```typescript
const SPINNER_MAP = {
  standard: QSpinner,      // circular com stroke — suporta thickness
  dots:     QSpinnerDots,  // três pontos pulsantes
  ios:      QSpinnerIos,   // arco estilo iOS
  oval:     QSpinnerOval,  // oval com traço
  tail:     QSpinnerTail,  // círculo com cauda
  rings:    QSpinnerRings, // anéis concêntricos
  pie:      QSpinnerPie,   // segmento de torta
  bars:     QSpinnerBars,  // barras verticais
}
```

### Decisão Arquitetural: size="100%"

O QSpinner recebe `size="100%"` para preencher o container DSS. O container (`.dss-spinner`) tem suas dimensões controladas pelos tokens `--dss-icon-size-*`. Isso garante Token First — nenhum valor de pixel é hardcoded no QSpinner.

### Decisão Arquitetural: Cor via CSS, não via prop

A prop `color` do QSpinner aceita classes Quasar (ex: "primary", "red"). O DssSpinner **não repassa** a prop `color` ao QSpinner. Em vez disso, o SCSS controla a cor do wrapper via `color: var(--dss-*)`. O SVG interno do QSpinner usa `currentColor` internamente, herdando a cor do container.

### inheritAttrs: false e v-bind="$attrs"

`inheritAttrs: false` é declarado e `v-bind="$attrs"` aplicado ao span root. Atributos externos (`id`, `class` adicional, `data-*`) são encaminhados ao container, não ao QSpinner interno.

---

## 5. Estados

| Estado | Implementação | Observação |
|--------|--------------|-----------|
| default | Animação contínua do QSpinner | Core behavior |
| hover | **NÃO APLICÁVEL** | Não interativo |
| focus | **NÃO APLICÁVEL** | Não interativo |
| active | **NÃO APLICÁVEL** | Não interativo |
| disabled | **NÃO APLICÁVEL** | Spinners são removidos do DOM quando não necessários |
| loading | **NÃO APLICÁVEL** | Este componente É o loading |
| indeterminate | **NÃO APLICÁVEL** | Spinner sempre indica progresso indeterminado por natureza |
| `prefers-reduced-motion` | Animação interrompida (EX-02) | WCAG 2.3.3 |
| `print` | `display: none` | Spinners são estado transitório — sem significado em impressão |
| `forced-colors` | `color: ButtonText` | Windows HCM |

---

## 6. Acessibilidade

### ARIA

- `role="status"`: indica ao AT que a região contém informação de status
- `aria-live="polite"`: anuncia mudanças sem interromper a leitura atual
- `aria-hidden="true"` no QSpinner interno: SVG animado é puramente decorativo
- `.dss-spinner__label` (sr-only): texto customizável via `ariaLabel`

### Mecanismo canônico: prop `ariaLabel` vs atributo HTML `aria-label`

O DssSpinner expõe dois caminhos para fornecer texto acessível:

**Mecanismo 1 — Prop `ariaLabel` (canônico)**: popula o elemento `.dss-spinner__label` (sr-only) dentro do `role="status"`. É o mecanismo primário e intencionado pela arquitetura DSS.

```vue
<!-- ✅ Mecanismo canônico — prop ariaLabel -->
<DssSpinner ariaLabel="Carregando lista de produtos" />
<DssSpinner :ariaLabel="loadingMessage" />  <!-- dinâmico -->
```

**Mecanismo 2 — Atributo HTML `aria-label`**: como `inheritAttrs: false` + `v-bind="$attrs"` está ativo, `aria-label="..."` passado como atributo vai para `$attrs` e é aplicado diretamente ao root `<span>`. Neste caso, `aria-label` no elemento sobrescreve o nome acessível do `role="status"` (ARIA name precedence: `aria-label` > conteúdo do elemento). O sr-only span ainda existe com o texto do prop `ariaLabel` (valor padrão "Carregando"), mas é ignorado pelo AT.

```vue
<!-- ✅ Também funcional — atributo via $attrs -->
<DssSpinner aria-label="Carregando lista de produtos" />
```

Ambos os mecanismos produzem saída acessível equivalente. A diferença é interna: o mecanismo 1 usa o sr-only span, o mecanismo 2 usa o atributo direto no root. **O mecanismo 1 (prop `ariaLabel`) é preferido** por ser explícito na API declarada do componente. Use o mecanismo 2 apenas quando precisar passar o aria-label dinamicamente via `v-bind` em objetos de atributos.

### Boas Práticas de ariaLabel

```vue
<!-- ✅ Correto: contexto específico via prop (canônico) -->
<DssSpinner ariaLabel="Carregando lista de produtos" />

<!-- ✅ Correto: múltiplos spinners diferenciados -->
<DssSpinner ariaLabel="Salvando perfil" />
<DssSpinner ariaLabel="Enviando arquivo" />

<!-- ⚠️ Aceitável mas genérico: único spinner na página -->
<DssSpinner /> <!-- ariaLabel default: "Carregando" -->
```

### prefers-reduced-motion (WCAG 2.3.3)

```scss
@media (prefers-reduced-motion: reduce) {
  .dss-spinner,
  .dss-spinner * {
    animation: none !important;  // EX-02
    transition: none !important;
  }
}
```

O spinner para completamente. Em vez de exibir uma versão estática, o spinner desaparece visualmente (sem animação). O texto sr-only (`role="status"`) continua informando o estado aos screen readers.

---

## 7. Brandabilidade

### Mecanismo: color override via CSS

A cor de brand é aplicada ao `.dss-spinner` wrapper via `color: var(--dss-brand-token)`. O QSpinner herda via `currentColor`.

```vue
<!-- Via prop -->
<DssSpinner brand="hub" />

<!-- Via contexto ancestral -->
<div data-brand="water">
  <DssSpinner />
</div>
```

### Tokens de brand utilizados

| Brand | Token claro | Token dark |
|-------|-------------|-----------|
| Hub | `--dss-hub-600` | `--dss-hub-500` |
| Water | `--dss-water-500` | `--dss-water-400` |
| Waste | `--dss-waste-600` | `--dss-waste-500` |

**Nota**: Tokens numéricos usados porque tokens semânticos de brand (`--dss-{brand}-primary`) não existem ainda. Precedente: DssIcon (Golden Reference), DssCard.

---

## 8. Anti-Patterns

1. **Usar DssSpinner como elemento interativo** — não possui touch target; se precisar de interação (ex: cancelar loading), envolva em DssButton
2. **Passar prop `color` ao QSpinner via atributos** — `$attrs` é encaminhado ao container, não ao QSpinner; a cor é controlada exclusivamente pelo CSS DSS
3. **Omitir `ariaLabel` com múltiplos spinners** — "Carregando" genérico não distingue contextos; use labels descritivos
4. **Usar DssSpinner sem contexto visual** — o spinner deve sempre acompanhar texto, botão ou container com label semântico
5. **Não acompanhar DssSpinner de texto ou feedback visual alternativo em contextos com `prefers-reduced-motion`** — quando `prefers-reduced-motion: reduce` está ativo, a animação do spinner é interrompida completamente (WCAG 2.3.3). Usuários afetados dependem do texto sr-only (`ariaLabel`) e/ou de um feedback visual estático alternativo (ex: skeleton, mensagem textual) para identificar o estado de carregamento. Nunca assuma que o spinner animado é o único indicador de loading disponível.

---

## 9. Paridade com Golden Reference (DssIcon)

| Critério | DssIcon | DssSpinner | Observação |
|----------|---------|------------|------------|
| Touch Target | Opção B — não interativo | Opção B — não interativo | Idêntico |
| `color: inherit` default | ✅ | ✅ | Idêntico |
| `pointer-events: none` | ✅ | ✅ | Idêntico |
| `flex-shrink: 0` | ✅ | ✅ | Idêntico |
| Sizing tokens | `--dss-icon-size-*` | `--dss-icon-size-*` | Idêntico |
| Brand pattern CSS | `.dss-icon--brand-hub.dss-icon` | `.dss-spinner--brand-hub.dss-spinner` | Idêntico |
| Dark mode brands | `--dss-hub-500` overrides | `--dss-hub-500` overrides | Idêntico |
| Reduced motion | `animation: none !important` | `animation: none !important` | Idêntico |
| Forced colors | `color: ButtonText` | `color: ButtonText` | Idêntico |
| ARIA role | `role="img"` | `role="status"` | **Diferente** — spinner é estado transitório, não pictograma |
| aria-live | Não aplicável | `aria-live="polite"` | **Adição** — spinner notifica AT sobre mudanças |
| sr-only label | Não (ariaLabel diretamente) | `.dss-spinner__label` | **Diferente** — necessário para role="status" |
| `print` state | Não específico | `display: none` | **Adição** — spinners não têm significado em impressão |
| Animações | `spin`, `pulse` via CSS | Animações via QSpinner* interno | **Diferente** — DssSpinner delega ao Quasar |
| `type` prop | `name` (ícone Material) | `type` (8 variantes QSpinner) | **Diferente** — natureza distinta dos componentes |

---

## 10. Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EX-01 | `1px`, `margin: -1px`, `clip: rect(0,0,0,0)` | `.dss-spinner__label` | Padrão sr-only de acessibilidade. Não tokenizável — browser accessibility technique. CLAUDE.md: "sr-only pattern: 1px values are acceptable". Precedente: DssInput, DssTextarea |
| EX-02 | `animation: none !important`, `transition: none !important`, `animation-duration: 0.01ms !important` | `4-output/_states.scss`, `@media (prefers-reduced-motion: reduce)` | Quasar aplica keyframes via CSS interno; `!important` obrigatório para sobrescrever (WCAG 2.3.3). Precedente: DssIcon (_states.scss) |

---

## 11. Uso Previsto em Componentes Futuros

- **DssButton** (loading state, Fase 1): DssSpinner embutido ao habilitar `:loading="true"`. Herda cor branca via `color: inherit` do botão primário.
- **DssForm** (Fase 2): Indicador de submissão de formulário.
- **DssTable** (Fase 2): Overlay de carregamento de dados paginados.
- **DssDialog** (Fase 2): Spinner centralizado em dialog de confirmação assíncrona.
