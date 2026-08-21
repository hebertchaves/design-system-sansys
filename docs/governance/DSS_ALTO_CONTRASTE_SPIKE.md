# Alto Contraste no DSS — spike medido, esforço e gaps

**Status:** spike executado e **commitado** (ago/2026) · inerte por default · aguardando as decisões restantes da §6
**Origem:** débito `(c1) Contraste WCAG da paleta default` — ver `DEBITO_ABERTO.md`
**Pergunta que motivou:** dá para fechar a dívida de contraste **sem alterar as cores institucionais**, via um botão de alto contraste?

> **Duas coisas distintas, deliberadamente separadas** (ver §7):
> **(1) correções de bug** — at-rule awareness e alpha no `wcag-kit`, e as 11
> declarações de cor congelada convertidas para `color-mix`. Não são spike: são
> defeitos reais do default, independentes de haver alto contraste ou não.
> **Commitadas em `a525b3a`.**
> **(2) o spike** — paleta da família de ação (light + dark), temas
> `[data-theme="hc"]` / `[data-theme="hcdark"]` e os blocos de marca. Commitado,
> mas **inerte**: nada muda até alguém setar o atributo. Descartável em 2
> comandos (§7.2).

**Resposta curta:** o mecanismo funciona, é barato e está medido. Mas ele **adiciona um modo conforme; não torna o default conforme** — e o custo real não está no mecanismo, está no eixo neutro (cinzas) e nos tokens de cor congelada.

---

## 1. A ressalva que precede tudo

WCAG 1.4.3 mede a **apresentação default**. Existe a rota formal *Conforming Alternate Version*, mas ela exige que o modo alternativo seja alcançável de qualquer página por mecanismo acessível e conforme integralmente — é a rota mais frágil em auditoria e em procurement (EN 301 549).

Some-se a isso um fato já medido no c1: **`positive`, `info` e `warning` já passam AA sem mudar hex nenhum** — basta texto escuro sobre eles (4.82 / 4.61 / 5.64). A parte que de fato exige decisão de cor é só a família de **ação** (primary/secondary/tertiary/accent), onde o texto branco é que reprova.

**Confirmado por medição independente (`177d6be`, frente paralela):** das 8 cores, **metade fecha sem trocar hex nenhum** — 3 por troca de texto e `negative` já passa. O bloco que exige decisão de cor é de **4 cores, não 8**.

> ⚠️ **Mas "de graça" é sobre o hex, não sobre o esforço.** A mesma medição achou o bloqueio arquitetural: existe **um único `--dss-text-on-primary` (branco)** usado sobre *todas* as cores. Trocar para texto escuro exige tokens por cor e toca **todo componente que pinta texto sobre fundo colorido**. É mudança de arquitetura de token, não ajuste pontual — o hex é grátis, a fiação não é.

> **Leitura recomendada:** alto contraste é uma **feature de acessibilidade legítima e desejável**, e o spike mostra que ela sai barata. Ela não substitui fechar o c1 no default — e metade do c1 não precisa dela.

---

## 2. Por que a abordagem "camada paralela" é a certa

O DSS já tem a cadeia de 3 camadas que essa ideia precisa:

```
CAMADA 1 — primitivo   --dss-primary: #1f86de                    tokens/globals.scss
CAMADA 2 — semântico   --dss-action-primary: var(--dss-primary)  tokens/semantic/_actions.scss
CAMADA 3 — consumo     var(--dss-action-primary)                 1348× nos componentes
```

A proposta é adicionar uma **camada 1-bis paralela e aditiva** (`--dss-hc-*`) e, dentro de `[data-theme="hc"]`, trocar apenas o **ponteiro do primitivo**.

### 2.1 O achado que define o desenho: re-apontar o PRIMITIVO, não o semântico

`--dss-primary` tem **cinco famílias de dependentes**, não apenas `action-primary`:

| família | arquivo | tokens |
|---|---|---|
| ações | `semantic/_actions.scss` | 6 |
| bordas | `semantic/_borders.scss` | 5 |
| gradientes | `semantic/_gradients.scss` | 5 |
| foco | `semantic/accessibility/_focus.scss` | 2 (⚠️ rgba congelado — ver §5.3) |
| texto sobre | `semantic/_text.scss` | 1 |

Re-apontar no **semântico** obrigaria a enumerar todos — e qualquer omissão vira inconsistência silenciosa. Re-apontar no **primitivo** custa **6 linhas** e as cinco famílias seguem sozinhas.

```scss
[data-theme="hc"] {
  --dss-primary-disable: var(--dss-hc-primary-disable);
  --dss-primary-light:   var(--dss-hc-primary-light);
  --dss-primary:         var(--dss-hc-primary);
  --dss-primary-focus:   var(--dss-hc-primary-focus);
  --dss-primary-hover:   var(--dss-hc-primary-hover);
  --dss-primary-deep:    var(--dss-hc-primary-deep);
}
```

`tokens/globals.scss` **não é tocado**. O primitivo mantém seu valor institucional em `:root`; só dentro do escopo `[data-theme="hc"]` ele aponta para outro lugar.

### 2.2 Ganhos sobre sobrescrever direto no tema

| | sobrescrever no tema | **camada paralela** |
|---|---|---|
| cores institucionais | alteradas | **intactas, byte a byte** |
| hex no bloco de tema | sim (exceção a Token First) | **nenhum — só `var()`** |
| revisão | design e engenharia no mesmo arquivo | **paleta = design · tema = engenharia** |
| validar antes do rollout | precisa do switch pronto | **wcag-kit valida a paleta sozinha** |

