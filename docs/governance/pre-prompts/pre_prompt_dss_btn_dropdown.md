# Pre-Prompt de Criação — DssBtnDropdown

> **Status:** Artefato de Governança — DSS v2.2
> **Criado:** 26 Mar 2026
> **Nota de Origem:** Especificação original fornecida inline durante sessão de trabalho (26 Mar 2026).
> Este documento é a reconstrução fiel da especificação normativa utilizada para criar o componente.
> Toda a informação deriva dos arquivos de documentação gerados (`DssBtnDropdown.md`, `DSSBTNDROPDOWN_API.md`, `dss.meta.json`).

---

## 1. Classificação e Contexto

Você é o Agente DSS responsável por criar o componente **DssBtnDropdown** conforme a especificação normativa DSS v2.2.

| Campo | Valor |
|-------|-------|
| **Nome** | DssBtnDropdown |
| **Componente Quasar Equivalente** | QBtnDropdown |
| **Categoria** | Action Group Composto (Botão com Dropdown Integrado) |
| **Fase** | 2 — Componente Composto |
| **Golden Reference** | DssChip |
| **Golden Context** | DssCard |
| **Golden Context Adicional** | DssBtnGroup (precedente direto de Action Group Fase 2, selado Mar 2026) |
| **Status Inicial** | Pré-auditoria |
| **DSS Version** | v2.2 |

**Justificativa Fase 2:** O DssBtnDropdown gerencia estado visual compartilhado entre trigger (botão) e painel (dropdown), coordenando posicionamento, animações e acessibilidade entre dois elementos distintos. Isso caracteriza composição interna — critério da Fase 2.

**Justificativa Golden Context (DssCard):** DssCard é o componente composto de Fase 2 mais próximo semanticamente. Ambos são containers estruturais de composição. DssBtnGroup é referência adicional por ser o precedente direto de Action Group.

**Abordagem obrigatória: WRAP** — DssBtnDropdown deve envolver o `QBtnDropdown`, não reconstruir do zero. Justificativa: QBtnDropdown fornece posicionamento, acessibilidade WAI-ARIA (aria-haspopup, aria-expanded), animações e keyboard navigation nativos. Precedente: DssSelect (selado Mar 2026) usa mesma estratégia.

---

## 2. O Grande Risco Arquitetural

### 2.1 Painel Teleportado — Escopo de Estilos

> ⚠️ CRÍTICO — Maior risco de NC de implementação.

O QBtnDropdown (via QMenu) **teleporta o painel para o `body`**. Seletores como `.dss-btn-dropdown .q-menu` **não funcionam** em runtime porque o painel não é filho DOM do trigger.

**Anti-pattern:**
```scss
/* ❌ INCORRETO — seletor descendente não alcança o painel teleportado */
.dss-btn-dropdown {
  .q-menu {
    border-radius: var(--dss-radius-md); /* nunca aplicado */
  }
}
```

**Solução obrigatória:**
```vue
<!-- ✅ CORRETO: popup-content-class injeta classe no painel teleportado -->
<q-btn-dropdown popup-content-class="dss-btn-dropdown__panel">
```
```scss
/* ✅ CORRETO: classe global para o painel */
.dss-btn-dropdown__panel {
  border-radius: var(--dss-radius-md);
}
```

**Precedente:** DssSelect (selado Mar 2026) usa `popup-content-class` para estilizar painel do QSelect.

### 2.2 `<style scoped>` Bloqueando Seletores Globais

Com `<style scoped>`, o Vue adiciona `data-v-xxx` apenas ao template deste componente. O painel teleportado não recebe este atributo. **Nenhum seletor de painel funcionaria.**

**Obrigatório:** `<style lang="scss">` **sem** `scoped`.

**Precedente:** DssBtnGroup NC-01 (Ciclo 1, Mar 2026) — mesma causa raiz.

### 2.3 Reatividade do Mapeamento de Variantes

A prop `variant` (API DSS simplificada) deve ser mapeada para props booleanas do QBtnDropdown (`flat`, `outline`, `unelevated`). Este mapeamento **DEVE ser reativo**:

```typescript
// ❌ INCORRETO — captura valor estático, não reage a mudanças dinâmicas
const variantProps = useBtnDropdownVariantProps(props.variant)

// ✅ CORRETO — computed externo rastreia props.variant reativamente
const variantProps = computed(() => useBtnDropdownVariantProps(props.variant).value)
```

### 2.4 Gate de Responsabilidade v2.4

O container `.dss-btn-dropdown` **não deve capturar** estados interativos (`:hover`, `:focus`, `:active`) dos elementos filhos via CSS. Todos os estados interativos do trigger pertencem ao QBtnDropdown interno.

---

## 3. Mapeamento de API

### Props Expostas

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `label` | `String` | `undefined` | Rótulo do trigger |
| `icon` | `String` | `undefined` | Ícone à esquerda (Material Icons) |
| `iconRight` | `String` | `undefined` | Ícone à direita do label |
| `variant` | `'elevated'\|'flat'\|'outline'\|'unelevated'` | `'elevated'` | Variante visual (API simplificada DSS) |
| `color` | `String` | `undefined` | Cor do trigger |
| `textColor` | `String` | `undefined` | Cor do texto |
| `size` | `'xs'\|'sm'\|'md'\|'lg'\|'xl'` | `'md'` | Tamanho |
| `square` | `Boolean` | `false` | Remove border-radius |
| `rounded` | `Boolean` | `false` | Border-radius pill |
| `dense` | `Boolean` | `false` | Modo compacto |
| `split` | `Boolean` | `false` | Modo split (ação + seta separados) |
| `disable` | `Boolean` | `false` | Desabilita o componente |
| `loading` | `Boolean` | `false` | Indicador de carregamento |
| `closeOnEsc` | `Boolean` | `true` | Fecha com Escape |
| `dropdownIcon` | `String` | `'arrow_drop_down'` | Ícone de seta |
| `menuAnchor` | `String` | `'bottom left'` | Âncora do painel |
| `menuSelf` | `String` | `'top left'` | Self do painel |
| `menuOffset` | `[Number, Number]` | `[0, 0]` | Offset do painel |
| `stretch` | `Boolean` | `false` | Painel com largura do trigger |
| `persistent` | `Boolean` | `false` | Painel sempre montado |
| `brand` | `'hub'\|'water'\|'waste'\|null` | `null` | Acento de marca |
| `ariaLabel` | `String` | `undefined` | Label acessível do trigger |

### Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global |
| `glossy` | Não faz parte da linguagem visual DSS v2.2 |
| `push` | Não faz parte da linguagem visual DSS v2.2 |
| `no-caps` | Casing gerenciado por tokens de tipografia |
| `no-wrap` | Controle via CSS contextual |
| `ripple` | Gerenciado globalmente pelo Quasar |

### Mapeamento variant → QBtnDropdown

| `variant` DSS | Props booleanas Quasar |
|---------------|------------------------|
| `elevated` | *(nenhuma — padrão Quasar)* |
| `flat` | `flat: true` |
| `outline` | `outline: true` |
| `unelevated` | `unelevated: true` |

### Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `click` | `MouseEvent` | Sempre emitido; semanticamente relevante em modo split |
| `show` | — | Dropdown abriu |
| `hide` | — | Dropdown fechou |
| `before-show` | — | Antes de abrir |
| `before-hide` | — | Antes de fechar |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo do painel (tipicamente `<q-list>`) |
| `label` | Conteúdo personalizado do trigger |

---

## 4. Governança de Tokens

