# DssFooter — API Reference

> **Versão:** 1.0.0 | **DSS:** v2.2 | **Fase:** 2 | **Status:** Pending Audit
> **Golden Reference:** DssCard | **Golden Context:** DssHeader

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `elevated` | `Boolean` | `false` | Aplica sombra de elevação projetada para cima. Ver EXC-05 no `dss.meta.json`. |
| `bordered` | `Boolean` | `false` | Aplica borda superior (`border-top`) sutil. Alternativa flat ao `elevated`. |

### Props Bloqueadas (QFooter nativo)

| Prop Quasar | Razão do Bloqueio |
|-------------|------------------|
| `color` | Cor de fundo governada por `--dss-surface-default`. Override via `!important` (EXC-02). |
| `height-hint` | Altura calculada automaticamente pelo Quasar com base no conteúdo (`DssToolbar`). |

### Props Repassadas via `$attrs`

| Prop Quasar | Tipo | Descrição |
|-------------|------|-----------|
| `reveal` | `Boolean` | Oculta o footer ao rolar a página para baixo; reexibe ao rolar para cima. |

---

## Slots

| Slot | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `default` | `void` | Não | Conteúdo do footer. Deve conter exclusivamente `DssToolbar`. Texto ou HTML nativo viola Gate de Composição v2.4. |

---

## Eventos

DssFooter **não emite eventos próprios**. Eventos nativos do QFooter (ex: scroll visibility) são repassados via `$attrs`.

---

## Acessibilidade

| Atributo | Valor | Fonte |
|----------|-------|-------|
| `role` | `contentinfo` | QFooter nativo — landmark de rodapé de página |
| `aria-label` | _via $attrs_ | Recomendado: `<DssFooter aria-label="Rodapé principal">` |

> `role="contentinfo"` deve existir **uma única vez por página** (landmark único).

---

## Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-surface-default` | L2 base | Cor de fundo (sobrescreve bg-primary do QFooter) |
| `--dss-text-body` | L2 base | Cor de texto padrão |
| `--dss-border-width-thin` | L3 bordered | Espessura da borda superior |
| `--dss-gray-200` | L3 bordered | Cor da borda superior |
| `--dss-border-width-md` | L4 states | Borda reforçada em prefers-contrast |

---

## Exceções Documentadas

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `<q-layout>` no exemplo | `.example.vue` | DssLayout (Nível 4) inexistente. Scaffolding temporário. |
| EXC-02 | `!important` em background | L2 base + L4 states | QFooter aplica `bg-primary !important`. Necessário para override DSS. |
| EXC-03 | `Canvas, CanvasText, ButtonFace` | L4 states | Forced-colors: tokens ignorados; system keywords obrigatórios. |
| EXC-04 | `#fff, #000, position: static` | L4 states (print) | Impressão monocromática; position: static cancela fixed. |
| EXC-05 | `0 -4px 6px rgba(0,0,0,0.30)` | L3 elevated | Token `--dss-elevation-up-*` inexistente no DSS v2.2. |

---

## Comportamentos Implícitos

### Forwarding de `$attrs`
`inheritAttrs: false` + `v-bind="$attrs"` no `<q-footer>`. Atributos não declarados como props (ex: `reveal`, `aria-label`, `data-*`) são encaminhados ao QFooter.

### Brand via Herança
DssFooter é transparente para brand. O atributo `[data-brand]` aplicado por um `DssToolbar` interno é propagado automaticamente para seus filhos via CSS.

### Z-Index e Position
DssFooter **não altera** `z-index` nem `position` do QFooter. O posicionamento fixo na base da viewport é gerenciado pelo Quasar via `QLayout`. Sobrescrever essas propriedades é um anti-pattern.

---

## Paridade com Golden Context (DssHeader)

| Aspecto | DssHeader | DssFooter | Status |
|---------|-----------|-----------|--------|
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Igual |
| `withDefaults(defineProps<...>())` | ✅ | ✅ | Igual |
| `v-bind="$attrs"` no primitivo Quasar | ✅ | ✅ | Igual |
| 4 camadas SCSS | ✅ | ✅ | Igual |
| `!important` override bg-primary | ✅ EXC-02 | ✅ EXC-02 | Igual |
| forced-colors keywords | ✅ EXC-03 | ✅ EXC-03 | Igual |
| print hardcoded + position: static | ✅ EXC-04 | ✅ EXC-04 | Igual |
| Borda lateral da variante `bordered` | `border-bottom` | `border-top` | Diferente (intencional — posição invertida) |
| Sombra `elevated` | `--dss-elevation-2` ↓ | `0 -4px 6px rgba()` ↑ EXC-05 | Diferente (intencional — direção invertida) |
| Primitivo Quasar encapsulado | `QHeader` | `QFooter` | Diferente (esperado) |
| Role ARIA | `banner` | `contentinfo` | Diferente (correto por especificação) |
| Delegação de brand para DssToolbar | ✅ | ✅ | Igual |
| Touch target | Opção B | Opção B | Igual (containers não-interativos) |
