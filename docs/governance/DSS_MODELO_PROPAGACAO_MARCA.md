# Modelo de Propagação de Marca

**Status:** normativo · out/2026
**Substitui:** a parte prescritiva de `DSS_FRENTE_MARCA_PRIMITIVOS.md` (§4 e §6), que permanece válido como medição de origem
**Gate:** `scripts/validate-brand-form.cjs` (ver §8)

---

## 1. O problema, em uma frase

Um `DssButton` dentro de um card, numa página de marca Hub, ficava laranja — e ninguém sabia dizer se isso era bug ou feature, porque **não havia regra**.

A pergunta "este elemento deve receber a marca?" estava sendo respondida componente a componente, por quem escrevia o `_brands.scss` naquele dia. Cem componentes, cem decisões independentes, nenhuma escrita em lugar nenhum.

Este documento responde a pergunta **uma vez**, de forma que agente nenhum — humano ou IA — precise decidir de novo.

## 2. Por que não ficou superado antes

A intenção existia e estava comunicada desde o início do projeto. Mais que isso: estava **escrita e medida**.

- O **§K5 do checklist** manda a prop `brand` remapear o token semântico, nunca pintar o primitivo.
- O **`DSS_FRENTE_MARCA_PRIMITIVOS.md`** mediu a dívida inteira, nomeou a causa, escreveu a forma da correção e sugeriu um piloto de três componentes.

O que nunca existiu foi **um gate**. São 18 scripts de validação no repositório; nenhum valida a forma da marca. Dois a tocam de raspão (`validate-hover-tokens` pega primitivo em degrau de estado; `validate-scss-tokens` pega token fantasma), nenhum olha a questão central.

A consequência é medível. Quando a frente foi escrita, eram **92** componentes com `4-output/_brands.scss`. Hoje são **100**. Oito componentes novos entraram **depois** da dívida estar documentada, e entraram do jeito errado — porque documentação não barra commit.

> O próprio hook de pre-commit traz a frase, escrita para o gate estrutural: *"o gate é o que torna isso verdade em vez de intenção"*.
> Marca é o último eixo grande do DSS sem gate. Todos os eixos que ganharam gate convergiram; este não.

## 3. Dois eixos, não dois caminhos

O erro de modelagem é tratar marca como um interruptor (liga/desliga) aplicado ao componente. Marca não é um interruptor — são **dois eixos de cor que respondem a perguntas diferentes**:

| eixo | tokens | pergunta que responde | sob `[data-brand]` |
|---|---|---|---|
| **IDENTIDADE** | `--dss-brand-*` | "de que produto é esta tela?" | sempre segue a marca |
| **AÇÃO** | `--dss-action-*` | "qual o peso desta ação?" | segue a marca **só na zona de identidade** |

Hoje os dois estão colapsados: componentes alcançam `--dss-action-primary` sempre que querem "a cor da marca", mesmo quando o elemento **não é uma ação**.

Exemplo medido: a régua decorativa do `DssSectionTitle` consome `--dss-action-primary`. Não é ação, é ornamento de identidade. Por estar no eixo errado, ela perde a marca quando o eixo de ação for corrigido — e o remédio não é abrir exceção, é **mover para o eixo certo**.

### 3.1 O eixo de identidade já existe, e está inerte

`tokens/brand/_{hub,water,waste}.scss` já define **15 tokens** por marca:

```
--dss-brand-primary   -secondary  -tertiary  -accent
--dss-brand-light     -lighter    -dark      -darker
--dss-brand-hover     -disable    -deep
--dss-brand-background  -surface  -border    -text
```

**Consumidores em componentes: zero.** Quarenta e cinco declarações de token construídas, completas e nunca usadas — o mesmo padrão já registrado em `ALERTA_BRAND_INDEX_NAO_IMPORTADO.md`.

Isso muda o custo da correção para melhor: **a migração não precisa inventar tokens**. O eixo está pronto. Falta ligá-lo.

> ⚠️ Pendência técnica para a etapa 1: `--dss-brand-*` hoje só existe sob `[data-brand]`. Precisa de fallback em `:root` (apontando para a escala semântica neutra) para ser consumível fora de contexto de marca sem cair para `unset`.

