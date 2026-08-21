# Design System Sansys — Apresentação Técnica

> **Versão:** `@sansys/design-system` v2.5.0 · **Revisado:** agosto/2026
> **Público:** revisor técnico, arquitetura, desenvolvimento
> **Todos os números deste documento foram conferidos contra o repositório nesta revisão.**

---

## 1. O que o DSS é

Uma **camada corporativa sobre o Quasar Framework** — não uma biblioteca standalone. Entrega
tokens semânticos, brandabilidade multi-produto, governança verificável e componentes Vue 3
padronizados.

A distinção importa para a revisão: o DSS **não reimplementa** o Quasar. Ele governa como o
Quasar é consumido, e a maior parte da engenharia está nessa fronteira — cascata, isolamento
por camadas de CSS e contratos derivados do código.

| | |
|---|---|
| Pacote | `@sansys/design-system` v2.5.0 |
| Monorepo | `packages/core` · `apps/sandbox` · `apps/docs-portal` · `packages/grid-inspector` · `packages/mcp` |
| Formato | ES Module + UMD |
| Build | Vite 5 + Rollup |
| Sass | 100% `@use`/`@forward` — `@import` é proibido por gate |
| Vue | 3, Composition API, TypeScript |

---

## 2. Números atuais

| métrica | valor | como conferir |
|---|---|---|
| Componentes catalogados | **91** | `packages/core/catalog.json` |
| Componentes selados | **88** | `find docs/Compliance/seals -name '*SELO*.md' \| wc -l` |
| Contratos verificados | **78** | `node scripts/emit-contract.mjs --all --strict` |
| Arquivos de teste | **91** | `find packages/core/components -name '*.test.js' \| wc -l` |
| Travas de pre-commit | **15** | podem **bloquear** um commit |
| Passos de propagação | **4** | sincronizam derivados; não bloqueiam |
| Ferramentas MCP | **15** | `packages/mcp/src/tools/index.ts` |

> ⚠️ **Travas ≠ passos de propagação.** Só as 15 primeiras reprovam. Os 4 passos de sincronização
> regeneram artefatos derivados (catálogo, referência de tokens, CSS do portal) e seguem adiante.

### Bundle

| arquivo | tamanho |
|---|---|
| `dist/dss.es.js` | ~875 kB |
| `dist/dss.umd.js` | ~654 kB |
| `dist/style.css` | ~649 kB |

O CSS é grande **por desenho**: carrega os tokens de três marcas, os temas e as regras de
isolamento do Quasar. Ele não é tree-shakeable — tokens são custom properties, e remover o que
"não se usa" quebraria a troca de marca em runtime.

> ℹ️ O `dist/` **não é versionado**. É reconstruído por `npm run build:lib`, e há dois hooks que
> impedem que ele fique defasado: `prepublishOnly` (antes de publicar) e `post-merge` (após um
> pull que toque o core).

---

## 3. Arquitetura em 4 camadas

Todo componente segue a mesma estrutura. A ordem de importação é normativa.

```
DssButton/
├── 1-structure/DssButton.ts.vue    Vue + TypeScript (implementação canônica)
├── 2-composition/_base.scss        estilos base — só tokens genéricos
├── 3-variants/                     variantes visuais
├── 4-output/                       estados e brands
├── composables/ · types/
├── DssButton.vue                   entry point: re-export puro
├── DssButton.module.scss           orquestrador: L2 → L3 → L4
├── dss.meta.json · dss.contract.json
└── DssButton.md · *_API.md · README.md · *.example.vue · *.test.js
```

**Isolamento do Quasar** é o ponto arquitetural mais importante e o menos óbvio: CSS de
terceiros vive dentro de `@layer vendor`, e o CSS do DSS fica **fora de qualquer layer**. Escopo
sem layer vence escopo com layer — inclusive `!important` — o que dá ao DSS precedência sem
guerra de especificidade.

---

## 4. Tokens e brandabilidade

Cadeia de três camadas:

