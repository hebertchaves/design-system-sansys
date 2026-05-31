# DssSpinner — API Reference

**Versão DSS**: 2.2.0 | **Componente**: DssSpinner | **Status**: Conformant — Selado 2026-03-24

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `type` | `SpinnerType` | `'standard'` | Variante gráfica. Mapeia internamente para o componente QSpinner* correspondente. |
| `color` | `SpinnerColor \| null` | `null` | Cor semântica DSS. `null` = herda `currentColor` do contexto pai. **Nunca repassada ao QSpinner** — controlada via CSS com tokens DSS. |
| `size` | `SpinnerSize` | `'md'` | Tamanho via tokens `--dss-icon-size-*` (seção 7.11). xs=16px, sm=20px, md=24px, lg=32px, xl=48px. |
| `thickness` | `number` | `5` | Espessura do traço circular. **Aplicável APENAS ao `type='standard'` (QSpinner)**. Ignorado pelos demais tipos. |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca Sansys. Substitui a cor via tokens numéricos de brand. |
| `ariaLabel` | `string` | `'Carregando'` | Texto acessível para screen readers (conteúdo do `.dss-spinner__label` sr-only). Fortemente recomendado contextualizá-lo quando múltiplos spinners coexistem. |

---

## Tipos de spinner (`type`)

| Valor | Componente Quasar | Descrição | Suporta `thickness` |
|-------|-------------------|-----------|---------------------|
| `standard` | `QSpinner` | Circular com stroke | ✅ Sim |
| `dots` | `QSpinnerDots` | Três pontos pulsantes | ❌ Não |
| `ios` | `QSpinnerIos` | Arco rotativo estilo iOS | ❌ Não |
| `oval` | `QSpinnerOval` | Oval com traço | ❌ Não |
| `tail` | `QSpinnerTail` | Círculo com cauda | ❌ Não |
| `rings` | `QSpinnerRings` | Anéis concêntricos | ❌ Não |
| `pie` | `QSpinnerPie` | Segmento de torta | ❌ Não |
| `bars` | `QSpinnerBars` | Barras verticais pulsantes | ❌ Não |

---

## Cores semânticas (`color`)

| Valor | Token DSS |
|-------|-----------|
| `null` (padrão) | `currentColor` herdado do contexto |
| `'primary'` | `var(--dss-action-primary)` |
| `'secondary'` | `var(--dss-action-secondary)` |
| `'neutral'` | `var(--dss-text-secondary)` |
| `'error'` | `var(--dss-feedback-error)` |
| `'success'` | `var(--dss-feedback-success)` |
| `'warning'` | `var(--dss-feedback-warning)` |
| `'info'` | `var(--dss-feedback-info)` |

---

## Events

Nenhum evento emitido. DssSpinner é um componente de exibição puro.

---

## Expose

Nenhum método público exposto na Fase 1.

---

## Props QSpinner não expostas (Fase 1)

| Prop QSpinner | Justificativa |
|---------------|---------------|
| `color` | **Governança de cor**: controlada via tokens DSS no CSS. Expor `color` quebraria Token First. Anti-pattern explícito. |

---

## Tokens Utilizados

**Total: 18 tokens**

| Categoria | Tokens |
|-----------|--------|
| Dimensão | `--dss-icon-size-xs`, `--dss-icon-size-sm`, `--dss-icon-size-md`, `--dss-icon-size-lg`, `--dss-icon-size-xl` |
| Cor — actions | `--dss-action-primary`, `--dss-action-secondary` |
| Cor — texto | `--dss-text-secondary` |
| Cor — feedback | `--dss-feedback-error`, `--dss-feedback-success`, `--dss-feedback-warning`, `--dss-feedback-info` |
| Brand Hub | `--dss-hub-600` (claro), `--dss-hub-500` (dark) |
| Brand Water | `--dss-water-500` (claro), `--dss-water-400` (dark) |
| Brand Waste | `--dss-waste-600` (claro), `--dss-waste-500` (dark) |

