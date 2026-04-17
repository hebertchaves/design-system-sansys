# Pré-prompt Oficial — DssHeader
**Versão do Pré-prompt:** 1.0
**Data de Criação:** 2026-04-17
**Status:** Aprovado (componente selado em 2026-04-17)
**Família:** Superfícies e Layout
**Nível:** 3 — Composição de Segundo Grau

---

## 1. Classificação e Contexto

- **Nome do Componente:** DssHeader
- **Família:** Superfícies e Layout
- **Nível de Composição:** Nível 3 (Composição de Segundo Grau)
- **Golden Reference:** DssCard (como container estrutural de alto nível)
- **Golden Context:** DssLayout (container pai futuro, Nível 4) → substituído por DssToolbar (selado) como Golden Context efetivo
- **Componente Quasar Base:** QHeader
- **Dependência Direta:** DssToolbar (Nível 1)

**Justificativa de Fase 2:** O DssHeader é o container superior de layout de página. Como componente de Nível 3, ele orquestra componentes de Nível 1 (DssToolbar) e interage diretamente com o sistema de layout do Quasar (QLayout). Encapsula primitivo de layout (`<q-header>`) sem reimplementar sua lógica.

---

## 2. Grande Risco Arquitetural

### Risco Principal: Injeção de Layout e Z-Index

O QHeader nativo injeta variáveis CSS no QLayout pai para calcular o offset do conteúdo da página e gerencia seu próprio z-index para ficar sobreposto ao conteúdo rolado. O risco é que a sobrescrita de estilos quebre a matemática de layout do Quasar ou cause problemas de empilhamento (z-index) com modais e drawers.

**Mitigação:** O DssHeader não deve alterar o z-index nativo nem as propriedades de posicionamento (`position: fixed/absolute`) aplicadas pelo Quasar. As customizações devem se restringir a bordas, sombras (elevation) e cores de fundo.

### Risco Secundário: bg-primary !important do QHeader

O QHeader aplica `bg-primary !important` como fundo padrão. Para sobrescrever com `--dss-surface-default`, é necessário usar `!important` no CSS do DssHeader. Documentado como EXC-02.

**Padrão correto (✅):**
```scss
/* 2-composition/_base.scss */
.dss-header {
  background-color: var(--dss-surface-default) !important;
  color: var(--dss-text-body) !important;
}
```

**Anti-pattern (❌):**
```scss
/* NÃO sobrescrever z-index ou position */
.dss-header {
  z-index: 9999;
  position: sticky; /* quebra a matemática de layout do Quasar */
}
```

### Gate de Responsabilidade v2.4

O DssHeader é um container estrutural de layout 100% não-interativo. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade é ancorar o conteúdo no topo da página e gerenciar a elevação visual (sombra/borda) em relação ao conteúdo rolado.

### Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-header>`. O slot default é destinado exclusivamente a componentes DssToolbar (ou DssTabs em cenários específicos de navegação global). O uso de HTML nativo ou texto solto diretamente no DssHeader viola a governança de Nível 3.

---

## 3. Mapeamento de API (DSS vs Quasar)

### Props Expostas (Permitidas)

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `elevated` | `Boolean` | `false` | Aplica sombra de elevação (`--dss-elevation-2`) |
| `bordered` | `Boolean` | `false` | Aplica borda inferior sutil |

### Props Bloqueadas (Governança DSS)

| Prop QHeader | Motivo |
|--------------|--------|
| `color` | Fundo governado por `--dss-surface-default` + EXC-02 |
| `height-hint` | Altura calculada automaticamente pelo Quasar |
| `dark` | Modo escuro governado globalmente via `[data-theme="dark"]` |

### Props Repassadas via $attrs

| Prop QHeader | Descrição |
|--------------|-----------|
| `reveal` | Oculta/exibe o header ao rolar a página |
| `reveal-offset` | Offset em pixels para o reveal |

---

## 4. Governança de Tokens

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Cor de fundo (sobrescreve `bg-primary !important`) |
| `--dss-text-body` | Cor de texto padrão |
| `--dss-elevation-2` | Sombra da variante `elevated` |
| `--dss-border-width-thin` | Espessura da borda na variante `bordered` |
| `--dss-gray-200` | Cor da borda na variante `bordered` |
| `--dss-border-width-md` | Borda reforçada em `prefers-contrast: more` |

**Tokens rejeitados do pré-prompt original:** `--dss-shadow-2` (inexistente) → substituído por `--dss-elevation-2`; `--dss-border-subtle` (inexistente) → substituído por `var(--dss-border-width-thin) solid var(--dss-gray-200)`.

---

## 5. Acessibilidade e Estados

### Role ARIA

- `role="banner"` aplicado nativamente pelo QHeader
- Deve haver apenas **um** DssHeader por página (landmark único)
- `aria-label` recomendado via `$attrs`

### Decisão Touch Target

**Opção B — não implementado.** DssHeader é container não-interativo. Touch targets são responsabilidade exclusiva dos filhos (DssButton dentro de DssToolbar).

### Delegação de Estados

| Estado | Pertence a |
|--------|-----------|
| `hover` | Filhos (DssButton, DssIcon) |
| `focus` | Filhos (DssButton, DssIcon) |
| `active` | Filhos (DssButton, DssIcon) |
| `disabled` | Filhos ou conteúdo da página |
| `loading` | Não aplicável ao container |
| `error` | Não aplicável ao container |

### Estados do DssHeader

| Estado | Implementado | Descrição |
|--------|-------------|-----------|
| `elevated` | ✅ | Box-shadow via `--dss-elevation-2` |
| `bordered` | ✅ | Border-bottom via `--dss-border-width-thin` |
| `dark mode` | ✅ | Via `[data-theme="dark"]` |
| `forced-colors` | ✅ | System keywords (EXC-03) |
| `print` | ✅ | Hardcoded (EXC-04) |

---

## 6. Exceções Formais Previstas

| ID | Descrição | Arquivo |
|----|-----------|---------|
| EXC-01 | `<q-layout>` no exemplo (DssLayout Nível 4 inexistente) | `DssHeader.example.vue` |
| EXC-02 | `!important` em background (sobrescreve `bg-primary !important` do QHeader) | `2-composition/_base.scss` |
| EXC-03 | System color keywords em forced-colors | `4-output/_states.scss` |
| EXC-04 | Valores hardcoded em print incluindo `position: static` | `4-output/_states.scss` |

---

## 7. Cenários de Uso Obrigatórios

1. **Básico** — Header simples com DssToolbar + título
2. **Elevated** — Prop `elevated` com sombra
3. **Bordered** — Prop `bordered` com borda inferior
4. **Com Brand** — DssToolbar com `brand="hub"` (cor vem do toolbar, não do header)
5. **Múltiplos Toolbars** — Dois DssToolbar empilhados (ações globais + navegação de seção)

> **Nota sobre exemplos:** Como DssLayout (Nível 4) ainda não existe, os exemplos usam `<q-layout>` nativo temporariamente (EXC-01). Isenção formal conforme DSS_IMPLEMENTATION_GUIDE.md.

---

## 8. Histórico

| Data | Evento |
|------|--------|
| 2026-04-17 | Pré-prompt criado e componente implementado |
| 2026-04-17 | Auditoria DSS v2.5 executada — 2 NCs, 3 GAPs identificados |
| 2026-04-17 | NCs e GAPs corrigidos — Selo DSS v2.2 emitido |