```
primitivo    --dss-primary: #1f86de            tokens/globals.scss
semântico    --dss-action-primary: var(--dss-primary)
consumo      var(--dss-action-primary)         ~1348× nos componentes
```

Componentes consomem **apenas o semântico**. Trocar marca re-aponta o semântico; nenhum
componente é tocado.

### Marcas

| produto | token | valor |
|---|---|---|
| Hub | `--dss-hub-600` | `#ef7a11` |
| Water | `--dss-water-500` | `#0e88e4` |
| Waste | `--dss-waste-600` | `#0b8154` |

Ativação por `[data-brand="hub\|water\|waste"]` em qualquer ancestral, ou pela prop `brand` no
componente.

> ⚠️ **Só `--dss-action-primary` é remapeada por marca.** `secondary`, `tertiary` e `accent`
> declaram explicitamente "mantém semântico" nas três marcas. É decisão de design registrada nos
> arquivos de marca — não é omissão.

---

## 5. Governança verificável

É o que mais mudou desde a versão anterior deste documento, e o que distingue o DSS de uma
biblioteca de componentes comum.

### Cadeia de fonte única

O CSS do componente é a **fonte**; tudo o mais é derivado e regenerado automaticamente:

```
SCSS do componente  →  dss.contract.json  →  DSS_REFERENCIA_VISUAL_ANALISE.md
                    →  dss.meta.json      →  catalog.json  →  páginas do portal
```

O `dss.contract.json` é emitido do CSS compilado e dos tipos TypeScript. Ele carrega props,
slots (com escopo e obrigatoriedade), eventos, estados, tokens usados e claims de acessibilidade
— cada claim com uma **âncora verificável**: o gate reprova afirmação que não fecha.

### As 15 travas

Estrutura de 4 camadas · barrel · higiene de SFC · grafia de variante fiel ao Quasar ·
tokens SCSS existentes · convenções da família de campo · paridade API↔documentação ·
tags do sandbox · registro de demos · páginas do portal · consistência do catálogo ·
contrato schema-válido · meta↔catálogo · type-check · teste de isolamento Quasar↔DSS.

### Ferramentas MCP (15)

Expostas a agentes de IA: consulta de componente e token, validação de código e de composição,
scaffolding, sugestão de substituição de token, prontidão de spec, parecer semântico, entre outras.

---

## 6. Acessibilidade — o que está conforme e o que não está

Esta seção é deliberadamente honesta. A versão anterior deste documento afirmava conformidade
total, e **isso não era verdade**.

### Conforme e verificado

- **Anel de foco (WCAG 1.4.11):** auditado em agosto — 49 de 60 combinações reprovavam por
  translucidez. Corrigido para opaco; hoje são **88 combinações medidas, 0 reprovam**.
- **Touch target (WCAG 2.5.5):** **44×44px** (`--dss-touch-target-md`), o mínimo da norma.
- **Navegação por teclado:** anel exclusivo de teclado (`:focus-visible`) na família de campos e
  nos controles de seleção — não aparece em clique de mouse.
- **`prefers-reduced-motion`** e **`forced-colors`** implementados.

### Não conforme — dívida declarada

- **Contraste de cores de ação.** Medido: `primary` 3,80:1 · `tertiary` 2,93:1 · `accent` 4,20:1
  com texto branco — abaixo dos 4,5:1 de AA para texto normal. **Aguarda decisão de cor da
  equipe**; nenhum hex foi alterado unilateralmente.
- **Feedback resolve sem trocar cor:** `warning`, `positive` e `info` passam AA apenas com texto
  escuro (5,64 · 4,82 · 4,61). Exige quebrar `--dss-text-on-primary` por cor — hoje há **um só**
  token de texto sobre fundo colorido.

> **Correção de rumo registrada:** o documento anterior afirmava "touch target mínimo 48×48px".
> Não existe token de 48px na escala (32/36/44/52/64), e 48 é diretriz do Material, não do WCAG.
> A norma pede 44. Corrigido em todo o repositório em agosto.

---

## 7. Como revisar

