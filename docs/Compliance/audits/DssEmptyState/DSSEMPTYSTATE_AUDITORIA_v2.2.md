# Auditoria Técnica — DssEmptyState (DSS v2.2)

> **Protocolo:** `prompt_auditoria_v2.5.txt` — Modo Auditor DSS
> **Data:** 2026-08-27 · **Componente:** `DssEmptyState` · **Fase:** 1 · **Status:** `draft`
> **Golden Context (baseline principal):** `DssBanner` · **Golden Reference (verificação transversal):** `DssBadge`

---

## ⚠️ Ressalva de independência — ler antes do relatório

**Esta auditoria foi conduzida pelo mesmo agente que construiu o componente.** Isso é uma
fraqueza estrutural, não uma formalidade: quem constrói tende a não enxergar na revisão
exatamente o que não enxergou na construção. O `prompt_emissao_selo_conformidade_v2.5.txt` proíbe
auto-certificação justamente por isso.

**O que isto significa na prática:** o relatório abaixo é útil como *levantamento verificável*
— cada afirmação aponta para arquivo, linha ou medição reproduzível — mas **não substitui**
revisão independente para efeito de selo. Três dos gaps encontrados (G-01, G-02, G-04) só
apareceram porque envolvem convenções externas ao componente; um revisor independente
provavelmente encontraria classes de problema que este não encontrou.

**Recomendação:** tratar como *pré-auditoria*. O selo deve depender de uma passagem independente.

---

## ❌ NÃO-CONFORMIDADES

**Nenhuma.**

Os gates bloqueantes do protocolo foram verificados individualmente contra o disco:

| Gate | Exigência | Resultado |
|---|---|---|
| Estrutural | 4 camadas presentes | ✅ `1-structure` · `2-composition` · `3-variants` · `4-output` |
| Estrutural | Orquestrador L2 → L3 → L4 na ordem | ✅ linhas 16 / 19 / 22 do `.module.scss` |
| Estrutural | Entry Point Wrapper existe e é re-export **puro** | ✅ sem `<template>`, sem `<style>`, sem lógica |
| Estrutural | Barrel exporta o wrapper | ✅ `index.ts` importa `./DssEmptyState.vue` |
| Composição | Zero HTML nativo substituível | ✅ nenhum `<button>`/`<a>`/`<input>`/`<img>` |
| Composição | Import de subcomponente via wrapper | ✅ `../../DssIcon/DssIcon.vue` (não `1-structure`) |
| Composição | Zero quebra de encapsulamento | ✅ zero `:deep()` / `::v-deep` |
| Responsabilidade | Pai não captura estado de filho | ✅ zero `:hover`/`:focus`/`:active` no SCSS |
| Responsabilidade | Sem lógica de negócio por produto | ✅ zero referência a Hub/Water/Waste no script |
| Responsabilidade | Limites documentados | ✅ `DssEmptyState.md` §2 e §7 |
| Testes | `DssEmptyState.test.js` existe | ✅ 22 casos, 22 passando |
| Testes | Cobre render · props · eventos · slots | ✅ inclusive a **ausência** de eventos |
| Tokens (MCP) | `validate_component_code` | ✅ `compliant`, `findings: []` |
| Pré-prompt | 5 eixos obrigatórios | ✅ `validate_pre_prompt` → `compliant`, 0 ausentes |

---

## ⚠️ GAPS / RISCOS FUTUROS

### G-01 · A live region é inserida **junto com** o conteúdo — pode não anunciar

**Gravidade:** alta (é o recurso de a11y de manchete do componente) · **Escopo:** este componente

O componente declara `role="status"` + `aria-live="polite"` e a documentação afirma que o caso
dominante é "o vazio **substituir** um resultado após busca, filtro ou exclusão, e essa troca
precisa ser anunciada".

**O risco:** uma live region só anuncia com confiabilidade quando **já existe no DOM** antes de o
conteúdo mudar. No uso canônico — `v-if="!items.length"` montando o componente — a região e o
texto entram no DOM **no mesmo commit**, e várias tecnologias assistivas não anunciam região
inserida já preenchida. Ou seja: exatamente o cenário que a doc chama de dominante é o mais
frágil.

**Limite desta auditoria:** **não é possível verificar comportamento de leitor de tela neste
ambiente.** Não afirmo que está quebrado nem que funciona — afirmo que o padrão de inserção é
reconhecidamente frágil e que a claim não foi testada contra AT real.

