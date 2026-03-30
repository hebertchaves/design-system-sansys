# SELO DSS v2.2 — DssOptionGroup

**Design System Sansys — Certificado de Conformidade**

---

## Identificação

| Campo | Valor |
|-------|-------|
| **Componente** | DssOptionGroup |
| **Versão DSS** | 2.2 |
| **Fase** | 2 — Componente Composto |
| **Categoria** | Container de Seleção — Grupo de Controles |
| **Classificação** | Construção Explícita (não wrap de QOptionGroup) |
| **Data de Auditoria** | 27 Mar 2026 |
| **Auditor** | Claude Sonnet 4.6 |
| **Status** | ✅ CONFORME — SELO CONCEDIDO |

---

## Referências de Auditoria

| Campo | Componente |
|-------|-----------|
| **Golden Reference** | DssChip (interativo) |
| **Golden Context** | DssBtnToggle (selado 27 Mar 2026) |
| **Composição DSS** | DssRadio + DssCheckbox + DssToggle (Fase 1, todos selados) |

---

## Ciclo de Auditoria

| Fase | Resultado |
|------|-----------|
| Auditoria inicial | 1 NC Bloqueante + 3 GAPs |
| Correção NC-01 | `_moduleGroupSeq` movido para escopo de módulo (dual-script) |
| Correção GAP-01 | `--dss-surface-raised` → `--dss-surface-muted` (token existente) |
| Correção GAP-02 | Comentário atualizado (resolvido com NC-01) |
| Correção GAP-03 | `Boolean()` adicionado no binding `:disable` dos filhos |
| Auditoria final | **0 NCs, 0 GAPs pendentes** |
| **VEREDITO** | ✅ APROVADO |

---

## Não-Conformidades Resolvidas

### NC-01 — `radioGroupName` não único por instância (Bloqueante → Resolvido)

**Problema**: `let _groupSeq` declarado dentro de `<script setup>` criava variável de instância.
Todas as instâncias recebiam `radioGroupName = 'dss-option-group-1'`, violando a segregação de
grupos de radio e quebrando navegação por teclado (WCAG 1.3.1, 2.1.1).

**Correção aplicada**: Dual-script Vue 3 — contador `_moduleGroupSeq` movido para bloco
`<script lang="ts">` (escopo de módulo), executado uma única vez ao importar o módulo.

```vue
<script lang="ts">
let _moduleGroupSeq = 0  // nível de módulo — executado uma vez
</script>

<script setup lang="ts">
const radioGroupName = `dss-option-group-${++_moduleGroupSeq}`  // único por instância
</script>
```

---

## GAPs Resolvidos

### GAP-01 — Token `--dss-surface-raised` inexistente em `DssOptionGroup.example.vue`
**Correção**: Substituído por `var(--dss-surface-muted)` (token documentado no catálogo DSS).

### GAP-02 — Comentário "Contador a nível de módulo" inconsistente com código
**Correção**: Resolvido automaticamente com NC-01. Comentário atualizado para documentar
corretamente a localização da variável.

### GAP-03 — `:disable="disable || option.disable"` propagava `undefined` para prop booleana
**Correção**: Adicionado `Boolean()` em todos os três bindings `:disable` dos filhos
(DssRadio, DssCheckbox, DssToggle). Garante contrato `boolean` estrito.

---

## Gates de Governança

### Gate de Composição v2.4

| Regra | Status | Observação |
|-------|--------|-----------|
| **Regra 1** — Uso Exclusivo de DSS | ✅ PASSA | Template usa apenas DssRadio, DssCheckbox, DssToggle. Nenhum componente Quasar direto |
| **Regra 2** — Sem CSS em filhos DSS | ✅ PASSA | Container CSS limita-se a `.dss-option-group*`. Nenhum seletor invade filhos |
| **Regra 3** — Import via wrapper | ✅ PASSA | Importações via `../../DssRadio/DssRadio.vue` (wrapper), não via `1-structure/` |

### Gate de Responsabilidade v2.4

| Verificação | Status |
|-------------|--------|
| Container não captura estados interativos dos filhos | ✅ PASSA |
| hover, focus, active pertencem a DssRadio/Checkbox/Toggle | ✅ PASSA |
| `readonly` implementado via CSS container + delegação de prop | ✅ PASSA |
| `disable` delegado via prop para cada filho | ✅ PASSA |

---

## Reservações Documentadas (Não-Bloqueantes)

| ID | Descrição | Severidade |
|----|-----------|-----------|
| RES-01 | Comparação por igualdade estrita — apenas primitivos como `option.value` | Baixa |
| RES-02 | Sem testes unitários neste ciclo | Baixa |
| RES-03 | Mudança dinâmica de `type` sem atualizar `modelValue` causa comportamento inesperado | Baixa |

---

## Checklist Gate Estrutural

- [x] 4 camadas presentes (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`)
- [x] Entry Point Wrapper (`DssOptionGroup.vue`) — re-export puro
- [x] Orchestrador SCSS (`DssOptionGroup.module.scss`) — ordem L2→L3→L4
- [x] Barrel export (`index.js`) — componente, types, composable
- [x] `dss.meta.json` com `goldenReference` e `goldenContext` declarados

### Gate Técnico
- [x] Token First — zero hardcoded em SCSS
- [x] Cores via props dos filhos (não no SCSS do container)
- [x] Estados: `disable` e `readonly` implementados (hover/focus/active delegados aos filhos)
- [x] Acessibilidade: `role="radiogroup"/"group"`, `aria-label`, `aria-labelledby`, `aria-disabled`, `name` único
- [x] SCSS compila sem erros (2713 linhas, warnings de `@import` esperados e pre-documentados)

### Gate Documental
- [x] Tokens listados: `--dss-spacing-{1,2,4}` com uso documentado
- [x] README completo
- [x] `DssOptionGroup.md` — 16 seções, decisão arquitetural §9.1 documentada
- [x] `DSSOPTIONGROUP_API.md` — API Reference completa
- [x] `DssOptionGroup.example.vue` — 5 cenários (básico, checkbox, toggle, estados, brand)

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Arquivos criados | 19 |
| Linhas SCSS compiladas | 2.713 |
| Tokens utilizados | 3 (`--dss-spacing-{1,2,4}`) |
| Props expostas | 11 |
| Props bloqueadas | 3 (`dark`, `size`, `leftLabel`) |
| Composição DSS | DssRadio + DssCheckbox + DssToggle |
| NCs resolvidas | 1 |
| GAPs resolvidos | 3 |
| Exceções CSS documentadas | 0 |

---

## Decisão Arquitetural Central

**Construção Explícita ao invés de WRAP de QOptionGroup.**

DssRadio, DssCheckbox e DssToggle já estavam selados como Fase 1 com 100% de
conformidade DSS. Fazer wrap de QOptionGroup violaria o Gate de Composição Regra 1
(uso de componente Quasar no template), criaria dependência sobre componente não-DSS
e quebraria a fidelidade visual/token já garantida pelos componentes Fase 1.

A construção explícita via `v-for` com delegação total de props e estado garante que
cada controle renderizado é exatamente o componente DSS — com todos os seus tokens,
estados, acessibilidade e brandabilidade já implementados e selados.

---

*DSS v2.2 — Selo emitido em 27 Mar 2026*
*DssOptionGroup — Componente Fase 2 — Container de Seleção em Grupo*