## 4. Três zonas

| zona | o que é | eixo de IDENTIDADE | eixo de AÇÃO |
|---|---|---|---|
| **casca** | AppBar, rail, drawer, footer, splash, login, tela de bloqueio | marca | **marca** |
| **conteúdo** | card, container, form, tabela, diálogo, painel | marca | **semântico** |
| **explícita** | qualquer componente com prop `brand="…"` | marca | marca |

A casca é a moldura do produto: ali a ação primária *é* identidade, e o usuário lê "este é o Hub". O conteúdo é onde o trabalho acontece: ali primary/secondary/warning/negative precisam significar **peso e risco**, não produto — um botão de excluir não pode mudar de cor porque o produto mudou.

A terceira zona é a válvula de escape, e é **explícita por construção**: alguém escreveu `brand="hub"` naquele componente. Instrução direta vence contexto, sempre.

Aplicado ao print que originou esta discussão:

| elemento | hoje | pelo modelo |
|---|---|---|
| AppBar e rail laranja | ✅ | casca → correto |
| KPIs azul/verde/âmbar/vermelho | ✅ | conteúdo, eixo de feedback → nunca foi tocado pela marca |
| **"EXECUTAR VERIFICAÇÃO" laranja** | ❌ | conteúdo, eixo de ação → **volta ao semântico** |
| **réguas de título laranja** | ⚠️ certo pelo motivo errado | eixo de identidade → **continuam laranja**, mas via `--dss-brand-*` |

## 5. A regra de decisão (mecânica, sem julgamento)

Quem escreve CSS de componente responde **duas** perguntas, nesta ordem:

**1. Este valor é cor de AÇÃO ou de IDENTIDADE?**
   - o elemento convida a clicar, ou comunica peso/risco/estado → **ação** → `--dss-action-*` / `--dss-feedback-*`
   - o elemento decora, delimita ou assina o produto → **identidade** → `--dss-brand-*`

**2. Primitivo de marca (`--dss-hub-600`) no CSS de componente?**
   - **nunca.** Sem exceção. Primitivo de marca vive em `tokens/brand/`, e só lá.

Note que o componente **não decide a zona**. Ele declara apenas a que eixo o valor pertence. A zona é decidida pela página, com um atributo — §6. É essa separação que tira a decisão das mãos de quem escreve o componente.

## 6. A mecânica: a barreira

A zona de conteúdo reseta o eixo de ação. Mecanicamente:

```scss
// packages/core/tokens/semantic/_brand-barrier.scss
[data-brand-zone="content"] {
  --dss-action-primary: var(--dss-primary);
  --dss-action-primary-hover: var(--dss-primary-hover);
  // … a rampa de ação inteira, re-resolvida do primitivo neutro
}
```

**Isto não é mecanismo novo.** É exatamente a recomputação já documentada e em produção em `tokens/semantic/_scopes.scss`, usada com intenção inversa:

> *"Custom property substitui seu `var()` no elemento ONDE É DECLARADA… os blocos semânticos passam a casar também nesses escopos, e a mesma expressão (`var(--dss-primary)`) resolve de novo."*

O `_scopes.scss` re-resolve para **propagar** tema e marca a subárvores. A barreira re-resolve para **interromper** a marca numa subárvore. Mesma física, dois sentidos.

Funciona porque `--dss-primary` **não é remapeado por `[data-brand]`** — verificado: zero ocorrências de `--dss-primary:` em `tokens/brand/`. O valor neutro continua disponível por baixo, intacto.

Por que um atributo e não uma classe: `data-*` é o canal que o DSS já usa para contexto visual em cascata (Cartão Composto — *"brand/contexto visual via `data-*` + cascata de CSS var"*), e um atributo é legível no DOM durante auditoria, o que uma classe utilitária não é.

> **Nota sobre a ponte Quasar.** `--q-primary` é alimentada por `--dss-action-primary` e as utilitárias do Quasar vivem em `@layer quasar` com `!important`. A barreira precisa portanto re-declarar a ponte no mesmo escopo, senão o Quasar continua pintando com o valor brandeado e **vence**. Este é o risco técnico #1 da etapa 3 e tem teste e2e dedicado.