### 2.3 Bônus estratégico

As **brand primaries** (hub 2.81, water 3.71) estão com a dívida adiada esperando aval de marca. Com paleta paralela, quando/se a marca aprovar, entra `--dss-hc-hub-*` **sem tocar nos arquivos de brand** — o impasse político deixa de bloquear o técnico.

---

## 3. O que o spike provou (medido, não estimado)

Arquivos do spike:

- `packages/core/tokens/palettes/_high-contrast.scss` (novo — 46 tokens da família de ação, light + dark)
- `packages/core/tokens/themes/hc/_colors.scss` · `_brands.scss` (novos — `[data-theme="hc"]`)
- `packages/core/tokens/themes/hcdark/_colors.scss` · `_brands.scss` (novos — `[data-theme="hcdark"]`)
- `packages/core/tokens/index.scss` (+8 linhas)
- `packages/core/tokens/themes/dark/_colors.scss` (**1 linha**: seletor passa a listar `hcdark` — §5.1.1)

### 3.1 Paleta final — família de AÇÃO, 46 tokens

Método reproduzível: preserva matiz e saturação do primitivo, varia só a luminosidade. Alvo **AAA (7:1)**.

- **CLARO** — fundo de ação escuro + texto branco. Menor escurecimento que atinge 7:1; focus/hover/deep em passos de −4% de L.
- **ESCURO** — papel **invertido**: fundo claro + texto escuro. Menor clareamento que atinge 7:1 sobre `#262626`; passos de +6% de L.

#### Tema claro (`--dss-hc-*`)

| cor | nível | hex | contraste |
|---|---|---|---|
| primary | `-light` | `#cee5f8` | 7.39:1 c/ texto escuro |
|  | **base** | `#155994` | 7.27:1 vs superfície · 7.27:1 c/ texto |
|  | `-focus` | `#124e82` | 8.61:1 vs superfície · 8.61:1 c/ texto |
|  | `-hover` | `#104470` | 10.08:1 vs superfície · 10.08:1 c/ texto |
|  | `-deep` | `#0d395e` | 11.90:1 vs superfície · 11.90:1 c/ texto |
| secondary | `-light` | `#d1f5f1` | 8.24:1 c/ texto escuro |
|  | **base** | `#165f59` | 7.46:1 vs superfície · 7.46:1 c/ texto |
|  | `-focus` | `#124f49` | 9.37:1 vs superfície · 9.37:1 c/ texto |
|  | `-hover` | `#0e3e3a` | 11.87:1 vs superfície · 11.87:1 c/ texto |
|  | `-deep` | `#0a2e2a` | 14.61:1 vs superfície · 14.61:1 c/ texto |
| tertiary | `-light` | `#ffdcc7` | 7.45:1 c/ texto escuro |
|  | **base** | `#993b00` | 7.05:1 vs superfície · 7.05:1 c/ texto |
|  | `-focus` | `#853300` | 8.50:1 vs superfície · 8.50:1 c/ texto |
|  | `-hover` | `#702b00` | 10.32:1 vs superfície · 10.32:1 c/ texto |
|  | `-deep` | `#5c2300` | 12.39:1 vs superfície · 12.39:1 c/ texto |
| accent | `-light` | `#edd5f1` | 7.03:1 c/ texto escuro |
|  | **base** | `#863394` | 7.20:1 vs superfície · 7.20:1 c/ texto |
|  | `-focus` | `#782e85` | 8.31:1 vs superfície · 8.31:1 c/ texto |
|  | `-hover` | `#6b2976` | 9.53:1 vs superfície · 9.53:1 c/ texto |
|  | `-deep` | `#5d2366` | 11.07:1 vs superfície · 11.07:1 c/ texto |
| dark | `-light` | `#e3e3e3` | 7.47:1 c/ texto escuro |

#### Tema escuro (`--dss-hcdark-*`)

| cor | nível | hex | contraste |
|---|---|---|---|
| primary | `-light` | `#13548b` | 7.22:1 c/ texto claro |
|  | **base** | `#79b7ec` | 7.06:1 vs superfície · 9.24:1 c/ texto |
|  | `-focus` | `#94c5f0` | 8.29:1 vs superfície · 10.85:1 c/ texto |
|  | `-hover` | `#aed4f4` | 9.75:1 vs superfície · 12.75:1 c/ texto |
|  | `-deep` | `#c9e2f8` | 11.33:1 vs superfície · 14.82:1 c/ texto |
| secondary | `-light` | `#155b55` | 7.24:1 c/ texto claro |
|  | **base** | `#2ec7b9` | 7.20:1 vs superfície · 9.41:1 c/ texto |
|  | `-focus` | `#40d3c6` | 8.18:1 vs superfície · 10.70:1 c/ texto |
|  | `-hover` | `#59d9cd` | 8.81:1 vs superfície · 11.53:1 c/ texto |
|  | `-deep` | `#72dfd5` | 9.54:1 vs superfície · 12.47:1 c/ texto |
| tertiary | `-light` | `#8f3700` | 7.10:1 c/ texto claro |
|  | **base** | `#ff9757` | 7.07:1 vs superfície · 9.25:1 c/ texto |
|  | `-focus` | `#ffaa75` | 8.11:1 vs superfície · 10.61:1 c/ texto |
|  | `-hover` | `#ffbd94` | 9.34:1 vs superfície · 12.22:1 c/ texto |
|  | `-deep` | `#ffd0b3` | 10.76:1 vs superfície · 14.07:1 c/ texto |
| accent | `-light` | `#7f308c` | 7.12:1 c/ texto claro |
|  | **base** | `#d5a0de` | 7.14:1 vs superfície · 9.35:1 c/ texto |
|  | `-focus` | `#dfb7e6` | 8.69:1 vs superfície · 11.36:1 c/ texto |
|  | `-hover` | `#e9ceee` | 10.47:1 vs superfície · 13.70:1 c/ texto |
|  | `-deep` | `#f3e4f6` | 12.42:1 vs superfície · 16.25:1 c/ texto |
| dark | `-light` | `#525252` | 7.17:1 c/ texto claro |
|  | **base** | `#b3b3b3` | 7.22:1 vs superfície · 9.44:1 c/ texto |
|  | `-focus` | `#c2c2c2` | 8.50:1 vs superfície · 11.11:1 c/ texto |
|  | `-hover` | `#d1d1d1` | 9.91:1 vs superfície · 12.96:1 c/ texto |
|  | `-deep` | `#e0e0e0` | 11.46:1 vs superfície · 15.00:1 c/ texto |

