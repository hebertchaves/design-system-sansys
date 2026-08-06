# Roteiro de Fechamento — Componente Fase 3

> **Status:** Normativo · **Versão:** 1.0 · **Agosto 2026**
>
> Substitui, para Fase 3, o par "Modo Auditor + Emissão de Selo" que serviu às Fases 1 e 2.
> Aqueles prompts pediam que um agente **afirmasse** conformidade lendo código. Aqui a maior
> parte é **provada por comando**, e o texto fica só onde há julgamento de verdade.

---

## Por que mudou

O método antigo nasceu quando não havia gate automático: um auditor lia e declarava. Funcionou
— foi como o sistema chegou até aqui, e o registro que ele deixou é o que impede o próximo
agente de deduzir o que já estava resolvido.

Hoje boa parte daquele checklist virou verificação executável. Auditar à mão o que um gate já
prova é retrabalho, e pior: dá falsa segurança nas áreas que gate nenhum alcança.

**A evidência que orienta este roteiro.** Na adequação do `DssMultiselectAutocomplete` (ago/2026)
apareceram 8 defeitos reais:

| defeito | quem pegou |
|---|---|
| `overflow: hidden` matava o scroll do dropdown em **todo** DssSelect | olho humano |
| `currentColor` auto-referente → "×" branco sobre branco | olho humano |
| hover cinza empilhado com o overlay do DssItem | olho humano |
| `data-theme` numa div interna → painel claro no dark | medição no browser |
| `color-mix` com token sem unidade = regra morta em 4 pontos | medição no browser |
| campo e painel discordando com `emitValue` | escrever o **teste** |
| `meta.json` descrevendo componente que não existe mais | escrever a **doc** |
| 8 imports quebrados no `DssDataCard` | gate novo |

**Sete dos oito eram invisíveis à análise estática.** Nenhum teste unitário pegou nada — jsdom
não tem layout nem CSS, e isso é limite estrutural, não descuido. É por isso que o roteiro tem
uma etapa de runtime, e por isso ela não é opcional.

---

## As quatro etapas

### Etapa 0 — Antes de existir código

| passo | ferramenta | o que prova |
|---|---|---|
| Contrato de interface | `pre-prompts/TEMPLATE_FASE3.md` | casos de uso negativos, matriz de composição, estados de falha |
| Validar a árvore proposta | MCP `validate_composition({ tree })` | vocabulário DSS real (pega Quasar cru e componente inventado), filhos proibidos, auto-aninhamento, hierarquia, props obrigatórias, estados `empty`/`loading` |

> `validate_composition` consome `docs/guides/ui-rules/ui-rules.schema.json`. **Exige o MCP
> buildado** — a tool não existe para quem a chama se o `build/` estiver defasado.

### Etapa 1 — Durante a construção

Invariantes do **Cartão Composto** (CLAUDE.md). Não são verificáveis por comando hoje; são
decisões de desenho que o autor toma:

- `inheritAttrs: false` + `v-bind="$attrs"` no nó DSS correto
- **proibição absoluta de `:deep()` para layout** — layout mora no pai
- estado do bloco via `provide/inject` **tipado**, não prop drilling
- brand/contexto visual por `data-*` + cascata de CSS var
- **não reimplementar primitivos** — compor DSS, nunca QComponent cru no template

📖 `DSS_GUIA_COMPOSICAO_FASE3.md` · `DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md` (delta por peça)

### Etapa 2 — Fechamento executável

Rode **na ordem**. Cada comando prova uma coisa; nenhum substitui o outro.

```bash
# ── a partir de packages/core ──────────────────────────────────────────────
npx sass --no-source-map --load-path=. \
  components/<grupo>/<Comp>/<Comp>.module.scss /tmp/out.css     # SCSS compila

npx vitest run --project unit components/<grupo>/<Comp>          # testes
npx vue-tsc --noEmit -p tsconfig.json                            # type-check

# Constituição — scan de candidatos, revisar cada um (não espere zero)
grep -rnE "^[^/]*@import" components/<grupo>/<Comp>/**/*.scss     # = 0
grep -rn "Material Icons" components/<grupo>/<Comp>/              # = 0
grep -rEn "#[0-9a-fA-F]{3,6}|[0-9]+px" \
  components/<grupo>/<Comp>/{2-composition,3-variants,4-output}

# ── a partir da RAIZ ───────────────────────────────────────────────────────
node scripts/emit-contract.mjs <Comp> --write     # contrato + schema + âncoras a11y
node scripts/validate-sfc-hygiene.cjs             # import canônico + style inline
node scripts/validate-api-docs.cjs <Comp>         # paridade types → docs

npm run probe:visual <Comp>                       # contrato visual no browser
```