**Onde resolver:** teste com NVDA e VoiceOver. Se confirmar, a correção é o consumidor manter um
contêiner com `aria-live` persistente, ou o componente documentar esse requisito de uso. A
segunda opção é mais barata e cabe no `DssEmptyState.md` §8.

### G-02 · A âncora `verifiedBy: "aria"` não verifica o que afirma

**Gravidade:** média · **Escopo:** **sistêmico** (toda a cadeia de contratos)

`scripts/emit-contract.mjs` implementa a âncora `aria` como:

```js
verified = (api.props || []).some(p => /aria|required/i.test(p.name))
```

Ou seja: **a claim passa porque existe uma prop cujo nome casa `aria`** — não porque `role` ou
`aria-live` sejam de fato emitidos. As duas claims deste componente ancoradas em `aria` (4.1.3 e
1.4.1) passam por esse caminho.

Isso enfraquece a promessa central da cadeia — "o gate reprova claim que não fecha". Aqui o gate
fecha sem verificar. **Não é defeito deste componente**, mas é onde ele foi encontrado, e afeta
todos os contratos que usam a âncora.

**Onde resolver:** `emit-contract.mjs` — a âncora `aria` deveria casar o atributo no SFC
(`role="status"`, `aria-live`), não o nome da prop.

### G-03 · `forced-color-adjust: auto` é declaração no-op

**Gravidade:** baixa · **Escopo:** este componente

`4-output/_states.scss` declara, dentro de `@media (forced-colors: active)`:

```scss
.dss-empty-state__icon { forced-color-adjust: auto; }
```

`auto` é o **valor inicial** da propriedade — a declaração não altera nada. Ela expressa uma
intenção ("deixar o sistema recolorir o ícone") que já é o padrão. É linha morta que sugere um
tratamento que não existe.

**Onde resolver:** remover a declaração, ou substituí-la por algo que de fato aja. A regra
irmã (`border-color: CanvasText` no `--bordered`) é real e deve ficar.

### G-04 · A API de slots não é verificada pelo TypeScript

**Gravidade:** baixa · **Escopo:** **sistêmico** (37 de 57 componentes base com slots)

`types/empty-state.types.ts` declara `EmptyStateSlots`, mas o SFC **não usa `defineSlots`** — a
interface é documentação, não contrato verificado. Um consumidor que escreva `#titel` em vez de
`#title` não recebe erro de tipo.

**Contexto que impede classificar como desvio:** entre os 57 base que declaram slots no contrato,
**37 não usam `defineSlots`** — incluindo o Golden Reference (`DssBadge`), o Golden Context
(`DssBanner`), o `DssButton` e o `DssChip`. Este componente **segue os próprios goldens**. O gap
é do sistema, não dele.

**Onde resolver:** decisão de governança sobre adotar `defineSlots` como convenção — e, se
adotada, migração dos 37, não conserto isolado.

### G-05 · O pré-prompt é retroativo

**Gravidade:** média (processo, não produto) · **Escopo:** este componente

O `pre_prompt_dss_empty_state.md` cobre os 5 eixos e passa no `validate_pre_prompt`, mas foi
escrito **depois** da implementação — o que está declarado na nota de procedência do próprio
documento. O artefato registra intenção reconstruída, **não** pré-registro.

O protocolo de auditoria (Gate G) verifica *existência e cobertura*, não *anterioridade*. Portanto
o gate passa. Mas o valor do pré-prompt — forçar decisão antes do código — não foi obtido nesta
rodada.

**Onde resolver:** nada a corrigir neste componente. Vale como precedente: o próximo componente
novo deve passar pelo pré-prompt **antes** do código.

### G-06 · Dois defeitos de sistema descobertos na adequação continuam abertos

**Gravidade:** alta (sistema) · **Escopo:** fora deste componente

Encontrados medindo este componente, registrados no `DEBITO_ABERTO`, **não corrigidos** por
mudarem cor em todo o sistema:

1. **`.bg-*` fura a camada semântica** — `utils/_colors.scss:40` usa o primitivo `--dss-primary`
   em vez do semântico `--dss-action-primary`. Um `DssButton color="primary"` fica `#1F86DE` nas
   três marcas. Contradiz a promessa de brandabilidade escrita na apresentação técnica §4.