## 7. A prop `brand` passa a ser tri-estado

Hoje a prop tem dois valores úteis (`"hub"|"water"|"waste"`) e ausência. Ausência significa "herda", e **não existe forma de dizer "não herde"**. São 50 props `brand` declaradas sem essa possibilidade.

```ts
brand?: 'hub' | 'water' | 'waste' | 'none'
```

| valor | efeito |
|---|---|
| `"hub"` \| `"water"` \| `"waste"` | emite `data-brand` no root — instrução direta, vence a zona |
| ausente | herda o contexto (zona + marca ancestral) |
| `"none"` | aplica a barreira localmente — opt-out explícito |

Forma canônica da prop, **a única aceita** (§K5):

```vue
<div :data-brand="brand || undefined" :data-brand-zone="brand === 'none' ? 'content' : undefined">
```

O componente **não** ganha regra CSS própria por marca. Sem `.dss-x--brand-hub`, sem `4-output/_brands.scss` pintando. O atributo entra na cascata e os tokens fazem o resto — que é o que o §K5 pede desde sempre.

## 8. O gate

`scripts/validate-brand-form.cjs`, no pre-commit, com **baseline** — o padrão que o DSS já usa em `validate-scss-tokens` e `contract-missing-baseline.json`.

Reprova:

| regra | detecta |
|---|---|
| **B1** | `var(--dss-{hub,water,waste}-NNN)` em `packages/core/components/**` — primitivo de marca fora de `tokens/brand/` |
| **B2** | seletor `.dss-*--brand-{hub,water,waste}` que **pinta** (declara propriedade CSS) em vez de **remapear** (declara custom property) |
| **B3** | prop `brand` em `*.types.ts` cuja implementação não usa a forma canônica do §7 |

O baseline congela as ocorrências de hoje: **nada novo passa**, e a dívida existente vira uma lista que só pode encolher. Isso inverte a dinâmica que produziu os 8 componentes novos entre a medição e agora.

## 9. Migração

A ordem importa — migrar antes de fixar o alvo é refazer depois.

| etapa | o que | bloqueia |
|---|---|---|
| **1** | este doc + gate com baseline + fallback `:root` do eixo de identidade | — |
| **2** | `brandZone` no `dss.meta.json` (`shell` \| `content`), derivada para o atributo | 1 |
| **3** | barreira ligada nas superfícies de conteúdo + e2e da ponte `--q-*` | 1, 2 |
| **4** | prop tri-estado + migração dos 95 `_brands.scss` que pintam, em ondas | 1, 3 |

Piloto da etapa 4, herdado de `DSS_FRENTE_MARCA_PRIMITIVOS.md` §6 — `DssBadge` (simples), `DssButton` (completo), `DssChip` (múltiplos passos da escala).

### O que NÃO fazer

- Não migrar com `sed`. O mapeamento passo-da-escala → token semântico **não é mecânico** (um `_brands.scss` típico usa `-50` para fundo sutil, `-700` para hover e `-950` para texto).
- Não abrir exceção para um componente decorativo que "precisa ficar laranja". Ele não precisa de exceção, precisa do **eixo de identidade**.
- Não tratar a zona como decisão do componente. Zona é da página.

## 10. Medições

Out/2026, na raiz do repo.

| medida | valor |
|---|---|
| componentes com `4-output/_brands.scss` | **100** (eram 92 quando a dívida foi medida) |
| usos de primitivo de marca em componentes | **565** |
| `_brands.scss` que **remapeiam** (forma §K5) | **5** |
| `_brands.scss` que **pintam** (forma proibida) | **95** |
| componentes consumindo `--dss-action-*` | **70** |
| componentes consumindo `--dss-brand-*` | **0** |
| props `brand` declaradas | **50** |
| tokens remapeados por `[data-brand]` | **62** por marca |
| gates que validam a forma da marca | **0** |

```bash
find packages/core/components -path '*4-output/_brands.scss' | wc -l
grep -rhoE 'var\(--dss-(hub|water|waste)-[0-9]+' packages/core/components --include=*.scss | wc -l
grep -rlE 'var\(--dss-brand-(primary|surface|text|border)\)' packages/core/components --include=*.scss | wc -l
```