**O prober é o passo que não se pula.** Ele monta o SFC real no Preview Frame e compara as
`visualProperties` do `meta.json` contra o computado, em light e dark. Havendo `token` declarado,
o esperado é o valor **resolvido daquele token naquele tema** — verifica-se o elo
"o componente pinta com ESTE token", não uma fotografia. Requer o dev server do sandbox no ar;
por isso é comando de fechamento, não de pre-commit.

Propriedade sem bloco `probe` é reportada como *declarada-porém-não-verificável*. Isso é sinal,
não ruído: mede quanto do contrato visual ainda é promessa.

> **O pre-commit já roda sozinho** grafia de variante, tokens SCSS, catálogo, drift status↔selo,
> cobertura do portal, registry do DemoRenderer, re-emissão de contrato e type-check. Não
> repita isso à mão.

### Etapa 3 — O que sobra para julgamento

Só isto. Se um item aqui puder virar comando, ele deve sair desta lista.

| eixo | pergunta |
|---|---|
| **Golden Context** | O baseline escolhido é o adequado, ou foi conveniência? |
| **Exceção** | Está **justificada** — não apenas declarada? Gate nenhum lê justificativa. |
| **Limites na doc** | O README diz o que o componente **NÃO** faz e o que delega? |
| **Divergência** | Onde diverge do Quasar/da base, é deliberado e documentado, ou é defeito? |
| **NC-01** | `aria-label` estático onde deveria haver binding — contexto decide. |
| **NC-08** | Estado interno que deveria ser emitido e não é. |

### Etapa 4 — Registro

Fase 3 **não emite selo cerimonial**. O que o próximo agente precisa é *o que foi verificado e
o que ficou em aberto* — não um documento de seções fixas.

```
MCP record_audit_event({ component, phase: 'seal-granted', verdict: 'compliant', ... })
```

Grava em `auditHistory[]` do `dss.meta.json` (estrutura já em uso em 32 componentes:
`date`, `auditor`, `verdict`, `ncs`, `gaps`, `summary`). Havendo arquivo físico de selo,
`build-catalog.cjs` propaga sozinho para `catalog.json` e o gate de drift status↔selo cobra
consistência a cada commit.

**No `summary`, registre o que NÃO fechou.** É o campo que substitui a auditoria narrada: as
ressalvas conscientes, as lacunas de token, o que foi adiado e por quê.

---

## Cobertura honesta

Das 8 não-conformidades do stress test de Fase 3:

| situação | quantas | onde |
|---|---|---|
| pegas por gate pré-existente | 2 | tokens SCSS · paridade de API |
| pegas por `validate_composition` | 1 | Quasar cru |
| pegas por gate novo | 3 | higiene de SFC (import, style inline) · `noUnusedLocals` |
| **restam para julgamento** | **2** | NC-01 · NC-08 |

**6 de 8 automatizadas.** As duas restantes são semânticas — automatizá-las produziria falso
positivo mais caro que o defeito.

## Limites conhecidos

- **O hook de pre-commit não é versionado.** Vive em `.git/hooks/`, fora do controle de versão
  (não há husky). Os gates funcionam na máquina onde foram plugados; em clone novo ou CI é
  preciso chamar os scripts npm explicitamente.
- **`declare module '*.vue'` no `env.d.ts` cega o type-check** para caminho `.vue` inexistente —
  foi o que escondeu os 8 imports quebrados do `DssDataCard` por meses. Um gate de resolução de
  import `.vue` fecharia isso; ainda não existe.
- **`a11y.wcag[].verifiedBy: "test"`** verifica apenas que o arquivo `.test.js` **existe**, não
  que ele cubra o critério. Escreva o teste pelo critério, não pela âncora.
- **O prober cobre o que tiver bloco `probe`.** Asserções relativas (px derivado de `em`/`vh`,
  `calc`) ainda não são expressáveis — hoje só igualdade.

---

## Referências

`CLAUDE.md` (Constituição + Cartão Composto + DoD) · `DSS_GUIA_COMPOSICAO_FASE3.md` ·
`DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md` · `DSS_GOLDEN_COMPONENTS.md` ·
`DSS_BLUEPRINT_CADEIA_FONTE_UNICA.md` (tiers e âncoras) · `CERTIFIED_COMPONENTS.md`