### Tokens Obrigatórios

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-surface-default` | L2 | Background do painel |
| `--dss-elevation-2` | L2 | Sombra do painel |
| `--dss-radius-md` | L2 | Border-radius do painel |
| `--dss-border-width-thin` | L2, L3 | Separadores split, colapso outline |
| `--dss-border-width-thick` | L4 | Acento brand (inset box-shadow) |
| `--dss-border-width-md` | L4 | High contrast |
| `--dss-gray-200` | L3 | Separador split unelevated |
| `--dss-gray-300` | L3 | Separador split flat |
| `--dss-hub-600` / `--dss-hub-400` | L4 | Brand Hub (claro/dark) |
| `--dss-water-500` / `--dss-water-400` | L4 | Brand Water (claro/dark) |
| `--dss-waste-600` / `--dss-waste-500` | L4 | Brand Waste (claro/dark) |

### Exceções Documentadas Obrigatórias

| ID | Valor | Local | Justificativa |
|----|-------|-------|---------------|
| EXC-01 | `border-radius: 0` | `_base.scss` | Split — junção visual. Semântico. Padrão DssCard EXC-03. |
| EXC-02 | `border-radius: 0` | `_base.scss` | Square variant. Semântico. Padrão DssBtnGroup EXC-01. |
| EXC-03 | `rgba(255, 255, 255, 0.12)` | `_states.scss` | Dark mode dividers. Sem token DSS para white alpha. |
| EXC-04 | `1px solid ButtonBorder` | `_states.scss` | Forced-colors — system keywords obrigatórios. |
| EXC-05 | `min-width: 160px` | `_base.scss` | UX contextual para painel flutuante. Sem token genérico de sizing no catálogo DSS v2.2. |

---

## 5. Acessibilidade e Estados

### ARIA

| Atributo | Valor | Fonte |
|----------|-------|-------|
| `role` | `button` | QBtnDropdown (automático) |
| `aria-haspopup` | `true` | QBtnDropdown (automático) |
| `aria-expanded` | `true`/`false` | QBtnDropdown (automático) |
| `aria-label` | prop `ariaLabel` | Quando fornecido |
| `aria-disabled` | `true` | Quando `disable="true"` |

### Touch Target

**Opção B — Delegado ao QBtnDropdown interno.** O DssBtnDropdown não é um Compact Control standalone. Adição de `::before` no container seria redundante e conflitante.

### Delegação de Estados

| Estado | Aplicável | Proprietário |
|--------|-----------|--------------|
| `default` | ✅ | DssBtnDropdown |
| `disabled` | ✅ | Delegado ao QBtnDropdown (prop `disable`) |
| `loading` | ✅ | Delegado ao QBtnDropdown (prop `loading`) |
| `hover`, `focus`, `active` | Delegado | Pertencem ao QBtnDropdown/trigger interno |
| `error`, `indeterminate`, `checked` | ❌ | Não aplicáveis a botões de ação |

### Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `Enter` / `Space` | Abre/fecha dropdown |
| `Escape` | Fecha dropdown (controlado por `closeOnEsc`) |
| `Tab` | Próximo elemento focusável |
| `Arrow Down` / `Arrow Up` | Navega entre itens do painel |

---

## Estrutura de Arquivos Obrigatória

```
DssBtnDropdown/
├── 1-structure/DssBtnDropdown.ts.vue     ← Implementação canônica
├── 2-composition/_base.scss              ← Container + painel + split EXC-01, EXC-05
├── 3-variants/
│   ├── _elevated.scss                    ← Placeholder intencional
│   ├── _flat.scss                        ← Separador split flat
│   ├── _outline.scss                     ← Colapso borda split outline
│   ├── _unelevated.scss                  ← Separador split unelevated
│   └── index.scss
├── 4-output/
│   ├── _states.scss                      ← Dark, forced-colors, print
│   ├── _brands.scss                      ← Hub, Water, Waste
│   └── index.scss
├── composables/useBtnDropdownClasses.ts
├── types/btn-dropdown.types.ts
├── DssBtnDropdown.module.scss            ← Orchestrador L2→L3→L4
├── DssBtnDropdown.vue                    ← Entry Point Wrapper (re-export puro)
├── DssBtnDropdown.example.vue            ← Mínimo 6 cenários
├── DssBtnDropdown.md                     ← Documentação normativa
├── DSSBTNDROPDOWN_API.md                 ← API Reference
├── dss.meta.json                         ← Metadados + exceções + gateExceptions
├── index.js                              ← Barrel export
└── README.md
```

---

*Artefato de Governança — DSS v2.2 — 26 Mar 2026*