---

## Comportamentos Implícitos

### Mecanismo canônico: prop `ariaLabel` vs atributo `aria-label`

O `ariaLabel` é uma prop declarada (`SpinnerProps`) que popula o `.dss-spinner__label` (sr-only). Há dois caminhos para definir o texto acessível:

| Mecanismo | Sintaxe | Como funciona |
|-----------|---------|---------------|
| **Prop (canônico)** | `ariaLabel="texto"` ou `:ariaLabel="var"` | Popula o sr-only span dentro do `role="status"` |
| **Atributo via $attrs** | `aria-label="texto"` | Vai para `$attrs` → aplicado como attr no root `<span>` via `v-bind="$attrs"` — sobrescreve o nome acessível via ARIA name precedence |

Ambos produzem resultado acessível equivalente. O **mecanismo de prop é o preferido** por ser explícito na API declarada. O mecanismo de atributo é funcional e pode ser usado em composições que passam objetos de atributos dinamicamente.

---

### Limitação: propagação de `aria-hidden` no QSpinner interno

O DssSpinner aplica `aria-hidden="true"` ao elemento raiz do QSpinner interno para ocultar o SVG animado de screen readers. Contudo, a propagação efetiva desse atributo depende do comportamento do `inheritAttrs` interno de cada variante do Quasar (`QSpinner`, `QSpinnerDots`, `QSpinnerIos`, etc.).

**Limitação conhecida**: Em algumas variantes QSpinner*, o `inheritAttrs` interno pode não encaminhar `aria-hidden` ao SVG raiz gerado, resultando em SVGs animados ainda anunciados por screen readers. O texto sr-only (`.dss-spinner__label` com `role="status"`) permanece funcional independentemente — a experiência acessível não é comprometida, mas leitores de tela podem anunciar duplo conteúdo em certas variantes.

**Mitigação**: O `ariaLabel` customizável garante que o anúncio sr-only seja sempre contextualmente correto. Monitorar em atualizações do Quasar se o comportamento de `inheritAttrs` for corrigido.

### Anti-pattern: `ariaLabel` com string vazia

Passar `:ariaLabel="''"` (string vazia) é um **anti-pattern** que produz uma região de status (`role="status"`) sem rótulo para screen readers. O resultado é uma região anunciada como "status" sem conteúdo descritivo — equivalente a um botão sem nome acessível.

```vue
<!-- ❌ Anti-pattern: região de status sem rótulo -->
<DssSpinner :ariaLabel="''" />

<!-- ✅ Correto: sempre fornecer texto descritivo -->
<DssSpinner ariaLabel="Carregando dados do relatório" />
```

Quando o contexto de carregamento é autoevidente pelo container pai (ex: DssButton com `:loading="true"`), o `ariaLabel` padrão `"Carregando"` é suficiente — não passe string vazia para "silenciá-lo".

---

## CSS Classes Públicas

| Classe | Condição |
|--------|----------|
| `dss-spinner` | Sempre presente (wrapper root) |
| `dss-spinner--type-standard` | `type="standard"` (default) |
| `dss-spinner--type-dots` | `type="dots"` |
| `dss-spinner--type-ios` | `type="ios"` |
| `dss-spinner--type-oval` | `type="oval"` |
| `dss-spinner--type-tail` | `type="tail"` |
| `dss-spinner--type-rings` | `type="rings"` |
| `dss-spinner--type-pie` | `type="pie"` |
| `dss-spinner--type-bars` | `type="bars"` |
| `dss-spinner--size-xs/sm/md/lg/xl` | Conforme `size` |
| `dss-spinner--color-primary/secondary/neutral/error/success/warning/info` | Conforme `color` (ausente quando `null`) |
| `dss-spinner--brand-hub/water/waste` | Conforme `brand` (ausente quando `null`) |