```bash
npm install                    # raiz do monorepo
npm run core:build             # gera packages/core/dist/
npm run sandbox:dev            # http://localhost:5173
```

O **sandbox** é a superfície de verificação visual. Cada componente adequado tem duas telas:

- **Playground** — variantes, tamanhos, estados, marcas e a matriz combinatória;
- **Preview Frame** — monta o **SFC real** num iframe, com controles derivados do contrato.
  Se o contrato mente, o Preview Frame mostra.

### Gates, individualmente

```bash
npm run validate:type-check
npm run validate:structure:gate
npm run validate:scss-tokens:gate
npm run validate:api-docs:gate
node scripts/emit-contract.mjs --all --strict
```

---

## 8. Uso

### Plugin global

```javascript
import DesignSystemSansys from '@sansys/design-system'
import '@sansys/design-system/css'

app.use(DesignSystemSansys, { brand: 'hub' })
```

### Importação individual

```vue
<script setup>
import { DssButton } from '@sansys/design-system'
import '@sansys/design-system/css'
</script>

<template>
  <DssButton color="primary">Clique</DssButton>
</template>
```

> O CSS é **único e completo** nos dois modos — ver a nota da §2 sobre tree-shaking.

---

## 9. Estado e frentes abertas

O DSS está em **onda de adequação de UI**: cada componente é revisado contra o checklist visual,
com verificação em LIGHT e DARK e as duas telas de sandbox.

| frente | estado |
|---|---|
| Família de campos (Input, Select, Textarea, File, Field) | adequada |
| Controles de seleção (Checkbox, Radio, Toggle) | adequada |
| DssChip | adequado |
| Demais componentes base | **na fila** |
| Contraste da paleta default (c1) | **aguarda decisão de cor** |
| Alto contraste como tema | spike medido, aguarda decisão |

**Cobertura do eixo visual: 13 páginas de Playground e 11 Preview Frames**, de 76 componentes
base. É a regra valendo onde a adequação já passou; a fila carrega o resto.

📖 O quadro completo e sempre atualizado do que está em aberto vive em
[`docs/governance/DEBITO_ABERTO.md`](../governance/DEBITO_ABERTO.md).

---

## 10. Documentação

| documento | para quê |
|---|---|
| [`CLAUDE.md`](../../CLAUDE.md) | regras normativas — Constituição, roteador por tarefa, Definition of Done |
| [`DEBITO_ABERTO.md`](../governance/DEBITO_ABERTO.md) | ponto único do que está em aberto |
| [`DSS_ARCHITECTURE.md`](./DSS_ARCHITECTURE.md) | estrutura do sistema e integração Quasar |
| [`DSS_COMPONENT_ARCHITECTURE.md`](./DSS_COMPONENT_ARCHITECTURE.md) | as 4 camadas, padrões e anti-patterns |
| [`DSS_TOKEN_REFERENCE.md`](./DSS_TOKEN_REFERENCE.md) | catálogo de tokens (tabelas auto-geradas) |
| [`CHANGELOG.md`](../../CHANGELOG.md) | histórico de versões e mudanças breaking |

---

## 11. Checklist de revisão técnica

- [ ] `npm run core:build` executa sem erro e gera os três artefatos em `packages/core/dist/`
- [ ] `npm run sandbox:dev` sobe e os componentes renderizam
- [ ] Playground e Preview Frame de um componente adequado (ex.: DssChip) mostram o mesmo visual
- [ ] Troca de marca (Hub/Water/Waste) altera a cor de ação, e `neutral` **não** muda
- [ ] Alternar LIGHT/DARK não deixa nenhum elemento ilegível
- [ ] `Tab` mostra anel de foco; **clique de mouse não mostra**
- [ ] `node scripts/emit-contract.mjs --all --strict` sai com exit 0
- [ ] Um commit que viole qualquer invariante é **barrado** pelo pre-commit

---

**Autor:** Hebert Daniel Oliveira Chaves · hebert.chaves@jtech.com.br
**Licença:** propriedade da Jtech