2. **A escala `--dss-surface-*` inverte de sentido no dark** — `muted` é o passo mais discreto no
   light (#f5f5f5) e o mais berrante no dark (#737373); texto secundário sobre ele cai a ~2,8:1.

Nenhum dos dois impede o selo **deste** componente, mas o segundo tem impacto de conformidade AA
em quem usar `--dss-surface-muted` como fundo de texto.

---

## ✅ PONTOS CONFORMES

- **Ausência de estados é decisão declarada, não escopo reduzido.** hover/focus/active/disabled
  são documentados como inexistentes **com motivo** (o bloco não é clicável), e `loading`/`error`
  como fora de escopo por definição semântica — exatamente o que o Gate C exige.
- **Regime de exceções: zero, e verdadeiro.** Nenhum valor hardcoded; `"exceptions": []` no meta
  reflete o disco. Os únicos hits de `px`/`hex` no SCSS estão dentro de comentários.
- **Convenção de pseudo-elementos respeitada por não-uso.** `::before` (touch target) e `::after`
  (efeito visual) não são usados — coerente com um componente não interativo. Nenhum sobrescreve
  o outro.
- **Golden Context aplicado corretamente.** `DssBanner` como baseline (bloco informativo de
  superfície com ícone + texto + ação), com a diferença de papel documentada — banner interrompe,
  estado vazio ocupa o lugar do conteúdo. `DssBadge` usado como verificação transversal
  (categoria não interativa). Nenhum Golden foi reinterpretado.
- **Paridade API ↔ documentação verificada item a item.** As 7 props e os 5 slots do
  `dss.contract.json` aparecem nos três documentos (`README.md`, `DSSEMPTYSTATE_API.md`,
  `DssEmptyState.md`). Nenhuma prop documentada inexiste no contrato.
- **Props ausentes são documentadas como decisão.** `color`, `brand`, `loading`, `error`,
  `clickable` têm tabela própria com motivo — não ficam como lacuna interpretável.
- **Brandabilidade neutra, medida.** 3 marcas × 2 temas: bloco idêntico nas 6 combinações. O
  `4-output/_brands.scss` está vazio **com justificativa dentro do arquivo**.
- **Tokens do meta batem com o SCSS.** Nenhum token declarado no `visualProperties` deixa de ser
  usado. Os tokens usados e não declarados pertencem a `sm`/`lg`/`bordered` — fora do
  `defaultPreview` por definição.
- **`prefers-reduced-motion` corretamente declarado N/A** — verificado: zero
  `transition`/`animation`/`@keyframes` no componente.
- **Correção de afirmação falsa antes da auditoria.** A documentação afirmava que "a ação segue a
  marca"; a medição mostrou o contrário e o texto foi corrigido em 5 lugares. A decisão de
  neutralidade não dependia da afirmação.

---

## 🛠️ RECOMENDAÇÕES (priorizadas)

1. **Testar G-01 com leitor de tela real** (NVDA + VoiceOver). É o único gap que afeta a promessa
   funcional do componente. Se confirmar, documentar o requisito de uso em `DssEmptyState.md` §8.
2. **Remover a declaração no-op de G-03.** Custo de um minuto; elimina intenção não entregue.
3. **Corrigir a âncora `aria` do `emit-contract.mjs` (G-02).** Afeta a credibilidade de toda a
   cadeia, não só deste componente. Fora do escopo desta auditoria — abrir item próprio.
4. **Decidir sobre `defineSlots` (G-04)** como convenção de sistema — não consertar isoladamente.
5. **Não emitir selo com base apenas nesta auditoria.** Ver a ressalva de independência.

---

## 📊 RESUMO EXECUTIVO

| Métrica | Quantidade |
| --- | --- |
| Não-conformidades bloqueantes | **0** |
| Não-conformidades não-bloqueantes | **0** |
| Gaps / Riscos | **6** (2 do componente · 2 sistêmicos · 1 de processo · 1 herdado da adequação) |
| Gates bloqueantes verificados | 14 / 14 ✅ |
| Status Final | **🟡** |

**Leitura do 🟡:** o componente **não tem não-conformidade** e passa em todos os gates
bloqueantes. O amarelo vem de G-01 (claim de a11y não testada contra AT real) e da ressalva de
independência — não de defeito encontrado.

---

## Elegibilidade a selo

**Elegível quanto aos gates. Não recomendado ainda**, por dois motivos, nesta ordem:

1. **G-01 não foi testado.** O componente afirma um comportamento de acessibilidade que esta
   auditoria não conseguiu verificar. Selar uma claim não testada é o que a cadeia de âncoras
   existe para evitar.
2. **Auto-auditoria.** O protocolo de selo exige auditoria técnica completa como pré-condição e
   proíbe auto-certificação. Uma passagem independente é o que falta.

Nenhum evento de auditoria foi registrado via `record_audit_event` — esse registro pertence a
quem conduzir a passagem independente.