> O nível `-light` fica abaixo de 3:1 contra a superfície **de propósito** — é fundo. O que precisa de contraste é o texto por cima, e esse está ≥7:1.

### 3.1.1 Duas regras podaram a paleta de 60 para 46 tokens

**1. Nunca reduzir contraste.** O gerador escolhe o *menor* escurecimento que atinge 7:1 — o que **piora** a cor cujo valor original já superava a meta. Foi o caso de `dark` no tema claro: base 9.59:1 viraria 7.00:1.

> ⚠️ **E havia um efeito colateral pior.** `--dss-text-body` é `var(--dss-dark)`. Re-apontar essa cor de ação clareava o **texto de corpo de toda a UI** — 9.59:1 → 7.00:1. Um "modo de alto contraste" que reduz o contraste do texto principal é o oposto do objetivo. `--dss-dark` é cor de ação **e** fonte do texto; no tema escuro esse laço não existe (`--dss-text-body` é `--dss-gray-200`), então lá o `dark` entra completo.
>
> Este é o mesmo mecanismo do §2.1 — "cinco famílias de dependentes" — agora agindo **contra** o objetivo. Re-apontar o primitivo é potente nos dois sentidos.

**2. `-disable` fica de fora.** Desabilitados são explicitamente isentos de 1.4.11, os valores originais já eram melhores que os gerados, e forçar contraste em desabilitado faz o desabilitado parecer ativo.

**Como isso foi pego:** a primeira medição disse "20/20 AAA" porque só olhava o nível `base`. A regressão só apareceu ao comparar **original × HC nível a nível**, com o par texto/fundo correto de cada um. Medir o alvo não basta — é preciso medir se algo piorou.

### 3.2 Resultado — 5 cores × 4 temas

Via `scripts/wcag-kit.mjs`, a mesma matemática do gate de contrato. Texto sobre o botão (`--dss-text-on-primary` sobre cada cor de ação):

| cor | light | hc | dark | hcdark |
|---|---|---|---|---|
| primary | 3.80 ⚠️ | **7.27 ✅** | 3.80 ⚠️ | **9.24 ✅** |
| secondary | 3.00 ⚠️ | **7.46 ✅** | 3.00 ⚠️ | **9.41 ✅** |
| tertiary | 2.93 ❌ | **7.05 ✅** | 2.93 ❌ | **9.25 ✅** |
| accent | 4.20 ⚠️ | **7.20 ✅** | 4.20 ⚠️ | **9.35 ✅** |
| dark | 9.59 ✅ | 9.59 ✅ *(intacto)* | 9.59 ✅ | **9.44 ✅** |

Contagem sobre **todos** os níveis (light/base/focus/hover/deep), com o par texto/fundo correto de cada um:

```
HC claro   : 20 passam AAA · 0 falham · 0 regressões
HC escuro  : 25 passam AAA · 0 falham
```

A inversão de papel, token a token:

| token | light | hc | dark | hcdark |
|---|---|---|---|---|
| `--dss-action-primary` | `#1f86de` | `#155994` | `#1f86de` | **`#79b7ec`** |
| `--dss-action-tertiary` | `#ff6607` | `#993b00` | `#ff6607` | **`#ff9757`** |
| `--dss-text-on-primary` | `#ffffff` | `#ffffff` | `#ffffff` | **`#0a0a0a`** |
| `--dss-text-body` | `#454545` | `#454545` | `#f5f5f5` | `#f5f5f5` |

### 3.2.1 A decisão §6.11 se dissolve dentro do HC

Cobrir a família **inteira** resolve o gargalo do `--dss-text-on-primary` no escopo do HC: como as 5 cores invertem **juntas**, um único token de texto escuro acerta todas — não há mistura de fundos claros e escuros no mesmo tema.

O gargalo continua de pé para o **c1 no default**, onde a proposta é escurecer o texto só sobre `feedback`. Aí sim as cores divergiriam e o token precisaria ser quebrado por cor.

### 3.3 Escopo: por que só a família de ação

| família | no HC? | por quê |
|---|---|---|
| **ação** (primary, secondary, tertiary, accent, dark) | ✅ **sim** | são as que reprovam com texto branco (2.93 a 4.20) |
| feedback (positive, negative, warning, info) | ❌ não | fecham por troca de **texto**, sem trocar hex (4.61 a 5.64) — problema diferente, solução diferente |
| neutros (cinzas) | ❌ não | no dark já são AAA (13.88:1); no claro é dívida de **tokenização**, não de cor (os ~284 `var(--dss-gray-*)` crus) |

