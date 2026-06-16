# DSS — Contrato de Composição de Ícone (CCI)

> **Status:** Normativo Vinculante
> **Versão DSS:** v2.4.0
> **Autoridade:** Nível 1 — Hard Rule. Este documento define como **todo** componente DSS renderiza ícone. Materializa o **Princípio #14 — Composição de Ícones**. Em caso de conflito sobre renderização de ícone, este documento e o CSS do componente prevalecem.

---

## 1. Princípio (Princípio #14 — Composição de Ícones)

O DSS possui **um único primitivo de ícone**: o `DssIcon`. Nenhum componente reimplementa a renderização de glifo.

```
icon (prop string) ──► DssIcon ──► QIcon ──► glifo (Material Icons / mdi- / img: / svguse: / SVG)
slot (#icon-*)      ──► conteúdo arbitrário do consumidor (recomendado: DssIcon)
```

**Motivação:** antes deste contrato, 4 componentes (`DssButton`, `DssChip`, `DssAvatar`, `DssCheckbox`) reimplementavam o ícone como `<span>` cru com `font-family: 'Material Icons'` hardcoded — perdendo o parser de formatos do QIcon, divergindo no modelo de a11y e duplicando o acoplamento à biblioteca de ícones. Este contrato encerra essa divergência e impede sua reincidência.