**46 tokens, não 108.**

### 3.4 Não-regressão

- `node scripts/emit-contract.mjs --all --strict` → **exit 0**, 78 componentes
- `node scripts/validate-scss-tokens.cjs` → sem fantasma novo nem condicional-only novo
- `npx sass tokens/index.scss` → OK · `npx sass DssButton.module.scss` → OK
- `grep -rn "var(--dss-hc" packages/core/components/` → **0** (nenhum componente aponta para a paleta)
- **Zero regressão de contraste**: comparação original × HC, nível a nível, nos dois temas
- `--dss-primary` no default segue `#1f86de`; `--dss-text-body` no claro segue `#454545`

---

## 4. Esforço

| bloco | o que é | peso |
|---|---|---|
| **A. Paleta HC da família de ação** | ✅ **FEITO** — 46 tokens (5 cores × 2 temas, podados por 2 regras). Estender a feedback/neutros deixou de ser necessário (§3.4) | — |
| **B. Tokenizar ~284 cinzas crus** | `var(--dss-gray-*)` chapado nos componentes, inerte a qualquer tema | **Alto — é o teto real do HC** |
| **C. ~~9~~ 11 declarações de cor congelada** | ✅ **FEITO** — convertidas para `color-mix` derivando do semântico (§5.2) | — |
| **D. 5 componentes com `body--dark`** | Drawer, Footer, Header, Layout, PageSticky — precisam do mesmo tratamento no eixo HC | Baixo |
| **E. Toggle + persistência** | **não existe hoje**: o único `setAttribute('data-theme')` do repo está em `apps/sandbox/src/preview/PreviewSubject.vue:159`. Falta composable exportado, persistência e `prefers-contrast: more` | Médio |
| **F. Matriz de validação** | 3 brands × N temas, regravada em contrato | Médio, **recorrente** |

> **O bloco B não é custo do alto contraste.** É dívida de tokenização que já degrada o dark mode hoje — o HC apenas a expõe. Esse é o argumento para tratá-lo como investimento compartilhado, não como preço da feature.

---

## 5. Pontos de atenção e gaps

### 5.1 ✅ RESOLVIDO — `dark` × `hc`: rota A (quatro valores de tema)

`data-theme` aceita **um valor**, então `dark` e `hc` não coexistem sem decisão. Medido, o quadro é este:

**Dois fatos que reenquadram a pergunta.**

1. **O dark só remapeia neutros — as ações são idênticas.** `--dss-action-primary` é `#1f86de` nos dois temas. O problema do botão (3.80:1) é o mesmo nos dois. Em compensação, os neutros do dark **já são AAA**: texto corpo 13.88:1, texto sutil 10.21:1. Metade do trabalho de HC no escuro já está feita.
2. **As rampas NÃO podem ser compartilhadas.** A rampa HC-light fica invisível sobre `#262626` — base 1.99:1, focus 1.70, hover 1.43, deep 1.22. O HC-dark exige **inversão de papel**: fundo de ação claro + texto escuro.

**O custo caro é igual nas três rotas.** Sejam quantos forem os valores, são **dois conjuntos distintos** — a medição acima prova que a rampa clara não serve no escuro. Nenhuma rota escapa disso, exceto a C, que abre mão do dark. A escolha não é sobre o artefato caro, é sobre como endereçá-lo. *(Na época esta seção estimava 108 valores para as 9 cores; a decisão #3 depois reduziu o escopo à família de ação — **46 tokens**.)*

| rota | paleta | ferramenta | matriz |
|---|---|---|---|
| **A — 4 valores** (`light`/`dark`/`hc`/`hcdark`) | 2 conjuntos | **zero mudança** | 3 marcas × 4 temas = **12** |
| **B — eixo `data-contrast="high"`** | 2 conjuntos (igual) | `wcag-kit` ~30 linhas · `PreviewSubject` +1 ref · 1 meta com probes de tema | 3 × 2 × 2 = **12** |
| **C — HC ignora dark** | 1 conjunto | zero | 3 × 3 = **9** |

**A e B empatam na matriz** — a diferença é nomenclatura e ferramenta, não combinatória.

**Escolhida a rota A**, por três razões nessa ordem:

1. **Custo marginal zero em ferramenta.** O pipeline já trata `theme` como string opaca: `wcag-kit`, `emit-contract` (repassa `c.contrast.opts`) e `PreviewSubject.vue` funcionam sem uma linha alterada. O kit já modela combos `[data-brand][data-theme]`.
2. **A vantagem da B é hipotética.** Ortogonalidade só compensa com um terceiro eixo, e não há indício de um.
3. **É reversível barato.** Migrar A→B depois é renomear valores de tema mais as ~30 linhas do kit — **a paleta não muda**. O investimento não fica preso na escolha.

A rota **C foi descartada**: é a única com custo de usuário real. Parte do público de baixa visão precisa de dark (fotofobia); forçar claro ao ligar o alto contraste resolve um problema de a11y criando outro. Só adotar por decisão explícita de produto, registrada como limitação conhecida.

#### 5.1.1 O custo que a rota A *aparentava* ter, e não tem

A objeção óbvia à rota A é que `[data-theme="hcdark"]` não casa `[data-theme="dark"]`, logo teria de **duplicar ~35 tokens de neutro**. Não precisa: basta o tema dark declarar os dois seletores.

```scss
[data-theme="dark"],
[data-theme="hcdark"] { /* … neutros … */ }
```

O `wcag-kit` itera `rule.selectors`, então indexa os dois escopos corretamente — e como os neutros do dark já são AAA, não há nada a endurecer. **Verificado:** `surface-default`, `text-body`, `border-default` e `surface-subtle` resolvem idênticos em `dark` e `hcdark`. O arquivo `themes/hcdark/_colors.scss` carrega **só** o eixo de ação.

### 5.2 ✅ CORRIGIDO — tokens semânticos com cor congelada em `rgba()`

**Eram 10, não 9** (as 9 superfícies `-surface` + `--dss-surface-selected`), mais `--dss-surface-selected` do tema dark = **11 declarações**. Não eram `var()`; logo **não seguiam re-apontamento nenhum** — nem tema, nem marca.

Convertidos para `color-mix()` derivando do **token semântico** (não do primitivo — ver §5.2.1):

```scss
/* antes */ --dss-action-primary-surface: rgba(31, 134, 222, 0.08);
/* agora */ --dss-action-primary-surface: color-mix(in srgb, var(--dss-action-primary) 8%, transparent);
```

| arquivo | tokens |
|---|---|
| `semantic/_actions.scss` | `--dss-action-{primary,secondary,tertiary,accent,dark}-surface` |
| `semantic/_feedback.scss` | `--dss-feedback-{success,error,warning,info}-surface` |
| `semantic/_surfaces.scss` | `--dss-surface-selected` |
| `themes/dark/_colors.scss` | `--dss-surface-selected` (24%) |

Resultado medido — agora seguem marca **e** tema:

| token | default | `brand=hub` | `theme=hc` |
|---|---|---|---|
| `--dss-action-primary-surface` | `#1f86de` 8% | **`#ef7a11`** 8% | **`#14568f`** 8% |
| `--dss-surface-selected` | `#1f86de` 12% | **`#ef7a11`** 12% | **`#14568f`** 12% |

`color-mix` já era idioma estabelecido no repo (DssCheckbox, DssChip, DssRadio) e não há `browserslist` restritivo. A auditoria `AUDITORIA_FINAL_A1_FOUNDATION.md:132` já havia recomendado exatamente essa forma.

**Efeito colateral saneado:** `dss.meta.json` do `DssMultiselectAutocomplete` gravava `"value": "rgba(31,134,222,0.08)"` e `"0.12"` — valores de cor congelados no meta, contra a convenção do próprio `sync-token-values.js` ("entradas cujo token resolve para COR mantêm `value: null` — cor depende de brand/tema"). Passados a `null`. O script **só audita dimensão**, então cor congelada no meta não é pega por gate nenhum — lacuna de validação a fechar.

#### 5.2.1 ✅ RESOLVIDO — marca em HC, sem nenhuma cor nova

`[data-brand]` remapeia no **semântico** (`--dss-action-primary`), não no primitivo:

```
--dss-primary          default #1f86de   hub #1f86de   ← primitivo NÃO varia por marca
--dss-action-primary   default #1f86de   hub #ef7a11   ← o semântico é que varia
```

Por isso o re-apontamento do primitivo não alcançava a marca: `{theme:'hc', brand:'hub'}` entregava o laranja institucional (2.81:1 com branco). Sem tratamento, **o alto contraste simplesmente não existia para quem usa Hub/Water/Waste**.

**A solução saiu de graça em cor.** As marcas já têm escala 50→950; bastou escolher o passo cujo contraste atinge 7:1:

| marca | tema claro (fundo escuro) | tema escuro (fundo claro) |
|---|---|---|
| **hub** | 900 (8.88) · *mid* (11.58) · 950 (14.88) | 400 (7.79) · 300 (10.02) · 200 (11.99) |
| **water** | 700 (7.37) · 800 (9.02) · 900 (10.88) | 300 (8.05) · 200 (10.78) · 100 (12.85) |
| **waste** | 800 (8.14) · 900 (10.28) · 950 (15.50) | 400 (7.29) · 300 (9.46) · 200 (11.49) |

**11 dos 12 níveis são passos que a marca já tinha** — identidade cromática preservada, sem aval de marketing (as cores já são aprovadas), sem tocar `tokens/brand/*`.

**A exceção é o `hover` do Hub.** O laranja é claro demais: só 900 e 950 passam de 7:1, e a rampa precisa de três níveis. `--dss-hc-hub-mid` (`#5e2a0e`) é o ponto médio em sRGB entre hub-900 e hub-950 — interpolação de dois passos aprovados, não cor inventada, e nenhum token existente muda.

Verificado **no browser**, na cascata real: **32 células (2 temas × 4 contextos × 4 níveis), todas AAA, zero falhas.**

#### 5.2.2 🔴 O re-apontamento do primitivo NÃO funciona em contexto aninhado

Descoberto ao desenhar os blocos de marca, e confirmado no browser:

| `data-theme="hc"` em… | `--dss-primary` | `--dss-action-primary` |
|---|---|---|
| `<html>` (mesmo elemento que `:root`) | `#155994` | **`#155994` ✅** |
| uma `<section>` aninhada | `#155994` | **`#1f86de` ❌ não pega** |

**Causa:** custom property substitui seu `var()` no elemento **onde é declarada**. `--dss-action-primary: var(--dss-primary)` é declarada em `:root` e computa ali; um `[data-theme="hc"]` mais abaixo redefine o primitivo tarde demais — o semântico já foi calculado e só é herdado.

**Consequências práticas:**

- Os blocos de marca **precisam** re-apontar o semântico (é o que fazem) — e por isso funcionam aninhados.
- O tema `hc` só vale com `data-theme` **na raiz**. É como o DSS já opera (`PreviewSubject.vue` põe no `<html>`), mas é uma restrição não escrita até agora.
- ⚠️ Há precedente de uso aninhado no repo: `DssMarkupTable.example.vue` usa `<section data-theme="dark">`. O dark funciona ali porque sobrescreve o **semântico**; o `hc`, não. Se uso aninhado for requisito, o tema HC precisa migrar para re-apontamento semântico — o que reintroduz o custo de enumerar as cinco famílias (§2.1).

### 5.3 ✅ CORRIGIDO — `--dss-focus-primary` não resolvia no tema default (bug do wcag-kit)

O token é definido **3× em `:root`**, e a última definição vence no índice do kit:

```
:root  =>  rgba(0, 106, 197, 0.5)     ← o valor real
:root  =>  rgba(31, 134, 222, 0.8)    ← seção "cores mais fortes"
:root  =>  Highlight                  ← dentro de @media (forced-colors: active)
```

`buildTokenScopes()` usava `root.walkRules()` e classificava por seletor **sem olhar a at-rule que envolve**. O `:root` de dentro do `@media (forced-colors)` era achatado no escopo base e sobrescrevia o valor real. Como `Highlight` não é `#` nem `rgb`, `resolveToken` devolvia `null`.

**Correção aplicada:** `buildTokenScopes` passou a ser at-rule-aware. Regras sob at-rule vão para `scopes.conditional[<at-rule>]` e só entram no mapa se pedidas via `effectiveMap({ media })` — nada é perdido, e o default deixa de ser contaminado.

```
--dss-focus-primary  default                     = rgba(0, 106, 197, 0.5)   ← era null
--dss-focus-primary  brand=hub                   = rgba(191, 89, 15, 0.5)
--dss-focus-primary  theme=dark                  = rgba(51, 153, 229, 0.6)
--dss-focus-primary  @media (prefers-contrast: high) = rgba(31, 134, 222, 0.8)
```

**Descoberta adjacente:** o kit agora enumera os escopos condicionais e revelou que o DSS **já tinha** `@media (prefers-contrast: high)` definindo tokens de foco mais fortes. Isso se sobrepõe ao tema HC planejado e entra na decisão da §5.10.

**Sobre `high` vs `more` — permanece NÃO VERIFICADO.** `high` não é valor da spec (Media Queries Level 5 define `no-preference | more | less | custom`); era nome de rascunho, e a suspeita é que o bloco esteja inerte nos browsers atuais. **A frente paralela tentou verificar e não conseguiu**, por duas rotas: `matchMedia().media` ecoa a consulta mesmo para um valor inventado (`banana`), e o CSSOM preserva a regra mesmo com valor inválido — nenhum dos dois discrimina. O `emulate` do DevTools não expõe `prefers-contrast`. Fechar isso exige uma máquina com a preferência ligada no SO.

> **A correção aplicada em `da5b83e` não depende dessa resposta.** O bloco passou a declarar `@media (prefers-contrast: more), (prefers-contrast: high)` — lista separada por vírgula é avaliada item a item, então funciona se `high` for suportado *e* se não for. A pergunta segue aberta apenas para saber se o `high` pode ser removido um dia, não para saber se o comportamento está correto.

### 5.3.1 ✅ CORRIGIDO (`001140e`, frente paralela) — o gate tinha a mesma cegueira

O `validate-scss-tokens.cjs` sofria do mesmo defeito do kit: dava por definido qualquer token que aparecesse em **qualquer** escopo, inclusive dentro de `@media` ou de um tema em que o consumidor nunca entra. O catálogo agora rastreia o escopo de cada definição.

Na primeira execução apareceu um **defeito visual em produção**, que verifiquei de forma independente:

```
--dss-border-default   light → null      dark → #737373
```

O token é definido **só** no tema dark. A única ocorrência no claro está **dentro de um comentário** — e é justamente o bloco `[data-theme="light-high-contrast"]` que este documento cita no §2 como "alguém já previu o HC". Era esse comentário que fazia o token *parecer* definido.

Consequência: **`.dss-item--divider` não tem borda no tema claro.** Alcance medido: 2 referências em `DssItem` (o divisor, defeito real de produto) + 8 em `utils/_example-showcase.scss`. **Não corrigido** — escolher o cinza do tema claro é decisão de design, não de engenharia.

### 5.4 🟡 Nove tokens existem só no dark — mas só **um** é consumido

Correção de uma afirmação anterior desta seção: eu havia registrado
`--dss-input-border-focus` como fantasma ativo. Medido, o quadro é outro e a
prioridade muda.

O tema dark define **9** tokens que não existem no `:root`:

| token | refs |
|---|---|
| `--dss-border-default` | **10** ← o único consumido |
| `--dss-border-subtle` · `-strong` | 0 |
| `--dss-input-{background,border,border-hover,border-focus,text,placeholder}` | 0 |

Ou seja: o defeito real é **um só** (`--dss-border-default`, §5.3.1) e os outros
8 são **peso morto do tema dark** — definidos e nunca usados. A família
`--dss-input-*` inteira (6 tokens) cai nesse balde, o que combina com o histórico
de `--dss-input-height-min`, também inerte.

Isso importa para o HC por um motivo estrutural: **cada tema novo multiplica essa
superfície**. Um `[data-theme="hc"]` completo pode facilmente nascer com a mesma
dúzia de tokens definidos-e-não-consumidos se ninguém verificar o consumo. O
gate de `001140e` agora pega o caso perigoso (definido só em escopo condicional
**e** referenciado); o peso morto puro continua invisível.

### 5.5 ✅ CORRIGIDO (`da5b83e`) — translucidez comia contraste; o anel default reprovava 1.4.11

O kit descartava o alpha: lia `rgba(0,106,197,0.5)` como se fosse o azul sólido, **superestimando** o contraste. Corrigido — `parseColor` agora preserva alpha, `contrastRatio` **compõe** a cor translúcida sobre o fundo opaco (que é o que o navegador de fato pinta) e **recusa** calcular quando o *fundo* é translúcido, em vez de chutar um backdrop.

Com a matemática correta, o anel de foco default aparece como:

```
--dss-focus-primary rgba(0,106,197,0.5) composto sobre #ffffff  →  2.19:1
```

**2.19:1 reprova o WCAG 1.4.11 (mínimo 3:1 para indicador de foco).** O kit antigo reportaria 5.43 — o azul sólido — e daria a claim como verificada. Nenhum contrato reivindica contraste de foco hoje, então nada estava mentindo em contrato; mas a regra de 50% de alpha, aplicada sobre fundo claro, não entrega o indicador de foco exigido.

> **Isto era achado do default, não do alto contraste** — entrou no débito c1, não neste spike. Registrado aqui porque foi a correção do kit que o expôs.

**Resolvido em `da5b83e` (decisão do dono: anel opaco).** A auditoria completa mostrou que não era um token: **49 de 60 combinações** reprovavam (10 famílias × light/dark × 3 marcas). A rota "só aumentar o alpha" caiu por medição — exigia 0.55–0.90 (visualmente já quase sólido) e **não resolvia três casos**: verde, amarelo e ciano não alcançam 3:1 contra branco em opacidade nenhuma, nem 100% opacos (2.34 / 2.04 / 2.52). Esses três passaram a usar o nível `-deep`.

Junto vieram: dois fantasmas (`--dss-focus-success`/`-error`, referenciados pelos shadows mas nunca definidos no `:root`), o bloco `prefers-contrast` que reintroduziria alpha 0.8 por cima dos tokens opacos (voltando a 2.9:1), 11 tokens mortos removidos, e **22 valores de contraste fabricados** em três documentos normativos.

Resultado: **88 combinações medidas, 0 reprovam.**

Em modo de alto contraste o anel também é opaco — o spike já fazia isso (8.92:1).

### 5.6 🟡 A rampa HC comprime a diferenciação de estado

Os quatro níveis escuros ficam em 7.62 / 8.92 / 10.56 / 12.42 — todos excelentes contra branco, mas **visualmente próximos entre si**. Diferenciar hover/focus/active só por cor enfraquece justamente para o público-alvo. Em HC, provavelmente é preciso reforço **não-cromático** (espessura de borda, sublinhado, outline). Mesmo fenômeno já observado no c1 com `info`.

### 5.7 🟡 Estados `disabled` são isentos — não forçar contraste neles

WCAG isenta explicitamente componentes desabilitados de 1.4.3 e 1.4.11. Forçar 7:1 em `-disable` faz o desabilitado parecer ativo — piora a usabilidade. A rampa HC mantém `-disable` suave de propósito.

### 5.8 🟡 Nome do tema não pode ter hífen

`scripts/wcag-kit.mjs:54` indexa escopos com `/^\[data-theme=(\w+)\]$/` e `\w` **não casa `-`**. `hc` funciona; `high-contrast` ficaria **invisível para o gate de contraste** — falha silenciosa, do tipo pior. (O Sass remove as aspas na compilação, então o seletor chega como `[data-theme=hc]`.)

### 5.9 🟡 Colisão de namespace no Sass module system

`@use 'themes/dark/colors'` e `@use 'themes/hc/colors'` colidem — ambos viram namespace `colors`. Exige alias explícito:

```scss
@use 'themes/hc/colors' as hc-colors;
```

Se o padrão `themes/<x>/_colors.scss` for mantido, todo tema novo paga esse pedágio. Vale considerar `themes/_<x>.scss`.

### 5.10 🟡 Relação com `forced-colors` precisa ser decidida

Já existem **109 arquivos** com `@media (forced-colors: active)` — o alto contraste do Windows já está implementado e, por regra vigente, **vence**. Definir: são eixos independentes (usuário pode estar em HCM do SO *e* no HC do DSS) ou o HC do DSS é a versão controlável do mesmo conceito? Sem isso, os dois vão brigar em campo.

### 5.11 🟡 Gradientes não são verificáveis por token-math

`--dss-gradient-primary-*` seguem o re-apontamento, mas contraste sobre gradiente **varia ao longo do gradiente** — o wcag-kit não modela isso. Qualquer texto sobre gradiente fica fora da verificação automática.

### 5.12 🟡 Risco de drift: componente apontando direto para a paleta

Nada impede alguém escrever `var(--dss-hc-primary)` num componente — que ficaria **preso em alto contraste**, fora do controle do seletor de tema. Neutralizado por um gate de uma linha:

```bash
grep -rn "var(--dss-hc-" packages/core/components/   # → deve ser 0
```

Esse é o motivo de a paleta usar **prefixo** (`--dss-hc-primary`) e não sufixo (`--dss-primary-hc`): o namespace no primeiro segmento torna a família inteira greppável com um padrão só. Sufixo também colidiria com a rampa existente (`disable → light → base → focus → hover → deep`), tornando `--dss-primary-hc-hover` ambíguo.

---

## 6. Decisões pendentes

1. ~~**`hc` × `dark` coexistem?**~~ — ✅ **decidido: rota A**, quatro valores de tema (§5.1). Os neutros do dark são herdados sem duplicar (§5.1.1); o tamanho final da paleta saiu da decisão #3. Reversível barato para a rota B se um terceiro eixo aparecer.
2. **Alvo de contraste: AAA (7:1) ou AA (4.5)?** O spike assumiu AAA. AA deixaria a rampa mais próxima das cores originais, mas entrega um "modo AA", não alto contraste.
3. ~~**Escopo da paleta**~~ — ✅ **decidido: só a família de AÇÃO** (§3.3). Feedback fica fora (fecha por troca de texto, sem trocar hex); neutros ficam fora (no dark já são AAA; no claro é dívida de tokenização). **46 tokens**, não 108.
4. ~~**Brand em HC**~~ — ✅ **resolvido** (§5.2.1): as 3 marcas ganham rampa HC usando **passos existentes** da própria escala. Um único valor novo (`--dss-hc-hub-mid`), por interpolação. 32/32 células AAA verificadas no browser.
5. **O bloco B (284 cinzas) entra nesta onda ou vira frente própria?**
6. **Relação com `forced-colors`** (§5.10) **e com o `@media (prefers-contrast)` que já existe** (§5.3). A migração `high`→`more` **não é urgente**: a correção já cobre os dois. Só remover o `high` depende de verificação em máquina real.
7. ~~**Anel de foco default a 2.19:1**~~ — ✅ **resolvido** em `da5b83e` (opaco, §5.5).
8. **🔴 NOVO — uso aninhado de `data-theme` é suportado?** (§5.2.2) O tema `hc` só funciona com o atributo na raiz. O dark funciona aninhado e há exemplo no repo usando assim. Se aninhado for requisito, o HC precisa migrar para re-apontamento semântico.
9. **Gate para cor congelada em `meta.json`** — `sync-token-values.js` só audita dimensão; cor não é verificada por gate nenhum (§5.2).
10. ~~**Nenhum validador é at-rule-aware**~~ — ✅ **resolvido**: `wcag-kit` em `a525b3a`, `validate-scss-tokens.cjs` em `001140e` (§5.3.1).
11. **🔴 `--dss-border-default` indefinido no tema claro** (§5.3.1). `.dss-item--divider` sem borda no light. Precisa de **decisão de design** (qual cinza) — a engenharia já está pronta.
12. **`--dss-text-on-primary` é único e branco** (§1). Fechar a metade "grátis" do c1 exige tokens de texto por cor, tocando todo componente que pinta texto sobre fundo colorido. É pré-requisito arquitetural da rota "texto escuro", não detalhe.

---

## 7. O que está onde

### 7.1 Correções de bug — **commitadas** em `a525b3a` (independem do alto contraste)

| arquivo | mudança |
|---|---|
| `scripts/wcag-kit.mjs` | at-rule awareness (§5.3) · alpha + composição · suporte a `color-mix()` · `var()` aninhado · novo export `listConditionalScopes()` · opção `effectiveMap({ media })` |
| `tokens/semantic/_actions.scss` | 5 `-surface` → `color-mix` do semântico |
| `tokens/semantic/_feedback.scss` | 4 `-surface` → `color-mix` do semântico |
| `tokens/semantic/_surfaces.scss` | `--dss-surface-selected` → `color-mix` |
| `tokens/themes/dark/_colors.scss` | `--dss-surface-selected` (24%) → `color-mix` |
| `DssMultiselectAutocomplete/dss.meta.json` | 2 valores de cor congelados → `null` (convenção do meta) |

**Nenhum valor de cor do default mudou** — só a *forma* de derivá-los. `--dss-primary` segue `#1f86de`, `--dss-surface-default` segue `#ffffff`.

O pre-commit propagou os derivados junto: `DSS_TOKEN_REFERENCE.md` (as 9 linhas de `-surface` agora mostram `color-mix`), `apps/docs-portal/src/index.css` e o timestamp de `DSS_REFERENCIA_VISUAL_ANALISE.md`. Contratos re-emitidos sem diferença.

### 7.2 Spike — commitado, porém **inerte** e descartável

```bash
git checkout packages/core/tokens/index.scss packages/core/tokens/themes/dark/_colors.scss
rm -rf packages/core/tokens/palettes packages/core/tokens/themes/hc packages/core/tokens/themes/hcdark
```

Os temas são inertes por default: só ativam sob `[data-theme="hc"]` / `[data-theme="hcdark"]`. O único efeito no CSS distribuído são **47 custom properties** adicionais em `:root` (46 da paleta + `--dss-hc-hub-mid`) e **um seletor a mais** no bloco do dark.

---

## 8. Verificação

```bash
node scripts/emit-contract.mjs --all --strict     # exit 0 · 78 componentes
npx sass packages/core/tokens/index.scss /dev/null
node scripts/wcag-kit.mjs --dss-text-on-primary --dss-action-primary          # default 3.80
node scripts/wcag-kit.mjs --dss-text-on-primary --dss-action-primary "" hc    # HC 7.62
node scripts/wcag-kit.mjs --dss-text-on-primary --dss-action-primary "" hcdark # HC-dark 9.24
node scripts/wcag-kit.mjs --dss-text-on-primary --dss-action-primary hub hc      # HC+marca 8.88
node scripts/wcag-kit.mjs --dss-focus-primary --dss-surface-default           # 2.19 ← §5.5
```

**Pré-existente, não regressão:** `sync-token-values.js --audit` acusa 43 divergências em 89 componentes — **todas de dimensão** (`font-size` 14→16px, `min-w`, `radius`, `touch-target`), resíduo da remoção do clamp de font-size da raiz. Nenhuma envolve os tokens tocados aqui.