**Cadeia de verdade:** CSS do componente → `dss.meta.json` → `DSS_REFERENCIA_VISUAL_ANALISE.md` (Princípio #12). A renderização de ícone vive **dentro** dessa cadeia, via `DssIcon`.

---

## 2. O primitivo preparado: `DssIcon` embutível

A Fase 1 prepara o `DssIcon` para ser composto por outros componentes. Contrato do primitivo:

### 2.1 `decorative` é **só a11y**
- `decorative=true` → `aria-hidden="true"`, **sem** `role`.
- `decorative=false` (standalone) → `role="img"` + `ariaLabel` obrigatório.
- ❌ `decorative` **NÃO** aplica opacidade. O antigo `.dss-icon--decorative { opacity: 60% }` foi **removido** — era anti-pattern (escurecia ícones significativos e arriscava contraste). Não há prop substituto: dim de ícone não é necessidade atual (decisão travada, jun/2026).

### 2.2 Modo `inline` (sizing dirigido pelo host)
- `inline=true` → `width/height: 1em; font-size: inherit`. O ícone **escala com a `font-size` do host**; as classes de tamanho (`--xs..xl`) são ignoradas.
- `inline=false` (default, standalone) → `size` token como hoje.
- Embutido em outro componente, usar **sempre** `inline`.

### 2.3 Cor herda por padrão
- Sem `color`/`brand` → `color: inherit` (currentColor). Ícone embutido herda a cor do host (ex.: cor do texto do botão). Não passar `color` ao embutir, salvo necessidade explícita.

### 2.4 Host controla layout via passthrough de classe
- `DssIcon` é **single-root** (raiz = `<span>`). `<DssIcon class="dss-x__icon--left" />` mescla a classe na raiz.
- O **host mantém todo o layout** (gap, flex, ordem, posicionamento) na sua própria classe. O `DssIcon` não impõe margem/posição.

---

## 3. Regras de composição (vinculantes para os componentes)

### 3.1 Regra do prop — correção interna, API pública intacta
> O prop `icon` (e variantes: `iconRight`, `iconSelected`, `iconRemove`, etc.) **DEVE** renderizar internamente:
> ```vue
> <DssIcon :name="icon" inline decorative class="dss-{c}__icon dss-{c}__icon--left" />
> ```
> É **proibido** renderizar glifo em `<span>` cru / interpolar nome como texto. O bloco `font-family: 'Material Icons'` local **DEVE ser deletado**.
>
> A **API pública não muda**: `icon="star"` continua idêntico para o consumidor. Esta é correção de encanamento, não breaking change.
>
> **Import canônico** (padronizado no piloto — use exatamente este, o wrapper, não o `1-structure`):
> ```ts
> import DssIcon from '../../DssIcon/DssIcon.vue'
> ```

### 3.2 Regra do slot — capacidade nova, aditiva
> Cada componente com ícone expõe **slot(s) nomeado(s)** (ex.: `#icon-left`, `#icon-right`).
> - Quando o slot tem conteúdo, ele **tem precedência** sobre o prop correspondente.
> - O slot `default` permanece reservado ao **label/conteúdo principal**.
> - Conteúdo recomendado do slot = `<DssIcon>` ou SVG. O consumidor **nunca** escreve `<span>` de glifo à mão.

### 3.3 Regra de a11y
> O ícone é `decorative` quando o host possui label textual / `aria-label` (caso de Button, Chip, Avatar). Caso contrário, o host é responsável por garantir a rotulagem do ícone.

### 3.4 Proibição (trava o anti-pattern)
> ❌ Nenhum componente pode declarar `font-family: 'Material Icons'` nem interpolar nome de ícone como texto em template.
> **Gate de verificação (deve retornar zero):**
> ```bash
> grep -rn "Material Icons" packages/core/components/base/Dss{Componente}/**/*.scss
> ```

---

## 4. Matriz por componente (escopo de cada agente da Fase 2)

| Componente | Corrige (prop → DssIcon) | Adiciona (slot) | Nuance / Risco |
|---|---|---|---|
| **DssAvatar** | `icon` | `#default` / `#icon` (img, SVG) | Remover redundância classe `material-icons` + `font-family`. **PILOTO** (não-Golden) |
| **DssButton** | `icon`, `iconRight` | `#icon-left`, `#icon-right` | **Golden Reference** → regressão visual obrigatória + nota em `DSS_GOLDEN_COMPONENTS.md` |
| **DssChip** | `icon`, `iconRight`, `iconSelected`, `iconRemove` | slots nomeados equivalentes | **Golden Reference** → idem; 4 posições de ícone |
| **DssCheckbox** | glifos internos `check`/`dash` → `<DssIcon inline decorative>` | **sem slot de ícone** | Glifo é marca visual interna, **não** API pública. **Zero props novos** (sem `checked-icon`/`indeterminate-icon` neste refactor — paridade Quasar fica para mudança aditiva futura) |

---

## 5. Gate de aceite (idêntico para os 4 agentes)

Um componente só "fecha" quando **TODOS** os itens estão atendidos:

1. [ ] `npx sass` compila sem erro (a partir de `packages/core`)
2. [ ] `npx vitest run --project unit` passa. **Atenção (lição do piloto):** testes legados que assertam a classe `material-icons` ou o glifo como texto cru **vão quebrar** — substituí-los por asserção de composição: `expect(icon.classes()).toContain('dss-icon')` + `expect(wrapper.find('.dss-icon__inner').exists()).toBe(true)`.
3. [ ] **(CONDICIONAL)** `dss.meta.json` → `visualProperties.source` reflete a composição via DssIcon — **somente se o `defaultPreview` do componente incluir um ícone**. Vários componentes têm preview não-ícone (Avatar = iniciais, Button/Chip = label) — nesse caso **não há source de ícone para repontar** e este item é **N/A**.
4. [ ] **(CONDICIONAL)** `npm run sync:visual-contract` executado — **somente se o item 3 alterou o meta**. Se o meta não mudou, o sync é no-op; **não rodar** para evitar diff de catálogo desnecessário.
5. [ ] **§3.4 satisfeito** — `grep -rn "Material Icons" .../Dss{C}/ --include="*.scss"` retorna **zero** (escopo **SCSS apenas**; menções em `.md`/`.ts` à biblioteca "Material Icons" como convenção de nome são legítimas e não violam o gate).
6. [ ] Regressão visual revisada (Playwright)
7. [ ] Docs atualizados: selo, `DSS{C}_API.md`, `README.md`, `Dss{C}.md`, `DOCUMENTATION_CHANGELOG.md`. **Lição do piloto:** se algum doc declara *"Subcomponentes DSS Utilizados: Nenhum"*, isso ficou **factualmente errado** — o componente agora compõe `DssIcon`; corrigir essa seção.
8. [ ] (Button/Chip apenas) nota de re-certificação em `DSS_GOLDEN_COMPONENTS.md`

> Nenhum componente migrado recebe selo sem passar por este gate.

---

## 6. Sequenciamento Fase 1 → Fase 2

A paralelização **depende** da Fase 1 (DssIcon embutível) estar mergeada — os 4 agentes consomem o mesmo primitivo.

```
Fase 1  ── DssIcon embutível (§2) + este CCI ──► MERGE
   │
   └─► Fase 2 (1 agente por componente):
        ① PILOTO = DssAvatar ──► MERGE + valida o CCI na prática
                 │
                 └─► ②③④ em paralelo (worktrees isolados, mesmo CCI):
                       • DssButton   • DssChip   • DssCheckbox
```

**Por que o piloto antes de paralelizar:** Avatar é não-Golden e baixo risco. Qualquer ambiguidade do CCI aparece **uma vez** no piloto e é corrigida **aqui neste documento** antes de 3 agentes a replicarem nos Golden. Cada agente paralelo roda em **worktree próprio**, lendo este CCI como **fonte única**.

---

## 7. Decisões travadas (jun/2026)

| # | Decisão | Racional |
|---|---|---|
| 1 | `decorative` = só a11y; dim 60% **removido**; **sem** prop substituto | YAGNI — dim de ícone não é necessidade atual; anti-pattern de contraste |
| 2 | Sizing embedded via prop **`inline`** boolean | Lê melhor que `size="inherit"`; não polui a union de `size` |
| 3 | Checkbox roteia glifos fixos via DssIcon; **zero props novos** | Escopo é consistência, não expansão de API; menor risco a componente selado; paridade Quasar fica aditiva e futura |

---

## 8. Referências cruzadas

- `CLAUDE.md` — Princípio #14 (Composição de Ícones), Princípio #12 (CSS fonte de verdade), Princípio #1 (Token First)
- `docs/governance/DSS_GOLDEN_COMPONENTS.md` — re-certificação de Button/Chip
- `docs/reference/DSS_COMPONENT_ARCHITECTURE.md` — arquitetura de 4 camadas
- `packages/core/components/base/DssIcon/` — primitivo canônico
- `docs/governance/DSS_REFERENCIA_VISUAL_ANALISE.md` — catálogo visual (auto-gerado)
